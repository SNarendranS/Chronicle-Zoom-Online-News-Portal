import { Link,useNavigate} from 'react-router-dom'
import './css/navbar.css'
import { FaSearch } from 'react-icons/fa'; 
import { useState,useEffect } from 'react';
import Weather from '../../services/weatherService';
// import logo from ''

function Navbar({username,role}) {
    const navigate=useNavigate()
    let [tag,setTag]=useState('')
    const [currentDate, setCurrentDate] = useState('');
    const [weather, setWeather] = useState('');

    const handleNavigation = () => {
      navigate('/news', { state: { genre: 'all' } });
    };
    const handleSearch = () => {
      navigate('/news', { state: { genre: 'search' ,tag:tag} });
    };
    const handleChange = async (event) => {
      setTag(event.target.value)
    }

    const fetchWeather=async()=>{
      const response=await Weather.weather()
      const temperature = response.data.main.temp;
      setWeather(`New Delhi: ${temperature}°C`);
    }
    useEffect(() => {
      const formattedDate = formatCurrentDate();
      setCurrentDate(formattedDate);
      fetchWeather()
    }, [tag]);

    const formatCurrentDate = () => {
      const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
      const currentDate = new Date().toLocaleDateString(undefined, options);
      return currentDate;
    };


    return (<div>
        <div className="container" >
      <div>
        <h1  className="logo-h1" onClick={handleNavigation}>ChronicleZoom</h1>
        <div className='nav-elements2'><p className=' right logo-date'>{currentDate} | {weather}</p></div>

      </div>
      <div className="nav-elements2">
        <ul>

          {!username ? (<>
            <Link to='/news' 
            state= {{ genre: 'latest' }} className=" right">
              Latest News
            </Link>

            <Link to="/login" className=" right">
              Login
            </Link>
          </>  
            
          ) : (
            <>
                    <Link to='/news' 
                    state= {{ genre: 'latest' }} className=" right">
                      Latest News
                    </Link>

              {role === 'publisher' ? (
                <>
 
                    <Link to="/publish" className=" right">
                      Publish
                    </Link>

                    <Link to='/news' 
                    state= {{ genre: 'myPublish' }} className=" right">
                    My Publishes
                    </Link>

                    <Link to="/profile" className=" right">
                      Profile
                    </Link>

                </>
              ) : (
                <>

                    <Link to="/profile" className="right">
                      Profile
                    </Link>
                </>
              )}
              <Link to='/adPost' className="right"> 
              Post ads
              </Link>
              
                <Link to="/logout" className="right">
                  Logout
                </Link>
              
            </>
          )}
        </ul>
                </div>


      <div className="container2">
      <div className="nav-elements">
        <ul>
          <li>
          <Link  to= '/news' 
            state= {{ genre: 'sports' }}
            className="nav-link">
            Sports
          </Link>
          </li>
          <li>
          <Link  to= '/news' 
            state= {{ genre: 'india' }}
            className="nav-link">
            India
          </Link>
          </li>
          <li>
          <Link  to= '/news' 
            state= {{ genre: 'politics' }}
            className="nav-link">
            Politics
          </Link>
          </li>
          <li>
          <Link  to= '/news' 
            state= {{ genre: 'international' }}
            className="nav-link">
            International
          </Link>
          </li>
          <li>
          <Link  to= '/news' 
            state= {{ genre: 'entertainment' }}
            className="nav-link">
            Entertainment
          </Link>
          </li>
          <li><Link  to= '/news' 
            state= {{ genre: 'business' }}
            className="nav-link">
            Business
          </Link>
          </li>
          <li>
            <div className="search-container"><input placeholder='search' className='right' onChange={handleChange} value={tag}/>
            <button onClick={()=>handleSearch()}><FaSearch/></button> </div>
          </li>
        </ul>
      </div>
    </div>
    </div>


    </div>)
    
}

export default Navbar