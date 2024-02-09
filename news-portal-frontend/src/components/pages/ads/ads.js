import React, { useEffect, useState } from 'react';
import AD from '../../../services/adsService';
import './css/ad.css'

function ADComponent() {
  const [ads, setAds] = useState([]);
  const [error, setError] = useState(null);
  const [num, setNum] = useState(0);

  const fetchADS = async () => {
    try {
      const response = await AD.getAD();
      setAds(response.data);
      console.log(`ads is ${ads}`);
    } catch (commentError) {
      console.error(`Error fetching ads `, commentError);
    }
  };

  const randomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  useEffect(() => {
    fetchADS();
  }, []);

  useEffect(() => {
    if (ads.length > 0) {
      setNum(randomNumberInRange(0, ads.length - 1));
  
      const intervalId = setInterval(() => {
        setNum(randomNumberInRange(0, ads.length - 1));
      }, 2000);
  
      return () => clearInterval(intervalId);
    }
  }, [ads,num]);


  return (
    <div className="ADComponent">
      {error && <p className="error">{error}</p>}
      <div className="advertisement">
        <h6>Advertisement:</h6>
        <ul>
          {ads.length > 0 && (
            <li>
              {new Date(ads[num].expirationDate)>=new Date()?<>
              <h3>{ads[num].title}</h3>
              <img src={ads[num].image} alt={`Ad ${num + 1}`} />
              <p>{ads[num].content}</p>
              <p>
                <h4>contact:</h4>
                <h4>
                  {ads[num].contactName} - {ads[num].contactPhone}
                </h4>
                <h4>{ads[num].contactEmail}</h4>
                <h4>{ads[num].price}</h4>
              </p>

              <a href={ads[num].url} target="_blank" rel="noopener noreferrer">
                visit website
              </a>  </>:""}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default ADComponent;
