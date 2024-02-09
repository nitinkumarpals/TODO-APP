import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoDBUrl = process.env.MONGODB_URL;

mongoose.connect(mongoDBUrl);


const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
})

export const todo = mongoose.model("todos",todoSchema);