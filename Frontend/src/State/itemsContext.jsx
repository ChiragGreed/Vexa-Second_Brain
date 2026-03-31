import { createContext, useState } from "react";

export const itemsContext = createContext();

const ItemsContextProvider = ({ children }) => {

    const [Items, setItems] = useState([]);
    const [SingleItem, setSingleItem] = useState(null);
    const [ResurfacedItems, setResurfacedItems] = useState([]);
    const [Loading, setLoading] = useState(true);


    return (
        <itemsContext.Provider value={{ Items, setItems, Loading, setLoading, SingleItem, setSingleItem, ResurfacedItems, setResurfacedItems }}>
            {children}
        </itemsContext.Provider>
    )
}

export default ItemsContextProvider
