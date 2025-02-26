import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Video.css';
import {apiUrl} from '../../apiUrl';
function Video() {

  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  useEffect( ()=> {
    const fetchVideo = async() => {
      try{
        const response = await axios.get(`${apiUrl}/api/get-featured-video`);
        setVideoUrl(response.data.videoUrl);
        setName(response.data.name);
      } catch(err){
        console.error(err);
        setError('Failed to load the video');
      }finally{
        setLoading(false);
      };
    }
    fetchVideo(); 
  }, [])

  if(loading) return <p className='loading-p'>Loading...</p>;
  if(error) return <p className='error-p'>{error}</p>

  return (
    <section className='video-section'>
      <div className='video-container'>
        <h1 className='videoSectionTitle'>🌟 This Week's Featured Video 🌟</h1>
        <div className='divForVideo'>
        {videoUrl ? 
        (<div className='video-div'>
            <video className='embedded-video' controls>
                <source src={videoUrl} type='video/mp4'/>
            </video>
            <div className='namesOfPeople'><span className='name-span'>Students in the video:</span> {name}</div>
        </div>) :
        (<p>No video available.</p>)}
        </div>
      </div>
    </section>
  )
}

export default Video
