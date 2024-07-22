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
