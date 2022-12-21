import Schedule from '../models/Schedule.js'

const createService = (body) => {
    return Schedule.create(body)
}

const findAllService = (offset, limit) => {
    return Schedule.find().skip(offset).limit(limit).populate("employee").populate("costumer")
}
const countSchedules = () => {
    return Schedule.countDocuments();
}
export default { createService, findAllService, countSchedules }