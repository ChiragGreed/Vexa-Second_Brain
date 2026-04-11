import { useContext } from "react";
import { getItemsApi, getRelatedItemApi, getSingleItemApi, resurfacingItemsApi, searchItemsApi } from '../Services/itemsApi.js'
import { itemsContext } from "../State/ItemsContext";


const useItems = () => {

    const context_items = useContext(itemsContext);
    const { setItems, setSingleItem, setResurfacedItems, setLoading } = context_items;

    const getItemsHandler = async () => {

        try {
            setLoading(true);

            const response = await getItemsApi();
            setItems(response.items);
            setLoading(false);

        }
        catch (err) {
            return err;
        }
        finally {
            setLoading(false)
        }

    }

    const getSingleItemHandler = async (itemId) => {
        try {
            setLoading(true);

            const response = await getSingleItemApi(itemId);
            setSingleItem(response.item);
            setLoading(false);

        }
        catch (err) {
            return err;
        }
        finally {
            setLoading(false)
        }

    }

    const getRelatedItemHandler = async (itemId) => {

        try {
            setLoading(true);

            const response = await getRelatedItemApi(itemId);
            setItems(response.related);
            setLoading(false);

        }
        catch (err) {
            return err;
        }
        finally {
            setLoading(false)
        }

    }

    const searchItemsHandler = async (Query) => {

        try {
            setLoading(true)
            const res = await searchItemsApi(Query);
            setItems(res.items)

        }
        catch (err) {
            return err;
        }
        finally {
            setLoading(false)
        }

    }

    const resurfaceItemsHandler = async () => {

        try {
            setLoading(true);

            const response = await resurfacingItemsApi();
            setResurfacedItems(response.items);
            setLoading(false);

        }
        catch (err) {
            return err;
        }
        finally {
            setLoading(false)
        }

    }

    return ({ context_items, getItemsHandler, getSingleItemHandler, resurfaceItemsHandler, getRelatedItemHandler, searchItemsHandler })
}

export default useItems