import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './AdminUpdate.css';
import axios from 'axios';
import { AuthContext } from '../../Auth/AuthContext';
import { apiUrl } from '../../../apiUrl'; 

function AdminUpdate() {
  const [mssg, setMssg] = useState("");
  const { user } = useContext(AuthContext);
  // const apiUrl = "http://192.168.31.112:5000";


  const handleSubmit = async(e) => {

    e.preventDefault();
    if(localStorage.token){
      const config= {
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        }
      }
      const username = user.user.username;
      const body = { 
        username,
        mssg
      };
      try{
        const res = await axios.put(`${apiUrl}/api/admin/update-post`, body, config);
        navigate('/admin');
        console.log(res.data);
      }catch(err){
        console.log(err);
      }
    }

  }
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate('/admin');
  }

  return (
    <div className='adminUpdate-container'>
      <div className='adminUpdate-box'>
        <h1>New Update:</h1>
        <input type="text" onChange={(e) => setMssg(e.target.value)}/>
        <button type='submit' onClick={handleSubmit}>Send</button>
      </div>
      <button onClick={handleGoBack} className='goBack-btn'>Go Back</button>
    </div>
  )
}

export default AdminUpdate
