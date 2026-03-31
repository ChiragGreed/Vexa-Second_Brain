import React from 'react'
import ItemCard from '../../Components/ItemCard/ItemCard'
import useItems from '../../Hooks/useItems'
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

const SearchResult = () => {

    const { context_items, searchItemsHandler } = useItems();
    const { Items } = context_items;

    const [searchParams] = useSearchParams();

    const query = searchParams.get("query");

    useEffect(() => {
        searchItemsHandler(query);
    }, [])


    return (
        <div>
            <ItemCard items={Items} />
        </div>
    )
}

export default SearchResult
