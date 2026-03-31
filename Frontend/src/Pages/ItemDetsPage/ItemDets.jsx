import './ItemDets.scss'
import SingleItemCard from '../../Components/SingleItemCard/SingleItemCard'
import ItemCard from '../../Components/ItemCard/ItemCard'
import useItems from '../../Hooks/useItems'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const ItemDets = () => {

    const { context_items, getRelatedItemHandler } = useItems();
    const { Items } = context_items;
    const {itemId} = useParams();
    
    useEffect(() => {
        getRelatedItemHandler(itemId);
    }, [])



    return (
        <div className='ItemsDetsPage'>
            <div className='item'>
                <SingleItemCard />
            </div>

            <h2 className='related_items_label'>Related suggestions</h2>

            <ItemCard items={Items} />
        </div>
    )
}

export default ItemDets
