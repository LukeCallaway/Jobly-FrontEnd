import React, {useState, useContext} from 'react'
import {Navigate} from 'react-router-dom'

import UserContext from "./UserContext";


const Profile = ({ updateUserInfo }) => {
  const currUser = useContext(UserContext)

  const INITIAL_STATE = {
    firstName: currUser.firstName,
    lastName: currUser.lastName,
    email: currUser.email
  }
  const [formData, setFormData] = useState(INITIAL_STATE);

  if(!currUser.username) return <Navigate to='/' />

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserInfo(formData);


  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="firstName" className='form-labels'>First Name</label>
      <br></br>
      <input
        className='form-input'
        id="firstName"
        type="text"
        name="firstName"
        placeholder={`First Name`}
        value={formData.firstName}
        onChange={handleChange}
      />
      <br></br>

      <label htmlFor="lastName" className='form-labels'>Last Name</label>
      <br></br>
      <input
        className='form-input'
        id="lastName"
        type="text"
        name="lastName"
        placeholder={`Last Name`}
        value={formData.lastName}
        onChange={handleChange}
      />
      <br></br>

      <label htmlFor="email" className='form-labels'>Email</label>
      <br></br>
      <input
        className='form-input'
        id="email"
        type="text"
        name="email"
        placeholder={`Email`}
        value={formData.email}
        onChange={handleChange}
      />
      <br></br>

      <button className='form-btn'>Edit Profile</button>
    </form>
    
  )

}

export default Profile;