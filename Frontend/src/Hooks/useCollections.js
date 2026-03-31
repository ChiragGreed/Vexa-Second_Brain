import { useContext } from "react";
import { getCollectionItemsApi, getCollectionsApi } from "../services/Api/collectionsApi"
import { collectionsContext } from "../State/CollectionsContext";
import { itemsContext } from "../State/ItemsContext";


const useCollections = () => {

    const context_collections = useContext(collectionsContext);
    const context_items = useContext(itemsContext);
    
    const { setCollections, setLoading } = context_collections;
    const { setItems, Items } = context_items;


    const getCollectionsHandler = async () => {

        try {
            setLoading(true);
            const response = await getCollectionsApi();
            setCollections(response.collections);

        }
        catch (err) {
            return err;
        }
        finally {
            setLoading(false)
        }

    }

    const getCollectionItemsHandler = async (collectionId) => {

        try {
            setLoading(true);

            const response = await getCollectionItemsApi(collectionId);
            setItems(response.items);
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setLoading(false)
        }


    };

    return ({ context_collections, getCollectionsHandler, getCollectionItemsHandler })
}

export default useCollections