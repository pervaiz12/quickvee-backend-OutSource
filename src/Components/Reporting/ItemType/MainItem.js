import React from "react";
import ItemsCategories from "./ItemsCategories";



const MainItem = ({hide}) => {
  return (
    <>
   
      <div className="q-order-main-page">
        <div className="box">
        <ItemsCategories hide={hide} />
      </div>
      </div>
      
     
    </>
  );
};

export default MainItem;
