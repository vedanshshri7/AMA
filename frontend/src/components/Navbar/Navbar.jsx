import { useContext, useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthContext';
// import { FaRegUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const handleLogout = async() => {
    await logout();
  }
  const toggleMenu = () => setIsOpen(!isOpen);

    return (
      <div>
        <nav>
          <div className='navbar'>
            <div className='navbar-left'>
              <Link to="/"><img src="/assets/logo2-removed.png" alt="Logo" className='logo-img'/></Link>
            </div>
            <button className='navbar-toggle' onClick={toggleMenu}>☰</button>
            <div className={`navbar-right ${isOpen?'open':''} `}>
              <Link to="/">Home</Link>
              {/* <Link to="#">About Us</Link> */}
              <Link to="/shop">Shop</Link>
              <Link to="/cart">Cart</Link>
              {isAuthenticated ?(
                <div className='new-options'>
                  <Link to="/lessons">Lessons</Link>
                  {/* <Link to="#">Forum</Link> */}
                  <Link to="/updates">Updates</Link>
                   <div className='profile'>
                    {/* <FaRegUserCircle id="profilePic"/> */}
                    <p className='profile-name'>{user?.user.username}</p>
                    <button onClick={handleLogout} className='logout-btn'>Logout</button>
                  </div>
                </div>
              ):
              (
                <Link to="/login">Signup/Login</Link>
              )}
              
            </div>

          </div>
        </nav>
      </div>
    )
}


export default Navbar;