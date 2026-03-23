import app from './src/app.js';
import connectDB from './src/config/database.js';
import dotenv from 'dotenv';
dotenv.config();

connectDB();

app.listen(9000, () => {
  console.log('Server is running on port 9000');
});