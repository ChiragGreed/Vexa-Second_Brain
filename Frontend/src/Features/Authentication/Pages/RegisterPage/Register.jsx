import React, { useState } from 'react'
import './Register.scss'
import useAuth from '../../Hooks/useAuth'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    })

    // Two-way binding: update state on input change
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const { registerHandler } = useAuth();
    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        registerHandler({ ...formData });
        navigate('/inbox');
    }

    return (
        <div className='RegPage'>
            <form className='form' onSubmit={handleSubmit}>
                <h1 className='title'>Register</h1>

                <div className='field'>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className='input'
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Enter username"
                        required
                    />
                </div>

                <div className='field'>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className='input'
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                        required
                    />
                </div>

                <div className='field'>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className='input'
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                        required
                    />
                </div>

                <button type="submit" className='btn' onSubmit={handleSubmit}>Submit</button>
            </form>
            <div className='auth_Navigate'>
                <p>Already have an Account?</p>
                <Link className="register_Navigate" to='/login'>Login</Link>
            </div>
        </div>
    )
}

export default Register
