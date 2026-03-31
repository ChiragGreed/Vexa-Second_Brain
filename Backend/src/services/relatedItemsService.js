import Item from "../models/itemModel.js"
import { vectorSearch } from "../utils/vector.util.js"

export const RelatedItemService = async (itemId) => {

 const item = await Item.findById(itemId)

 return vectorSearch({

  embedding: item.embedding,

  excludeId: itemId,

  limit: 5,

  threshold: 0.65

 })

}