import React, { useState, useEffect } from "react";
import StoreOrderList from "./StoreOrderList";
import DownIcon from "../../Assests/Dashboard/Down.svg";
import SelectDropDown from "../../reuseableComponents/SelectDropDown";
import { Grid } from "@mui/material";

const StoreOrderFilter = ({ onFilterDataChange }) => {
  const OrderStatus = [
    {
      title: "Paid",
    },
    {
      title: "Unpaid",
    },
    {
      title: "Both",
    },
  ];

  const orderType = [
    {
      title: "Online Order",
    },
    {
      title: "Store Order",
    },
    {
      title: "Both",
    },
  ];

  const [selectedOrderStatus, setSelectedOrderStatus] = useState("Paid");
  const [selectedOrderType, setSelectedOrderType] = useState("Online Order");

  const [orderStatusDropdownVisible, setOrderStatusDropdownVisible] =
    useState(false);
  const [orderTypeDropdownVisible, setOrderTypeDropdownVisible] =
    useState(false);

  const toggleDropdown = (dropdown) => {
    switch (dropdown) {
      case "OrderStatus":
        setOrderStatusDropdownVisible(!orderStatusDropdownVisible);
        break;
      case "orderType":
        setOrderTypeDropdownVisible(!orderTypeDropdownVisible);
        break;
      default:
        break;
    }
  };

  const handleOptionClick = (option, dropdown) => {
    // console.log(option);
    switch (dropdown) {
      case "OrderStatus":
        setSelectedOrderStatus(option.title);
        setOrderStatusDropdownVisible(false);
        break;
      case "orderType":
        setSelectedOrderType(option.title);
        setOrderTypeDropdownVisible(false);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    onFilterDataChange(selectedOrderStatus, selectedOrderType);
  }, [selectedOrderStatus, selectedOrderType]);

  return (
    <>
      {/* <div className="box">
            <div className="q-category-bottom-detail-section">
                <div className="">
                    <div className="q-category-bottom-header">
                        <div className='q_details_header ml-2'>Store Order</div>
                    </div>
                </div>

                <div className="q-order-page-container ml-8">
                    <div className="q-order-page-filter">
                        <label className="q-details-page-label" htmlFor="OrderStatusFilter">
                            Order Status
                        </label>
                        <div className="custom-dropdown">
                            <div
                                className="custom-dropdown-header"
                                onClick={() => toggleDropdown("OrderStatus")}
                            >
                                <span className="selected-option mt-1">{selectedOrderStatus}</span>
                                <img src={DownIcon} alt="Down Icon" className="w-8 h-8" />
                            </div>
                            {orderStatusDropdownVisible && (
                                <div className="dropdown-content ">
                                    <div onClick={() => handleOptionClick("Paid", "OrderStatus")}>Paid</div>
                                    <div onClick={() => handleOptionClick("Unpaid", "OrderStatus")}>Unpaid</div>
                                    <div onClick={() => handleOptionClick("Both", "OrderStatus")}>Both</div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="q-order-page-filter">
                        <label className="q-details-page-label" htmlFor="orderTypeFilter">
                            Order Type
                        </label>
                        <div className="custom-dropdown">
                            <div
                                className="custom-dropdown-header"
                                onClick={() => toggleDropdown("orderType")}
                            >
                                <span className="selected-option mt-1">{selectedOrderType}</span>
                                <img src={DownIcon} alt="Down Icon" className="w-8 h-8" />
                            </div>
                            {orderTypeDropdownVisible && (
                                <div className="dropdown-content">
                                    <div onClick={() => handleOptionClick("Online", "orderType")}>Online</div>
                                    <div onClick={() => handleOptionClick("Offline", "orderType")}>Offline</div>
                                    <div onClick={() => handleOptionClick("Both", "orderType")}>Both</div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>

            </div>
            </div> */}

      <div className="box_shadow_div_order ">
        <Grid item className="q-category-bottom-header" xs={12}>
          <h1 className="text-xl font-medium">Store Order</h1>
        </Grid>

        <div className="px-6  ">
          <Grid container spacing={4} className="">
            <Grid item xs={6}>
              <label> Order Status</label>
              <SelectDropDown
              sx={{pt:0.5}}
                listItem={OrderStatus}
                title={"title"}
                onClickHandler={handleOptionClick}
                selectedOption={selectedOrderStatus}
                dropdownFor={"OrderStatus"}
              />
            </Grid>
            <Grid item xs={6}>
              <label> Order Type</label>
              <SelectDropDown
              sx={{pt:0.5}}
                listItem={orderType}
                title={"title"}
                onClickHandler={handleOptionClick}
                selectedOption={selectedOrderType}
                dropdownFor={"orderType"}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default StoreOrderFilter;
