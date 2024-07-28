import React, { useEffect } from 'react'
import { useGetAllListWordsByClassAndByActiveMutation } from './listWord/view/ListWordApiSlice'
import useSchoolAndClass from '../../hooks/useSchoolAndClass'
import CurrentSchoolAndClass from '../companies/CurrentSchoolAndClass/CurrentSchoolAndClass'
import { Link } from 'react-router-dom'

const ListWordToDo = () => {
    const [getAllListWordsByClassAndByActive,{data,error,isLoading}]=useGetAllListWordsByClassAndByActiveMutation()
    const {chosenClass}=useSchoolAndClass()
    useEffect(()=>{
        if(chosenClass)
        getAllListWordsByClassAndByActive({active:false,chosenClass})
    },[chosenClass])
    if(!chosenClass)return <CurrentSchoolAndClass/>

    if(error)return <h1>error</h1>
    if(isLoading||!data)return <h1>Loading...</h1>
    console.log(data.data[0]._id,"data");
  return (<div>
    <h1>כמות הבחנים שעליך להפוך ל-ACTIVE:{data.data.length}</h1>

    <button>
      <Link
        to={`/dash/actions/${data.data[0]._id}`}
        className="users-list-button users-list-view"
      >
        {data.data[0].title}
      </Link>
    </button>
    </div>
  )
}

export default ListWordToDo