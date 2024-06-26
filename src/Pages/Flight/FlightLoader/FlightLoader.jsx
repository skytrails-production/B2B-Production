import React from 'react'
import flightLoading from '../../../Images/loading/flightLoading.gif'
import './FlightLoading.css'

const FlightLoader = () => {
    return (
        <div className='flightLoading'>
            <img src={flightLoading} alt="" />
            
        </div>
    )
}

export default FlightLoader
