import mongoose from "mongoose";

const relatedItemSchema = new mongoose.Schema({
    itemId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "item",
    },
    relatedItemId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "item",
    },
    score:{
        type:Number,
        required:true,
        enum:[0,1]
    }

})

const relatedItemModel = mongoose.model("relatedItem", relatedItemSchema);

export default relatedItemModel;