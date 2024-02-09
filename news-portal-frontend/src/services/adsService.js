import axios from 'axios';

const getAD  = () => {
  try{

    return axios.get('http://localhost:8080/ads');
  }catch(error){
    console.log('cannot fetch' + error)
  }
}

const postAD = (adDetails) => {
  try{
    const token = sessionStorage.getItem('token');
    return axios.post('http://localhost:8080/ads/post',adDetails,{headers:{'Authorization': 'Bearer '+JSON.parse(token)}});
  }catch{
    console.log('cannot fetch')
  }
}


const ADService = {
  getAD,postAD
};

export default ADService;
