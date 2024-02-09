import React, { useEffect, useState } from "react";
import FileBase64 from 'react-file-base64';
import NewsService from "../../services/newsService";
import "./css/publish.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import { useNavigate } from "react-router-dom";

function Publish() {
  const navigate=useNavigate()
  const [news, setNews] = useState({
    title: "",
    content: "",
    image: "",
    genre: "",
    tags: []
  });

  const [tagInput, setTagInput] = useState(""); // For handling tag input

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNews({ ...news, [name]: value });
  };

  const handleGenreChange = (event) => {
    const { value } = event.target;
    setNews({ ...news, genre: value });
  };

  const handleTagInput = (event) => {
    setTagInput(event.target.value);
  };

  const handleAddTag = () => {
    if (tagInput.trim() !== "") {
      setNews({ ...news, tags: [...news.tags, tagInput.trim()] });
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag) => {
    const updatedTags = news.tags.filter((t) => t !== tag);
    setNews({ ...news, tags: updatedTags });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createNews();
  };

  const createNews = async () => {
    try {
      await NewsService.createNews(news);
      toast.success("Successfully published");
      setNews({ title: "", content: "", image: "", genre: "", tags: [] });
      setTimeout(() => {
        navigate('/myPublish')
      }, 1500);

    } catch (error) {
      console.log(error);
      toast.error("Not successful");
    }
  };

  useEffect(()=>{window.scrollTo(0,0)},[])
  
  return (
    <>
      <div className="publish-container">
        <form className="publish-form">
          <input
            type="text"
            name="title"
            placeholder="Title"
            required=""
            onChange={handleChange}
            value={news.title}
            className="publish-input"
          />
          <textarea
            name="content"
            placeholder="Content"
            required=""
            onChange={handleChange}
            value={news.content}
            className="publish-input publish-textarea"
          />

          <FileBase64
            multiple={false}
            onDone={({ base64 }) => setNews({ ...news, image: base64 })}
          />
          <img src={news.image} alt="preview" className="publish-preview"/>

          <select
            name="genre"
            value={news.genre}
            onChange={handleGenreChange}
            className="publish-input"
          >
            <option value="">Select Genre</option>
            <option value="sports">Sports</option>
            <option value="india">India</option>
            <option value="politics">Politics</option>
            <option value="international">International</option>
            <option value="entertainment">Entertainment</option>
            <option value="business">Business</option>
          </select>

          <div>
            <input
              type="text"
              placeholder="Enter tags"
              value={tagInput}
              onChange={handleTagInput}
            />
            <button type="button" onClick={handleAddTag}>
              Add Tag
            </button>
          </div>

          <div className="tags-container">
            {news.tags.map((tag, index) => (
              <div key={index} className="tag">
                {tag}
                <button type="button" onClick={() => handleRemoveTag(tag)}>
                  Remove
                </button>
              </div>
            ))}
          </div>

          <button onClick={handleSubmit} className="publish-button">
            Publish
          </button>
        </form>
      </div>
      <ToastContainer position='top-center'/>
    </>
  );
}

export default Publish;
