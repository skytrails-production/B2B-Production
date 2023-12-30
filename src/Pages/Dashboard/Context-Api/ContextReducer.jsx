export const reducer = (state, action) => {
  switch (action.type) {
     case "toggle":{
        return{
            open : !state.open 
        }
    }
    default : 
    return state

  }
};
