import React, { createContext, useReducer } from 'react'
import { reducer } from './ContextReducer';

const initialState = {open:false};


export const openContext= createContext(initialState);

const ContextApiProvider = ({children}) => {

    const [state,dispatch] = useReducer(reducer,initialState)

  return (
   <openContext.Provider value={{open: state.open, dispatch }}>
    {children}
   </openContext.Provider>
  )
}

export default ContextApiProvider