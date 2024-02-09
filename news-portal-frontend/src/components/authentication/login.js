import Auth from '../../services/authService'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './css/login.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

function Login({setUsername,setRole}) {
    let [user,setUser]=useState({'username':'','password':''})
    let[error,setError]=useState('')
    const navigate=useNavigate()
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };
    

    const handleSubmit=(event)=>{
        event.preventDefault();
        console.log(event)
        validateUser(user)
    }

    function parseJwt(token) {
        if (!token) { return }
        const base64Url = token.split('.')[1]
        return JSON.parse(window.atob(base64Url))
      }

    const validateUser=async (user)=>{
      try{
          const response=await Auth.login(user)
          console.log(response.data)
          let token=response.data
          let userData=parseJwt(token)
          sessionStorage.setItem('token',JSON.stringify(token))
          sessionStorage.setItem('username',userData.username)
          setUsername(userData.username)
          setRole(userData.role)
          toast.success("Login Successful")
          setTimeout(() => {
            navigate('/')
          }, 1000);
          
        }catch(error){
          toast.error("Login Unsuccessful")
        }
    }
useEffect(()=>{window.scrollTo(0,0)},[])
    return (
      <>
      <div className="login-form_wrapper">
      <div className="login-title_container">
        <h2>Login</h2>
      </div>
      <div className="login-row">
        <div className="login-input_field">
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            onChange={handleChange}
            value={user.username.toLowerCase()}
          />
          
        </div>
        
        <div className="login-input_field">
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
            value={user.password}
          />
        </div>
      </div>
      <div className='error-wrapper'><span className='login-error'>{error}</span></div>
      <button className="login-button" onClick={handleSubmit}>
        Login
      </button>
      <div className="signup">
        <div>
          New user?{' '}
          <button className="login-button-link" onClick={() => navigate('/register')}>
            Register
          </button>
        </div>
      </div>
      
    </div>
    <ToastContainer position='top-center'/></>
    );
}
export default Login











