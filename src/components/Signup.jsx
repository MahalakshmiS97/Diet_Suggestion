import React,{useState}  from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import {Form} from 'react-bootstrap'
import signback from '../images/signback.jpg'
import AxiosService from '../utils/ApiService'
import {toast} from 'react-toastify'

function Signup() {
  let navigate = useNavigate()
    let [Name,setName] = useState("")
    let [Email,setEmail] = useState("")
    let [Password,setPassword] = useState("")
    let [Weight,setWeight] = useState("")
    let [Height,setHeight] = useState("")
    let [Gender,setGender] = useState("")
    let createUser = async()=>{
      try {
        let res = await AxiosService.post(`/user/sign`,{Name,Email,Password,Weight,Height,Gender})
        if(res.status===202){
          toast.success("User Created Successfully")
          navigate('/')
        }
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
  return <>
<div className="signupbackground">
<img src={signback} className="img2" alt="Sign background Image"/>
<div className='containersign'>
    <h1 style={{textAlign:"center"}}>Sign Up!</h1>
  <Form>
  <Form.Group className="mb-3">
        <Form.Label className="hometxt">Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Name" onChange={(e)=>setName(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className="hometxt">Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className="hometxt">Password</Form.Label>
        <Form.Control type="password" placeholder="Enter Password" onChange={(e)=>setPassword(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className="hometxt">Weight</Form.Label>
        <Form.Control type="Number" placeholder="Enter Wiight(Kg)" onChange={(e)=>setWeight(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className="hometxt">Height</Form.Label>
        <Form.Control type="Number" placeholder="Enter Height(cm)" onChange={(e)=>setHeight(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className="hometxt">Gender</Form.Label> &nbsp; &nbsp; &nbsp;
        <Form.Check name="gender" label="Male" inline type="radio" value="Male" onChange={(e)=>setGender(e.target.value)}/>
        <Form.Check name="gender" label="Female" inline type="radio" value="Female" onChange={(e)=>setGender(e.target.value)}/>
      </Form.Group>
      <center>
      <Button variant="dark" className="signbtn" onClick={()=>createUser()}>
        Submit
      </Button>
      </center>
    </Form>
  </div>
</div>

    </>
  
}

export default Signup
