import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './UpdateRole.css';
import { useContext } from 'react';
import { AuthContext } from '../../Auth/AuthContext';
import { apiUrl } from '../../../apiUrl'; 
function UpdateRole() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState(null);
    const [role, setRole] = useState('Guest');
    // const apiUrl = "http://192.168.31.112:5000";
    const { user } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [errMessage, setErrMessage] = useState("");
    useEffect(() => {
    
    const fetchUser = async() => {
        if(localStorage.token){
            const config = {
                headers: {
                    'Authorization': `Bearer ${localStorage.token}`,
                },
            }
            try{
                const res = await axios.get(`${apiUrl}/api/admin/user/${id}`, config);
                setCustomer(res.data);
            }catch(err){
                console.error(err);
            }
        }
        else{
            console.log("No token!");
        }
    }
    fetchUser();
    const timeout = setTimeout(()=>{
        if(user === null){
          setIsLoading(false);
          setErrMessage("User not logged in.");
        }
      }, 5000)
  
      if(user === null){
        console.log("Loading...");
        return;
      }
  
      if(user){
        clearTimeout(timeout);
        if(user.user.role !== 'Admin'){
          alert("Only Admins can access this page!");
          navigate('/');
        }
        else{
          setIsLoading(false);
        }
      }
    return () => clearTimeout(timeout);
}, [id, user, navigate]);


    if(isLoading){
    return <div className='loader-div'>Loading... <br />Please check if you have logged in.</div>;
    }
    
    if(errMessage){
        return <div className='error-div'>{errMessage}</div>;
    }

    const handleRoleChange = async(e) => {
        e.preventDefault();
        if(localStorage.token){
            const config={
                headers: {
                    'Authorization' : `Bearer ${localStorage.token}`,
                }
            }
            const body = { role };
            try{
                const res = await axios.put(`${apiUrl}/api/admin/update-role/${id}`, body, config);
                console.log(res.data.msg);
                navigate('/admin/update-role');
            }catch(err){
                console.error(err);
            }
        }
    }
    const handleGoBack = () => {
        navigate('/admin/update-role');
    }

  return (
    <div className='updateRole-container'>
        <h1>Update Role for "{customer?.name}"</h1>
        <form onSubmit={handleRoleChange} className='updateRole-form'>
            <label className='form-label'>
                Role:
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="Guest">Guest</option>
                    <option value="Student">Student</option>
                    <option value="Admin">Admin</option>
                </select>
            </label>
            <button type='submit' className='updateRole-btn'>Update Role</button>
        </form>
        <div className="updateRole-goBack-div">
            <button onClick={handleGoBack} className="updateRole-goBack-btn">Go Back</button>
        </div>
    </div>
  )
}

export default UpdateRole
