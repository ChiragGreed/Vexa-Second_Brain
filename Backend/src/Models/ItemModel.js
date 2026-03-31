import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },

    url: {
        type: String,
        required: true,
    },

    content: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        default: function () {

            if (!this.content) return "";

            const words = this.content.split(" ");

            return words.slice(0, 30).join(" ") + "...";

        }
    },

    previewTitle: {
        type: String
    },

    previewDescription: {
        type: String
    },

    previewImage: {
        type: String,
    },


    tags: {
        type: [String],
        required: true,
    },

    embedding: {
        type: [Number],   // vector stored here
        default: [],
    },

    collectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "collection",
    },

},
    { timestamps: true }
)

const itemModel = mongoose.models.item || mongoose.model("item", itemSchema);


export default itemModel;