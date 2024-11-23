import mongoose from "mongoose";


const weddingSchema = mongoose.Schema({
    location: String,
    budget: Number,
    theme: String,
    createdAt: { type: Date, default: Date.now },
})


const Wedding = mongoose.model("WeddingPlanner",weddingSchema)

export default Wedding;
