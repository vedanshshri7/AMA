import React from 'react';
import './Home.css';
import Instrument from '../Instruments/Instrument';
import Video from '../Video/Video';
function Home() {
  return (
    <div>
    <div className='homepage'>
        <div className='class-name'>
            <h1><span className='name'>Aryan</span><br />Music Academy</h1>
            <div className='description'>
              <p style={{fontSize: '1.8rem', fontWeight:'500'}}>Embark on a musical adventure with Aryan Music Academy. Learn, grow, and inspire.</p>
              <p>Timings: Monday - Friday</p>
              <ul>
                  <li className='time1'>Morning: 9am - 11am </li>
                  <li className='time2'> Evening: 4:30pm - 8:30pm</li>
              </ul>
            </div>
        </div>
        <div className='homepage-img-div'>
          <img src='/assets/aeDilGuitar.png' alt='Ae Dil' className='home-image'/>
        </div>
    </div>
    <div className='contact'>
        <button className='contact-btn'><a href="#contact-section" className='contact-btn-link'>Contact Us</a></button>
    </div>
    <Instrument />
    <Video />
    </div>
  )
}

export default Home
