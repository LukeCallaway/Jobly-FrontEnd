import React, {useState, useContext} from 'react'
import {Navigate} from 'react-router-dom'
import { useFormik } from 'formik'

import UserContext from "./UserContext";


const Signup = ({ doSignUp }) => {
  const validate = (values) => {
    const errors = {};
    if(!values.username) errors.username = 'Required';
    if(values.username.length > 30) errors.username = 'Username must be less than 30 characters';

    if(!values.password) errors.password = 'Required';
    if(values.password.length < 8) errors.password = 'Password 8 characters minimum';
    if(values.password.length > 20) errors.password = 'Password 20 characters max';

    if(values.firstName.length > 30) errors.firstName = 'First Name 30 characters max';

    if(values.lastName.length > 30) errors.lastName = 'Last Name 30 characters max';

    if(!values.email) errors.email = 'Required';
    if(values.email.length > 60) errors.email = 'Email 60 characters max';

    return errors;
  }

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: ''
    },
    validate,
    onSubmit: (values) => {
      doSignUp({...values})
    }
  })

  const currUser = useContext(UserContext)
  if(currUser.username) return <Navigate to='/' />

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="username" className='form-labels'>Username</label>
      <br></br>
      <input
        className='form-input'
        id="username"
        type="text"
        name="username"
        value={formik.values.username}
        onChange={formik.handleChange}
      />
      <br></br>
      {formik.values.username !== '' && formik.errors.username ? <div className='errors'>{formik.errors.username}</div> : null}

      <label htmlFor="password" className='form-labels'>Password</label>
      <br></br>
      <input
        className='form-input'
        id="password"
        type="password"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
      />
      <br></br>
      {formik.errors.password ? <div className='errors'>{formik.errors.password}</div> : null}

      <label htmlFor="firstName" className='form-labels'>First Name</label>
      <br></br>
      <input
        className='form-input'      
        id="firstName"
        type="text"
        name="firstName"
        value={formik.values.firstName}
        onChange={formik.handleChange}
      />
      <br></br>
      {formik.values.firstName !== '' && formik.errors.firstName ? <div className='errors'>{formik.errors.firstName}</div> : null}

      <label htmlFor="lastName" className='form-labels'>Last Name</label>
      <br></br>
      <input
        className='form-input'
        id="lastName"
        type="text"
        name="lastName"
        value={formik.values.lastName}
        onChange={formik.handleChange}
      />
      <br></br>
      {formik.values.lastName !== '' && formik.errors.lastName ? <div className='errors'>{formik.errors.lastName}</div> : null}

      <label htmlFor="email" className='form-labels'>Email</label>
      <br></br>
      <input
        className='form-input'
        id="email"
        type="text"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
      />
      <br></br>
      {formik.values.email !== '' && formik.errors.email ? <div className='errors'>{formik.errors.email}</div> : null}


      <button type='submit' className='form-btn'>Sign Up</button>
    </form>
    
  )

}

export default Signup;