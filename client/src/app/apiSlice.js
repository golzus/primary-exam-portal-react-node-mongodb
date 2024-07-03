import { createApi ,fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {setToken}from '../features/auth/authSlice'
const baseQuery=fetchBaseQuery({
    baseUrl:'http://localhost:1000/',
    credentials:"include",
prepareHeaders:(headers,{getState})=>{
    const token=getState().auth.token
  //  if(token){
        headers.set("authorization",   `Bearer ${token}`)
   // }    console.log(token);

    return headers
}
})
const baseQueryWithReauth=async(args,api,extraOption)=>{
    let result=await baseQuery(args,api,extraOption)
    if(result?.error?.status===403){
        console.log(`sending refresh token`);
        const refreshResult=await baseQuery('api/auth/refresh',api,extraOption)
        if(refreshResult?.data){
            api.dispatch(setToken({...refreshResult.data}))
            result=await baseQuery(args,api,extraOption)
        }else{
            if(refreshResult?.error?.status===403){
                refreshResult.error.data.message="your login has expired"
            }
            return refreshResult
        }
    }
    return result
}






const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery:baseQueryWithReauth ,
    endpoints: () => ({}),
});

export default apiSlice;