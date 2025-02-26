import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './AdminFeaturedVideo.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { AuthContext } from '../../Auth/AuthContext';
import { apiUrl } from '../../../apiUrl'; 

function AdminFeatuedVideo() {
    const navigate = useNavigate();
    const handleGoBack = () => {
      navigate('/admin');
    }
    const { user } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [errMessage, setErrMessage] = useState("");
    const [name, setName] = useState('');

    const [video, setVideo] = useState(null);
    const [videoUrl, setVideoUrl] = useState("");

    useEffect(()=>{
      if(user === null){
        setIsLoading(false);
        setErrMessage("User not logged in.");
      }
      else{
        if(user.user.role !== 'Admin'){
          alert("Only Admins can access this page!");
          navigate('/');
        }
        else{
          setIsLoading(false);
          setErrMessage("");
        }
      }
    }, [user, navigate])
  
    if(isLoading){
      return <div className='admin-featured-video-loader-div'>Loading... <br />Please check if you have logged in.</div>;
    }
  
    if(errMessage){
      return <div className='admin-featured-video-error-div'>{errMessage}</div>;
    }

    const handleVideoChange = (e) => {
      setVideo(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('name', name);
      formData.append('video', video);
      try{
        const res = await axios.post(`${apiUrl}/api/upload-featured-video`, formData, {
          headers: {
            'Content-Type' : 'multipart/form-data'
          }
        })
        setVideoUrl(res.data.video.videoUrl);
        console.log('Video uploaded successfully!');
        toast.success(`${name} are added`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      });
      }catch(err){
        console.error('Error uploading the video:', err);
        toast.error("Error uploading this item!",{
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
    }

    return (
      <div className='admin-featured-video-container'>
        <div>
          <form onSubmit={handleSubmit} className='admin-featured-video-form-container'>
            <div className='video-names'>
              <label>Names:</label>
              <input type="text" placeholder='Names of people in the video' name="name" value={name} onChange={(e) => setName(e.target.value)} required className='admin-featured-video-input' />
            </div>
            <div className='video-upload'>
              <label>Video:</label>
              <input type="file" name="video" onChange={handleVideoChange} required className='admin-featured-video-input' />
            </div>
            <div className='admin-featured-video-btn'>
              <button type="submit" className='admin-featured-video-form-btn'>Upload</button>
            </div>
          </form>
          {videoUrl && <video src={videoUrl} controls alt='Uploaded' className='uploaded-video'/>}
        </div>
        <button onClick={handleGoBack} className='adminVideo-goBack-btn'>Go Back</button>
      </div>
    )
}

export default AdminFeatuedVideo
