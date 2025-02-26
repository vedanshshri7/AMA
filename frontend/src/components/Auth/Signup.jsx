import React, { useContext, useState } from 'react'
import './Signup.css';
import {Link} from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';
const Signup= () => {

  const navigate =  useNavigate();
  const {register} = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    mobileNo: '',
    username: '',
    password: ''
  })

  const {name, mobileNo, username, password} = formData;

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

  const onSubmit = async e => {
    e.preventDefault();
    await register(name, mobileNo, username, password);
    navigate('/');
  }

  return (
    <div className='signup-container'>
      <div className='signup-box'>
        <h2>Signup</h2>
        <form onSubmit={onSubmit}>
          <div className='fullname'>
          <label>Full Name</label>
            <input type="text" placeholder='John Cena' name="name" value={name} onChange={onChange} required/>
          </div>
          <div className='phone'>
          <label>Mobile No.</label>
            <input type="tel" placeholder='XXXXX-XXXXX' name="mobileNo" value={mobileNo} onChange={onChange} pattern='[0-9]{10}' required/>
          </div>
          <div className='username'>
          <label>Username</label>
            <input type="text" placeholder='John1234' name="username" value={username} onChange={onChange} required/>
          </div>
          <div className='password'>
          <label>Password</label>
            <input type="password" placeholder='********' name="password" value={password} onChange={onChange} required/>
          </div>
          <button className='signup-btn' type='submit'>SIGNUP</button>
          <hr className='divider'/>
          <p className='to-login'>Already have an account? <Link to='/login' className='link-login'>Login</Link> here</p>
        </form>
      </div>
    </div>
  )
}

export default Signup;
