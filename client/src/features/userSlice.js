import { createSlice } from '@reduxjs/toolkit'
export const userSlice=createSlice({
    name:"user",
    initialState:{
        user:{
            name:localStorage.getItem("name"),
            email:localStorage.getItem("email"),
            role:localStorage.getItem("role"),
            token:localStorage.getItem("token"),
        }
        
    },
    reducers:{
        login:(state,action)=>{
            state.user=action.payload;
        },
        logout:(state)=>{
            state.user={
                name:localStorage.removeItem("name"),
                email:localStorage.removeItem("email"),
                role:localStorage.removeItem("role"),
                token:localStorage.removeItem("token"),

            };
        },
    },
});
export const {login,logout}=userSlice.actions;
export const selectUser=(state)=>state.user.user;
export default userSlice.reducer;