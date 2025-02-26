import React, { useContext, useState } from 'react';
import './Login.css';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
const Login= () => {

  const {login} = useContext(AuthContext);
  const navigate = useNavigate();
  const[formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const {username, password} = formData;
  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

  const onSubmit = async e => {
    e.preventDefault();
    if(!username || !password)  return console.error({msg: "Username or password is null"})
    await login(username, password);
    console.log("User Logged in!")
    navigate('/');
  }

  return (
    <div className='login-container'>
        <div className='login-card'>
            <form className='login-form' onSubmit={onSubmit}>
                <h2 className='login-label'>Login</h2>
                <div className='username'>
                        <FaUser className='userIcon'/>
                        <input type="text" placeholder='Username' name="username" value={username} onChange={onChange} required/>
                </div>
                <div className='password'>
                    <RiLockPasswordFill className='passIcon'/>
                    <input type="password" placeholder='********' name="password" value={password} onChange={onChange} required/>
                </div>
                <button className='login-btn' type='submit'>LOG IN</button>
                <hr className='divider'/>
                <p className='newText'>New registration? Sign up <Link to="/signup">here</Link></p>
            </form>
        </div>
    </div>
  )
}

export default Login
