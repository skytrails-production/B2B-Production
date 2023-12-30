import  SightseeingStepper from '../../Components/SightseeingStepper';
import React from 'react'
import SightseeingForm from './sightseeingform/SightseeingForm';

const Sightseeing = () => {
  return (
    <div  className="flightContainer">
      <SightseeingStepper/>
      <SightseeingForm/>
    </div>
  )
}

export default Sightseeing
