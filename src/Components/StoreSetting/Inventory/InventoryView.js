import React, { useEffect, useState } from "react";
import "../../../Styles/StoreSetting.css";
import "../../../Styles/Settings/SystemAccess.css";
import Switch from "@mui/material/Switch";
import {
  fetchInventoryListData,
  updateInventoryData,
} from "../../../Redux/features/Inventory/InventorySlice";
import { useSelector, useDispatch } from "react-redux";

const InventoryData = () => {
  const label = { inputProps: { "aria-label": "Switch demo" } };

  const [isSwitchEnabledCost, setIsSwitchCost] = useState(false);
  //=============================================
  const [isSwitchEnabled, setIsSwitchEnabled] = useState(false);
  const [isCheckBirthday, setCheckBirthday] = useState(false);
  const [isExpiration, setExpiration] = useState(false);
  const [checkedBirthDayChecked, setirthDayChecked] = useState(false);
  const [ExpirationIdChecked, setExpirationIdChecked] = useState(false);
  // =========================================================
  const [isUpdateItem, setUpdateItemVendor] = useState(false);
  // Require Description for Instant POs
  const [isInstantPos, setInstantPos] = useState(false);

  const [disableCheckboxesCost, setDisableCheckboxesCost] = useState(false);

  const [inventory, setAllInventory] = useState({
    cost_method: "",
    age_verify_birthday: "",
    age_verify_expiration: "",
    inv_setting_update: "",
    inv_setting_require: "",
    cost_per: "",
    by_scanning: "",
  });

  const AllInventoryAccessState = useSelector(
    (state) => state.inventoryDataList
  );

  const dispatch = useDispatch();

  useEffect(() => {
    let data = {
      merchant_id: "MAL0100CA",
    };
    if (data) {
      dispatch(fetchInventoryListData(data));
    }
  }, []);

  useEffect(() => {
    if (
      !AllInventoryAccessState.loading &&
      AllInventoryAccessState.inventoryData
    ) {
      // console.log(AllInventoryAccessState.inventoryData)
      setAllInventory(AllInventoryAccessState.inventoryData);
    }
  }, [AllInventoryAccessState.loading]);

  const IsBirthdaytoggleInput = () => {
    setCheckBirthday(!isCheckBirthday);
    // setCheckBirthday(prevState => !prevState);
    console.log(isCheckBirthday);
  };
  // const CheckBirthdayPrompt = (valueToMatch) => {
  //   if (inventory && inventory.age_verify) {
  //     const isValuePresent = inventory.age_verify.includes(valueToMatch);
  //     if (isValuePresent) {
  //       return true;
  //     }
  //   }
  // };

  const IsExpirationtoggleInput = () => {
    setExpiration(!isExpiration);
  };
  // const CheckExpiration = (valueToMatch) => {
  //   // debugger;
  //   if (inventory && inventory.age_verify) {
  //     const isValuePresent = inventory.age_verify.includes(valueToMatch);

  //     if (isValuePresent) {
  //       return true;
  //     }
  //   }
  // };

  //Update Item Vendor Cost from POs
  const IsUpdatetoggleInput = () => {
    // Uncheck and disable the corresponding checkbox when isSwitchEnabledCost is true
    if (isSwitchEnabledCost) {
      setUpdateItemVendor(false);
    } else {
      setUpdateItemVendor(!isUpdateItem);
    }
  };
  const CheckUpdateItemVendor = (valueToMatch) => {
    if (inventory && inventory.inv_setting) {
      const isValuePresent = inventory.inv_setting.includes(valueToMatch);

      if (isValuePresent) {
        return true;
      }
    }
  };

  // Require Description for Instant POs
  const IsInstanttoggleInput = () => {
    setInstantPos(!isInstantPos);
  };

  // const CheckInstantPOs = (valueToMatch) => {
  //   if (inventory && inventory.inv_setting) {
  //     const isValuePresent = inventory.inv_setting.includes(valueToMatch);
  //     //console.log("ccccc",isValuePresent);
  //     return isValuePresent;

  //   }
  //   return false;
  // };

  //console.log("Instant Pos", isInstantPos);

  const handleCostPerChange = (e) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/[^0-9.]/g, "");

    setAllInventory((prevState) => ({
      ...prevState,
      [name]: numericValue,
    }));
  };

  useEffect(() => {
    if (inventory && inventory.cost_method && inventory.cost_method == "1") {
      setIsSwitchCost(true);
      // If cost_method is on, disable and uncheck the corresponding checkbox
      setDisableCheckboxesCost(true);
      setUpdateItemVendor(false);
    } else {
      setIsSwitchCost(false);
      setDisableCheckboxesCost(false);
    }
  }, [inventory]);

  const handleEnablePickup = () => {
    setIsSwitchEnabled(!isSwitchEnabled);
    // setcheckedBirthDay(true)
    setCheckBirthday(false);
    setExpiration(false);
    setirthDayChecked(!checkedBirthDayChecked);
    setExpirationIdChecked(!ExpirationIdChecked);
  };

  useEffect(() => {
    if (
      inventory &&
      inventory.by_scanning &&
      inventory.by_scanning.includes("1")
    ) {
      setIsSwitchEnabled(true);
    } else {
      setIsSwitchEnabled(false);
    }

    if (inventory && inventory.cost_method && isSwitchEnabledCost) {
      setDisableCheckboxesCost(true);
    } else {
      setDisableCheckboxesCost(false);
    }
    if (
      inventory &&
      inventory.inv_setting &&
      inventory.inv_setting.includes("2")
    ) {
      setInstantPos(true);
    } else {
      setInstantPos(false);
    }
    if (
      inventory &&
      inventory.inv_setting &&
      inventory.inv_setting.includes("1")
    ) {
      setUpdateItemVendor(true);
    } else {
      setUpdateItemVendor(false);
    }
    if (
      inventory &&
      inventory.age_verify &&
      inventory.age_verify.includes("1")
    ) {
      setCheckBirthday(true);
      setIsSwitchEnabled(false);
      setirthDayChecked(false);
    } else {
      setCheckBirthday(false);
    }
    if (
      inventory &&
      inventory.age_verify &&
      inventory.age_verify.includes("2")
    ) {
      setExpiration(true);
      setIsSwitchEnabled(false);
      setExpirationIdChecked(false);
    } else {
      setExpiration(false);
    }
  }, [inventory, isSwitchEnabledCost]);

  const handleSave = () => {
    const data = {
      merchant_id: "MAL0100CA",
      cost_method: isSwitchEnabledCost ? "1" : "2",
      age_verify_birthday: isCheckBirthday ? "1" : "0",
      age_verify_expiration: isExpiration ? "1" : "0",
      inv_setting_update: isUpdateItem ? "1" : "0",
      inv_setting_require: isInstantPos ? "1" : "0",
      by_scanning: isSwitchEnabled ? "1" : "0",
      cost_per: inventory.cost_per,
    };

    console.log(data);
    dispatch(updateInventoryData(data));
  };

  return (
    <>
      <div className="box_shadow_div">
        <div className="qvrow">
          <h5 className="box_shadow_heading">
            Average Cost Method
            <div className="fr">
              <Switch
                {...label}
                name="cost_method"
                checked={isSwitchEnabledCost}
                onChange={() => {
                  setIsSwitchCost(!isSwitchEnabledCost);

                  IsUpdatetoggleInput();
                }}
              />
            </div>
          </h5>
        </div>
      </div>
      <div className="box_shadow_div">
        <div className="qvrow">
          <h5 className="box_shadow_heading">Future Order</h5>
          <h6 className="box_shadow_heading">
            Enable Pickup
            <div className="fr">
              <Switch
                {...label}
                name="by_scanning"
                checked={isSwitchEnabled}
                // onChange={() => setIsSwitchEnabled(!isSwitchEnabled)}
                onChange={handleEnablePickup}
              />
            </div>
          </h6>

          <div className="qv_checkbox">
            <label className="qv_checkbox_add_checkmark_label">
              Check ID - Birthday Prompt
              <input
                type="checkbox"
                className="psize-input psize-input"
                id="checkbox1"
                name="age_verify_birthday"
                value={isCheckBirthday}
                // defaultChecked={!isSwitchEnabled && CheckBirthdayPrompt(1)}
                checked={isCheckBirthday}
                onChange={IsBirthdaytoggleInput}
                // disabled={disableCheckboxes || isSwitchEnabled}
                disabled={checkedBirthDayChecked}
              />
              <span className="qv_add_checkmark"></span>
            </label>
          </div>
          <div className="qv_checkbox">
            <label className="qv_checkbox_add_checkmark_label">
              Check ID - Expiration
              <input
                type="checkbox"
                id="checkbox2"
                name="age_verify_expiration"
                // defaultChecked={!isSwitchEnabled && CheckExpiration(2)}
                checked={isExpiration}
                value={isExpiration}
                onChange={IsExpirationtoggleInput}
                // disabled={disableCheckboxes || isSwitchEnabled}
                disabled={ExpirationIdChecked}
              />
              <span className="qv_add_checkmark"></span>
            </label>
          </div>
        </div>
      </div>

      <div className="box_shadow_div">
        <div className="qvrow">
          <h5 className="box_shadow_heading">Inventory Setting</h5>

          <div className="qvrow chkpp">
            <div className="qv_checkbox">
              <label className="qv_checkbox_add_checkmark_label">
                Update Item Vendor Cost from POs
                <input
                  type="checkbox"
                  className="psize-input psize-input"
                  id="inv_setting1"
                  name="inv_setting_update"
                  defaultChecked={!isUpdateItem && CheckUpdateItemVendor(1)}
                  value={isUpdateItem}
                  onChange={IsUpdatetoggleInput}
                  disabled={disableCheckboxesCost || isSwitchEnabledCost}
                />
                <span className="qv_add_checkmark"></span>
              </label>
            </div>
            <div className="qv_checkbox">
              <label className="qv_checkbox_add_checkmark_label">
                Require Description for Instant POs
                <input
                  type="checkbox"
                  id="inv_setting2"
                  name="inv_setting_require"
                  defaultChecked={!isInstantPos}
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
                  placeholder="%0.00"
                  name="cost_per"
                  inputMode="numeric"
                  value={inventory.cost_per}
                  onChange={handleCostPerChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="qvrow">
          <div className="col-md-6">
            <button className="save_btn" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default InventoryData;
