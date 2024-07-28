import React, { useEffect } from 'react'
import { useGetAlltestsByListWordIdMutation } from './listWord/view/ListWordApiSlice'
import { useParams } from 'react-router-dom'

const ListMarkStudents = () => {
    const [getAlltestsByListWordId,{error,data,isLoading}]=useGetAlltestsByListWordIdMutation()
    const {_id}=useParams()
    useEffect(()=>{
        getAlltestsByListWordId({_id})
    },[])
    if(isLoading)return <h1>Loading...</h1>
    if(error||!data)return <h1>error</h1>
    console.log(data);
      return (
    <div>ListMarkStudents</div>
  )
}

export default ListMarkStudents