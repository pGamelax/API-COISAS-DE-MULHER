import mongoose, { mongo } from "mongoose";
import bcrypt from 'bcrypt';

const EmployeeSchema = new mongoose.Schema({
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

EmployeeSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const Employee = mongoose.model("Employee", EmployeeSchema);

export default Employee;