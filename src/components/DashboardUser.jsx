import React from 'react'
import AxiosService from '../utils/ApiService'
import useLogout from '../hooks/useLogout'
import { useEffect } from 'react'
import { useState } from 'react'

function DashboardUser() {
    let logout = useLogout()
  let [diet,setDiet] = useState([])
  let getDiet = async()=>{
    try {
        let res = await AxiosService.get('/diet/getdiet')
        if(res.status===200){
          setDiet(res.data.diet)
        }
    } 
    catch (error) {
        toast.error(error.response.data.message)
        if(error.response.status===401){
            logout()
        }
    }
}
useEffect(()=>{
    getDiet()
},[])
  return (
    <>
    <div className='Userdash'>
      <div className='container-fluid'>
        <div className='dietchart'><h1 style={{textAlign:"center"}}>Follow below diet for your health!!</h1></div>
      <table className=' tab'>
      <thead>
        <tr>
          <th>Breakfast</th>
          <th>Lunch</th>
          <th>Evening Snack</th>
          <th>Lunch</th>
          <th>Water</th>
          <th>Walking</th>
          <th>Workout</th>
        </tr>
      </thead>
      <tbody>
        {
          diet.map((e,i)=>{
            return <tr key={e._id}>
              <td>{e.Breakfast}</td>
              <td>{e.Lunch}</td>
              <td>{e.EveningSnack}</td>
              <td>{e.Dinner}</td>
              <td>{e.Water}</td>
              <td>{e.Walking}</td>
              <td>{e.Workout}</td>
            </tr>
          })
        }
      </tbody>
        </table>
        
        </div>
        </div>
    </>
  )
}

export default DashboardUser
