import React from "react";
import { useState ,useEffect} from "react";
import { useDispatch } from "react-redux";
import DownIcon from "../../Assests/Dashboard/Down.svg";
import ReCAPTCHA from "./ReCAPTCHA";
import {fetchMerchantsList} from "../../Redux/features/ExportInventory/ExportInventorySlice";
import { useSelector } from "react-redux";
import InventoryExportLogic from "./InventoryDuplicatLogic";

const StoreCateUser = () => {
  const [selectedEmployee, setSelectedEmployee] = useState("All");
  const [selectedOrderSource, setSelectedOrderSource] = useState("All");
  const [selectedOrderType, setSelectedOrderType] = useState("All");

  const [employeeDropdownVisible, setEmployeeDropdownVisible] = useState(false);
  const [orderSourceDropdownVisible, setOrderSourceDropdownVisible] =
    useState(false);
  const [orderTypeDropdownVisible, setOrderTypeDropdownVisible] =
    useState(false);

  const [replicateUPCs, setReplicateUPCs] = useState(false); // State for the checkbox

  const {
    handleStoreInput,
    dupplicateInventory,
    dupplicateSettings,
    submitmessage,
    setsubmitmessage,
  } = InventoryExportLogic();

  const [MerchantList, setMerchantList] = useState()
  const MerchantListData = useSelector((state) => state.ExportInventoryData);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (!MerchantListData.loading && MerchantListData.MerchantListData) {
        setMerchantList(MerchantListData.MerchantListData)
        console.log(MerchantList)
    }
  }, [MerchantListData, MerchantListData.loading])

  useEffect(() => {
    dispatch(fetchMerchantsList())
  }, [])

  const toggleDropdown = (dropdown) => {
    switch (dropdown) {
      case "employee":
        setEmployeeDropdownVisible(!employeeDropdownVisible);
        break;
      case "orderSource":
        setOrderSourceDropdownVisible(!orderSourceDropdownVisible);
        break;
      // Add cases for other dropdowns if needed
      default:
        break;
    }
  };

  const [isVerified, setVerified] = useState(false);

  const handleVerify = (success) => {
    setVerified(success);
  };

  const handleOptionClick = (option, dropdown) => {
    switch (dropdown) {
      case "employee":
        setSelectedEmployee(option);
        setEmployeeDropdownVisible(false);
        break;
      case "orderSource":
        setSelectedOrderSource(option);
        setOrderSourceDropdownVisible(false);
        break;
      // Add cases for other dropdowns if needed
      default:
        break;
    }
  };

  const handleCheckboxChange = () => {
    setReplicateUPCs(!replicateUPCs);
  };

  return (
    <>
      <div className="q-order-main-page">
        <div className="q-add-categories-section">
          <div className="q-add-categories-section-header">
            <span>
              {/* <img src={()} alt="Add-New-Category" /> */}
              <span>Inventory Duplicate</span>
            </span>
          </div>

            <div className="q-order-page-container ml-8 md:flex-col">
              {/* Employee Dropdown */}
              
              <div className="col-qv-6">
                  <div className="input_area">
                      <label>Copy from this store</label>
                      <select name="store_name_from" 
                          // onChange={handleStoreInput}
                      >
                        <option value=''>--Select Store--</option>
                      {MerchantList && MerchantList.length >= 1 && MerchantList.map(item => (
                        <option key={item.id} value={item.merchant_id}>{item.name}</option>
                        ))}
                            
                      </select>
                  </div>
              </div>
            </div>
            <div className="q-order-page-container ml-8 md:flex-col">
              <div className="col-qv-6">
                  <div className="input_area">
                      <label>Paste to this store</label>
                      <select name="store_name_to" 
                          // onChange={handleStoreInput}
                      >
                        <option value=''>--Select Store--</option>
                      {MerchantList && MerchantList.length >= 1 && MerchantList.map(item => (
                        <option key={item.id} value={item.merchant_id}>{item.name}</option>
                        ))}
                            
                      </select>
                  </div>
              </div>
            </div>
              

            <div className="q-add-inventory-section-header mx-2">
              <div class="qv_checkbox">
                <label class="qv_checkbox_add_checkmark_label">
                  Want to Replicated UPC's for inventory
                  <input
                    type="checkbox"
                    id="upc_check"
                    name="upc_check"
                    value="true"
                    onChange={handleStoreInput}
                  />
                  <span class="qv_add_checkmark"></span>
                </label>
              </div>
            </div>

            <div
              className="q-add-categories-section-middle-footer "
              style={{ justifyContent: "start" }}
            >
              <button className="quic-btn quic-btn-save" onClick={dupplicateInventory} > 
                Duplicate Inventory
              </button>
              <button className="quic-btn quic-btn-cancle" onClick={dupplicateSettings} >
                Duplicate setting
              </button>
            </div>
        </div>
      </div>
    </>
  );
};

export default StoreCateUser;
