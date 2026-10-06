 
 import { createSlice } from '@reduxjs/toolkit'

 
const userExist = JSON.parse(localStorage.getItem("user"))


 const initialState = {
 
      user : userExist || null ,
      categories : []
 }
 
 const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
    setUser : (state , action)=>{
      return {
        ...state ,
        user: action.payload
      }
    },
    logOutUser :(state , action) => {
      return {
        ...state , 
        user : null
      }
    },
    setAllCategories : (state , action) => {
      return {
        ...state , 
       categories : action.payload
      }
    }, 
    updateCredits: (state, action) => {
      if (state.user) {
        state.user.credits = action.payload;
      }
    }
  
   }
 });
 
 export const {setUser , logOutUser , setAllCategories  , updateCredits} = authSlice.actions
 
 export default authSlice.reducer
