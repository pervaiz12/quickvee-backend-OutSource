import React from "react";


import Welcome from "./Welcome";
import NetSales from "./NetSales";
import SellItems from "./SellItems";
import MainHeader from "./MainHeader";
import CardForm from "./CardForm";

const DashboardMain = () => {
  return (
    <>
    <div className="q-category-main-page">
   
      <Welcome />
      </div>
      <div className="q-category-main-page">
      <MainHeader />
      </div>
      <div className="q-category-main-page">
      <CardForm />
      </div>
      <div className="q-category-main-page">
      <NetSales />
      </div>
      <div className="q-category-main-page">
      <SellItems />
      </div>
      </>
   
  );
};

export default DashboardMain;
