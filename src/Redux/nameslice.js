import { createSlice } from "@reduxjs/toolkit";
import reducer from "./cartSlice";


const nameSlice = createSlice({
    name:"name",
    initialState:{
            u_name:""
    },
    reducers:{
        setUser:(state,action)=>{
            u_name = action.payload
        }
    }
})


export default nameSlice.reducer;
export const {setUser} = nameSlice.actions;
