import express from 'express';
import connectDatabase from './database/database.js';
import dotenv from 'dotenv';


import employeeRoute from './routes/employee.route.js';
import authRoute from './routes/auth.route.js'


const port = process.env.PORT || 3000;
const app = express();

dotenv.config();

connectDatabase();

app.use(express.json())
app.use('/employee', employeeRoute)
app.use('/auth', authRoute)

app.listen(port, () => {
    console.log(`Aplication running on port ${port}`);
});