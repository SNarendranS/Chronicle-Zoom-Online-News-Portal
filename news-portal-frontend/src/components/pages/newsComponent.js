import { useEffect, useState } from "react";
import News from "../../services/newsService";
import User from "../../services/userService";
import { useNavigate ,useLocation } from 'react-router-dom';
import './css/news.css';

function NewsByGenre() {
  const [news, setNews] = useState([]);
  const [error, setError] = useState();
  const [info, setInfo] = useState([]);
  const navigate=useNavigate()
  const location = useLocation();
  const genre = location.state && location.state.genre;
  const getAllNews = async () => {
    try {
        console.log(` genre is ${location.state} `)
      if(genre=='all' || genre==undefined){
        const response = await News.getAllNews();
        setNews(response.data);
      }
      else if(genre=='latest'){
        const response = await News.latestNews();
        if (response.data.length <= 16) {
          setNews(response.data);
      } else {

        setNews(response.data.slice(0, 16))
      }



      }
      else if(genre=='myPublish'){
        const response = await News.myNews();
        setNews(response.data);
      }
      else if(genre=='search'){
        const tag = location.state.tag;
        console.log(`called ${tag}`);

        const response = await News.searchNews(tag);
        console.log(`tag and data t:${tag} d:${response.data}`)
        setNews(response.data);
      }
      else{
        const response = await News.getNews(genre);
        setNews(response.data);
      }

    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const getUsersForNews = async () => {
    const users = await Promise.all(news.map((s) => User.user(s.publisher)));
    return users.map((user) => user.data.name);
  };



  useEffect(() => {
    getAllNews();
    window.scrollTo(0,0)

  }, [genre,location.state]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userNames = await getUsersForNews();
        setInfo(userNames);
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    };

    fetchUsers();
  }, [news]);


  return (
    <>
      <h1 className="news-h1">{genre=='myPublish'?'My Publishes':
      genre=='search'?<p className="searchH5">{news.length} search results</p>:
      (genre=='all'||genre==undefined)?'':
      genre.charAt(0).toUpperCase() + genre.slice(1) + ' News'}</h1>

      <div className="news-wrapper">
        {news.map((s, index) => {
          const createdAtDate = new Date(s.createAt);
          const formattedDate = createdAtDate.toLocaleDateString();
          const formattedTime = createdAtDate.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
          });
          return (
              <div className="news-container" key={s.id}>
              <h2>{s.title}</h2>
              <h5>{`${formattedDate} ${formattedTime}`}</h5>
              <h4>published by: {info && info[index]}</h4>
              <img src={s.image} width="90px" height="90px" alt="no preview available" />
              <br />
              <button onClick={() => { navigate('/newsView', { state: { newsDetails: s, publisher: info && info[index] } }) }}>
                Read more...
              </button>
            </div>
          );
        })}      
      </div>
      {(genre=='latest')?<button className="read-button" onClick={()=>navigate('/news', { state: { genre: 'all' } })}>see more news</button>:''}
    </>
  );
}

export default NewsByGenre;