import React, { useEffect, useState } from "react";
import { fetchcurrentInventoryreportData } from "../../../Redux/features/CurrentInventoryValue/currentInventoryValueSlice";
import { useSelector, useDispatch } from "react-redux";


const CurrentInventoryValue = () => {
  const [currentInventory, setcurrentInventory] = useState([]);
  const currentInventoryreportDataState = useSelector(
    (state) => state.currentInventoryreport
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = {
          merchant_id: "MAL0100CA",
        };
        if (data) {
          dispatch(fetchcurrentInventoryreportData(data));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (
      !currentInventoryreportDataState.loading &&
      currentInventoryreportDataState.currentInventoryreportData
    ) {
      setcurrentInventory(
        currentInventoryreportDataState.currentInventoryreportData
      );
    }
  }, [
    currentInventoryreportDataState.loading,
    currentInventoryreportDataState.currentInventoryreportData,
  ]);

  const formatNumber = (value) => {
    const floatValue = parseFloat(value);
    const formattedValue = floatValue.toFixed(2);
    return floatValue % 1 === 0
      ? String(parseFloat(floatValue))
      : formattedValue;
  };

  return (
    <>
      <div className="q-order-main-page">
        <div className="q-category-bottom-categories-listing">
          <div className="q-category-bottom-detail-section">
            <div className="q-category-bottom-header">
              <div className="q_details_header ml-2">
                Current Inventory Report
              </div>
            </div>
          </div>
          <div className=" my-5">
            <div className="grid gap-3 grid-cols-3">
              <div className="col-span-4 md:col-span-2 lg:col-span-1">
                <div className="bg-white p-4 shadow-md rounded-lg opacity-100  h-30">
                  <div className="font-normal  tracking-normal Admin_std">Total Quantity</div>
                  <div className="text-[20px] font-bold mt-4">{currentInventory.final_quantity}</div>
                </div>
              </div>

              <div className="col-span-4 md:col-span-2 lg:col-span-1">
                <div className="bg-white p-4 shadow-md rounded-lg opacity-100  h-30">
                  <div className="font-normal  tracking-normal Admin_std">Total Selling Price</div>
                  <div className="text-[20px] font-bold mt-4">$ {formatNumber(currentInventory.total_sale_price)}</div>
                </div>
              </div>

              <div className="col-span-4 md:col-span-2 lg:col-span-1">
                <div className="bg-white p-4 shadow-md rounded-lg opacity-100  h-30">
                  <div className="font-normal  tracking-normal Admin_std">Total Cost Per Item</div>
                  <div className="text-[20px] font-bold mt-4">$ {formatNumber(currentInventory.total_cpi_price)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CurrentInventoryValue;
