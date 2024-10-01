import React, { useState, useEffect } from "react";

import { BASE_URL, TAXE_CATEGORY_LIST } from "../../../Constants/Config";
import axios from "axios";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import { Grid, Grid2 } from "@mui/material";
import SelectDropDown from "../../../reuseableComponents/SelectDropDown";
import CustomHeader from "../../../reuseableComponents/CustomHeader";
import PasswordShow from "../../../Common/passwordShow";
import InputTextSearch from "../../../reuseableComponents/InputTextSearch";
import downloadIcon from "../../../Assests/Dashboard/download.svg";
import { CSVLink } from "react-csv";

const InventoryReportFilter = ({ onFilterDataChange,searchItems, setSearchRecord,debouncedValue }) => {
  const { LoginGetDashBoardRecordJson, LoginAllStore, userTypeData } =
    useAuthDetails();
    const [CSVData, setCSVData] = useState([]);
  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();
  const [selectedOrderSource, setSelectedOrderSource] = useState("All");
  const [selectedOrderType, setSelectedOrderType] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [filteredData, setFilteredData] = useState({ category_id: "all" });
  const [items, setItems] = useState("");

  const handleOptionClick = (option, dropdown) => {
    switch (dropdown) {
      case "odersource":
        setSelectedOrderSource(option.title);

        break;
      case "ordertype":
        setSelectedOrderType(option.title);

        break;
      case "category":
        if (option === "All") {
          setSelectedCategory("All");

          setFilteredData({
            ...filteredData,
            category_id: "all",
            merchant_id: "",
            order_env: "",
            limit: "",
          });
        } else {
          const category_id = option.id;
          setSelectedCategory(option.title);

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

  const handleSearchInputChange = (value) => {
    setSearchRecord(value);
  };

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  let data = {
    merchant_id: LoginGetDashBoardRecordJson?.data?.merchant_id,
    ...userTypeData,
  };
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
        
        if (error.response.status == 401) {
          getUnAutherisedTokenMessage();
          handleCoockieExpire();
        }
        setLoadingCategories(false);
      }
    };

    fetchData();
  }, []); // Fetch categories only once when the component mounts

  useEffect(() => {
    onFilterDataChange(
      selectedOrderSource,
      selectedOrderType,
      selectedCategory,items
    );
  }, [selectedOrderSource, selectedOrderType, selectedCategory,items]);

  const orderSourceList = ["All", "Online Order", "Store Order"];
  // const inventoryReportList = ["Old Inventory", "Online Order", "Store Order"];
  const orderTypeList = ["All", "Pickup", "Delivery"];

  const handleSearch = () =>{
  }
  return (
    <>
      <Grid container sx={{ padding: 2.5, mt: 3.6 }} className="box_shadow_div">
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item sx={{ display: "flex", gap: 2 }}>
              <h1
                style={{ marginBottom: 0 }}
                className="heading content-center whitespace-nowrap"
              >
                Inventory Report
              </h1>
              <SelectDropDown
                  sx={{ pt: 0.5, width: "19.4rem" }}
                  listItem={orderSourceList.map((item) => ({ title: item }))}
                  title="title"
                  dropdownFor="orderSourceList"
                  selectedOption={selectedOrderSource}
                  onClickHandler={handleOptionClick}
              />
            </Grid>

            <Grid
              item
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                cursor: "pointer",
              }}
            >
              
              <div className="flex justify-center items-center flex-nowrap">
                <h1 className="text-[#0A64F9] text-[16px]">Export report</h1>
                <img
                  style={{ height: "30px", width: "30px" }}
                  src={downloadIcon}
                  alt="downloadIcon"
                />
              </div>
              
            </Grid>
          </Grid>
        </Grid>
      </Grid>


      
      
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          
            

            {
              !debouncedValue ? (
                <>
                 <Grid container sx={{ px: 2.5, pt: 1 }}>
                    <Grid item xs={12}>
                      <div className="heading">Filter By</div>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} sx={{ px: 2.5, pb: 2.5 }}>
                    {/* <Grid item xs={12} sm={6} md={4}>
                      <label
                        className="q-details-page-label"
                        htmlFor="orderSourceFilter"
                      >
                        Order Source
                      </label>
                      <SelectDropDown
                        listItem={orderSourceList.map((item) => ({ title: item }))}
                        title="title"
                        dropdownFor="odersource"
                        selectedOption={selectedOrderSource}
                        onClickHandler={handleOptionClick}
                      />
                    </Grid> */}
                    <Grid item xs={12} sm={6} md={4}>
                      <label className="q-details-page-label" htmlFor="orderTypeFilter">
                        Report Type
                      </label>
                      <SelectDropDown
                        listItem={orderTypeList.map((item) => ({ title: item }))}
                        title="title"
                        dropdownFor="ordertype"
                        selectedOption={selectedOrderType}
                        onClickHandler={handleOptionClick}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <label className="q-details-page-label" htmlFor="orderTypeFilter">
                        Measure
                      </label>
                      <SelectDropDown
                        heading={"All"}
                        listItem={categoryOptions}
                        title="title"
                        dropdownFor="category"
                        selectedOption={selectedCategory}
                        onClickHandler={handleOptionClick}
                      />
                    </Grid>
                  </Grid>
                </>
              ):("")
            }
        </Grid>
      </Grid>
    </>
  );
};

export default InventoryReportFilter;
