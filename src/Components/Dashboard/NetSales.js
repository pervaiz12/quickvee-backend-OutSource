import React from "react";
import { Grid } from "@mui/material";
import { RevenueChart } from "./Charts/RevenueChart";
import { SalesCountChart } from "./Charts/SalesCountChart";
import { CustomerCountChart } from "./Charts/CustomerCountChart";
import { GrossProfitChart } from "./Charts/GrossProfitChart";
import { DiscountChart } from "./Charts/DiscountChart";
import { PercentageDiscountChart } from "./Charts/PercentageDiscountChart";
import { AvgItemSaleChart } from "./Charts/AvgItemSaleChart";
import { AvgSaleValueChart } from "./Charts/AvgSaleValueChart";

const NetSales = ({ activeType, merchantId }) => {
  return (
    <>
      <Grid container spacing={3}>
        {/* Revenue Chart */}
        <RevenueChart activeType={activeType} merchantId={merchantId} />

        {/* Sales Count Chart */}
        <SalesCountChart activeType={activeType} merchantId={merchantId} />

        {/* Customer Count Chart */}
        <CustomerCountChart activeType={activeType} merchantId={merchantId} />

        {/* Gross Profit Chart */}
        <GrossProfitChart activeType={activeType} merchantId={merchantId} />

        {/* Discounted Chart */}
        <DiscountChart activeType={activeType} merchantId={merchantId} />

        {/* Percentage Discounted Chart */}
        <PercentageDiscountChart
          activeType={activeType}
          merchantId={merchantId}
        />

        {/* Avg Sale value chart */}
        <AvgSaleValueChart activeType={activeType} merchantId={merchantId} />

        {/* Avg items per sale chart */}
        <AvgItemSaleChart activeType={activeType} merchantId={merchantId} />
      </Grid>
    </>
  );
};

export default NetSales;
