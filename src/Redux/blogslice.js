import { createSlice } from '@reduxjs/toolkit';

const blogslice = createSlice({
  name: "blog",
  initialState:
  {
    blogs: [],
    filterblog : []
  }
  ,
  reducers: {
    setBlogs:(state , action)=>{
      console.log("action", action.payload)
      state.blogs=action.payload,
      state.filterblog=action.payload
    },
    searchBlogs : (state,action)=>{
      if(action.payload === ""){
        state.filterblog = state.blogs;

      }
      else {
        state.filterblog = state.blogs.filter((bloger) =>bloger.cat.toLowerCase().includes(action.payload.toLowerCase()));
      }
    }
  }
});

export default blogslice.reducer;
export const {searchBlogs , setBlogs} = blogslice.actions;
