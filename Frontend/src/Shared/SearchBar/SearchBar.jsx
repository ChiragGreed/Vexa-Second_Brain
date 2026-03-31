import { useEffect, useState } from "react"
import useItems from "../../Hooks/useItems"
import "./SearchBar.scss"
import { useNavigate } from "react-router-dom";

const SearchBar = () => {

    const { context_items, searchItemsHandler } = useItems();
    const { Items } = context_items;

    const navigate = useNavigate();

    const [Query, setQuery] = useState("");


    const submitHandler = async (e) => {
        e.preventDefault();
        navigate(`/searchResult?query=${Query}`)
    }

    const handleSearch = (e) => {
        const value = e.target.value
        setQuery(value)
    }

    return (

        <header className="search_bar">

            <label className="search_bar_icon" htmlFor="itemSearch">

                <i className="ri-search-line"></i>

            </label>

            <form onSubmit={submitHandler}>

                <input
                    type="text"
                    id="itemSearch"
                    placeholder="Search anything..."
                    value={Query}
                    onChange={handleSearch}
                />
            </form>

        </header>

    )

}

export default SearchBar