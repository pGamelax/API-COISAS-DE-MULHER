import express from 'express';
import connectDatabase from './database/database.js';
import dotenv from 'dotenv';


import employeeRoute from './routes/employee.route.js';
import authRoute from './routes/auth.route.js';
import costumersRoute from './routes/costumers.route.js';
import scheduleRoute from './routes/schedules.route.js';


const port = process.env.PORT || 3000;
const app = express();

dotenv.config();

connectDatabase();

app.use(express.json())
app.use('/employeers', employeeRoute)
app.use('/auth', authRoute)
app.use('/costumers', costumersRoute)
app.use('/schedules', scheduleRoute)

app.listen(port, () => {
    console.log(`Aplication running on port ${port}`);
});