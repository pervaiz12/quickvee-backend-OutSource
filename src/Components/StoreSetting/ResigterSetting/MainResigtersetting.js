import React, { useState, useEffect } from "react";

import { Box, Collapse, Alert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Input } from "@material-tailwind/react";
import RegisterSettingFormLogic from "./RegisterSettingFormLogic";
import TextField from "@mui/material/TextField";
import CustomHeader from "../../../reuseableComponents/CustomHeader";
import CircularProgress from "@mui/material/CircularProgress";

const MainResigtersetting = () => {
  // const [alertmsg, setAlertMsg] = useState('');
  const [openAlert, setOpenAlert] = useState(true);
  const {
    handleRegisterSettingInput,
    values,
    handleRegisterSettingSubmit,
    submitmessage,
    // showModal,
    // setShowModal,
    // scrollRef,,
    setsubmitmessage,
    loader
  } = RegisterSettingFormLogic();

  useEffect(() => {
    console.log("values", values);
  }, [values]);

  const goToTop = () => {
    setsubmitmessage();
  };
  return (
    <>
      {/* resigter method */}
      <div className="box">
        <div className="q-attributes-main-page">
          <div className="q-resigtersetting-top-detail-section">
            <div className="">
              <CustomHeader>Register Settings</CustomHeader>
              <div className="q-resigtersetting-bottom-section">
                <div className="q_resigter_checkboxfiled flex-wrap mt-8 px-7">
                  <ul className="custom-checkbox-list flex space-x-5">
                    <label className="q_resigter_setting_section">
                      <p
                        className={`${
                          values.regi_setting.split(",").includes("1")
                            ? "text-black"
                            : ""
                        } `}
                      >
                        Stock Prompt
                      </p>
                      <input
                        type="checkbox"
                        name="regi_setting[]"
                        value="1"
                        checked={values.regi_setting.split(",").includes("1")}
                        onChange={handleRegisterSettingInput}
                      />
                      <span className="checkmark"></span>
                    </label>

                    <label className="q_resigter_setting_section">
                      <p
                        className={`${
                          values.regi_setting.split(",").includes("2")
                            ? "text-black"
                            : ""
                        } `}
                      >
                        Combine Lines
                      </p>
                      <input
                        type="checkbox"
                        name="regi_setting[]"
                        value="2"
                        checked={values.regi_setting.split(",").includes("2")}
                        onChange={handleRegisterSettingInput}
                      />
                      <span className="checkmark"></span>
                    </label>

                    <label className="q_resigter_setting_section">
                      <p
                        className={`${
                          values.regi_setting.split(",").includes("3")
                            ? "text-black"
                            : ""
                        } `}
                      >
                        Customer Last Price Prompt
                      </p>
                      <input
                        type="checkbox"
                        name="regi_setting[]"
                        value="3"
                        checked={values.regi_setting.split(",").includes("3")}
                        onChange={handleRegisterSettingInput}
                      />
                      <span className="checkmark"></span>
                    </label>

                    <label className="q_resigter_setting_section">
                      <p
                        className={`${
                          values.regi_setting.split(",").includes("4")
                            ? "text-black"
                            : ""
                        } `}
                      >
                        Prompt Customer Info on PinPad
                      </p>
                      <input
                        type="checkbox"
                        name="regi_setting[]"
                        value="4"
                        checked={values.regi_setting.split(",").includes("4")}
                        onChange={handleRegisterSettingInput}
                      />
                      <span className="checkmark"></span>
                    </label>

                    <label className="q_resigter_setting_section">
                      <p
                        className={`${
                          values.denomination ? "text-black" : ""
                        } `}
                      >
                        Denomination
                      </p>
                      <input
                        type="checkbox"
                        name="denomination"
                        checked={values.denomination}
                        onChange={handleRegisterSettingInput}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </ul>
                </div>
                <div className="q-resigtersetting-bottom-section mt-8 px-7">
                  <div className="heading">Payment Method</div>

                  <div className="q_resigter_checkboxfiled mt-8">
                    <ul className="custom-checkbox-list flex space-x-5">
                      <label className="q_resigter_setting_section">
                        <p
                          className={`${
                            values.ebt_type.split(",").includes("1")
                              ? "text-black"
                              : ""
                          } `}
                        >
                          Food EBT
                        </p>
                        {/* <input type="checkbox" checked="checked" />  */}
                        <input
                          type="checkbox"
                          name="ebt_type[]"
                          value="1"
                          checked={values.ebt_type.split(",").includes("1")}
                          onChange={handleRegisterSettingInput}
                        />
                        <span className="checkmark"></span>
                      </label>

                      <label className="q_resigter_setting_section">
                        <p
                          className={`${
                            values.ebt_type.split(",").includes("2")
                              ? "text-black"
                              : ""
                          } `}
                        >
                          Cash EBT
                        </p>
                        <input
                          type="checkbox"
                          name="ebt_type[]"
                          value="2"
                          checked={values.ebt_type.split(",").includes("2")}
                          onChange={handleRegisterSettingInput}
                        />
                        <span className="checkmark"></span>
                      </label>

                      <label className="q_resigter_setting_section">
                        <p
                          className={`${
                            values.ebt_type.split(",").includes("3")
                              ? "text-black"
                              : ""
                          } `}
                        >
                          Gift Card
                        </p>
                        <input
                          type="checkbox"
                          name="ebt_type[]"
                          value="3"
                          checked={values.ebt_type.split(",").includes("3")}
                          onChange={handleRegisterSettingInput}
                        />
                        <span className="checkmark"></span>
                      </label>
                    </ul>
                  </div>
                </div>
                <div className="q-resigtersetting-bottom-section mt-8 px-7">
                  <div className="heading">Quick Add</div>

                  <div className="text-sm text-[#545454] CircularSTDBook">
                    Quick Add If bar code scanned is not found
                  </div>
                  <div className="q_resigter flex-wrap mt-8">
                    <ul className="custom-checkbox-list flex space-x-5">
                      <label className="q_setting_radio_resigter">
                        <p
                          className={`${
                            values.barcode_msg === "1" ? "text-black" : ""
                          } `}
                        >
                          Display ‘Item not Found’
                        </p>
                        <input
                          type="radio"
                          name="barcode_msg"
                          value="1"
                          onChange={handleRegisterSettingInput}
                          checked={values.barcode_msg === "1"}
                        />
                        <span className="checkmark_section"></span>
                      </label>

                      <label className="q_setting_radio_resigter">
                        <p
                          className={`${
                            values.barcode_msg === "2" ? "text-black" : ""
                          } `}
                        >
                          Quick Enter, Forced
                        </p>
                        <input
                          type="radio"
                          name="barcode_msg"
                          value="2"
                          onChange={handleRegisterSettingInput}
                          checked={values.barcode_msg === "2"}
                        />
                        <span className="checkmark_section"></span>
                      </label>
                      <label className="q_setting_radio_resigter">
                        <p
                          className={`${
                            values.barcode_msg === "3" ? "text-black" : ""
                          } `}
                        >
                          Quick Enter, Prompt
                        </p>
                        <input
                          type="radio"
                          name="barcode_msg"
                          value="3"
                          onChange={handleRegisterSettingInput}
                          checked={values.barcode_msg === "3"}
                        />
                        <span className="checkmark_section"></span>
                      </label>
                      <label className="q_setting_radio_resigter">
                        <p
                          className={`${
                            values.barcode_msg === "4" ? "text-black" : ""
                          } `}
                        >
                          Full Enter, Forced
                        </p>
                        <input
                          type="radio"
                          name="barcode_msg"
                          value="4"
                          onChange={handleRegisterSettingInput}
                          checked={values.barcode_msg === "4"}
                        />
                        <span className="checkmark_section"></span>
                      </label>
                      <label className="q_setting_radio_resigter">
                       <p
                         className={`${
                          values.barcode_msg === "5" ? "text-black" : ""
                        } `}
                       >
                        Full Enter, Prompt
                        </p> 
                        <input
                          type="radio"
                          name="barcode_msg"
                          value="5"
                          onChange={handleRegisterSettingInput}
                          checked={values.barcode_msg === "5"}
                        />
                        <span className="checkmark_section"></span>
                      </label>
                    </ul>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 px-7">
                  <div className="q_resigter_label">
                    <label className="text-[#6A6A6A] " htmlFor="idlelogout">
                      Idle Logout Minutes
                    </label>
                    <div className="w-full mt-2">
                      {/* <Input
                        className="q_input_resigter"
                        name="idel_logout"
                        onChange={handleRegisterSettingInput}
                        value={values.idel_logout}
                        placeholder="Enter idle logout"
                      /> */}
                      <TextField
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                              borderColor: "black",
                            },
                          },
                        }}
                        id="outlined-basic"
                        type="text"
                        name="idel_logout"
                        placeholder="Enter idle logout"
                        onChange={handleRegisterSettingInput}
                        value={values.idel_logout}
                        variant="outlined"
                        size="small"
                      />
                    </div>
                    <span className="input-error">
                      {values.errors.idel_logout !== ""
                        ? values.errors.idel_logout
                        : ""}
                    </span>
                  </div>
                  {/* <div className="q_resigter_label">
                    <label className="text-[#6A6A6A] ml-2" htmlFor="devicename">
                      device name
                    </label>
                    <div className="w-full">
                      <Input
                        className="q_input_resigter"
                        name="device_name"
                        onChange={handleRegisterSettingInput}
                        value={values.device_name}
                        placeholder="Enter device name"
                      />
                    </div>
                    <span className="input-error">
                      {values.errors.device_name !== ""
                        ? values.errors.device_name
                        : ""}
                    </span>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* payment method */}

      {/* discount promote */}
      {/* <div className="q-resigtersetting-main-page">
        <div className="box">
          <div className="q-resigtersetting-top-detail-section">
            <div>
              <div className=""> */}
      {/* <div className="q-resigtersetting-bottom-section">
                  <div className="q_setting_main_Section">Discount Prompt</div>

                  <div className="q_resigter flex-wrap mt-8">
                    <ul className="custom-checkbox-list flex space-x-5">
                      <label className="q_setting_radio_resigter">
                        No Reason
                        <input
                          type="radio"
                          name="discount_prompt"
                          value="1"
                          onChange={handleRegisterSettingInput}
                          checked={values.discount_prompt === "1"}
                        />
                        <span className="checkmark_section"></span>
                      </label>

                      <label className="q_setting_radio_resigter">
                        Ask Reason
                        <input
                          type="radio"
                          name="discount_prompt"
                          value="2"
                          onChange={handleRegisterSettingInput}
                          checked={values.discount_prompt === "2"}
                        />
                        <span className="checkmark_section"></span>
                      </label>
                    </ul>
                  </div>
                </div> */}

      {/* <div className="q-resigtersetting-bottom-section mt-8">
                  <div className="q_setting_main_Section">Round Invoice</div>

                  <div className="q_resigter flex-wrap mt-8">
                    <ul className="custom-checkbox-list flex space-x-5">
                      <label className="q_setting_radio_resigter">
                        Disabled
                        <input
                          type="radio"
                          name="round_invoice"
                          value="1"
                          onChange={handleRegisterSettingInput}
                          checked={values.round_invoice === "1"}
                        />
                        <span className="checkmark_section"></span>
                      </label>

                      <label className="q_setting_radio_resigter">
                        $0.05
                        <input
                          type="radio"
                          name="round_invoice"
                          value="2"
                          onChange={handleRegisterSettingInput}
                          checked={values.round_invoice === "2"}
                        />
                        <span className="checkmark_section"></span>
                      </label>
                      <label className="q_setting_radio_resigter">
                        $0.10
                        <input
                          type="radio"
                          name="round_invoice"
                          value="3"
                          onChange={handleRegisterSettingInput}
                          checked={values.round_invoice === "3"}
                        />
                        <span className="checkmark_section"></span>
                      </label>
                      <label className="q_setting_radio_resigter">
                        $1.00
                        <input
                          type="radio"
                          name="round_invoice"
                          value="4"
                          onChange={handleRegisterSettingInput}
                          checked={values.round_invoice === "4"}
                        />
                        <span className="checkmark_section"></span>
                      </label>
                      <label className="q_setting_radio_resigter">
                        Nearest $0.05
                        <input
                          type="radio"
                          name="round_invoice"
                          value="5"
                          onChange={handleRegisterSettingInput}
                          checked={values.round_invoice === "5"}
                        />
                        <span className="checkmark_section"></span>
                      </label>
                      <label className="q_setting_radio_resigter">
                        Nearest $0.10
                        <input
                          type="radio"
                          name="round_invoice"
                          value="6"
                          onChange={handleRegisterSettingInput}
                          checked={values.round_invoice === "6"}
                        />
                        <span className="checkmark_section"></span>
                      </label>
                      <label className="q_setting_radio_resigter">
                        Nearest $1.00
                        <input
                          type="radio"
                          name="round_invoice"
                          value="7"
                          onChange={handleRegisterSettingInput}
                          checked={values.round_invoice === "7"}
                        />
                        <span className="checkmark_section"></span>
                      </label>
                    </ul>
                  </div>
                </div> */}
      {/* </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* quick add */}

      {/* device  section */}

      {/* customer loyalty promote */}
      <div className="q-resigtersetting-main-page">
        {/* <div className="box">
          <div className="q-resigtersetting-top-detail-section">
            <div className="q-resigtersetting-bottom-section">
              <div className="q_setting_main_Section">
                Customer Loyalty Prompt
              </div>

              <div className="text-sm text-[#545454] CircularSTDBook">
                When a loyalty card is not associated with a Customer:
              </div>
              <div className="q_resigter flex-wrap mt-8">
                <ul className="custom-checkbox-list flex space-x-5">
                  <label className="q_setting_radio_resigter">
                    All the Sale
                    <input
                      type="radio"
                      name="customer_loyalty"
                      value="1"
                      onChange={handleRegisterSettingInput}
                      checked={values.customer_loyalty === "1"}
                    />
                    <span className="checkmark_section"></span>
                  </label>
                  <label className="q_setting_radio_resigter">
                    Prompt to Create a Customer
                    <input
                      type="radio"
                      name="customer_loyalty"
                      value="2"
                      onChange={handleRegisterSettingInput}
                      checked={values.customer_loyalty === "2"}
                    />
                    <span className="checkmark_section"></span>
                  </label>
                  <label className="q_setting_radio_resigter">
                    Require a Customer be Created
                    <input
                      type="radio"
                      name="customer_loyalty"
                      value="3"
                      onChange={handleRegisterSettingInput}
                      checked={values.customer_loyalty === "3"}
                    />
                    <span className="checkmark_section"></span>
                  </label>
                </ul>
              </div>
            </div>
          </div>
        </div> */}
        <div className="fixed-bottom">
          <div
            className="q-resigtersetting-main-page text-end  box_shadow_div"
            style={{ marginBottom: 0, paddingRight: 20 }}
          >
            <button
              className="store-setting-btn mt-5 mb-5 attributeUpdateBTN"
              onClick={handleRegisterSettingSubmit}
              disabled={loader}
            >
              {/* Update */}
              {loader ? (
                    <>
                      <CircularProgress color={"inherit"} width={15} size={15} />{" "}
                      Update
                    </>
                  ) : (
                    "Update"
                  )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainResigtersetting;
