import React from 'react'
import AxiosService from '../utils/ApiService'
import useLogout from '../hooks/useLogout'
import { useEffect } from 'react'
import { useState } from 'react'

function DashboardAdmin() {
  let logout = useLogout()
  let [user,setUser] = useState([])
    let getUser = async()=>{
        try {
            let res = await AxiosService.get('/user/getuser')
            if(res.status===200){
              setUser(res.data.user)
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
        getUser()
    },[])
  return (
    <>
    <div className='Userdash'>
      <div className='container-fluid'>
      <table className='tab'>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Height(cm)</th>
          <th>Weight(kg)</th>
          <th>Gender</th>
          <th>BMI</th>
        </tr>
      </thead>
      <tbody>
        {
          user.map((e,i)=>{
            return <tr key={e._id}>
              <td>{i+1}</td>
              <td>{e.Name}</td>
              <td>{e.Email}</td>
              <td>{e.Height}</td>
              <td>{e.Weight}</td>
              <td>{e.Gender}</td>
              <td>{e.BMI}</td>
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
export default DashboardAdmin
