import React, { useState, useEffect } from "react";
import TopSallerList from "./TopSallerList";
import DownIcon from "../../../Assests/Dashboard/Down.svg";

import { BASE_URL, TAXE_CATEGORY_LIST } from "../../../Constants/Config";
import axios from "axios";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import { Grid } from "@mui/material";
import SelectDropDown from "../../../reuseableComponents/SelectDropDown";
import DateRangeComponent from "../../../reuseableComponents/DateRangeComponent";
import PasswordShow from "../../../Common/passwordShow";
import CustomHeader from "../../../reuseableComponents/CustomHeader";

const TopSallerReport = ({ hide }) => {
  const [filteredData, setFilteredData] = useState({ category_id: "all" });
  const { LoginGetDashBoardRecordJson, LoginAllStore, userTypeData } =
    useAuthDetails();
  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();
  let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;

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
      switch (selectedLimitType) {
        case "10":
          orderTypValue = "10";
          break;
        case "20":
          orderTypValue = "20";
          break;
        case "50":
          orderTypValue = "50";
          break;
        case "100":
          orderTypValue = "100";
          break;

        default:
          orderTypValue = "10";
          break;
      }

      const updatedData = {
        ...filteredData,
        ...data,
        merchant_id,
        order_env: orderEnvValue,
        limit: orderTypValue,
        ...userTypeData,
      };

      setFilteredData(updatedData);
    } else {
      // Handle other cases or log an error
      console.error("Invalid data format:", data);
    }
  };

  const [selectedOrderSource, setSelectedOrderSource] = useState("All");
  const [selectedLimitType, setselectedLimitType] = useState("10");
  const [selectedLCategoryType, setselectedLCategoryType] = useState("All");

  const handleOptionClick = (option, dropdown) => {
    switch (dropdown) {
      case "orderSource":
        setSelectedOrderSource(option.title);
        break;
      case "limit":
        setselectedLimitType(option.title);

        break;
      case "category":
        if (option === "All") {
          setselectedLCategoryType("All");
          setFilteredData({
            ...filteredData,
            category_id: "all",
            merchant_id: "",
            order_env: "",
            limit: "",
          });
        } else {
          const category_id = option.id;
          setselectedLCategoryType(option.title);
          setFilteredData({
            ...filteredData,
            category_id,
            merchant_id: "",
            order_env: "",
            limit: "",
          });
        }
        break;
      default:
        break;
    }
  };

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  let data = { merchant_id, ...userTypeData };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { token, ...dataNew } = data;

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
        const categoryList = response.data.result;

        // Extracting category IDs and view titles
        const mappedOptions = categoryList.map((category) => ({
          id: category.id,
          title: category.title,
        }));

        setCategoryOptions(mappedOptions);
        setLoadingCategories(false);
      } catch (error) {
        if (error.status == 401 || error.response.status === 401) {
          getUnAutherisedTokenMessage();
          handleCoockieExpire();
        } else if (error.status == "Network Error") {
          getNetworkError();
        }
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchData();
  }, []); // Fetch categories only once when the component mounts
  const orderSourceList = ["All", "Online Order", "Store Order"];
  const limitList = ["10", "20", "50", "100"];
  return (
    <>
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          { !hide && <CustomHeader>Top Sellers</CustomHeader> }

          <Grid container sx={{ px: 2.5, pt: 1 }}>
            <Grid xs={12} sm={6} md={4}>
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
                sx={{ pt: 0.5 }}
                listItem={orderSourceList.map((item) => ({ title: item }))}
                title="title"
                dropdownFor="orderSource"
                selectedOption={selectedOrderSource}
                onClickHandler={handleOptionClick}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <label className="q-details-page-label" htmlFor="limitFilter">
                Limit
              </label>
              <SelectDropDown
                sx={{ pt: 0.5 }}
                listItem={limitList.map((item) => ({ title: item }))}
                title={"title"}
                dropdownFor={"limit"}
                selectedOption={selectedLimitType}
                onClickHandler={handleOptionClick}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <label className="q-details-page-label" htmlFor="limitFilter">
                Category
              </label>
              <SelectDropDown
                sx={{ pt: 0.5 }}
                heading={"All"}
                listItem={categoryOptions}
                title={"title"}
                dropdownFor={"category"}
                selectedOption={selectedLCategoryType}
                onClickHandler={handleOptionClick}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <DateRangeComponent onDateRangeChange={handleDataFiltered} />

      <TopSallerList data={filteredData} />
    </>
  );
};

export default TopSallerReport;
