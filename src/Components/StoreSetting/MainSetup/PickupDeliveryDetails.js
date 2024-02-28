import React from "react";

import Switch from "@mui/material/Switch";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import ClockIcon from "../../../Assests/Filter/Clock.svg";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";

const PickupDeliveryDetails = () => {
  const MyStyle = () => {};
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
                  checked={{}}
                  onChange={{}}
                />
              </div>
            </div>
          </div>
          <div className="">
            <div className="qvrow">
              <div className="col-qv-3">
                <div class="input_area">
                  <label>Minimum Time</label>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                      components={[
                        "TimePicker",
                        "MobileTimePicker",
                        "DesktopTimePicker",
                        "StaticTimePicker",
                      ]}
                    >
                      <DemoItem>
                        <MobileTimePicker
                          defaultValue={dayjs("2022-04-17T15:30")}
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
                <div class="input_area">
                  <label>Minimum Time</label>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                      components={[
                        "TimePicker",
                        "MobileTimePicker",
                        "DesktopTimePicker",
                        "StaticTimePicker",
                        "ClockIcon",
                      ]}
                    >
                      <DemoItem>
                        <MobileTimePicker
                          className="border-none"
                          defaultValue={dayjs("2022-04-17T15:30")}
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

              <div className="col-qv-6">
                <div className="input_area">
                  <label>Convenience Fee ($)</label>

                  <input type="" id="" className="" value="" />
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
                    checked={{}}
                    onChange={{}}
                  />
                </div>
              </div>
            </div>
            <div className="qvrow">
              <div className="col-qv-6">
                <div className="input_area">
                  <label>Minimum Amount for Delivery ($)</label>

                  <input type="text" id="" className="" value="" />
                </div>
              </div>
              <div className="col-qv-6">
                <div className="input_area">
                  <label>Delivery Radius (Miles)</label>

                  <input type="" id="" className="" value="" />
                </div>
              </div>
            </div>
            {/* delivery time */}
            <div className="qvrow">
              <div className="col-qv-3">
                <div class="input_area">
                  <label>Delivery Time (Minutes)</label>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                      components={[
                        "TimePicker",
                        "MobileTimePicker",
                        "DesktopTimePicker",
                        "StaticTimePicker",
                      ]}
                    >
                      <DemoItem>
                        <MobileTimePicker
                          defaultValue={dayjs("2022-04-17T15:30")}
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
                <div class="input_area">
                  <label>Minimum Time</label>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                      components={[
                        "TimePicker",
                        "MobileTimePicker",
                        "DesktopTimePicker",
                        "StaticTimePicker",
                        "ClockIcon",
                      ]}
                    >
                      <DemoItem>
                        <MobileTimePicker
                          className="border-none"
                          defaultValue={dayjs("2022-04-17T15:30")}
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

              <div className="col-qv-6">
                <div className="input_area">
                  <label>Convenience Fee ($)</label>

                  <input type="" id="" className="" value="" />
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
