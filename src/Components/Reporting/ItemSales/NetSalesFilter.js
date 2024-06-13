import { Grid } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { priceFormate } from "../../../hooks/priceFormate";

const NetSalesFilter = () => {
  const NetSalesData = useSelector((state) => state.ItemSalesReportList);
  // console.log(NetSalesData.ItemSalesData)
  return (
    <>
      {NetSalesData && NetSalesData.ItemSalesData && (
        <>
          <Grid container spacing={2} sx={{ pt: 2 }}>
            <Grid item xs={12} sm={6} md={6}>
              <div className="gap-2 py-4 cursor-pointer bg-grayopacity bg-white px-0 mt-4 mx-0 shadow-md rounded-lg opacity-100 ">
                <div className="flex items-center gap-2 py-1 cursor-pointer">
                  <div className="flex items-center gap-2 flex-col">
                    <div className="q_details_header ml-5"> # Sold</div>
                    <div className="q_details_header ml-5">
                      {priceFormate(Number(NetSalesData.ItemSalesData[2]))}
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <div className="gap-2 py-4 cursor-pointer bg-grayopacity bg-white px-0 mt-4 mx-0 shadow-md rounded-lg opacity-100 ">
                <div className="flex items-center gap-2 py-1 cursor-pointer">
                  <div className="flex items-center gap-2 flex-col">
                    <div className="q_details_header ml-5">Net Sales</div>
                    <div className="q_details_header ml-5">
                      ${priceFormate(Number(NetSalesData.ItemSalesData[1]))}
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default NetSalesFilter;
