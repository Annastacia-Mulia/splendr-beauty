import React, { useState } from 'react';
import axios from 'axios';
import Validation from './clientValidate';
import { useNavigate } from 'react-router-dom';

function AddClient() {
  const [values, setValues] = useState({
    client_fname: '',
    client_lname: '',
    client_phone: '',
    client_email: '',
    client_pwd: '',
    confirm_pwd: ''
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
      !validationErrors.client_fname &&
      !validationErrors.client_lname &&
      !validationErrors.client_phone &&
      !validationErrors.client_email &&
      !validationErrors.client_pwd &&
      !validationErrors.confirm_pwd
    ) {
      axios.post('http://localhost:8085/addClient', values)
        .then(res => {
          console.log('Client added successfully:', res.data);
          window.alert('Client added successfully');
          navigate('/home'); // Navigate to home page on success
        })
        .catch(err => {
          console.error('Error adding client:', err.response.data);
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
            <h2>Sign Up</h2>
            <div className="mb-3">
              <label htmlFor="client_fname"><strong>Client First Name:</strong></label>
              <input type="text" id="client_fname" name="client_fname" placeholder='First Name' value={values.client_fname} onChange={handleInput} className='form-control' />
              {errors.client_fname && <span className='text-danger'>{errors.client_fname}</span>}
            </div>
            <div className="mb-3">
              <label htmlFor="client_lname"><strong>Client Last Name:</strong></label>
              <input type="text" id="client_lname" name="client_lname" placeholder='Last Name' value={values.client_lname} onChange={handleInput} className='form-control' />
              {errors.client_lname && <span className='text-danger'>{errors.client_lname}</span>}
            </div>
            <div className="mb-3">
              <label htmlFor="client_email"><strong>Client Email:</strong></label>
              <input type="email" id="client_email" name="client_email" placeholder='Email' value={values.client_email} onChange={handleInput} className='form-control' />
              {errors.client_email && <span className='text-danger'>{errors.client_email}</span>}
            </div>
            <div className="mb-3">
              <label htmlFor="client_phone"><strong>Client Phone:</strong></label>
              <input type="text" id="client_phone" name="client_phone" placeholder='Phone' value={values.client_phone} onChange={handleInput} className='form-control' />
              {errors.client_phone && <span className='text-danger'>{errors.client_phone}</span>}
            </div>
            <div className="mb-3">
              <label htmlFor="client_pwd"><strong>Set Password:</strong></label>
              <input type="password" id="client_pwd" name="client_pwd" placeholder='Password' value={values.client_pwd} onChange={handleInput} className='form-control' />
              {errors.client_pwd && <span className='text-danger'>{errors.client_pwd}</span>}
            </div>
            <div className="mb-3">
              <label htmlFor="confirm_pwd"><strong>Confirm Password:</strong></label>
              <input type="password" id="confirm_pwd" name="confirm_pwd" placeholder='Confirm Password' value={values.confirm_pwd} onChange={handleInput} className='form-control' />
              {errors.confirm_pwd && <span className='text-danger'>{errors.confirm_pwd}</span>}
            </div>
            <button type='submit' className='btn btn-success w-100' style = {{backgroundColor:'#1D2634'}} ><strong>Add Client</strong></button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddClient;
