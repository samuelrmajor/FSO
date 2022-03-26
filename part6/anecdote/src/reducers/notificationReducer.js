import { createSlice } from '@reduxjs/toolkit'

const initialState = {message: "TEST", style: {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }}


const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    showNotification(state, action) {

      const content = action.payload.content
      const type = action.payload.type
      console.log(action)
      let message
      if (type === "new"){
            message = "You created: '" +content+"'"
      }
      else {
            message ="you voted for: '"+content+"'"
      }
      return {message: message,
        style: {
            border: 'solid',
            padding: 10,
            borderWidth: 1
        }}
    },
    hideNotification(state, action) {
      return {message: "", 
        style: "none"}
    },
  }
})




export const { showNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer