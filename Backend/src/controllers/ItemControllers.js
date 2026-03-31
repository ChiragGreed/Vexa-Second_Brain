import itemModel from "../models/itemModel.js";
import { createEmbedding } from "../services/embeddingService.js"
import { generateTags } from "../services/tagsService.js";
import { RelatedItemService } from "../services/relatedItemsService.js"
import { semanticSearch } from "../services/semanticSearchService.js"
import { createCollectionIfNotExists, findCollectionByName } from "../services/collectionService.js";
import collectionModel from "../Models/collectionModel.js";
import { getResurfacedItems } from "../services/resurfaceService.js"
import { getLinkPreview } from "../utils/preview.util.js";



export const saveItem = async (req, res) => {
    try {
        const { content, url, title, existingCollection, newCollection } = req.body;

        if (existingCollection && newCollection)
            return res.status(400).json({
                success: false,
                error: "Use either existingCollection OR newCollection"
            });

        let collectionId = null;

        if (newCollection) {
            const col = await createCollectionIfNotExists(newCollection.trim());

            collectionId = col._id;
        }

        if (existingCollection) {
            const col = await findCollectionByName(existingCollection.trim());

            if (!col) return res.status(400).json({ success: false, error: "Collection does not exist" });

            collectionId = col._id;
        }

        const tags = await generateTags(content);
        const embedding = await createEmbedding(content);
        const preview = await getLinkPreview(url);


        const item = await itemModel.create({
            title: title || preview.previewTitle,
            summary: preview.previewDescription,
            previewImage: preview.previewImage,
            url,
            content,
            tags,
            embedding,
            collectionId,
        });

        if (collectionId) await collectionModel.findByIdAndUpdate(collectionId, { $inc: { itemCount: 1 } });

        res.status(200).json({ success: true, message: "Item saved", item });

    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

export const getItems = async (req, res) => {
    const items = await itemModel.find().sort({ createdAt: -1 });

    if (!items) return res.status(404).json({
        message: "No items found",
        success: false,
        error: "No items found in database"
    })

    res.status(200).json({
        message: "Items fetched for user",
        success: true,
        items
    })
}

export const getSingleItem = async (req, res) => {

    try {
        const { itemId } = req.params;

        if (!itemId) return res.status(400).json({
            message: "Item id missing in params",
            success: false,
            err: "Missing itemId"
        })
        console.log(itemId);

        const item = await itemModel.findOne({ _id: itemId });

        if (!item) return res.status(404).json({
            message: "No item found",
            success: false,
            error: "No item found with given Item Id"
        })

        res.status(200).json({
            message: "Item fetched for user",
            success: true,
            item
        })
    }
    catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}

export const getRelatedItems = async (req, res) => {
    try {
        const { itemId } = req.params

        if (!itemId) return res.status(400).json({
            message: "Item id missing in params",
            success: false,
            err: "Missing itemId"
        })

        const related = await RelatedItemService(itemId)

        res.json({
            success: true,
            related
        })
    }
    catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}

export const semanticSearchItems = async (req, res) => {

    try {

        const { query } = req.query

        if (!query) {

            return res.status(400).json({
                error: "Query is required"
            })

        }

        const results = await semanticSearch(query)

        res.json({

            total: results.length,

            items: results

        })

    }
    catch (err) {

        console.error(err, "HELO");

        res.status(500).json({
            // error: err.message
            message: "HEHE"
        })

    }

}


export const resurfaceItems = async (req, res) => {

    try {

        const items = await getResurfacedItems();

        res.status(200).json({
            message: "Fetched resurfacing data",
            success: true,
            items
        })

    }
    catch (err) {
        console.log(err);

        res.status(500).json({

            error: "Failed to resurface items"

        })

    }

}



