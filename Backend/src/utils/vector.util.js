import itemModel from "../models/itemModel.js"
import { cosineSimilarity } from "../services/similarityService.js"

export const vectorSearch = async ({
 embedding,
 excludeId = null,
 limit = 10,
 threshold = 0.20
}) => {

 if(!embedding){
  throw new Error("Embedding required")
 }

 const query = {
  embedding: { $exists: true, $ne: [] }
 }

 if(excludeId){
  query._id = { $ne: excludeId }
 }

 const items = await itemModel.find(query)

 const scored = items.map(item => {

  const score = cosineSimilarity(
   embedding,
   item.embedding
  )

  return {
   item,
   score
  }

 })

 const results = scored

  .filter(r => r.score > threshold)

  .sort((a,b) => b.score - a.score)

  .slice(0,limit)

 return results.map(r => r.item)

}