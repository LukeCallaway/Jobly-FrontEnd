import React, {useState, useContext} from 'react'
import {Navigate} from 'react-router-dom'

import UserContext from "./UserContext";


const Signup = ({ doSignUp }) => {
  const INITIAL_STATE = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: ''
  }
  const [formData, setFormData] = useState(INITIAL_STATE);

  const currUser = useContext(UserContext)
  if(currUser.username) return <Navigate to='/' />

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    doSignUp(formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username" className='form-labels'>Username</label>
      <br></br>
      <input
        className='form-input'
        id="username"
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
      <br></br>

      <label htmlFor="password" className='form-labels'>Password</label>
      <br></br>
      <input
        className='form-input'
        id="password"
        type="text"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <br></br>

      <label htmlFor="firstName" className='form-labels'>First Name</label>
      <br></br>
      <input
        className='form-input'      
        id="firstName"
        type="text"
        name="firstName"
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
        value={formData.email}
        onChange={handleChange}
      />
      <br></br>


      <button className='form-btn'>Sign Up</button>
    </form>
    
  )

}

export default Signup;