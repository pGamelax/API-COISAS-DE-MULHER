import Costumer from "../models/Employees.js";
import jwt from "jsonwebtoken";

const loginService = (email) => {
    return Costumer.findOne({ email: email }).select("+password");
}

const generateToken = (id, isAdmin) => {
    return jwt.sign({ id: id, isAdmin: isAdmin }, process.env.SECRET_JWT, { expiresIn: 86400 });
}

export default { loginService, generateToken }