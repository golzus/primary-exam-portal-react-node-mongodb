// import apiSlice from "../../app/apiSlice";
// import { logout, setToken } from "./authSlice";
// const authApiSlice=apiSlice.injectEndpoints({
//     endpoints:(build)=>({
//         login:build.mutation({
//             query:(userData)=>({
//                 url:"/api/auth/login",
//                 method:"POST",
//                 body:userData
//             }),
//             async onQueryStarted(arg,{dispatch,queryFulfilled}){
//                 try{
//                     const {data}=await queryFulfilled
//                     console.log(data,"data from token");
//                     if(data.acssesToken){

//                     dispatch(setToken({acssesToken: data.acssesToken}))
//                     }
//                 }catch(err){
//                     console.log(err);
//                 }
//             }
//         }),
//         sendLogout:build.mutation({
//             query:()=>({
//                 url:"/api/auth/logout",
//                 method:"POST",
//             }),
//             async onQueryStarted(arg,{dispatch,queryFulfilled}){
//                 try{
//                     // const {data}=
//                     await queryFulfilled
//                     // console.log(data);
//                     dispatch(logout())
//                     setTimeout(()=>{
//                         dispatch(apiSlice.util.resetApiState())
//                     },1000)
//                 }catch(err){
//                     console.log(err);
//                 }
//             }
//         }),
//         refresh:build.mutation({
//             query:()=>({
//                 url:"/api/auth/refresh",
//                 method:"GET",
//             }),
//             async onQueryStarted(arg, { dispatch, queryFulfilled }) {
//                 try {
//                     const { data } = await queryFulfilled
//                     // console.log(data.accessToken);
//                     if (data.accessToken)
//                         dispatch(setToken({acssesToken: data.acssesToken}))
//                 } catch (err) {
//                     console.log(err);
//                 }
//             }
//         })
//     })
// })
// export const  {useLoginMutation,useRefreshMutation, useSendLogoutMutation}=authApiSlice

import apiSlice from "../../app/apiSlice"
import { logout, setToken } from "../auth/authSlice"
const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation({
            query: (userData) => ({
                url: "/api/auth/login",
                method: "POST",
                body: userData
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    // console.log(data.accessToken);
                    if (data.accessToken)
                        dispatch(setToken({accessToken: data.accessToken}))
                } catch (err) {
                    console.log(err);
                }
            }
        }),
        sendLoguot: build.mutation({
            query: () => ({
                url: "/api/auth/logout",
                method: "POST"
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                    dispatch(logout())
                    setTimeout(() => {
                        dispatch(apiSlice.util.resetApiState())
                    }, 1000)
                } catch (err) {
                    console.log(err);
                }
            }
        }),
        refresh: build.mutation({
            query: () => ({
                url: "/api/auth/refresh",
                method: "GET"
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    // console.log(data.accessToken);
                    if (data.accessToken)
                        dispatch(setToken({accessToken: data.accessToken}))
                } catch (err) {
                    console.log(err);
                }
            }
        })
    })
})

export const { useLoginMutation, useSendLoguotMutation, useRefreshMutation } = authApiSlice