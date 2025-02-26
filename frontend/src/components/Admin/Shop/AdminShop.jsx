import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './AdminShop.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { AuthContext } from '../../Auth/AuthContext';
import { apiUrl } from '../../../apiUrl'; 

function AdminShop() {

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [errMessage, setErrMessage] = useState("");
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [tag, setTag] = useState('Guitar');
  const [condition, setCondition] = useState('New');
  const [stock, setStock] = useState(1);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(()=>{
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
  }, [user, navigate])

  if(isLoading){
    return <div className='adminShop-loader-div'>Loading... <br />Please check if you have logged in.</div>;
  }

  if(errMessage){
    return <div className='adminShop-error-div'>{errMessage}</div>;
  }


    const handleGoBack = () => {
      navigate('/admin');
    }

    // const apiUrl = "http://192.168.31.112:5000";

    const handleImageChange = (e) => {
      setImage(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('name', name);
      formData.append('Price', price);
      formData.append('tag', tag);
      formData.append('condition', condition);
      formData.append('stock', stock);
      formData.append('image', image);
      try{
        const res = await axios.post(`${apiUrl}/api/upload`, formData, {
          headers: {
            'Content-Type' : 'multipart/form-data'
          }
        })
        setImageUrl(res.data.imageUrl);
        console.log('Image uploaded successfully!');
        toast.success(`${name} is added to the shop`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      });
      }catch(err){
        console.error('Error uploading the image:', err);
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
      <div className='adminShop-container'>
        <div>
          <form onSubmit={handleSubmit} className='adminShop-form-container'>
            <div className='adminShop-name'>
              <label>Name:</label>
              <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required className='adminShop-form-input'/>
            </div>
            <div className='adminShop-price'>
              <label>Price:</label>
              <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required className='adminShop-form-input'/>
            </div>
            <div className='adminShop-tag'>
              <label>Tag:</label>
              <select value={tag} onChange={(e) => setTag(e.target.value)} className='adminShop-form-input'>
                  <option value="Guitar">Guitar</option>
                  <option value="Piano">Piano</option>
                  <option value="Drums">Drums</option>
                  <option value="Accessories">Accessories</option>
              </select>
            </div>
            <div className='adminShop-condition'>
              <label>Condition:</label>
              <select value={condition} onChange={(e) => setCondition(e.target.value)} className='adminShop-form-input'>
                  <option value="New">New</option>
                  <option value="Old">Used</option>
              </select>
            </div>
            <div className='adminShop-stock'>
              <label>Stock:</label>
              <input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} required className='adminShop-form-input' />
            </div>
            <div className='adminShop-photo'>
              <label>Image:</label>
              <input type="file" onChange={handleImageChange} required className='adminShop-form-input' />
            </div>
            <div className='adminShop-btn'>
              <button type="submit" className='adminShop-form-btn'>Upload</button>
            </div>
          </form>
          {imageUrl && <img src={imageUrl} alt='Uploaded' />}
        </div>
        <button onClick={handleGoBack} className='goBack-btn'>Go Back</button>
      </div>
    )
}

export default AdminShop
