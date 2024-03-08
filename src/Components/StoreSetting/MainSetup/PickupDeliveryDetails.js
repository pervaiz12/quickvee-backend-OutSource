import React, { useState, useEffect } from "react";

import Switch from "@mui/material/Switch";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import ClockIcon from "../../../Assests/Filter/Clock.svg";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { useDispatch, useSelector } from "react-redux";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

const PickupDeliveryDetails = () => {
  const setupDataState = useSelector((state) => state?.StoreSetupList?.storesetupData)

  const [isEnableOrderNumber, setisEnableOrderNumber] = useState(true);
  const [isDelveryEnbale, setIsDelveryEnbale] = useState(true);
  const [minTime, setMinTime] = useState();
  const [maxtimechange, setMaxtimechange] = useState();
  const [convenience, SetConvenience] = useState();
  const [conveniencepik, SetConveniencepik] = useState();
  const [amountdelivery, setAmountdelivery] = useState();
  const [rateDelivery, SetRateDelivery] = useState();
  const dispatch = useDispatch();
  const [timeValues, setTimeValues] = useState({
    minPickupTime:"",
    maxPickupTime:"",
    minDeliveryTime:`00:${setupDataState.deliver_min_time}` ?? "",
    maxDeliveryTime:setupDataState?.deliver_max_time ?? "",
  })

  const handleCheckedSwitch = (e) => {
    setisEnableOrderNumber(!isEnableOrderNumber)
  }


  const handleCheckedclicked = (e) => {
    setIsDelveryEnbale(!isDelveryEnbale)
  }

  //const [minTime, setMinTime] = useState();

  const handleInputChange = (newValue) => {
    setTimeValues({
      ...timeValues,
      minDeliveryTime: newValue,
    });
  };


  const handleMaxtimeChange = (event) => {
    setMaxtimechange(event.target.value);
  };
  const handleConvenChange = (event) => {
    SetConvenience(event.target.value)
  }

  const handleAmountdel = (event) => {
    setAmountdelivery(event.target.value)
  }

  const handleRateDel = (event) => {
    SetRateDelivery(event.target.value)
  }
  const handleDelconv = (event) => {
    SetConveniencepik(event.target.value)
  }






  useEffect(() => {
    //console.log(setupDataState?.deliver_min_time)
    if (setupDataState?.cfee_pik) {
      SetConvenience(setupDataState.cfee_pik);
    }
    if (setupDataState?.delivery_fee) {
      setAmountdelivery(setupDataState.delivery_fee);
    }

    if (setupDataState?.rate_per_miles) {
      setAmountdelivery(setupDataState.rate_per_miles);
    }

    if (setupDataState?.cfee_del) {
      SetConveniencepik(setupDataState.cfee_del);
    }
  }, [setupDataState])


  return (
    <>
      <div className="box">
        <div class="box_shadow_div" style={{ padding: "20px" }}>
          <div className="">
            <h5 class="box_shadow_heading">Pickup & Delivery Details</h5>
          </div>

          <div class="qvrow">
            <div
              className=""
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div className="">
                <h5 class="box_shadow_heading">Enable Pickup</h5>
              </div>

              <div className="fr">
                <Switch
                  // {...label}
                  name="cost_method"
                  onChange={handleCheckedSwitch}
                  checked={isEnableOrderNumber}
                />
              </div>
            </div>
          </div>

          <div className="">
            <div className="qvrow">
              <div className="col-qv-3">
                <div className="input_area">
                  <label>Minimum Time:</label>
                  
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["MobileTimePicker"]}>
                      <DemoItem>
                        <MobileTimePicker
                         inputFormat="mm a"
                         value={timeValues?.minDeliveryTime}
                         onChange={handleInputChange}
                        //  renderInput={(params) => <input {...params} />}
                        />
                      </DemoItem>
                    </DemoContainer>
                  </LocalizationProvider>
                  <div
                    className=""
                    style={{
                      position: "relative",
                      bottom: "2rem",
                      right: "4px",
                    }}
                  >
                    <img src={ClockIcon} alt="" className="w-6 h-6 ml-auto" />
                  </div>
                </div>
              </div>


              <div className="col-qv-3">
                <div className="input_area">
                  <label>Maximum Time</label>
                  <input
                    type="time"
                    name="start_time"
                    value={setupDataState.deliver_max_time}
                    id="start_tym"
                    required
                    onChange={handleMaxtimeChange}
                  />
                  {/* <span>{formatTime(systemAccess.start_time)}</span> */}
                </div>
              </div>

              <div className="col-qv-6">
                <div className="input_area">
                  <label>Convenience Fee ($)</label>
                  <input
                    type="text"
                    placeholder="%0.00"
                    maxlength="8"
                    name="default_cash_drawer"
                    id="cash_drawer"
                    value={convenience}
                    onChange={handleConvenChange}
                  />

                  {/* <input type="" id="" className="" value="" /> */}
                </div>
              </div>
            </div>
            {/* add Enable Delivery */}

            <div class="qvrow">
              <div
                className=""
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div className="">
                  <h5 class="box_shadow_heading">Enable Delivery</h5>
                </div>

                <div className="fr">
                  <Switch
                    // {...label}
                    name="cost_method"
                    onChange={handleCheckedclicked}
                    checked={isDelveryEnbale}
                  />
                </div>
              </div>
            </div>
            <div className="qvrow">
              <div className="col-qv-6">
                <div className="input_area">
                  <label>Minimum Amount for Delivery ($)</label>

                  <input
                    type="text"
                    placeholder="%0.00"
                    maxlength="8"
                    name="default_cash_drawer"
                    id="cash_drawer"
                    value={amountdelivery}
                    onChange={handleAmountdel}
                  />
                </div>
              </div>
              <div className="col-qv-6">
                <div className="input_area">
                  <label>Delivery Radius (Miles)</label>

                  <input
                    type="text"
                    placeholder="%0.00"
                    maxlength="8"
                    name="default_cash_drawer"
                    id="cash_drawer"
                    value={rateDelivery}
                    onChange={handleRateDel}
                  />
                </div>
              </div>
            </div>
            {/* delivery time */}
            <div className="qvrow">
              <div className="col-qv-3">
                <div className="input_area">
                  <label> Delivery Time (Min)</label>
                  <input
                    type="time"
                    name="start_time"
                    value={setupDataState.deliver_min_time}
                    id="start_tym"
                    required
                    onChange={handleInputChange}
                  />
                  {/* <span>{formatTime(systemAccess.start_time)}</span> */}
                </div>
              </div>

              <div className="col-qv-3">
                <div className="input_area">
                  <label>Delivery Time (Max)</label>
                  <input
                    type="time"
                    name="start_time"
                    value={setupDataState.deliver_max_time}
                    id="start_tym"
                    required
                    onChange={handleMaxtimeChange}
                  />
                  {/* <span>{formatTime(systemAccess.start_time)}</span> */}
                </div>
              </div>

              <div className="col-qv-6">
                <div className="input_area">
                  <label>Convenience Fee ($)</label>

                  <input
                    type="text"
                    placeholder="%0.00"
                    maxlength="8"
                    name="default_cash_drawer"
                    id="cash_drawer"
                    value={conveniencepik}
                    onChange={handleDelconv}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PickupDeliveryDetails;
