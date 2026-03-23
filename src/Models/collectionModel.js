import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    }

})

const collectionModel = mongoose.model("collection", collectionSchema);

export default collectionModel;