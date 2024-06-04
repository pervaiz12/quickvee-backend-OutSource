import React, { useState, useEffect } from "react";

import Switch from "@mui/material/Switch";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import ClockIcon from "../../../Assests/Filter/Clock.svg";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { useDispatch, useSelector } from "react-redux";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { event } from "jquery";
import { Grid } from "@mui/material";
import BasicTextFields from "../../../reuseableComponents/TextInputField";
import useCurrencyInput from "../../../hooks/useCurrencyInput";

const PickupDeliveryDetails = ({ pickupdeliverydata }) => {
  const setupDataState = useSelector(
    (state) => state?.StoreSetupList?.storesetupData
  );

  const [isEnableOrderNumber, setisEnableOrderNumber] = useState(true);
  const [isDelveryEnbale, setIsDelveryEnbale] = useState(true);
  const [minTime, setMinTime] = useState();
  const [convenience, SetConvenience] = useCurrencyInput("0.00");
  const [conveniencepik, SetConveniencepik] = useCurrencyInput("0.00");
  const [amountdelivery, setAmountdelivery] = useState();
  const [rateDelivery, SetRateDelivery] = useCurrencyInput("0.00");
  const [MinPickupTime, setMinPickupTime] = useState();
  const [MaxPickupTime, setMaxPickupTime] = useState();
  const [MinDeliveryTime, setMinDeliveryTime] = useState();
  const [MaxDeliveryTime, setMaxDeliveryTime] = useState();
  const [MinAmountdelivery, setMinAmountdelivery] = useCurrencyInput("0.00");
  const dispatch = useDispatch();
  // const [timeValues, setTimeValues] = useState({
  //   minPickupTime:"",
  //   maxPickupTime:"",
  //   minDeliveryTime:`00:${setupDataState.deliver_min_time}` ?? "",
  //   maxDeliveryTime:setupDataState?.deliver_max_time ?? "",
  // })

  const handleCheckedSwitch = (e) => {
    setisEnableOrderNumber(!isEnableOrderNumber);
  };

  const handleCheckedclicked = (e) => {
    setIsDelveryEnbale(!isDelveryEnbale);
  };

  //const [minTime, setMinTime] = useState();

  useEffect(() => {
    //console.log(setupDataState?.deliver_min_time)
    if (setupDataState?.cfee_pik) {
      SetConvenience({
        target: { value: parseFloat(setupDataState.cfee_pik).toFixed(2) },
      });
    }
    if (setupDataState?.min_delivery_amt) {
      setMinAmountdelivery({
        target: { value: setupDataState.min_delivery_amt },
      });
    }

    if (setupDataState?.rate_per_miles) {
      setAmountdelivery(setupDataState.rate_per_miles);
    }

    if (setupDataState?.cfee_del) {
      SetConveniencepik({
        target: { value: parseFloat(setupDataState.cfee_del).toFixed(2) },
      });
    }

    if (setupDataState?.pickup_min_time) {
      setMinPickupTime(setupDataState.pickup_min_time);
    }
    if (setupDataState?.pickup_max_time) {
      setMaxPickupTime(setupDataState.pickup_max_time);
    }
    if (setupDataState?.deliver_min_time) {
      setMinDeliveryTime(setupDataState.deliver_min_time);
    }
    if (setupDataState?.deliver_max_time) {
      setMaxDeliveryTime(setupDataState.deliver_max_time);
    }

    if (setupDataState?.max_delivery_radius) {
      SetRateDelivery({
        target: { value: setupDataState.max_delivery_radius },
      });
    }
  }, [setupDataState]);

  const handleMinPickupTime = (event) => {
    setMinPickupTime(event.target.value);
  };
  const handleMaxPickupTime = (event) => {
    setMaxPickupTime(event.target.value);
  };
  const handleMinDeliveryTime = (event) => {
    setMinDeliveryTime(event.target.value);
  };
  const handleMaxDeliveryTime = (event) => {
    setMaxDeliveryTime(event.target.value);
  };
  useEffect(() => {
    pickupdeliverydata(
      isEnableOrderNumber,
      MinPickupTime,
      MaxPickupTime,
      convenience,
      isDelveryEnbale,
      MinAmountdelivery,
      rateDelivery,
      MinDeliveryTime,
      MaxDeliveryTime,
      conveniencepik
    );
  }, [
    isEnableOrderNumber,
    MinPickupTime,
    MaxPickupTime,
    convenience,
    isDelveryEnbale,
    MinAmountdelivery,
    rateDelivery,
    MinDeliveryTime,
    MaxDeliveryTime,
    conveniencepik,
  ]);

  return (
    <>
      <Grid container className="box">
        <Grid item xs={12} sx={{ padding: 2.5 }} className="box_shadow_div">
          <Grid container>
            <h5 class="box_shadow_heading">Pickup & Delivery Details</h5>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ marginTop: 3 }}
          >
            <Grid item>
              <h5 style={{ marginBottom: 0 }} className="box_shadow_heading">
                Enable Pickup
              </h5>
            </Grid>
            <Grid item>
              <Switch
                // {...label}
                name="cost_method"
                onChange={handleCheckedSwitch}
                checked={isEnableOrderNumber}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <label>Minimum Time:</label>
                  <BasicTextFields
                    type="number"
                    value={MinPickupTime}
                    required
                    onChangeFun={handleMinPickupTime}
                  />
                </Grid>
                <Grid item xs={6}>
                  <label>Maximum Time</label>
                  <BasicTextFields
                    type="number"
                    value={MaxPickupTime}
                    required
                    onChangeFun={handleMaxPickupTime}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <div>
                <label>Convenience Fee ($)</label>
                <BasicTextFields
                  type="text"
                  placeholder="%0.00"
                  maxLength={10}
                  name="default_cash_drawer"
                  id="cash_drawer"
                  value={convenience}
                  onChangeFun={SetConvenience}
                />
              </div>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ marginTop: 3 }}
          >
            <Grid item>
              <h5 style={{ marginBottom: 0 }} class="box_shadow_heading">
                Enable Delivery
              </h5>
            </Grid>
            <Grid>
              <Switch
                // {...label}
                name="cost_method"
                onChange={handleCheckedclicked}
                checked={isDelveryEnbale}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <label>Minimum Amount for Delivery ($)</label>
              <BasicTextFields
                type="text"
                placeholder="%0.00"
                maxLength="8"
                name="default_cash_drawer"
                id="cash_drawer"
                value={MinAmountdelivery}
                onChangeFun={setMinAmountdelivery}
              />
            </Grid>
            <Grid item xs={6}>
              <label>Delivery Radius (Miles)</label>
              <BasicTextFields
                type="text"
                placeholder="%0.00"
                maxLength="8"
                name="default_cash_drawer"
                id="cash_drawer"
                value={rateDelivery}
                onChangeFun={SetRateDelivery}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{ marginTop: 0 }}>
            <Grid item xs={6}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <label> Delivery Time (Min)</label>
                  <BasicTextFields
                    type="number"
                    value={MinDeliveryTime}
                    required
                    onChangeFun={handleMinDeliveryTime}
                  />
                </Grid>
                <Grid item xs={6}>
                  <label>Delivery Time (Max)</label>
                  <BasicTextFields
                    type="number"
                    value={MaxDeliveryTime}
                    required
                    onChangeFun={handleMaxDeliveryTime}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <label>Convenience Fee ($)</label>
              <BasicTextFields
                type="text"
                placeholder="%0.00"
                maxlength="8"
                name="default_cash_drawer"
                id="cash_drawer"
                value={conveniencepik}
                onChangeFun={SetConveniencepik}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default PickupDeliveryDetails;
