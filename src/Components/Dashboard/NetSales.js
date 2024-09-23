import React, { useState } from "react";
import BarCharts from "./BarCharts";
import SpikeCharts from "./SpikeCharts";
import { Grid } from "@mui/material";

const NetSales = () => {
  const spikeCharts = [
    {
      title: "Revenue",
      growth: "20%",
      mainOutlet: "$5.8k",
      amount: "$5.8k",
    },
    {
      title: "Sales Count",
      growth: "10%",
      mainOutlet: "13",
      amount: "13",
    },
    {
      title: "Customer Count",
      growth: "20%",
      mainOutlet: "5",
      amount: "5",
    },
    {
      title: "Gross Profit",
      growth: "10%",
      mainOutlet: "$2.9k",
      amount: "$2.9k",
    },
    {
      title: "Discounted",
      growth: "20%",
      mainOutlet: "$15k",
      amount: "$15k",
    },
    {
      title: "Discounted %",
      growth: "10%",
      mainOutlet: "0.257%",
      amount: "0.257%",
    },
    {
      title: "Avg. sale value",
      growth: "20%",
      mainOutlet: "$449k",
      amount: "$449k",
    },
    {
      title: "Avg. items per sale",
      growth: "10%",
      mainOutlet: "2.76923",
      amount: "2.76923",
    },
  ];
  return (
    <>
      <Grid
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 3,
          mb: 2.5,
        }}
      >
        {spikeCharts.map((chart, index) => {
          return (
            <Grid
              key={index}
              item
              xs={12}
              sx={{ p: 2.5 }}
              className="box_shadow_div"
            >
              <SpikeCharts
                title={chart.title}
                growth={chart.growth}
                mainOutlet={chart.mainOutlet}
                amount={chart.amount}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default NetSales;
