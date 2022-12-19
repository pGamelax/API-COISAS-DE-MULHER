import Costumer from "../models/Costumers.js";
import jwt from "jsonwebtoken";

const loginService = (email) => {
    return Costumer.findOne({ email: email }).select("+password");
}

const generateToken = (id) => {
    return jwt.sign({ id: id }, process.env.SECRET_JWT, { expiresIn: 86400 });
}

export default { loginService, generateToken }