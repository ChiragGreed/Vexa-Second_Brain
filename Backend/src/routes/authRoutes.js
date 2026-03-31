import express from 'express';
import { register } from '../controllers/authControllers.js';
import { login } from '../controllers/authControllers.js';

const authRoutes = express.Router();

authRoutes.post('/register', register);
authRoutes.post('/login', login);


export default authRoutes;
