import React,{useState} from 'react'
import { Button } from 'react-bootstrap'
import {Form} from 'react-bootstrap'
import homeimg from '../images/home1.jpg'
import { useNavigate } from 'react-router-dom'
import AxiosService from '../utils/ApiService'
import {toast} from 'react-toastify'
import { Formik } from 'formik';
import * as Yup from 'yup'

function Home() {
    let navigate = useNavigate()

    const UserSchema = Yup.object().shape({
      Email:Yup.string().email('* Invalid Email').required('* Required'),
      Password:Yup.string().required('*Required')
    })

    let handleLogin = async(values)=>{
      try {
          let res = await AxiosService.post(`/user/login`,values)
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
    <Formik 
    initialValues={{
      Email:"",
      Password:""

    }}
    validationSchema={UserSchema}
    onSubmit={(values)=>{
      handleLogin(values)
      console.log(values)
    }}
    >
      {({ errors,touched,handleBlur,handleSubmit,handleChange})=>(
        <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label className="hometxt">Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name='Email' onBlur={handleBlur} onChange={handleChange}/>
        {errors.Email && touched.Email ? <div style={{color:"red"}}>{errors.Email}</div>:null}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="hometxt">Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name='Password' onBlur={handleBlur} onChange={handleChange}/>
        {errors.Password && touched.Password ? <div style={{color:"red"}}>{errors.Password}</div>:null}
      </Form.Group>
      <center><div><Button variant="dark" className="logbtn" type='submit'>
        Submit
      </Button>
      </div>
      <br></br>
      <div className="pointer forgot" onClick={()=>navigate('/ForgetPassword')}>Forgot Password</div>
      <br></br>
      <div className="pointer forgot" onClick={()=>navigate('/signup')}><i class="fa-solid fa-user-plus"></i>&nbsp;New User? Signup</div>
      </center>
    </Form>

      )}
  
    </Formik>
  </div>
    </>
}

export default Home
