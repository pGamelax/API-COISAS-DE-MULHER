import express from 'express';
import connectDatabase from './database/database.js';
import dotenv from 'dotenv';


import costumersRoute from './routes/customers.route.js';


const port = process.env.PORT || 3000;
const app = express();

dotenv.config();

connectDatabase();

app.use(express.json())
app.use('/costumer', costumersRoute)

app.listen(port, () => {
    console.log(`Aplication running on port ${port}`);
});