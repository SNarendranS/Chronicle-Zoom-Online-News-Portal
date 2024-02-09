import { useEffect, useState } from "react";
import News from "../../services/newsService";
import User from "../../services/userService";
import { useNavigate } from 'react-router-dom';

import './css/news.css';

function MyPublish() {
  const [news, setNews] = useState([]);
  const [error, setError] = useState();
  const [info, setInfo] = useState([]);
  const navigate=useNavigate()
 
  const getAllNews = async () => {
    try {
      const response = await News.myNews();
      setNews(response.data);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };
  useEffect(() => {
    window.scrollTo(0,0)},[])

  const getUsersForNews = async () => {
    const users = await Promise.all(news.map((s) => User.user(s.publisher)));
    return users.map((user) => user.data.name);
  };



  useEffect(() => {
    getAllNews();
  }, []);

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
      <h1 className="news-h1">My Publishes</h1>
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
                view
              </button>
            </div>
          );
        })}
      </div>

    </>
  );
}

export default MyPublish;