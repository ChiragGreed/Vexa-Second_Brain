import Item from "../models/itemModel.js"
import { cosineSimilarity } from "./similarityService.js"

const SIMILARITY_THRESHOLD = 0.47;


export const buildKnowledgeGraph =
    async () => {

        const items = await Item.find({embedding: { $exists: true }})
                .select("_id title tags embedding collectionId");

        const nodes = items.map(item => ({

                id: item._id,

                label: item.title,

                tags: item.tags,

                collectionId:
                    item.collectionId

            }));

        const edges = [];

        for (let i = 0; i < items.length; i++) {

            for (let j = i + 1; j < items.length; j++) {

                const similarity =
                    cosineSimilarity(

                        items[i].embedding,

                        items[j].embedding

                    );

                if (similarity > SIMILARITY_THRESHOLD) {

                    edges.push({

                        source: items[i]._id,

                        target: items[j]._id,

                        weight: similarity

                    });
                }
            }
        }

        return {
            nodes,
            edges
        }

    }