import axios from 'axios'

const register=(userDetails)=>{
    return axios.post('https://chronical-backend.onrender.com/auth/register',userDetails)
}
const publisherRegister=(userDetails)=>{
    return axios.post('https://chronical-backend.onrender.com/auth/publisher/register',userDetails)
}
const login=(user)=>{
    return axios.post('https://chronical-backend.onrender.com/auth',user)
}
const logout=()=>{}
const AuthService={
    register,login,logout,publisherRegister
}
export default AuthService
