import React from "react";

import FilterProduct from "./FilterProduct";
import ProductContent from "./ProductContent";
import ProductTable from "./ProductTable";


const MainProducts = () => {

  return (
    <>
      <div className="q-attributes-main-page">
        <FilterProduct />
      </div>
      <div className="q-attributes-main-page">
        <ProductContent />
      </div>
      <div className="q-attributes-main-page">
        <ProductTable />
      </div>
     
    </>
  );
};

export default MainProducts;
