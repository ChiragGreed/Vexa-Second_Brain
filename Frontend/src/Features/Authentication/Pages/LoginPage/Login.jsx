import { useState } from 'react'
import './Login.scss'
import useAuth from '../../Hooks/useAuth'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
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
    const { loginHandler } = useAuth();
    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        await loginHandler({ ...formData });
        navigate('/inbox');
    }

    return (
        <div className='LoginPage'>
            <form className='form' onSubmit={handleSubmit}>
                <h1 className='title'>Login</h1>

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
                <p>Don't have an Account?</p>
                <Link className="register_Navigate" to='/register'>Register</Link>
            </div>
        </div>
    )
}

export default Login
