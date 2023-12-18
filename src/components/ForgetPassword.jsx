import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import {Form} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import AxiosService from '../utils/ApiService'
import signback from '../images/signback.jpg'

function ForgetPassword() {
    let [Email,setEmail] = useState("")
    let navigate = useNavigate()
    let Forgot = async(e)=>{
      try {
        let res = await AxiosService.post("user/forget",{Email})
        if(res.status===200)
        toast.success("Email Sent")
      navigate('/')
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
  return <>
  <div className="signupbackground">
<img src={signback} className="img2" alt="Sign background Image"/>
 <div className='containersign'>
    <h1 style={{textAlign:"center"}}>Forget Password</h1>
  <Form>
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
      </Form.Group>
      <center><Button variant="dark" onClick={Forgot}>
        Submit
      </Button>
      </center>
    </Form>
  </div>
</div>
  </>
}

export default ForgetPassword
