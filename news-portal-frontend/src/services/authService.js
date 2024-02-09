import axios from 'axios'

const register=(userDetails)=>{
    return axios.post('http://localhost:8080/auth/register',userDetails)
}
const publisherRegister=(userDetails)=>{
    return axios.post('http://localhost:8080/auth/publisher/register',userDetails)
}
const login=(user)=>{
    return axios.post('http://localhost:8080/auth',user)
}
const logout=()=>{}
const AuthService={
    register,login,logout,publisherRegister
}
export default AuthService
