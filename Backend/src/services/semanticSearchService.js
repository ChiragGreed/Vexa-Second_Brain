import { createEmbedding } from "./embeddingService.js"
import { vectorSearch } from "../utils/vector.util.js"

export const semanticSearch = async (query) => {

    const embedding = await createEmbedding(query)

    return vectorSearch({ embedding })

}