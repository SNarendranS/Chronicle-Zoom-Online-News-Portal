import axios from 'axios'

const username=(username)=>{
    const token=sessionStorage.getItem('token')
    return axios.post('http://localhost:8080/user/username',{username:username},{headers:{'Authorization':'Bearer '+JSON.parse(token)}})

}
const user=(id)=>{

    return axios.get(`http://localhost:8080/user/${id}`)

}

 
const publisher=()=>{
    return axios.get('http://localhost:8080/user')

}
const updateProfile=(userChange,update)=>{
    const token=sessionStorage.getItem('token')
    return axios.post('http://localhost:8080/user/update',{"user":userChange,"update":update},{headers:{'Authorization':'Bearer '+JSON.parse(token)}})
    
}
const UserService={
    user,username,publisher,updateProfile 
}
export default UserService