import Auth from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Alert from '../layouts/alert';
import './css/register.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

function Register() {
  const navigate=useNavigate()
  const [user, setUser] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    phoneNumber:'',
    location:''
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(()=>{window.scrollTo(0,0)},[])


  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });

  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await Auth.publisherRegister(user);
      toast.success('Registered successfully! Please login to continue.');
      setUser({
        username: '',
        name: '',
        email: '',
        password: '',
        phoneNumber:'',
        location:''
      });
      setTimeout(() => {
        navigate('/login')
      }, 2000);

    } catch {
      showAlertFn('Registration failed. Try again!!');
      setUser({
        username:'',
        email: '',
        password: '',
      });
      setShowNext(!showNext)
    }
  };

  const [showNext, setShowNext] = useState(true);
  const handleNext = () => {
    if (user.name == undefined || user.name == '' ||
        user.email == undefined || user.email == '' ) {
          showAlertFn('Please enter both name and email before proceeding.');

         
    }
    else
    setShowNext(false);

      
  };
  
  const showAlertFn = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <>
            {showAlert ? <><Alert message={alertMessage} onClose={handleCloseAlert} /><div style={{minHeight:'70vh'}}></div></>:<>
                          {showNext ?<>
                            <div className="form_wrapper">
                            <div className="title_container">
                              <h2>Registration Form</h2>
                            </div>
                            <div className="row">
                              <div className="col_half">
                                <input
                                  type="text"
                                  name="name"
                                  placeholder="Enter the Name"
                                  className="input_field"
                                  required
                                  onChange={handleChange}
                                  value={user.name}
                                />
                                <input
                                  type="email"
                                  name="email"
                                  required
                                  placeholder="Enter the email"
                                  className="input_field"
                                  onChange={handleChange}
                                  value={user.email}
                                />
              
                                </div>
                                <div className='col_half'>
              
                                <input
                                  type="text"
                                  name="location"
                                  placeholder="Enter the location"
                                  className="input_field"
                                  onChange={handleChange}
                                  value={user.location}
                                />
                                  <input
                                  type="text"
                                  maxLength={10}
                                  name="phoneNumber"
                                  placeholder="Enter the phone number"
                                  className="input_field"
                                  onChange={handleChange}
                                  value={!(user.phoneNumber)?'':Number(user.phoneNumber)}
                                />
                      
                      
                                </div>
                            </div>
                            <button className="button" onClick={()=>handleNext()}>next</button>
                          </div>
                             </>
                            : <div className="form_wrapper">
                            <div className="title_container">
                              <h2>Registration Form</h2>
                            </div>
                            <div className="row">
                                <div className='col_half'>
                                <input
                                  type="text"
                                  name="username"
                                  placeholder="Enter the Username"
                                  required
                                  className="input_field"
                                  onChange={handleChange}
                                  value={user.username}
                                />
                                </div>
                                <div className="col_half">
                              <input
                                  type="password"
                                  name="password"
                                  required 
                                  placeholder="Enter the password"
                                  className="input_field"
                                  onChange={handleChange}
                                  value={user.password.toLowerCase()}
                                />
                              </div>
                            </div>
                            <button className="button" onClick={()=>setShowNext(true)}>back</button> 
                            <button className="button" onClick={handleSubmit}>Submit</button>  
                          </div>
              }</>}


  <ToastContainer position='top-center'/>
    </>
  );
}

export default Register;