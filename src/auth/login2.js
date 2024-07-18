import React, { useState } from 'react';
import Validation from './loginValidation';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [values, setValues] = useState({
        admin_email: '',
        admin_pwd: ''
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));

        console.log('Form values:', values); // Debugging log

        if (Object.keys(errors).length === 0 && errors.constructor === Object) {
            axios.post('http://localhost:8085/login', values)
                .then(res => {
                    console.log('Response from server:', res.data); // Debugging log
                    if (res.data === "Success") {
                        window.alert('Login was successful');

                        navigate('/home');
                    } else {
                        alert("Invalid Credentials");
                    }
                })
                .catch(error => {
                    console.error('Error logging in:', error);
                    if (error.response) {
                        // Server responded with a status code outside of 2xx
                        console.log(error.response.data);
                        console.log(error.response.status);
                        alert("Invalid Credentials or server error occurred.");
                    } else if (error.request) {
                        // Request was made but no response was received
                        console.log(error.request);
                        alert("No response from server. Please try again later.");
                    } else {
                        // Something happened in setting up the request that triggered an error
                        console.log('Error setting up request:', error.message);
                        alert("An error occurred while logging in.");
                    }
                });
        }
    }

    return (
        <div className='d-flex justify-content-center align-items-center  vh-100' style = {{
            backgroundColor: '#1D2634'
          }}>
            <div className='bg-white p-3 rounded w-25'>
                <form onSubmit={handleSubmit}>
                    <h2>Log In</h2>
                    <div className="mb-3">
                        <label htmlFor="admin_email"><strong>Email address</strong></label>
                        <input type="email" name="admin_email" placeholder='Enter Email' onChange={handleInput} value={values.admin_email} className='form-control rounded-0' />
                        {errors.admin_email && <span className='text-danger'>{errors.admin_email}</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="admin_pwd"><strong>Password</strong></label>
                        <input type="password" name="admin_pwd" placeholder='Enter Password' onChange={handleInput} value={values.admin_pwd} className='form-control rounded-0' />
                        {errors.admin_pwd && <span className='text-danger'>{errors.admin_pwd}</span>}
                        <p style={{ color: 'red', fontSize: '10px' }}>*Password must be longer than 6 characters</p>
                        <p style={{ color: 'red', fontSize: '10px' }}>*Password should not be your name, or a common word</p>
                    </div>
                    <button type='submit' className='btn btn-success w-100' style = {{backgroundColor:'#1D2634'}} ><strong>Log In</strong></button>
                </form>
            </div>
        </div>
    );
}

export default Login;
