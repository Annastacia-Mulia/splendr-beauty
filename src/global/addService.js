import React, { useState } from 'react';
import axios from 'axios';
import Validation from './serviceValidation';
import { useNavigate } from 'react-router-dom';

function AddService() {
  const [values, setValues] = useState({
    name: '',
    cost: '',
    duration: '',
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = Validation(values);
    setErrors(validationErrors);

    // Check if there are no errors
    if (
      !validationErrors.name &&
      !validationErrors.cost &&
      !validationErrors.duration
    ) {
      axios
        .post('http://localhost:8085/addService', values)
        .then((res) => {
          console.log('Service added successfully:', res.data);
          window.alert('Service added successfully');
          navigate('/home'); // Navigate to home page on success
        })
        .catch((err) => {
          console.error('Error adding service:', err.response.data);
          // Handle error state or display error message to user
        });
    }
  };

  return (
<div className='d-flex justify-content-center align-items-center  vh-100' style = {{
      backgroundColor: '#1D2634'
    }}>      <div className='bg-white p-3 rounded w-25'>
        <div className='p-5'>
          <form onSubmit={handleSubmit}>
            <h2>Add Service</h2>
            <div className='mb-3'>
              <label htmlFor='name'>
                <strong>Service name:</strong>
              </label>
              <input
                type='text'
                id='name'
                name='name'
                placeholder='Name'
                value={values.name}
                onChange={handleInput}
                className='form-control'
              />
              {errors.name && (
                <span className='text-danger'>{errors.name}</span>
              )}
            </div>
            <div className='mb-3'>
              <label htmlFor='cost'>
                <strong>Cost of service:</strong>
              </label>
              <input
                type='text'
                id='cost'
                name='cost'
                placeholder='1000'
                value={values.cost}
                onChange={handleInput}
                className='form-control'
              />
              {errors.cost && (
                <span className='text-danger'>{errors.cost}</span>
              )}
            </div>
            <div className='mb-3'>
              <label htmlFor='duration'>
                <strong>Duration of service:</strong>
              </label>
              <input
                type='text'
                id='duration'
                name='duration'
                placeholder='Time'
                value={values.duration}
                onChange={handleInput}
                className='form-control'
              />
              {errors.duration && (
                <span className='text-danger'>{errors.duration}</span>
              )}
            </div>

            <button type='submit' className='btn btn-success w-100' style = {{backgroundColor:'#1D2634'}} >
              <strong>Add Service</strong>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddService;
