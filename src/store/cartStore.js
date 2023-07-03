import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {isCartShown: false, notification: null}

const cartSlice = createSlice({
    name: 'cartShown',
    initialState: initialCartState,
    reducers: {
        toggleShowCart (state) {
            state.isCartShown = !state.isCartShown
        },
        showNotification (state, action) {
            state.notification = { 
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message
            }
        }
    }
})


export const cartActions = cartSlice.actions

export default cartSlice.reducer