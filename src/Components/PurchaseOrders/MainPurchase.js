import React, { useState } from "react";

import PurchaseTable from "./PurchaseTable";

import { AiOutlineSearch } from "react-icons/ai";
import AddPo from "./AddPo";

const MainPurchase = () => {
  const [visible, seVisible] = useState("PurchaseTable");
  const [searchId, setSearchId] = useState(""); // State to track search ID


  const inputChange = (e) => {
    setSearchId(e.target.value)
    // console.log(searchId)
  };

  return (
    <>
      <div className="q-category-main-page">
        <div className="q-category-top-detail-section">
         <div className="bg-white p-4 mb-3 rounded-md">
        <div className="flex border border-[#E1E1E1] rounded-md overflow-hidden">
          <input
            type="text"
            placeholder="Search Purchase Order"
            value={searchId}
            onChange={inputChange}
            className="w-full px-4 py-2 border-none focus:outline-none"
          />
 
          <button
            className="text-black px-4 py-2 focus:outline-none text-2xl"
          >
            <AiOutlineSearch className="h- w-8  text-[#231F20]" />
          </button>
        </div>
      </div>
        </div>
        {visible === "PurchaseTable" && <PurchaseTable seVisible={seVisible} searchId={searchId}/>}
        {visible === "AddPo" && <AddPo seVisible={seVisible} />}
      </div>
    </>
  );
};

export default MainPurchase;