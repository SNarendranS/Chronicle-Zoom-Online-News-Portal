import React, {  useState } from 'react';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import './App.css';
import Navbar  from './components/layouts/navbar';
import Login from './components/authentication/login';
import Logout from './components/authentication/logout';
import Register from './components/authentication/register';
import Publish from './components/pages/publish';
import CommentComponent from './components/pages/comments';
import NewsView from './components/pages/newsView';
import Footer from './components/layouts/footer';
import PublisherRegister from './components/authentication/publisherRegister';
import About from './LegalInformation/about';
import PrivacyPolicy from './LegalInformation/privacyPolicy';
import TOC from './LegalInformation/toc';
import Profile from './components/pages/profile';
import MyPublish from './components/pages/myPublish';
import NewsByGenre from './components/pages/newsComponent';
import AdsPost from './components/pages/ads/adsPost';
import Payment from './components/pages/ads/payment';



function App() {
  let [username,setUsername]=useState('')

  let[role,setRole]=useState('')
  return (
    <BrowserRouter>
      <Navbar username={username} role={role}/>
        <hr/>
       
        <Routes>
          <Route path="/login" element={<Login setUsername={setUsername} setRole={setRole}/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/publisher/register" element={<PublisherRegister/>} />
          <Route path="/news" element={<NewsByGenre/>} />
          <Route path="/" element={<NewsByGenre/>} />
          <Route path="/myPublish" element={<MyPublish/>} />
          <Route path="/comments" element={<CommentComponent/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/publish" element={<Publish/>} />
          <Route path="/newsView" element={<NewsView/>} />
          <Route path="/logout" element={<Logout setUsername={setUsername} setRole={setRole}/>}></Route>
          <Route path="/about" element={<About/>} />
          <Route path="/privacy" element={<PrivacyPolicy/>} />
          <Route path="/toc" element={<TOC/>} />
          <Route path="/adPost" element={<AdsPost/>}/>
          <Route path="/payment" element={<Payment/>}/>

        </Routes>
        <hr/>
        <Footer/>
    </BrowserRouter>

  );
}

export default App;
