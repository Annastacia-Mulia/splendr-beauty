import React, { useState } from 'react';
import axios from 'axios';
import Validation from './businessValidate';
import { useNavigate } from 'react-router-dom';

function AddBusiness() {
  const [values, setValues] = useState({
    business_name: '',
    address: '',
    phone: '',
    email: '',
    service: '',
    description: ''
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = Validation(values);
    setErrors(validationErrors);

    // Check if there are no errors
    if (
      !validationErrors.business_name &&
      !validationErrors.address &&
      !validationErrors.phone &&
      !validationErrors.email &&
      !validationErrors.service &&
      !validationErrors.description
    ) {
      axios.post('http://localhost:8085/addBusiness', values)
        .then(res => {
          console.log('Business added successfully:', res.data);
          window.alert('Business added successfully');
          navigate('/home'); // Navigate to home page on alert close
        })
        .catch(err => {
          console.error('Error adding business:', err.response.data);
          // Handle error state or display error message to user
        });
    }
  }

  return (
    <div className='d-flex justify-content-center align-items-center  vh-100' style = {{
      backgroundColor: '#1D2634'
    }}>
      <div className='bg-white p-3 rounded w-25'>
        <div className='p-5'>
          <form onSubmit={handleSubmit}>
            <h2>Add business</h2>
            <div className="mb-3">
              <label htmlFor="business_name"><strong>Business Name:</strong></label>
              <input type="text" id="business_name" name="business_name" placeholder='business name' value={values.business_name} onChange={handleInput} className='form-control' />
              {errors.business_name && <span className='text-danger'>{errors.business_name}</span>}
            </div>
            <div className="mb-3">
              <label htmlFor="address"><strong>Address:</strong></label>
              <input type="text" id="address" name="address" placeholder='address' value={values.address} onChange={handleInput} className='form-control' />
              {errors.address && <span className='text-danger'>{errors.address}</span>}
            </div>
            <div className="mb-3">
              <label htmlFor="email"><strong>Email:</strong></label>
              <input type="email" id="email" name="email" placeholder='Email' value={values.email} onChange={handleInput} className='form-control' />
              {errors.email && <span className='text-danger'>{errors.email}</span>}
            </div>
            <div className="mb-3">
              <label htmlFor="phone"><strong> Phone:</strong></label>
              <input type="text" id="phone" name="phone" placeholder='Phone' value={values.phone} onChange={handleInput} className='form-control' />
              {errors.phone && <span className='text-danger'>{errors.phone}</span>}
            </div>
            <div className="mb-3">
              <label htmlFor="service"><strong>Services offered:</strong></label>
              <input type="text" id="service" name="service" placeholder='services offered' value={values.service} onChange={handleInput} className='form-control' />
              {errors.service && <span className='text-danger'>{errors.service}</span>}
            </div>
            <div className="mb-3">
              <label htmlFor="description"><strong>Description:</strong></label>
              <input type="text" id="description" name="description" placeholder='description' value={values.description} onChange={handleInput} className='form-control' />
              {errors.description && <span className='text-danger'>{errors.description}</span>}
            </div>
            <button type='submit' className='btn btn-success w-100' style = {{backgroundColor:'#1D2634'}} ><strong>Add Business</strong></button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddBusiness;
