import mongoose, { mongo } from "mongoose";
import bcrypt from 'bcrypt';

const CostumersSchema = new mongoose.Schema({
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

});

CostumersSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const Costumers = mongoose.model("Costumers", CostumersSchema);

export default Costumers;