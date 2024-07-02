import React, { useEffect, useState } from "react";
import "../../../Styles/StoreSetting.css";
import "../../../Styles/Settings/SystemAccess.css";
import Switch from "@mui/material/Switch";
import {
  fetchInventoryListData,
  updateInventoryData,
} from "../../../Redux/features/Inventory/InventorySlice";
import { useSelector, useDispatch } from "react-redux";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import { ToastifyAlert } from "../../../CommonComponents/ToastifyAlert";
import Loader from "../../../CommonComponents/Loader";
import { Box, CircularProgress } from "@mui/material";

const InventoryData = () => {
  const {
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    userTypeData,
    GetSessionLogin,
  } = useAuthDetails();
  const label = { inputProps: { "aria-label": "Switch demo" } };

  const [isSwitchEnabledCost, setIsSwitchCost] = useState(false);

  const [isSwitchEnabled, setIsSwitchEnabled] = useState(false);
  const [isCheckBirthday, setCheckBirthday] = useState(false);
  const [isExpiration, setExpiration] = useState(false);
  const [checkedBirthDayChecked, setirthDayChecked] = useState(false);
  const [ExpirationIdChecked, setExpirationIdChecked] = useState(false);

  const [isUpdateItem, setUpdateItemVendor] = useState(false);
  // Require Description for Instant POs
  const [isInstantPos, setInstantPos] = useState(false);

  const [disableCheckboxesCost, setDisableCheckboxesCost] = useState(false);

  const [fetchLoading, setFetchLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [inventory, setAllInventory] = useState({
    cost_method: "",
    age_verify_birthday: "",
    age_verify_expiration: "",
    inv_setting_update: "",
    inv_setting_require: "",
    cost_per: "",
    by_scanning: "",
  });

  const [costPer, setCostPer] = useState("");

  // const AllInventoryAccessState = useSelector(
  //   (state) => state.inventoryDataList
  // );
  let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;

  const dispatch = useDispatch();

  const fetchInventoryData = () => {
    setFetchLoading(true);
    let data = {
      merchant_id,
      ...userTypeData,
    };
    if (data) {
      dispatch(fetchInventoryListData(data))
        .then((res) => {
          setAllInventory(res?.payload);
          setCostPer(res?.payload?.cost_per || "");
        })
        .catch((err) => {
          ToastifyAlert("Error!", "error");
        })
        .finally(() => {
          setFetchLoading(false);
        });
    }
  };

  useEffect(() => {
    fetchInventoryData();
  }, []);

  // useEffect(() => {
  //   if (
  //     !AllInventoryAccessState.loading &&
  //     AllInventoryAccessState.inventoryData
  //   ) {
  //     setAllInventory(AllInventoryAccessState.inventoryData);
  //     setCostPer(AllInventoryAccessState.inventoryData.cost_per || "");
  //   }
  // }, [AllInventoryAccessState.loading]);

  const IsBirthdaytoggleInput = () => {
    setCheckBirthday(!isCheckBirthday);
  };

  const IsExpirationtoggleInput = () => {
    setExpiration(!isExpiration);
  };

  //Update Item Vendor Cost from POs
  const IsUpdatetoggleInput = () => {
    setUpdateItemVendor(!isUpdateItem);
  };

  const IsInstanttoggleInput = () => {
    setInstantPos(!isInstantPos);
  };

  const handleCostPerChange = (e) => {
    const { name, value } = e.target;

    let fieldValue;
    fieldValue = value
      // Remove extra dots and ensure only one dot exists at most
      .replace(/[^\d.]/g, "") // Allow digits and dots only
      .replace(/^(\d*\.)(.*)\./, "$1$2") // Remove extra dots
      .replace(/^(\d*\.\d*)(.*)\./, "$1$2"); // Remove extra dots after the decimal point

    let inputStr = fieldValue.replace(/\D/g, "");
    inputStr = inputStr.replace(/^0+/, "");

    if (inputStr.length == "") {
      fieldValue = "0.00";
    } else if (inputStr.length === 1) {
      fieldValue = "0.0" + inputStr;
    } else if (inputStr.length === 2) {
      fieldValue = "0." + inputStr;
    } else {
      fieldValue =
        inputStr.slice(0, inputStr.length - 2) + "." + inputStr.slice(-2);
    }

    setCostPer(fieldValue);
  };

  const handleCostMethod = () => {
    setIsSwitchCost(!isSwitchEnabledCost);
    setUpdateItemVendor(false);

    setDisableCheckboxesCost(!disableCheckboxesCost);
  };

  const handleEnablePickup = () => {
    setIsSwitchEnabled(!isSwitchEnabled);

    setCheckBirthday(false);
    setExpiration(false);

    setirthDayChecked(!checkedBirthDayChecked);
    setExpirationIdChecked(!ExpirationIdChecked);
  };

  const setAgeVerificationData = () => {
    if (inventory?.by_scanning === "0") {
      if (inventory?.age_verify === "") {
        setCheckBirthday(false);
        setExpiration(false);
      } else if (inventory?.age_verify === "1") {
        setCheckBirthday(true);
        setExpiration(false);
      } else if (inventory?.age_verify === "2") {
        setCheckBirthday(false);
        setExpiration(true);
      } else if (inventory?.age_verify === "1,2") {
        setCheckBirthday(true);
        setExpiration(true);
      }
    } else {
      setCheckBirthday(false);
      setExpiration(false);
    }
  };

  useEffect(() => {
    if (isSwitchEnabled === false) {
      if (inventory?.age_verify) {
        setAgeVerificationData();
      }
    }
  }, [isSwitchEnabled, inventory]);

  useEffect(() => {
    if (inventory?.by_scanning === "1") {
      setIsSwitchEnabled(true);
      setCheckBirthday(false);
      setExpiration(false);
      setirthDayChecked(true);
      setExpirationIdChecked(true);
    } else {
      setIsSwitchEnabled(false);
      setCheckBirthday(true);
      setExpiration(true);
      setirthDayChecked(false);
      setExpirationIdChecked(false);
    }

    if (inventory?.cost_method === "1") {
      setDisableCheckboxesCost(true);
      setIsSwitchCost(true);
      setUpdateItemVendor(false);
    } else {
      setIsSwitchCost(false);
      setUpdateItemVendor(true);
      setDisableCheckboxesCost(false);
    }

    if (inventory?.inv_setting === "3") {
      setInstantPos(false);
      setUpdateItemVendor(false);
    } else if (inventory?.inv_setting === "1,3") {
      setUpdateItemVendor(true);
      setInstantPos(false);
    } else if (inventory?.inv_setting === "2,3") {
      setUpdateItemVendor(false);
      setInstantPos(true);
    } else if (inventory?.inv_setting === "1,2,3") {
      setUpdateItemVendor(true);
      setInstantPos(true);
    }

    setAgeVerificationData();
  }, [inventory]);

  const handleSave = () => {
    setLoading(true);
    const data = {
      merchant_id,
      cost_method: isSwitchEnabledCost ? "1" : "2",
      age_verify:
        !!isCheckBirthday && !!isExpiration
          ? "1,2"
          : isCheckBirthday
            ? "1"
            : isExpiration
              ? "2"
              : "",
      by_scanning: isSwitchEnabled ? "1" : "0",
      inv_setting:
        !!isUpdateItem && !!isInstantPos
          ? "1,2"
          : isUpdateItem
            ? "1"
            : isInstantPos
              ? "2"
              : "",
      cost_per: costPer,
      ...userTypeData,
    };

    dispatch(updateInventoryData(data))
      .then((res) => {
        if (
          res?.payload?.message === "Inventory settings Updated Successfully"
        ) {
          ToastifyAlert("Inventory Data Updated Successfully!", "success");
          // called fetch APi again
          fetchInventoryData();
        }
      })
      .catch((err) => {
        ToastifyAlert("Error!", "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="box" >
        {fetchLoading ? (
          <div class="loading-box">
            <Loader />
          </div>
        ) : (
          <>
            <div className="box_shadow_div" style={{ padding: "20px" }}>
              <div className=" qvrow-inventory-row">
                <h5
                  className="box_shadow_heading "
                  style={{ marginBottom: "0px" }}
                >
                  Average Cost Method
                </h5>
                <Switch
                  {...label}
                  name="cost_method"
                  checked={isSwitchEnabledCost}
                  onChange={handleCostMethod}
                />
              </div>
            </div>
            <div className="box_shadow_div" style={{ padding: "20px" }}>
              <div className="qvrow">
                <h5 className="box_shadow_heading btm-margin">Future Order</h5>
                <div className="qvrow-inventory-row">
                  <h6 className="box_shadow_heading section-heading">
                    Enable Pickup
                  </h6>
                  <Switch
                    {...label}
                    name="by_scanning"
                    checked={isSwitchEnabled}
                    onChange={handleEnablePickup}
                  />
                </div>

                <div className="qv_checkbox btm-margin">
                  <label className="qv_checkbox_add_checkmark_label age-input">
                    Check ID - Birthday Prompt
                    <input
                      type="checkbox"
                      className="psize-input psize-input"
                      id="checkbox1"
                      name="age_verify_birthday"
                      value={isCheckBirthday}
                      checked={isCheckBirthday}
                      onChange={IsBirthdaytoggleInput}
                      disabled={checkedBirthDayChecked}
                    />
                    <span className="qv_add_checkmark"></span>
                  </label>
                </div>
                <div className="qv_checkbox">
                  <label className="qv_checkbox_add_checkmark_label age-input">
                    Check ID - Expiration
                    <input
                      type="checkbox"
                      id="checkbox2"
                      name="age_verify_expiration"
                      checked={isExpiration}
                      value={isExpiration}
                      onChange={IsExpirationtoggleInput}
                      disabled={ExpirationIdChecked}
                    />
                    <span className="qv_add_checkmark"></span>
                  </label>
                </div>
              </div>
            </div>
            <div className="box_shadow_div" style={{ padding: "20px" }}>
              <div className="qvrow">
                <h5 className="box_shadow_heading section-heading">
                  Inventory Setting
                </h5>

                <div className="qvrow chkpp">
                  <div className="qv_checkbox">
                    <label className="qv_checkbox_add_checkmark_label age-input">
                      Update Item Vendor Cost from POs
                      <input
                        type="checkbox"
                        className="psize-input psize-input"
                        checked={isUpdateItem}
                        id="inv_setting1"
                        name="inv_setting_update"
                        value={isUpdateItem}
                        onChange={IsUpdatetoggleInput}
                        disabled={disableCheckboxesCost || isSwitchEnabledCost}
                      />
                      <span className="qv_add_checkmark"></span>
                    </label>
                  </div>
                  <div className="qv_checkbox">
                    <label className="qv_checkbox_add_checkmark_label age-input">
                      Require Description for Instant POs
                      <input
                        type="checkbox"
                        id="inv_setting2"
                        name="inv_setting_require"
                        checked={isInstantPos}
                        value={isInstantPos}
                        onChange={IsInstanttoggleInput}
                      />
                      <span className="qv_add_checkmark"></span>
                    </label>
                  </div>
                </div>
                <div className="qvrow">
                  <div className="col-qv-6">
                    <div className="input_area">
                      <label>Automatic Cost Percent Markup</label>
                      <input
                        type="text"
                        id="cost_per"
                        maxLength="8"
                        placeholder="0.00"
                        name="cost_per"
                        inputMode="numeric"
                        value={costPer}
                        onChange={handleCostPerChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="qvrow fixed-bottom">
              <div
                className="col-md-6 box_shadow_div"
                style={{ marginBottom: 0 }}
              >
                <button
                  className="save_btn float-right mt-5 mb-5 "
                  onClick={handleSave}
                  disabled={loading}
                  style={{ width: "140px", marginRight: "20px" }}
                >
                  {loading ? (
                    <Box className="loader-box">
                      <CircularProgress />
                    </Box>
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default InventoryData;
