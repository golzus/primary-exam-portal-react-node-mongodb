// import {createSlice} from "@reduxjs/toolkit"

// const authSlice=createSlice({
//     name:"auth",
//     initialState:{token:null},
//     reducers:{
//         setToken:(state,action)=>{
//              const acssesToken=action.payload.acssesToken
//             // const acssesToken= action.payload.accessToken
//             state.token=acssesToken
//         },
//         logout:(state,action)=>{
// // state.token=null
//  state.action=null
//         }
//     }
// })
// export default authSlice.reducer
// export const {setToken,logout}=authSlice.actions
// export const selectToken=(state)=>state.auth.token

import { createSlice } from "@reduxjs/toolkit"
const authSlice = createSlice({
    name: "auth",
    initialState: { token: null },
    reducers: {
        setToken: (state, action) => {
            const accessToken= action.payload.accessToken
            state.token = accessToken
        },
        logout: (state, action) => {
            state.action = null
        }
    }
})

export default authSlice.reducer
export const { setToken, logout } = authSlice.actions
export  const selectToken = (state)=>state.auth.token