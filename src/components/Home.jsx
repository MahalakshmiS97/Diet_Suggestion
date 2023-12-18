import React,{useState} from 'react'
import { Button } from 'react-bootstrap'
import {Form} from 'react-bootstrap'
import homeimg from '../images/home1.jpg'
import { useNavigate } from 'react-router-dom'
import AxiosService from '../utils/ApiService'
import {toast} from 'react-toastify'

function Home() {
  let [Email,setEmail] = useState("")
    let [Password,setPassword] = useState("")
    let navigate = useNavigate()
    let handleLogin = async()=>{
      try {
          let res = await AxiosService.post(`/user/login`,{
              Email,
              Password
          })
          if(res.status===200){
            toast.success(res.data.message)
            sessionStorage.setItem('token',res.data.token)
            sessionStorage.setItem('userData',JSON.stringify(res.data.userData))
            if(res.data.userData.Role === 'Admin')
           {
            navigate('/Dashboardadmin')
           }
            else
           {
            navigate('/DashboardUser')
            }
          }
      } 
      catch (error) {
        toast.error(error.response.data.message)
      }
  }
  return <>
      <div className='homeimg'>
        <img src={homeimg} className="img1" alt="Diet Image"/>
      </div>
      <div className='container homecontainer'>
    <h1 style={{textAlign:"center"}}>Login Here!</h1>
  <Form>
      <Form.Group className="mb-3">
        <Form.Label className="hometxt">Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="hometxt">Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
      </Form.Group>
      <center><div><Button variant="dark" className="logbtn" onClick={handleLogin}>
        Submit
      </Button>
      </div>
      <br></br>
      <div className="pointer forgot" onClick={()=>navigate('/ForgetPassword')}>Forgot Password</div>
      <br></br>
      <div className="pointer forgot" onClick={()=>navigate('/signup')}>New User? Signup</div>
      </center>
    </Form>
  </div>
    </>
}

export default Home
