import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./cartStore";
import cartItemsReducer from './cart-slice';



const store = configureStore({
    reducer: {cartShown: cartReducer, cartItems: cartItemsReducer}
})

export default store