// Models import
import itemModel from "../Models/itemModel.js";
import userModel from "../Models/userModel.js";
import collectionModel from "../Models/collectionModel.js";
import { createCollectionService, findCollectionByName } from "../services/collectionService.js";

import { createEmbedding } from "../services/embeddingService.js";
import { generateTags } from "../services/tagsService.js";
import { RelatedItemService } from "../services/relatedItemsService.js";
import { semanticSearch } from "../services/semanticSearchService.js";
import { getResurfacedItems } from "../services/resurfaceService.js";
import { getLinkPreview } from "../utils/preview.util.js";


export const saveItem = async (req, res) => {
    try {
        const { content, url, title, summary, existingCollection, newCollection } = req.body;

        const { userid } = req.user;


        const user = await userModel.findById(userid);

        if (!user) return res.status(400).json({
            message: "User not found",
            success: false,
            err: "User not found"
        })


        if (existingCollection && newCollection)
            return res.status(400).json({
                success: false,
                error: "Use either existingCollection OR newCollection"
            });

        let collectionId = null;

        if (newCollection) {
            const col = await createCollectionService(newCollection, userid);

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
            summary: summary,
            previewImage: preview.previewImage,
            url,
            content,
            tags,
            embedding,
            collectionId,
            userId: userid
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

    const { userid } = req.user;

    const items = await itemModel.find({ userId: userid }).sort({ createdAt: -1 });


    if (items.length === 0) return res.status(200).json({
        message: "No items found",
        success: false,
        error: `No items found in database of user with userid: ${userid}`
    })

    res.status(200).json({
        message: "Items fetched for user",
        success: true,
        items
    })
}

export const getSingleItem = async (req, res) => {


    const { userid } = req.user;

    const { itemId } = req.params;

    if (!itemId) return res.status(400).json({
        message: "Item id missing in params",
        success: false,
        err: "Missing itemId"
    })

    const item = await itemModel.findOne({ userId: userid, _id: itemId });

    if (!item || item.length === 0) return res.status(404).json({
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

export const getRelatedItems = async (req, res) => {

    const { userid } = req.user;
    const { itemId } = req.params

    if (!itemId) return res.status(400).json({
        message: "Item id missing in params",
        success: false,
        err: "Missing itemId"
    })
    const related = await RelatedItemService(userid, itemId)

    res.json({
        success: true,
        related
    })

}

export const semanticSearchItems = async (req, res) => {

    try {

        const { query } = req.query;
        const { userid } = req.user;

        if (!query) {

            return res.status(400).json({
                error: "Query is required"
            })

        }

        const results = await semanticSearch(userid, query)

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

    const { userid } = req.user;

    const items = await getResurfacedItems(userid);

    res.status(200).json({
        message: "Fetched resurfacing data",
        success: true,
        items
    })

}



