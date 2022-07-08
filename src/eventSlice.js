import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  events: [],
}

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    addEvent: (state, e) => {
      state.events.push(e)
    },
    removeEvent: (state, e) => {
      state.events.pop(e);
    },
  },
})

// Action creators are generated for each case reducer function
export const { addEvent, removeEvent } = eventSlice.actions

export default eventSlice.reducer