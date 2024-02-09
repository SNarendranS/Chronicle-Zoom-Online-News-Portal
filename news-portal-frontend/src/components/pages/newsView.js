import {  useEffect, useState } from "react";
import CommentComponent from './comments'; 
import { useLocation } from 'react-router-dom';
import './css/newsView.css';
import ADComponent from "./ads/ads";


function NewsView() {
    const location = useLocation();
    const s = location.state.newsDetails;
    const info = location.state.publisher;
    const [showComments, setShowComments] = useState(false);
    const handleCommentsToggle = () => {
        setShowComments(!showComments);
    };

    useEffect(()=>{window.scrollTo(0,0)},[])


    return (
        <>
 <div className="news-container-wrap">
 

  <div className="news-view-wrap">
    <div className="news-view-container" key={s.id}>
      
      <h2>{s.title}</h2>
      <img src={s.image?s.image:s.urlToImage} width="100%" height="auto" alt="no preview available" />
      <h4>Published by: {info}</h4>
      <h5>
        {`${new Date(s.createAt).toLocaleDateString()} 
        ${new Date(s.createAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`}
      </h5>
      <p>{s.content?s.content:s.text}</p>
    </div>
  </div>

  <div className="comment-component">
    <button className="comment-component-button " onClick={handleCommentsToggle}>
        {showComments ? 'Hide Comments' : 'Show Comments'}
    </button>
    <div>
    {showComments && <CommentComponent commentArray={s.comments} newId={s._id} />} 
    </div>
    <div className="ads-component">
      <ADComponent/>
    </div>
  </div>
</div>
</>



    );
}

export default NewsView;
