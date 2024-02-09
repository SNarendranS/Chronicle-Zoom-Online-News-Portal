import axios from 'axios'

const username=(username)=>{
    const token=sessionStorage.getItem('token')
    return axios.post('https://chronical-backend.onrender.com/user/username',{username:username},{headers:{'Authorization':'Bearer '+JSON.parse(token)}})

}
const user=(id)=>{

    return axios.get(`https://chronical-backend.onrender.com/user/${id}`)

}

 
const publisher=()=>{
    return axios.get('https://chronical-backend.onrender.com/user')

}
const updateProfile=(userChange,update)=>{
    const token=sessionStorage.getItem('token')
    return axios.post('https://chronical-backend.onrender.com/user/update',{"user":userChange,"update":update},{headers:{'Authorization':'Bearer '+JSON.parse(token)}})
    
}
const UserService={
    user,username,publisher,updateProfile 
}
export default UserService
