import Costumers from "../models/Costumers.js"

const createService = (body) => {
    return Costumers.create(body)
}

const findAllService = () => {
    return Costumers.find();
}

const findByIdService = (id) => {
    return Costumers.findById(id)
}

const updateService = (id, name, email, password) => {
    return Costumers.findOneAndUpdate({ _id: id }, { name, email, password });
}

const deleteService = (id) => {
    return Costumers.findOneAndDelete(id)
}
export default { createService, findAllService, findByIdService, updateService, deleteService }