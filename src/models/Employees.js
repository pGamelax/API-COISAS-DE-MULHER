import mongoose, { mongo } from "mongoose";
import bcrypt from 'bcrypt';

const EmployeesSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    isAdmin: {
        type: String,
        default: "false"
    }

});

EmployeesSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const Employees = mongoose.model("Employees", EmployeesSchema);

export default Employees;


