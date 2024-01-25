import React, { useEffect, useState } from "react";
import { fetchcurrentInventoryreportData } from "../../../Redux/features/CurrentInventoryValue/currentInventoryValueSlice";

import { useSelector, useDispatch } from "react-redux";



const CurrentInventoryValue = () => {


    const [currentInventory, setcurrentInventory] = useState([]);

    const currentInventoryreportDataState = useSelector((state) => state.currentInventoryreport);

    const dispatch = useDispatch();
    useEffect(() => {
      let data = {
        merchant_id: "MAL0100CA",
      };
      if (data) {
        dispatch(fetchcurrentInventoryreportData(data));

      }
    }, []);
  
    useEffect(() => {
      if (
        !currentInventoryreportDataState.loading &&
        currentInventoryreportDataState.currentInventoryreportData
      ) {
        setcurrentInventory(currentInventoryreportDataState.currentInventoryreportData);
      }
    }, [
        currentInventoryreportDataState,
        currentInventoryreportDataState.loading,
        currentInventoryreportDataState.currentInventoryreportData,
    ]);



  return (
    <>
      <div className="q-order-main-page">
        <div>CurrentInventoryValue</div>

           <div className="q-category-bottom-categories-listing">
              <div className="q-category-bottom-categories-single-category">
                <p className="report-sort">{currentInventory.final_quantity}</p>
                <p className="report-title">{currentInventory.total_sale_price}</p>
                <p className="report-title">{currentInventory.total_cpi_price}</p>
              </div>
            </div>
      </div>
    </>
  );
};

export default CurrentInventoryValue;
