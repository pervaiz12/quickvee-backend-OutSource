import React from "react";
import ItemsCategories from "./ItemsCategories";
import DateRange from "../../Orders/InstoreOrder/DateRange";
import Itemdatadetails from "./Itemdatadetails";

const MainItem = () => {
  return (
    <>
   
      <div className="q-order-main-page">
        <ItemsCategories />
      </div>
      <div className="q-order-main-page">
       <DateRange />
      </div>
      <div className="q-order-main-page">
        <Itemdatadetails />
      </div>
    </>
  );
};

export default MainItem;
