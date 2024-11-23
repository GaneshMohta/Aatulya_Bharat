import { configureStore } from '@reduxjs/toolkit';
import blogslice from './blogslice';
import cartSlice from './cartSlice';
import productSlice from './productSlice';
import nameSlice from './nameslice'



const store = configureStore({
  reducer: {
    blog: blogslice,
    cart: cartSlice,
    product : productSlice,
    name : nameSlice,
  }
});

export default store;
