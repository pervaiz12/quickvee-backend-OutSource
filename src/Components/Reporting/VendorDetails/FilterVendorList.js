import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import DownIcon from "../../../Assests/Dashboard/Down.svg";
import { BASE_URL, VENDORS_LIST } from "../../../Constants/Config";
import { useAuthDetails } from "../../../Common/cookiesHelper";

const FilterVendorList = ({ title, onSelectChange }) => {
  const {
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    userTypeData,
    GetSessionLogin,
  } = useAuthDetails();
  const [vendorList, setVendorList] = useState([]);
  const [showCustomDropdown, setShowCustomDropdown] = useState(false);
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
      <div className="box">
        <div className="q-category-bottom-detail-section">
          <div className="q-category-bottom-header-sticky">
            <div className="q-category-bottom-header">
              <div className="q_details_header ml-2">{title}</div>
            </div>
            <div className="q_details_header ml-8">Filter by</div>
          </div>

          <div className="q-order-page-container ml-8">
            <div className="q-order-page-filter">
              <label className="q-details-page-label" htmlFor="dropdownFilter">
                Vendor Name
              </label>
              <div className="custom-dropdown">
                <div className="dropdown-content-container" ref={selectRef}>
                  <div
                    className="custom-dropdown-header"
                    onClick={toggleDropdown}
                  >
                    <span>Select Option</span>
                    <img src={DownIcon} alt="Down Arrow" />
                  </div>

                  {showCustomDropdown && (
                    <div className="dropdown-content" style={myStyles}>
                      {vendorList.map((vendor) => (
                        <div
                          key={vendor.id}
                          className="custom-dropdown-option"
                          onClick={() => handleOutsideClick(vendor.id)}
                        >
                          {vendor.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="q-order-page-filter"></div>
            <div className="q-order-page-filter"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterVendorList;
