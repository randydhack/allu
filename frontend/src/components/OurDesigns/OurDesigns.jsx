import React from 'react'

// CSS
import '../utils/DefaultStyles.scss'
import './OurDesigns.scss'

// DATA
import { fakeData } from './fakedata'

function OurDesigns() {
  return (
    <div className='container'>
        <div className='design__banner__container'>
            <div className='design__banner'>
                <div className='design__contents'>
                    <h1>Our Designs</h1>
                    <div>--</div>
                    <p>Choose from one of our custom designs</p>
                </div>
            </div>
        </div>

        <div className='design__filtering__bar'>

        </div>
        <div className='design__selections fake'>
            {fakeData.map(el => {
                return (
                    <div >
                        <img src={el.image} alt="image" className='fakeimage'/>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default OurDesigns
