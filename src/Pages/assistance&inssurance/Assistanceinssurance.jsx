import React from 'react'
import Commingsoon from '../../Components/Commingsoon'
import InssuranceStepper from '../../Components/InssuranceStepper';
import InsuranceTab from './inssuranceform/InsuranceTab';


const Assistanceinssurance = () => {
  return (
    <div className='flightContainer' >

      <InssuranceStepper/>
      <InsuranceTab/>
    </div>
  )
}

export default Assistanceinssurance
