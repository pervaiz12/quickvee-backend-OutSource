import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import DownIcon from "../../../Assests/Dashboard/Down.svg";
import { BASE_URL, VENDORS_LIST } from "../../../Constants/Config";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import { Grid } from "@mui/material";
import SelectDropDown from "../../../reuseableComponents/SelectDropDown";
import CustomHeader from "../../../reuseableComponents/CustomHeader";

const FilterVendorList = ({ title, onVendorChange }) => {
  const {
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    userTypeData,
    GetSessionLogin,
  } = useAuthDetails();
  const [vendorList, setVendorList] = useState([]);
  const [showCustomDropdown, setShowCustomDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState("All");
  const merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;
  const selectRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);
  let data = { merchant_id, ...userTypeData };
  const fetchData = async () => {
    try {
      const { token, ...newData } = data;
      const response = await axios.post(BASE_URL + VENDORS_LIST, newData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setVendorList(response.data["vendor_list"]);
    } catch (error) {
      console.error("Error fetching vendor list:", error);
    }
  };

  const toggleDropdown = () => {
    setShowCustomDropdown(!showCustomDropdown);
  };

  const handleOutsideClick = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setShowCustomDropdown(true);
    }
  };
  const handleOnChangeFunction = (option) => {
    if (option === "All") {
      setSelectedOption(option);
    } else {
      setSelectedOption(option.name);
    }
    onVendorChange(option);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  const myStyles = {
    height: "300px",
    overflow: "auto",
  };

  return (
    <>
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          <CustomHeader>{title}</CustomHeader>
          
          <Grid container sx={{ px: 2.5,pt:1 }}>
            <Grid item xs={12}>
              <div className="heading">Filter by</div>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ px: 2.5, pb: 2.5 }}>
            <Grid item xs={12} sm={6} md={4}>
              <label className="q-details-page-label" htmlFor="dropdownFilter">
                Vendor Name
              </label>
              <SelectDropDown
                heading={"All"}
                listItem={vendorList}
                title={"name"}
                selectedOption={selectedOption}
                onClickHandler={handleOnChangeFunction}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

     
    </>
  );
};

export default FilterVendorList;
