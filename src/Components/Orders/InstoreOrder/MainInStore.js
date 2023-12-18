import React, { useState } from "react";
import FilterEmp from "./FilterEmp";
//import { DateRange } from "@mui/icons-material";
import DateRange from "./DateRange";
//import { ContentCopy } from "@mui/icons-material";
import ContentList from "./ContentList";
import TableViewData from "./TableViewData";
import MainOnline from "../OnlineOrder/MainOnline";

const MainInStore = () => {
  const [activeTab, setActiveTab] = useState("online");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderInStoreContent = () => {
    if (activeTab === "online") {
      return (
      <>
            <MainOnline />
       
          <div className="mt-16 w-full">
            </div>
            <DateRange />
            <div className=" mt-8">
            </div>
          
            <ContentList />
            <div className=" mt-8">
            </div>
          
            <TableViewData />
            </>
      
      );
    } else if (activeTab === "offline") {
      return (
        <>
        <FilterEmp />
   
      <div className="mt-16 w-full">
        </div>
        <DateRange />
        <div className=" mt-8">
        </div>
      
        <ContentList />
        <div className=" mt-8">
        </div>
      
        <TableViewData />
        </>
      );
    }
    return null;
  };

  return (
    <>
    <div className="mx-6 my-2">
      <div
        className="bg-white px-8 py-4 mt-4 mx-10 shadow-md rounded-lg opacity-100 lg:h-[350px] sm:h[500px] md:h-[450px]"
      >
        <div className="mb-6">
          <button
            onClick={() => handleTabClick("offline")}
            className={`${
              activeTab === "offline"
                ? "bg-[#EBF2FF] text-[#0A64F9]"
                : "bg-white text-[#6A6A6A]"
            } px-12 py-2 rounded Admin_bold text-[20px]  focus:outline-none`}
          >
            In-Store Orders
          </button>
          <button
            onClick={() => handleTabClick("online")}
            className={`${
              activeTab === "online"
                ? "bg-[#EBF2FF] text-[#0A64F9]"
                : "bg-white text-[#6A6A6A]"
            } px-12 py-2 rounded focus:outline-none Admin_bold text-[20px]`}
          >
            Online Orders
          </button>
          <div className="border-b-2 text-[#CEE0FF]"></div>
        </div>

        <div className="">
          <div className="">{renderInStoreContent()}</div>
        </div>
      </div>
    </div>
    </>
  );
};

export default MainInStore;
