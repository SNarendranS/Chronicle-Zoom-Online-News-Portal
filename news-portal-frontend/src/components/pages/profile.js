import React, { useEffect, useState } from 'react';
import User from "../../services/userService";
import FileBase64 from 'react-file-base64'
import "./css/profile.css"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

function Profile(){
    const [user, setUser] = useState({"username":"",
    "name":"",
    'profile':"",
    "email":"",
    "location":"",
    "phoneNumber":""
});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
      };

    const getDetails = async () => {
        try {
            const response = await User.username(sessionStorage.getItem('username'));
            setUser(response.data);
            console.log("user is:", user);
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };
    const updateProfile = async () => {
        try {
            const response=await User.updateProfile({"username":user.username},user);
            if(response.data==='success')
              toast.success(' profile updated')
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };
      useEffect(() => {
        window.scrollTo(0,0)

        getDetails();
      }, []);
      return(<>
            

<div className="profile-container">
      <h2>Profile</h2>

      <img
        src={user.profile ? user.profile : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwFZb6IfPYPt3OEwG0gm2Yt2ePGP1RtwaIbw&usqp=CAU'}
        alt="preview"
        width="80px"
        height="75px"
        className="profile-image"
      />

      <FileBase64
        multiple={false}
        onDone={({ base64 }) => setUser({ ...user, profile: base64 })}
        className="file-input"
      />

      <div className="input-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter the Username"
          value={user.username}
          onChange={handleChange}
        />
      </div>

      <div className="input-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter the Name"
          value={user.name}
          onChange={handleChange}
        />
      </div>

      <div className="input-group">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Enter the email"
          value={user.email}
          onChange={handleChange}
        />
      </div>

      <div className="input-group">
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          placeholder="Enter the phone number"
          maxLength={10}
          value={user.phoneNumber}
          onChange={handleChange}
        />
      </div>

      <div className="input-group">
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          placeholder="Enter the location"
          value={user.location}
          onChange={handleChange}
        />
      </div>

      <button className="save-button" onClick={updateProfile}>
        Save
      </button>
    </div>
        <ToastContainer position='top-center'/>
      </>)
}
export default Profile