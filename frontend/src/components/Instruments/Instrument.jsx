import './Instrument.css';
import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Instrument() {
    const instrumentNames = [
      {
          name: 'Guitar',
          icon: 'assets/guitar.jpg',
      },
      {
          name: 'Piano',
          icon: 'assets/piano.jpg',
      },
      {
          name: 'Drum',
          icon: 'assets/drum.jpg',
      },
      {
          name: 'Vocal',
          icon: 'assets/mic.jpg',
      },
      {
          name: 'Octopad',
          icon: 'assets/octopad.jpg',
      },
      {
          name: 'Congo',
          icon: 'assets/congo.jpg',
      },
      {
          name: 'Dholak',
          icon: 'assets/dholak.jpg',
      }
  ]

  return (
    <section className='instrument-container'>
        <h1><span className='first'>C</span>OURSES</h1>
        <div className='instrument-box'>
            {
              instrumentNames.map((instrument, key) => (
                <div className='instrument-list' key={`${instrument.name} ${key}`}>
                  <img src={`${instrument.icon}`} className={`grid-item image ${instrument.name}`} alt={`${instrument.name} not working`}/>
                  <hr className='divider'/>
                  <div className={`grid-item instrument ${instrument.name}`}>{instrument.name}</div>
                </div>
              ))
            }
        </div>
    </section>
  )
}

export default Instrument
