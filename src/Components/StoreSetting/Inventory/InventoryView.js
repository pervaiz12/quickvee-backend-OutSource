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
  const [isSwitchEnabled, setIsSwitchEnabled] = useState(false);
  const [isExpiration, setExpiration] = useState(false);
  const [isUpdateItem, setUpdateItemVendor] = useState(false);
  const [isInstantPos, setInstantPos] = useState(false);
  const [isCheckBirthday, setCheckBirthday] = useState(false);
  const [disableCheckboxes, setDisableCheckboxes] = useState(false);



  const [inventory, setallInventory] = useState({
    cost_method: "",
    age_verify: [],
    inv_setting: [],
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
      setallInventory(AllInventoryAccessState.inventoryData);
    }
  }, [AllInventoryAccessState.loading]);

  const handleCheckIdBirthdayChange = (e) => {
    const { value, checked } = e.target;
    setallInventory((prevState) => ({
      ...prevState,
      age_verify: checked
        ? [...prevState.age_verify, value]
        : prevState.age_verify.filter((item) => item !== value),
    }));
  };

  const handleCheckIDChange = (e) => {
    const { value, checked } = e.target;
    setallInventory((prevState) => ({
      ...prevState,
      age_verify: checked
        ? [...(prevState.age_verify || []), value]
        : (prevState.age_verify || []).filter((item) => item !== value),
    }));
  };

  const handleInstantPosChange = (e) => {
    const { name, checked } = e.target;
    setallInventory((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleUpdateItemChange = (e) => {
    const { value, name, checked } = e.target;

    setallInventory((prevState) => {
      const currentArray = Array.isArray(prevState[name])
        ? prevState[name]
        : [];

      const updatedValue = checked
        ? [...currentArray, value]
        : currentArray.filter((item) => item !== value);

      return {
        ...prevState,
        [name]: updatedValue,
      };
    });
  };

  const IsBirthdaytoggleInput = () => {
    setCheckBirthday(!isCheckBirthday);
  };
  const CheckBirthdayPrompt = (valueToMatch) => {
    if (inventory && inventory.age_verify) {
      const isValuePresent = inventory.age_verify.includes(valueToMatch);

      if (isValuePresent) {
        return true;
      }
    }
  };

  const IsExpirationtoggleInput = () => {
    setExpiration(!isExpiration);
  };
  const CheckExpiration = (valueToMatch) => {
    if (inventory && inventory.age_verify) {
      const isValuePresent = inventory.age_verify.includes(valueToMatch);

      if (isValuePresent) {
        return true;
      }
    }
  };

  const IsUpdatetoggleInput = () => {
    setUpdateItemVendor(!isUpdateItem);
  };
  const CheckUpdateItemVendor = (valueToMatch) => {
    // if (Array.isArray(inventory.inv_setting)) {
    //   return inventory.inv_setting.includes(valueToMatch);
    // }
    // return true;
    if (inventory && inventory.inv_setting) {
      const isValuePresent = inventory.inv_setting.includes(valueToMatch);

      if (isValuePresent) {
        return true;
      }
    }
  };

  const IsInstanttoggleInput = () => {
    setInstantPos(!isInstantPos);
  };
  const CheckInstantPOs = (valueToMatch) => {
    // if (Array.isArray(inventory.inv_setting)) {
    //   return inventory.inv_setting.includes(valueToMatch);
    // }
    // return true;
    if (inventory && inventory.inv_setting) {
      const isValuePresent = inventory.inv_setting.includes(valueToMatch);

      if (isValuePresent) {
        return true;
      }
    }
  };








  const handleCostPerChange = (e) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/[^0-9.]/g, "");

    setallInventory((prevState) => ({
      ...prevState,
      [name]: numericValue,
    }));
  };

  // useEffect(() => {
  //   if (inventory && inventory.cost_method && inventory.cost_method == 1) {
  //     setIsSwitchCost(true);
  //   } else {
  //     setIsSwitchCost(false);
  //   }
  // }, [inventory]);


  useEffect(() => {
    if (inventory && inventory.cost_method && inventory.cost_method == 1) {
      setIsSwitchCost(true);
    } else {
      setIsSwitchCost(false);
    }
  }, [inventory]);



  useEffect(() => {
    if (inventory && inventory.by_scanning  && isSwitchEnabled) {
      console.log("by_scanning value:", inventory.by_scanning);
      // setIsSwitchEnabled(true);
      
      setCheckBirthday(false);
      setExpiration(false);


    } else {
      // setIsSwitchEnabled(false);
      setCheckBirthday(true);
      setExpiration(true);
    }
  }, [inventory , isSwitchEnabled]);

 

  useEffect(() => {
    if (inventory && inventory.by_scanning && isSwitchEnabled) {
      setDisableCheckboxes(true);
      
    } else {
      setDisableCheckboxes(false);
      
    }
  }, [inventory, isSwitchEnabled]);


  const handleSave = () => {
    const data = {
      merchant_id: "",
      cost_method: isSwitchEnabledCost ? "1" : "2",
      age_verify: isCheckBirthday ? ["1"] : ["2"],
      by_scanning: isSwitchEnabled ? "1" : "0",
      inv_setting: isUpdateItem ? ["1"] : ["2"],
      cost_per: inventory.cost_per,
    };
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
                onChange={() => setIsSwitchCost(!isSwitchEnabledCost)}
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
                onChange={() => setIsSwitchEnabled(!isSwitchEnabled)}
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
                name="age_verify[]"

                // defaultChecked={isCheckBirthday}
                // onChange={() => setCheckBirthday((prev) => !prev)}
                defaultChecked={CheckBirthdayPrompt(1)}
                value={isCheckBirthday}
                onChange={IsBirthdaytoggleInput}
                // disabled={!isCheckBirthday}
                disabled={disableCheckboxes}
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
                name="age_verify[]"
                // defaultChecked={isExpiration}
                // onChange={() => setExpiration((prev) => !prev)}
                defaultChecked={CheckExpiration(2)}
                value={isExpiration}
                onChange={IsExpirationtoggleInput}
                // disabled = {!isExpiration}
                disabled={disableCheckboxes}
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
                Update Item Vendor Cost from PO
                <input
                  type="checkbox"
                  className="psize-input psize-input"
                  id="inv_setting1"
                  name="inv_setting[]"
                  // defaultChecked={CheckUpdateItemVendor("1")}
                  // onChange={handleUpdateItemChange}
                  defaultChecked={CheckUpdateItemVendor(1)}
                  value={isExpiration}
                  onChange={IsUpdatetoggleInput}
                  disabled={isSwitchEnabledCost}
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
                  name="inv_setting[]"
                  // defaultChecked={CheckInstantPOs("2")}
                  // onChange={handleInstantPosChange}
                  defaultChecked={CheckInstantPOs(3)}
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
