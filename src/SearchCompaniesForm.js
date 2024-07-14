import React, {useState} from 'react'

const SearchCompaniesForm = ({ updateCompaniesList }) => {
  const INITIAL_STATE = {
    name: ''
  }
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCompaniesList(formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name" className='form-labels'>Company Name</label>
      <br></br>
      <input
        className='form-input'
        id="name"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <br></br>

      <button className='form-btn'>Search</button>
    </form>
    
  )

}

export default SearchCompaniesForm;