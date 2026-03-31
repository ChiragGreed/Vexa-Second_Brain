
import Item from "../models/itemModel.js"

export const getResurfacedItems = async () => {

    const items = await Item.find()

    if (items.length === 0) return []

    const now = new Date()

    const scored = items.map(item => {

        const daysOld =
            (now - new Date(item.createdAt)) /
            (1000 * 60 * 60 * 24)

        // ignore very new items
        if (daysOld < 3) return null

        const ageScore = Math.min(daysOld / 30, 1)

        const randomBoost = Math.random() * 0.3

        return {

            item,
            score: ageScore + randomBoost

        }

    })
        .filter(Boolean)
        .sort((a, b) => b.score - a.score)

    return scored.slice(0, 5).map(s => s.item)

}