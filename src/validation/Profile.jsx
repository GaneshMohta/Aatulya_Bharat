import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './sign.css';

const Profile = () => {
  const [profileData, setProfileData] = useState([]);

  useEffect(()=>{

    const email = localStorage.getItem('Bharat_email')
    console.log(email)
    const fetchData = async() =>{
      const res = await axios.get("http://localhost:3000/user/getuser",
        {
          params: { email: email },
        });
      setProfileData(res.data.users_det[0]);
    }
  fetchData();
  },[])
  console.log(profileData);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">My Profile</h1>
      <div className="profile-grid">

        {Object.keys(profileData).map((key) => (
          <div className="profile-card" key={key}>
            <span className="profile-label">{key.replace(/([A-Z])/g, ' $1')}: </span>
            <input
              type="text"
              name={key}
              value={profileData[key]}
              onChange={handleChange}
              className="profile-input"
            />
            <span className="edit-icon">✏️</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
