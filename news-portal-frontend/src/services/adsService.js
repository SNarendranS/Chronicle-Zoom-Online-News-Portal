import axios from 'axios';

const getAD  = () => {
  try{

    return axios.get('https://chronical-backend.onrender.com/ads');
  }catch(error){
    console.log('cannot fetch' + error)
  }
}

const postAD = (adDetails) => {
  try{
    const token = sessionStorage.getItem('token');
    return axios.post('https://chronical-backend.onrender.com/ads/post',adDetails,{headers:{'Authorization': 'Bearer '+JSON.parse(token)}});
  }catch{
    console.log('cannot fetch')
  }
}


const ADService = {
  getAD,postAD
};

export default ADService;
