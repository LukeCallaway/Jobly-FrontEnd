import React, {useState, useContext} from 'react';
import {Navigate} from 'react-router-dom';
import { useFormik } from 'formik';

import UserContext from "./UserContext";


const Profile = ({ updateUserInfo }) => {
  const currUser = useContext(UserContext);
  if(!currUser.username) return <Navigate to='/' />

  const validate = (values) => {
    const errors = {};

    if(!values.firstName) errors.firstName = 'Required';
    if(!values.lastName) errors.lastName = 'Required';
    if(!values.email) errors.email = 'Required';

  }

  const formik = useFormik({
    initialValues: {
      firstName: currUser.firstName,
      lastName: currUser.lastName,
      email: currUser.email
    },
    validate,
    onSubmit: (values) => {
      updateUserInfo({...values});
    }
  });


  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="firstName" className='form-labels'>First Name</label>
      <br></br>
      <input
        className='form-input'
        id="firstName"
        type="text"
        name="firstName"
        placeholder={`First Name`}
        value={formik.values.firstName}
        onChange={formik.handleChange}
      />
      {formik.errors.firstName ? <div className='errors'>{formik.errors.firstName}</div> : null}
      <br></br>

      <label htmlFor="lastName" className='form-labels'>Last Name</label>
      <br></br>
      <input
        className='form-input'
        id="lastName"
        type="text"
        name="lastName"
        placeholder={`Last Name`}
        value={formik.values.lastName}
        onChange={formik.handleChange}
      />
      {formik.errors.lastName ? <div className='errors'>{formik.errors.lastName}</div> : null}
      <br></br>

      <label htmlFor="email" className='form-labels'>Email</label>
      <br></br>
      <input
        className='form-input'
        id="email"
        type="text"
        name="email"
        placeholder={`Email`}
        value={formik.values.email}
        onChange={formik.handleChange}
      />
      {formik.errors.email ? <div className='errors'>{formik.errors.email}</div> : null}
      <br></br>

      <button type='submit' className='form-btn'>Edit Profile</button>
    </form>
    
  )
}

export default Profile;