import React from 'react'
import TransferStepper from '../../Components/TransferStepper';
import TransferForm from './transferForm/TransferForm';

const Transfer = () => {
  return (
    <div className='flightContainer'>
      <TransferStepper/>
      <TransferForm/>
    </div>
  )
}

export default Transfer
