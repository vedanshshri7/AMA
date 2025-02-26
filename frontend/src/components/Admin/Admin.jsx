import React, { useContext, useEffect, useState } from 'react'
import './Admin.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthContext';
function Admin() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [errMessage, setErrMessage] = useState("");
  useEffect(()=>{
    if(user === null){
      setIsLoading(false);
      setErrMessage("User not logged in.");
    }
    else if(user){
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
    return <div className='loader-div'>Loading... <br />Please check if you have logged in.</div>;
  }
  if(errMessage){
    return <div className='error-div'>{errMessage}</div>;
  }

  return (
    <div className='admin-container'>
        <div className='admin-box'>
            <div className='admin-options'>
                <h1>Admin Options:</h1>
                <ul className='option-list'>
                    <li className='option-item'><Link to="/admin/shop" className='admin-link'>Shop</Link></li>
                    <li className='option-item'><Link to="/admin/update" className='admin-link'>Updates</Link></li>
                    <li className='option-item'><Link to="/admin/featured-video" className='admin-link'>Featured Video</Link></li>
                    <li className='option-item'><Link to="/admin/update-role" className='admin-link'>Change Role</Link></li>
                    <li className='option-item'><Link to="/admin/lessons" className='admin-link'>Lesson</Link></li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Admin
