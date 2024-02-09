import axios from 'axios'

const createNews=(news)=>{
    const token=sessionStorage.getItem('token')
    return axios.post('http://localhost:8080/news',news,{headers:{'Authorization':'Bearer '+JSON.parse(token)}})

}

const getAllNews=()=>{
    return axios.get('http://localhost:8080/news/all')
}
const getNews=(genre)=>{
    return axios.get(`http://localhost:8080/news/genre/${genre}`)
}
const myNews=()=>{
    const token=sessionStorage.getItem('token')
    return axios.get(`http://localhost:8080/news`,{headers:{'Authorization':'Bearer '+JSON.parse(token)}})

}
const latestNews=()=>{
    return axios.get('http://localhost:8080/news/latest')
}
const searchNews=(tag)=>{
    return axios.get(`http://localhost:8080/news/search/${tag}`)
}
const NewsService={
    createNews,getAllNews,getNews,myNews,latestNews,searchNews
}
export default NewsService