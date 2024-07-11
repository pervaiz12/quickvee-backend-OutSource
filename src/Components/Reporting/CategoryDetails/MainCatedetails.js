import React, { useState, useEffect } from "react";
import FilterCatDetails from "./FilterCatDetails";

import DownIcon from "../../../Assests/Dashboard/Down.svg";
import DetailsSaleReport from "./DetailsSaleReport";
import { BASE_URL, TAXE_CATEGORY_LIST } from "../../../Constants/Config";
import axios from "axios";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import { Grid } from "@mui/material";
import SelectDropDown from "../../../reuseableComponents/SelectDropDown";
import DateRangeComponent from "../../../reuseableComponents/DateRangeComponent";
import { styled } from "@mui/system";
import CustomHeader from "../../../reuseableComponents/CustomHeader";

const CustomGrid = styled(Grid)(({ theme }) => ({
  "& > .MuiGrid-item": {
    paddingTop: 0, // Remove the padding-top
  },
}));

const MainCatedetails = () => {
  const [filteredData, setFilteredData] = useState({ category_id: "all" });
  const {
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    userTypeData,
    GetSessionLogin,
  } = useAuthDetails();

  const handleDataFiltered = (data) => {
    if (typeof data === "object") {
      let orderEnvValue;
      let orderTypValue;

      switch (selectedOrderSource) {
        case "All":
          orderEnvValue = 1;
          break;
        case "Online Order":
          orderEnvValue = 2;
          break;
        case "Store Order":
          orderEnvValue = 3;
          break;
        default:
          orderEnvValue = 1;
          break;
      }
      switch (selectedOrderType) {
        case "All":
          orderTypValue = "all";
          break;
        case "Pickup":
          orderTypValue = "pickup";
          break;
        case "Delivery":
          orderTypValue = "delivery";
          break;
        default:
          orderTypValue = "all";
          break;
      }

      const updatedData = {
        ...filteredData,
        ...data,
        // merchant_id: "MAL0100CA",
        order_env: orderEnvValue,
        order_typ: orderTypValue,
      };
      // console.log(updatedData);
      setFilteredData(updatedData);
    } else {
      // Handle other cases or log an error
      console.error("Invalid data format:", data);
    }
  };

  const [selectedOrderSource, setSelectedOrderSource] = useState("All");
  const [selectedOrderType, setSelectedOrderType] = useState("All");
  const [selectedLCategoryType, setselectedLCategoryType] = useState("All");

  const handleOptionClick = (option, dropdown) => {
    console.log("handleOptionClick", option, dropdown);
    switch (dropdown) {
      case "orderSource":
        setSelectedOrderSource(option.title);

        break;
      case "orderType":
        setSelectedOrderType(option.title);

        break;
      case "category":
        if (option === "All") {
          setselectedLCategoryType("All");

          setFilteredData({
            ...filteredData,
            category_id: "all",
            merchant_id: "",
            order_env: "",
            order_typ: "",
          });
        } else {
          const category_id = option.id;
          setselectedLCategoryType(option.title);

          setFilteredData({
            ...filteredData,
            category_id,
            merchant_id: "",
            order_env: "",
            order_typ: "",
          });
        }
        break;
      default:
        break;
    }
  };

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  let data = {
    merchant_id: LoginGetDashBoardRecordJson?.data?.merchant_id,
    ...userTypeData,
  };
  useEffect(() => {
    const { token, ...dataNew } = data;
    const fetchData = async () => {
      try {
        const response = await axios.post(
          BASE_URL + TAXE_CATEGORY_LIST,
          dataNew,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Assuming the API response has a data property containing the category list
        const categoryList = response.data.result;

        // Extracting category IDs and view titles
        const mappedOptions = categoryList.map((category) => ({
          id: category.id,
          title: category.title,
        }));

        setCategoryOptions(mappedOptions);
        setLoadingCategories(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoadingCategories(false);
      }
    };

    fetchData();
  }, []); // Fetch categories only once when the component mounts

  const orderSourceList = ["All", "Online Order", "Store Order"];
  const orderTypeList = ["All", "Pickup", "Delivery"];
  return (
    <>
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          <Grid container>
            <CustomHeader>Category Sale Report</CustomHeader>
          </Grid>
          <Grid container sx={{ px: 2.5, pt: 1 }}>
            <Grid item xs={12}>
              <div className="heading">Filter By</div>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ px: 2.5, pb: 2.5 }}>
            <Grid item xs={12} sm={6} md={4}>
              <label
                className="q-details-page-label"
                htmlFor="orderSourceFilter"
              >
                Order Source
              </label>
              <SelectDropDown
                listItem={orderSourceList.map((item) => ({ title: item }))}
                title="title"
                dropdownFor="orderSource"
                selectedOption={selectedOrderSource}
                onClickHandler={handleOptionClick}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <label className="q-details-page-label" htmlFor="orderTypeFilter">
                Order Type
              </label>
              <SelectDropDown
                listItem={orderTypeList.map((item) => ({ title: item }))}
                title="title"
                dropdownFor="orderType"
                selectedOption={selectedOrderType}
                onClickHandler={handleOptionClick}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <label className="q-details-page-label" htmlFor="orderTypeFilter">
                Category
              </label>
              <SelectDropDown
                heading={"All"}
                listItem={categoryOptions}
                title="title"
                dropdownFor="category"
                selectedOption={selectedLCategoryType}
                onClickHandler={handleOptionClick}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <div className="q-category-main-page">
        <div className="box">
          <DateRangeComponent onDateRangeChange={handleDataFiltered} />
        </div>
      </div>
      <style>
        {`
          .categorysaleReport {
            margin-top: 2rem ;
          }
        `}
      </style>

      <DetailsSaleReport data={filteredData} />
    </>
  );
};

export default MainCatedetails;
