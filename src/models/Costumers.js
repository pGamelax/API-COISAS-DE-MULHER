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

const Costumers = mongoose.model("Costumers", CostumersSchema);

export default Costumers