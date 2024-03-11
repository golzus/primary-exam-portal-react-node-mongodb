import {createSlice} from "@reduxjs/toolkit"

const authSlice=createSlice({
    name:"auth",
    initialState:{token:null},
    reducers:{
        setToken:(state,action)=>{
            const {acssesToken}=action.payload
            state.token=acssesToken
        },
        logout:(state,action)=>{
state.token=null
        }
    }
})
export default authSlice.reducer
export const {setToken,logout}=authSlice.actions
export const selectToken=(state)=>state.auth.token