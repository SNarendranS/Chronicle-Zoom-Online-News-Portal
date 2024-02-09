import React, { useEffect, useState } from 'react';
import Comment from '../../services/commentService';
import User from "../../services/userService";
import { FaPaperPlane } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import  './css/comments.css';

function CommentComponent({ commentArray, newId }) {
  const [comments, setComments] = useState([]);
  const [commentUsers, setCommentUsers] = useState([]);
  const [error, setError] = useState(null);
  const [postComment, setPostComment] = useState({ 'commentTo': '', 'content': '', 'CommentBy': '' });
  const navigate=useNavigate()
  const username=sessionStorage.getItem('username')

  const fetchComments = async () => {
    try {
      const response = await User.username(username);
      setPostComment({ ...postComment, 'CommentBy': response.data._id });
      setPostComment({ ...postComment, 'commentTo': newId });
      const commentPromises = commentArray.map(async (c) => {
        try {
          const commentData = await Comment.comment(c);
          const commentUser = await User.user(commentData.data.commentBy)
          console.log(`comments ${commentData.data.content} ${commentUser.data}`)
          return {
            comment: commentData.data.content,
            user: commentUser.data,
          };
        } catch (commentError) {
          console.error(`Error fetching comment for ${c}:`, commentError);
        }
      });

      const resolvedComments = (await Promise.all(commentPromises)).filter(comment => comment !== null);
      setComments(resolvedComments.map(comment => comment.comment));
      setCommentUsers(resolvedComments.map(comment => comment.user));
    } catch (error) {
      setError((username)?'be the first to comment':`login to view comments`);
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    fetchComments();


  }, [commentArray]);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setPostComment({ ...postComment, [name]: value });
    
  };


  

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(username==null||username==undefined){
      toast.error('login to post comments');
    }
    else{
      try {
        const newCmt = await Comment.createComment(postComment);
        commentArray.push(newCmt.data._id)
        toast.success("Successfully posted comment");
        await fetchComments();
        setPostComment({ ...postComment,  'commentTo': '', 'content': '', 'CommentBy': '' });
      } catch (error) {
        console.error(error);
        toast.error('Not successful');
      }
    }

  };


  return (
    <div className="comment-component-container">
      {error && <p className="error-message">{error} {error==`login to view comments`?
      <button className="login-button-link" onClick={() => navigate('/login')}>
        login
       </button>:''}</p>}
      <h6 className="comment-title">Comments:</h6>
      <ul className="comment-list">
        {comments.map((comment, index) => (
          <li key={index} className="comment-item">
            {commentUsers[index] && <><img src={commentUsers[index].profile ? commentUsers[index].profile : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwFZb6IfPYPt3OEwG0gm2Yt2ePGP1RtwaIbw&usqp=CAU'}/>
            <h4>{commentUsers[index].username}</h4></>}
            <p>{comment}</p>
          </li>
        ))}
      </ul>
      <div className="comment-form">
        <form>
          <textarea
            type="text"
            name="content"
            placeholder="Add a comment..."
            required=""
            onChange={handleChange}
            value={postComment.content}
          />
          <button  type="submit" onClick={handleSubmit} >
            <FaPaperPlane />
          </button>
        </form>
      </div>
      <ToastContainer position='top-center'/>
    </div>
  );
}






export default CommentComponent;
