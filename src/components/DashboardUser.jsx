import React from 'react'
import AxiosService from '../utils/ApiService'
import useLogout from '../hooks/useLogout'
import { useEffect } from 'react'
import { useState } from 'react'
import { Form } from 'react-bootstrap'

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
        <div className='containeruser'>
        {
          diet.map((e,i)=>{
            return <Form key={e._id}>
            <Form.Group className="mb-3">
            <Form.Label className="hometxt">Breakfast</Form.Label> &nbsp; <i class="fa-solid fa-utensils"></i>
            <Form.Control type="txt" placeholder="Enter email" value={e.Breakfast} disabled />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="hometxt">Lunch</Form.Label> &nbsp; <i class="fa-solid fa-utensils"></i>
            <Form.Control type="txt" placeholder="Enter email" value={e.Lunch} disabled />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="hometxt">EveningSnack</Form.Label> &nbsp; <i class="fa-solid fa-mug-saucer"></i>
            <Form.Control type="txt" placeholder="Enter email" value={e.EveningSnack} disabled />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="hometxt">Dinner</Form.Label> &nbsp; <i class="fa-solid fa-utensils"></i>
            <Form.Control type="txt" placeholder="Enter email" value={e.Dinner} disabled />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="hometxt">Water</Form.Label>  &nbsp; <i class="fa-solid fa-bottle-water"></i>
            <Form.Control type="txt" placeholder="Enter email" value={e.Water} disabled />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="hometxt">Walking</Form.Label> &nbsp; <i class="fa-solid fa-person-walking"></i>
            <Form.Control type="txt" placeholder="Enter email" value={e.Walkin} disabled />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="hometxt">Workout</Form.Label> &nbsp; <i class="fa-solid fa-dumbbell"></i>
            <Form.Control type="txt" placeholder="Enter email" value={e.Workout} disabled />
          </Form.Group>
        </Form>
          })
       
    }
    </div>
        </div>
        </div>
    </>
  )
}

export default DashboardUser
