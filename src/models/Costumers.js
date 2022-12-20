import mongoose, { mongo } from "mongoose";

const CostumersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    }
})

const Costumers = mongoose.model("Costumer", CostumersSchema);

export default Costumers