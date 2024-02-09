import axios from 'axios'

const createNews=(news)=>{
    const token=sessionStorage.getItem('token')
    return axios.post('https://chronical-backend.onrender.com/news',news,{headers:{'Authorization':'Bearer '+JSON.parse(token)}})

}

const getAllNews=()=>{
    return axios.get('https://chronical-backend.onrender.com/news/all')
}
const getNews=(genre)=>{
    return axios.get(`https://chronical-backend.onrender.com/news/genre/${genre}`)
}
const myNews=()=>{
    const token=sessionStorage.getItem('token')
    return axios.get(`https://chronical-backend.onrender.com/news`,{headers:{'Authorization':'Bearer '+JSON.parse(token)}})

}
const latestNews=()=>{
    return axios.get('https://chronical-backend.onrender.com/news/latest')
}
const searchNews=(tag)=>{
    return axios.get(`https://chronical-backend.onrender.com/news/search/${tag}`)
}
const NewsService={
    createNews,getAllNews,getNews,myNews,latestNews,searchNews
}
export default NewsService
