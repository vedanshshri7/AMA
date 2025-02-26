import React from 'react'
import './Footer.css';
function Footer() {
  return (
    <footer>
        <div className='footer-container' id="contact-section">
            <hr className='divider' id="contact-divider"/>
            <h1>Contact Us</h1>
            <div className='footer-content'>
                <div>
                    <img src='/assets/logo2-removed.png' alt="Logo" className='footer-logo-img'/>
                </div>
                <div>
                    <div className='footer-section about'>
                        <h2>About Us</h2>
                        <p>Aryan Music Academy is dedicated to nurturing musical talent. We offer expert instruction in <i>Guitar, Drums, Piano, Octapad, Singing</i> and much more. Join us to explore the world of music.</p>
                    </div>
                    <div className='footer-section contact'>
                        <div className='link'>
                            <p>Social Media: </p>
                            <a href="https://wa.me/9826636250"
                                target='_blank'
                                rel='noopener noreferrer'><img src="/assets/whatsapp.png" alt="Whatsapp" className='link logo'/></a>
                            <a href="https://www.instagram.com/aryanmusicacademy/"
                                target='_blank'
                                rel='noopener noreferrer'><img src="/assets/instagram.png" alt="Instagram" className='link logo'/></a>
                            <a href="https://www.youtube.com/@aryanmusicacademy4986"
                                target='_blank'
                                rel='noopener noreferrer'><img src="/assets/youtube.png" alt="Youtube" className='link logo'/></a>
                        </div>
                        <p>Email: <a href="mailto:aryanmusicofficialujn@gmail.com">Click here</a></p>
                    </div>
                </div>
            </div>
            <div className='footer-bottom'>
                    &copy; 2024 Aryan Music Academy . All rights reserved.
            </div>
        </div>
    </footer>
  )
}

export default Footer;
