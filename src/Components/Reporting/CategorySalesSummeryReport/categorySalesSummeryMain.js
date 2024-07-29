import React from "react";
import { Grid } from "@mui/material";
import SelectDropDown from "../../../reuseableComponents/SelectDropDown";
import CustomHeader from "../../../reuseableComponents/CustomHeader";
import CategorySalesSummeryReportLogic from "./CategorySalesSummeryReportLogic";
import DateRangeComponent from "../../../reuseableComponents/DateRangeComponent";
import CategorySalesSummeryReportTable from "./CategorySalesSummeryReportTable";

export default function CategorySalesSummeryReportMain() {
  const {
    title,
    categoryAll,
    handleOptionClick,
    selectedLCategoryType,
    onDateRangeChange,
    getCategorySalesReport,
  } = CategorySalesSummeryReportLogic();
  return (
    <>
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          <CustomHeader>{title}</CustomHeader>

          <Grid container sx={{ px: 2.5, pt: 1 }}>
            <Grid item xs={12}>
              <div className="heading">Filter by</div>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ px: 2.5, pb: 2.5 }}>
            <Grid item xs={12} sm={6} md={4}>
              <label className="q-details-page-label" htmlFor="dropdownFilter">
                Category
              </label>
              <SelectDropDown
                sx={{ pt: 0.5 }}
                heading={"All"}
                listItem={categoryAll}
                title={"title"}
                dropdownFor={"category"}
                selectedOption={selectedLCategoryType}
                onClickHandler={handleOptionClick}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <DateRangeComponent onDateRangeChange={onDateRangeChange} />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <CategorySalesSummeryReportTable
            getCategorySalesReport={getCategorySalesReport}
          />
        </Grid>
      </Grid>
    </>
  );
}
