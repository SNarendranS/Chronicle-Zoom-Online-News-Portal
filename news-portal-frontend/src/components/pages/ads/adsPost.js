import React, { useEffect, useState } from 'react';
import User from "../../../services/userService";
import FileBase64 from 'react-file-base64'
import { useNavigate} from 'react-router-dom'
import './css/adsPost.css'



function AdsPost() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [user, setUser] = useState({})
  const [postAds, setPostAds] = useState({
    title: '',
    contactName: '',
    contactPhone: '',
    content: '',
    image: '',
    contactEmail: '',
    price: '',
    url: '',
    expiryDay: 10,
  });


  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await User.username(sessionStorage.getItem('username'));
    setPostAds({ ...postAds, publisher: response.data._id });
      navigate('/payment', { state: { postAds: postAds } });
      setPostAds({
        title: '',
        contactName: '',
        contactPhone: '',
        content: '',
        image: '',
        contactEmail: '',
        price: '',
        url: '',
        expiryDay: 10,
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPostAds({ ...postAds, [name]: value });
  };



  const getDetails = async () => {
      try {
          const response = await User.username(sessionStorage.getItem('username'));
          const {name,phoneNumber,email}=response.data
          console.log("user is:", {name,phoneNumber,email});
          setPostAds({contactName:name,contactEmail:email,contactPhone:phoneNumber})
      } catch (error) {
          console.error("Error fetching user details:", error);
      }
  };

    useEffect(() => {
      window.scrollTo(0,0)

      getDetails();
    }, []);



  return (
    <div className="ads-post-container">
      {error && <p className="ads-error-message">{error}</p>}
      <div className="ads-form-container">
        <form className="ads-form">
          <div className="ads-form-group">
            <label htmlFor="title" className="ads-label">
              Title:
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="ads-form-input"
              placeholder="Title"
              required="true"
              onChange={handleChange}
              value={postAds.title}
            />
          </div>

          <div className="ads-form-group">
            <label htmlFor="contactName" className="ads-label">
              Contact Name:
            </label>
            <input
              type="text"
              name="contactName"
              id="contactName"
              className="ads-form-input"
              placeholder="Contact Name"
              required="true"
              onChange={handleChange}
              value={postAds.contactName}
            />
          </div>

          <div className="ads-form-group">
            <label htmlFor="contactPhone" className="ads-label">
              Contact Phone:
            </label>
            <input
              type="text"
              name="contactPhone"
              id="contactPhone"
              className="ads-form-input"
              placeholder="Contact Phone"
              minLength={10}
              required="true"
              onChange={handleChange}
              maxLength={10}
              value={postAds.contactPhone}
            />
          </div>

          <div className="ads-file-input ads-form-group">
            <label htmlFor="image" className="ads-label-image">
              Image:
            </label>
            <FileBase64
              className="ads-file-input"
              multiple={false}
              onDone={({ base64 }) => setPostAds({ ...postAds, image: base64 })}
            />
            <img src={postAds.image} alt="Preview" className="ads-image-preview" />
          </div>

          <div className="ads-form-group">
            <label htmlFor="contactEmail" className="ads-label">
              Contact Email:
            </label>
            <input
              type="text"
              name="contactEmail"
              id="contactEmail"
              className="ads-form-input"
              placeholder="Contact Email"
              onChange={handleChange}
              value={postAds.contactEmail}
            />
          </div>

          <div className="ads-form-group">
            <label htmlFor="price" className="ads-label">
              Product Price(optional):
            </label>
            <input
              type="text"
              name="price"
              id="price"
              className="ads-form-input"
              placeholder="Price"
              onChange={handleChange}
              value={postAds.price}
            />
          </div>

          <div className="ads-form-group">
            <label htmlFor="url" className="ads-label">
              URL:
            </label>
            <input
              type="text"
              name="url"
              id="url"
              className="ads-form-input"
              placeholder="URL"
              onChange={handleChange}
              value={postAds.url}
            />
          </div>

          <div className="ads-form-group">
            <label htmlFor="expiryDay" className="ads-label">
              Expiry Day:
            </label>
            <input
              type="number"
              name="expiryDay"
              id="expiryDay"
              className="ads-form-input"
              placeholder="Expiry Day"
              onChange={handleChange}
              min={1}
              value={postAds.expiryDay}
            />
            <label>
              Note:This determines your ad's expiry date,  ₹1000 for 10 days 
              </label>
          </div>
          <div className="ads-form-group">
            <label htmlFor="content" className="ads-label">
              Content:
            </label>
            <textarea
              type="text"
              name="content"
              id="content"
              className="ads-textarea"
              placeholder="Ad content"
              onChange={handleChange}
              value={postAds.content}
            />
          </div>

          <button type="submit" onClick={handleSubmit} className="ads-submit-button">
            proceed to pay
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdsPost;
