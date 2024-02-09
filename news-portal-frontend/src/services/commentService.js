import axios from 'axios';

const comment = (id) => {
  try{
    const token = sessionStorage.getItem('token');
    return axios.post('https://chronical-backend.onrender.com/comment',{id:id},{headers:{'Authorization': 'Bearer '+JSON.parse(token)}});
  }catch(error){
    console.log('cannot fetch' + error)
  }
}

const createComment = (postComment) => {
  try{
    const token = sessionStorage.getItem('token');
    return axios.post('https://chronical-backend.onrender.com/comment/post',postComment,{headers:{'Authorization': 'Bearer '+JSON.parse(token)}});
  }catch{
    console.log('cannot fetch')
  }
}



const CommentService = {
  comment,createComment
};

export default CommentService;
