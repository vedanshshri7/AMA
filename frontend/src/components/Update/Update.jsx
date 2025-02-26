import React, { useContext, useState, useEffect } from 'react'
import './Update.css';
import { AuthContext } from '../Auth/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { apiUrl } from '../../apiUrl';
function Update() {
    const { isAuthenticated } = useContext(AuthContext);

    const [updateData, setUpdateData] = useState([]);
    // const apiUrl = "http://192.168.31.112:5000";

    useEffect(() => {
        if(localStorage.token){
            const config = {
                headers: {
                    'Authorization': `Bearer ${localStorage.token}`
                }
            }
        const fetchUpdateData = async() => {
            try{
                const res = await axios.get(`${apiUrl}/api/updates`, config);
                setUpdateData(res.data);
            }catch(err){
                console.error('Error fetching shop data', err);
            }
        }
        fetchUpdateData();
    }
    }, [])

    function formatDate(dateString){
        const date = new Date(dateString);
        return date.toLocaleString('en-GB',{
            day:'2-digit',
            month:'2-digit',
            year:'numeric',
            hour:'2-digit',
            minute:'2-digit',
            second:'2-digit',
            hour12:true
        })
    }

  return (
    <div className='update-container'>
        <div className='update-box'>
        <h1 className='update-notice'>Notice Board</h1>
            {
                isAuthenticated && updateData.map((item, key) => (
                    <div className='update-item' key={key}>
                        <div className='update-item-username'>
                            <div>{item.username}</div>
                            <div className='update-item-right'>
                                {key === 0? (
                                    <div className='new-notice'>NEW</div>
                                ): (<></>)}
                                <div className='update-item-date'>Date: {formatDate(item.dated)}</div>
                                </div>
                            </div>
                        <hr />
                        <div className='update-item-mssg'>{item.mssg}</div>
                    </div>
                ))
            }
            {
                !isAuthenticated && (
                    <h1 className='not-login'>Please <Link to="/login" className='login-link'>Login</Link> to continue...</h1>
                )
            }
            {
                isAuthenticated && updateData.length === 0 && (
                    <h1>No updates</h1>
                )
            }
        </div>
    </div>
  )
}

export default Update
