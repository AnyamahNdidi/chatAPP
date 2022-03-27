import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   userId:[]
}

const reduxState = createSlice({
  name: "message",
  initialState,
  reducers: {
      getUserInfo:(state, {payload})=>{
            state.userId = payload
      }
  }
});

export const {
  getUserInfo

} = reduxState.actions
export default reduxState.reducer