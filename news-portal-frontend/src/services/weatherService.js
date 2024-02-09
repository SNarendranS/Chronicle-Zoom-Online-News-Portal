import axios from 'axios';

const weather = async() => {
    try {
      const apiKey = '5fe7f3ec181b454ffdce6734181a935a'; 
        return await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=New Delhi&appid=${apiKey}&units=metric`
      );
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };




const WeatherService = {
    weather
};

export default WeatherService;
