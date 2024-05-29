import { useState } from "react";
import React from "react";
import SearchIcon from "../../Assests/Filter/Search.svg";

function SearchBar({ onSearch }) {
    const [searchId, setSearchId] = useState("");

    const handleSearch = () => {
        
            console.log("Please enter a valid ID");
    };

    return (
        <>
            <div className="q_searchBar">
                <div className="flex border  rounded-md overflow-hidden">
                    <input
                        type="text"
                        placeholder="Search orders by order ID, last 4 digits on payment card, or invoice ID"
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                        className="w-full px-4 py-2 border-none focus:outline-none place_text_search  cursor-pointer"
                    />
                    <button
                        onClick={handleSearch}
                        className="text-black px-4 py-2 focus:outline-none text-2xl"
                    >
                        <img src={SearchIcon} alt="" className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </>
    );
}

export default SearchBar;
