import Employee from "../models/Employees.js"

const createService = (body) => {
    return Employee.create(body)
}

const findAllService = () => {
    return Employee.find();
}

const findByIdService = (id) => {
    return Employee.findById(id)
}

const updateService = (id, name, email, password) => {
    return Employee.findOneAndUpdate({ _id: id }, { name, email, password });
}

const deleteService = (id) => {
    return Employee.findOneAndDelete({_id: id})
}
export default { createService, findAllService, findByIdService, updateService, deleteService }