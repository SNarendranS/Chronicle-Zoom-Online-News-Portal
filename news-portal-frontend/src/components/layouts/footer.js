import { useEffect, useState } from "react";
import "./css/footer.css"
import { useNavigate } from "react-router-dom";
import { FaEnvelope ,FaFacebook,FaTwitter} from 'react-icons/fa';

function Footer() {
  const navigate=useNavigate()
  const [username,setUsername]=useState('')
  useEffect(()=>{
    setUsername(sessionStorage.getItem('username'))
  },[username])
    return (
        <div className="footer-container">
            <div className="footer-links">
              <button className="footer-button" onClick={()=>navigate('/')}>Home</button>
                <button className="footer-button" onClick={()=>navigate('/about')}>About Us</button>
                <button className="footer-button" onClick={()=>navigate('/privacy')}>Privacy Policy</button>
                <button className="footer-button" onClick={()=>navigate('/toc')}>Terms of Service</button>

            </div>
            <div className="footer-connect">
                <div className="footer-connect-text">Connect with Us:</div>
                <div className="footer-social-links">
                    <a href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=GTvVlcSKkkJmXGPtfJdjpDKjPHlBXhbpwctrDLvGmGWjZqmwVVQbjZNnQmnnzczCwdvpzswrstVrT" target="_blank" className="footer-link"><FaEnvelope/> Email</a>
                    <a href="https://facebook.com/ChronicleZoom" target="_blank" className="footer-link"><FaFacebook/> Facebook</a>
                    <a href="https://twitter.com/ChronicleZoom" target="_blank" className="footer-link"><FaTwitter/> Twitter</a>
                </div>
            </div>
            <div className="footer-copyright">
              Copyright © 2023 ChronicleZoom. All Rights Reserved.
            </div>
            <div className="footer-copyright">
              Developed by Narendran S.
            </div>
        </div>
    );
  }
  
  export default Footer;
