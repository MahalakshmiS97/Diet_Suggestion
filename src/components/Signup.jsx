import React,{useState}  from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import {Form} from 'react-bootstrap'
import signback from '../images/signback.jpg'
import AxiosService from '../utils/ApiService'
import {toast} from 'react-toastify'
import { Formik } from 'formik';
import * as Yup from 'yup'

function Signup() {
  let navigate = useNavigate()

    const UserSchema = Yup.object().shape({
      Name:Yup.string().required('* Required'),
      Email:Yup.string().email('* Invalid Email').required('* Required'),
      Password:Yup.string().required('*Required').min(6,'* Password Should be atleast 3 characters'),
      Weight:Yup.string().required('* Required'),
      Height:Yup.string().required('* Required'),
      Gender:Yup.string().required('* Required')
    })

    let createUser = async(values)=>{
      try {
        let res = await AxiosService.post(`/user/sign`,values)
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
    <Formik
  initialValues={{
    Name:"",
    Email:"",
    Password:"",
    Weight:"",
    Height:"",
    Gender:""
  }}
  validationSchema={UserSchema}
          onSubmit={(values)=>{
            createUser(values)
            console.log(values)
          }}
  >
     {({ errors,touched,handleBlur,handleSubmit,handleChange})=>(
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
        <Form.Label className="hometxt">Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Name" name='Name' onBlur={handleBlur} onChange={handleChange}/>
        {errors.Name && touched.Name ? <div style={{color:"red"}}>{errors.Name}</div>:null}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className="hometxt">Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name='Email' onBlur={handleBlur} onChange={handleChange}/>
        {errors.Email && touched.Email ? <div style={{color:"red"}}>{errors.Email}</div>:null}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className="hometxt">Password</Form.Label>
        <Form.Control type="password" placeholder="Enter Password" name='Password' onBlur={handleBlur} onChange={handleChange}/>
        {errors.Password && touched.Password ? <div style={{color:"red"}}>{errors.Password}</div>:null}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className="hometxt">Weight</Form.Label>
        <Form.Control type="Number" placeholder="Enter Wiight(Kg)" name='Weight' onBlur={handleBlur} onChange={handleChange}/>
        {errors.Weight && touched.Weight ? <div style={{color:"red"}}>{errors.Weight}</div>:null}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className="hometxt">Height</Form.Label>
        <Form.Control type="Number" placeholder="Enter Height(cm)" name='Height' onBlur={handleBlur} onChange={handleChange}/>
        {errors.Height && touched.Height ? <div style={{color:"red"}}>{errors.Height}</div>:null}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className="hometxt">Gender</Form.Label> &nbsp; &nbsp; &nbsp;
        <Form.Check name="Gender" label="Male" inline type="radio" value="Male" onBlur={handleBlur} onChange={handleChange}/>
        <Form.Check name="Gender" label="Female" inline type="radio" value="Female" onBlur={handleBlur} onChange={handleChange}/>
        {errors.Gender && touched.Gender ? <div style={{color:"red"}}>{errors.Gender}</div>:null}
      </Form.Group>
      <center>
      <Button variant="dark" className="signbtn" type='submit'>
        Submit
      </Button>
      </center>
    </Form>
     )}
  
    </Formik>
  </div>
</div>

    </>
  
}

export default Signup
