
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Grid } from "@mui/material";
import BasicTextFields from "../../../reuseableComponents/TextInputField";
import useCurrencyInput from "../../../hooks/useCurrencyInput";
const FlatDelivery = ({ DeliveryFeeData }) => {
  const [deleveryChange, setDelveryChange] = useCurrencyInput("0.00");
  const [delveryRates, setDeleveryRate] = useCurrencyInput("0.00");

  const dispatch = useDispatch();
  // State to keep track of the active tab
  const [activeTab, setActiveTab] = useState("0");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleDelChanges = (event) => {
    //  console.log(event.target.error);
    setDelveryChange(event.target.value);
  };

  const handleRateMiles = (event) => {
    setDeleveryRate(event.target.value);
  };

  const setupDataState = useSelector(
    (state) => state?.StoreSetupList?.storesetupData
  );

  useEffect(() => {
    // console.log(setupDataState?.float_delivery)
    if (setupDataState?.delivery_fee) {
      setDelveryChange({ target: { value: setupDataState.delivery_fee } });
    }
    if (setupDataState?.rate_per_miles) {
      setDeleveryRate({ target: { value: setupDataState.rate_per_miles } });
    }
    if (setupDataState?.float_delivery) {
      setActiveTab(setupDataState.float_delivery);
    }
  }, [setupDataState]);

  useEffect(() => {
    DeliveryFeeData(activeTab, deleveryChange, delveryRates);
  }, [activeTab, deleveryChange, delveryRates]);

  return (
    <>
      <Grid container sx={{ p: 2.5 }} className="box_shadow_div">
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={6} sm={4} md={3} lg={2}>
              <div
                className={`cursor-pointer text-center  rounded py-2 text-[14px]  ${
                  activeTab === "0"
                    ? "bg-[#0A64F9] text-white"
                    : "bg-[#F5F5F5] text-[#6A6A6A]"
                }`}
                onClick={() => handleTabClick("0")}
              >
                Flat Delivery Fee
              </div>
            </Grid>
            <Grid item xs={6} sm={4} md={3} lg={2}>
              <div
                className={`cursor-pointer text-center  rounded py-2  text-[14px]  ${
                  activeTab === "1"
                    ? "bg-[#0A64F9] text-white"
                    : "bg-[#F5F5F5] text-[#6A6A6A]"
                }`}
                onClick={() => handleTabClick("1")}
              >
                Per Mile Delivery Fee
              </div>
            </Grid>
          </Grid>

          <Grid container spacing={3} sx={{ pt: 2 }}>
            {activeTab === "0" && (
              <Grid item xs={12} sm={6}>
                <label>Delivery Fee ($)</label>
                <BasicTextFields
                  type="text"
                  placeholder="%0.00"
                  maxLength={8}
                  name="default_delvery_setup"
                  id="delvery_setup"
                  value={deleveryChange}
                  onChangeFun={setDelveryChange}
                />
              </Grid>
            )}
            {activeTab === "1" && (
              <>
                <Grid item xs={12} sm={6}>
                  <label>Min Delivery Fee ($)</label>
                  <BasicTextFields
                    type="text"
                    placeholder="%0.00"
                    maxLength={8}
                    name="default_delvery_setup"
                    id="delvery_setup"
                    value={deleveryChange}
                    onChangeFun={setDelveryChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <label>Delivery Rate per Miles ($)</label>
                  <BasicTextFields
                    type="text"
                    placeholder="%0.00"
                    maxLength={8}
                    name="default_delvery_setup"
                    id="delvery_setup"
                    value={delveryRates}
                    onChangeFun={setDeleveryRate}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </Grid>

    </>
  );
};

export default FlatDelivery;
