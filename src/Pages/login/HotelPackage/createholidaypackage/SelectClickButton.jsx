import { Box } from '@mui/material'
import { borderRadius } from '@mui/system'
import React, { useState } from 'react'


const SelectClickButton = () => {
    const [state, setState] = useState(false);

    const toggle = () => {
        setState(!state);
    } 
  return (
    <div>
      <button onClick={toggle} 
      className={'toggle_button ' 
      + (state ? 'toggle_close' : '')}>

</button>
    </div>
  )
}

export default SelectClickButton
