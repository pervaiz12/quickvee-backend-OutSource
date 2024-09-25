import React, { useState } from "react";
import Grid from "@mui/system/Unstable_Grid/Grid";

import SelectDropDown from "../../reuseableComponents/SelectDropDown";
import downloadIcon from "../../Assests/Dashboard/download.svg";
import DashDateRangeComponent from "../../reuseableComponents/DashDateRangeComponent";

const NewSalesReportMain = () => {
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const onDateRangeChange = (dateRange) => {
    setSelectedDateRange(dateRange);
  };
  const [selectedReportList, setSelectedReportList] = useState("Sales Summary");

  const selectReportList = [
    {
      title: "Sales Summary",
    },
    {
      title: "Location",
    },
    {
      title: "Category",
    },
    {
      title: "Vendors",
    },
    {
      title: "Employee Sales",
    },
    {
      title: "Customer",
    },
    {
      title: "Discount",
    },
    {
      title: "Sales by Hour",
    },
    {
      title: "Items",
    },
    {
      title: "Daily Totals",
    },
    {
      title: "Order Type",
    },
    {
      title: "Detailed Category Report",
    },
    {
      title: "Detailed Sales Person Report",
    },
    {
      title: "Top Seller",
    },
    {
      title: "Order Refund Report",
    },
    {
      title: "Item Refund Report",
    },
    {
      title: "Tip Report",
    },
    {
      title: "Coupon Report",
    },
  ];

  const handleOptionClick = (option, dropdown) => {
    switch (dropdown) {
      case "reportList":
        setSelectedReportList(option.title);
        break;

      default:
        break;
    }
  };


  return (
    <>
      <Grid
        container
        sx={{ padding: 2.5, mt: 3.6 }}
        className="box_shadow_div "
      >
        <Grid item xs={12}>
          <Grid container direction="row" justifyContent="space-between" alignItems="center" >
            <Grid item sx={{display:"flex", gap:2}}>
              <h1 style={{ marginBottom: 0 }} className="heading content-center whitespace-nowrap">
                Sales Report
              </h1>
                <SelectDropDown
                  sx={{ pt: 0.5,width:"22.7rem"  }}
                  listItem={selectReportList}
                  onClickHandler={handleOptionClick}
                  selectedOption={selectedReportList}
                  dropdownFor={"reportList"}
                  title={"title"}
                />
            </Grid>

              <Grid item sx={{ display: "flex", alignItems: "center", gap: 0.5,cursor:"pointer" }}>
              <h1 className="text-[#0A64F9] text-[16px]">Export report</h1>
              <img
                style={{ height: "30px", width: "30px" }}
                src={downloadIcon}
                alt="downloadIcon"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container sx={{ paddingY: 3.7 }}>
        <Grid item xs={12}>
          <DashDateRangeComponent onDateRangeChange={onDateRangeChange} />
        </Grid>
      </Grid>
    </>
  );
};

export default NewSalesReportMain;
