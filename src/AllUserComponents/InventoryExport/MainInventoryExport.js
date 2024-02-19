import React from "react";
import { useState ,useEffect} from "react";
import { useDispatch } from "react-redux";
import { Box, Collapse, Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DownIcon from "../../Assests/Dashboard/Down.svg";
// import {fetchMerchantsList} from "../../Redux/features/ExportInventory/ExportInventorySlice";
import { fetchMerchantsList } from "../../Redux/features/ExportInventory/ExportInventorySlice";
import { useSelector } from "react-redux";
import InventoryExportLogic from "./InventoryExportLogic";

const MainInventoryExport =  () => {
    const [openAlert, setOpenAlert] = useState(true);
    const [MerchantList, setMerchantList] = useState()
    const MerchantListData = useSelector((state) => state.ExportInventoryData);
    //console.log(MerchantListData);
    const goToTop = () => {
      setsubmitmessage()
    };
    const [storeFromError, setStoreFromError] = useState("");
    const [selectedStorefrom, setSelectedStorefrom] =
    useState("-- Select Store --");
  
    const [storeFromDropdownVisible, setStoreFromDropdownVisible] =
    useState(false);

    const myStyles = {
      height: "300px",
      overflow: "auto",
    };
    
    const toggleDropdown = (dropdown) => {
      switch (dropdown) {
        case "storefrom":
          setStoreFromDropdownVisible(!storeFromDropdownVisible);
          break;
        default:
          break;
      }
    };

    const handleOptionClick = async (option, dropdown) => {
      switch (dropdown) {
        case "storefrom":
          setSelectedStorefrom(option.label);
          setStoreFromDropdownVisible(false);
  
          if (option.merchant_id !== null) {
            handleStoreInput({
              target: { name: "store_name_from", value: option.merchant_id },
            });
            setStoreFromError("");
          } else {
            setStoreFromError("This field is required");
          }
          
          break;
        default:
          break;
      }
    };

    const {
      handleStoreInput,
      handleSubmit,
      submitmessage,
      setsubmitmessage,
    } = InventoryExportLogic();

  useEffect(() => {
    if (!MerchantListData.loading && MerchantListData.MerchantListData) {
        setMerchantList(MerchantListData.MerchantListData)
        // console.log(MerchantList)
    }
  }, [MerchantListData, MerchantListData.loading])

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMerchantsList())
  }, [])
  
    return <>
      <div className="q-order-main-page">
        <div className="q-add-categories-section">
          <div className="alert">
              {submitmessage && (
                <Box sx={{ width: '100%', position: 'relative', top: '2rem', marginLeft: 'auto' }} className={submitmessage ? 'form-submit-info-message' : ''}>
                  <Collapse in={openAlert}>
                    <Alert
                      severity="info"
                      action={
                        <IconButton
                          className="info-close-icon"
                          aria-label="close"
                          color="info"
                          size="small"
                          onClick={goToTop}
                        >
                          <CloseIcon />
                        </IconButton>
                      }
                      sx={{ mb: 2 }}
                    >
                      {submitmessage}
                    </Alert>
                  </Collapse>
                </Box>
              )}
          </div>
          <div className="q-add-categories-section-header">
            <span> {/* <img src={()} alt="Add-New-Category" /> */}
              <span>Inventory Export</span>
            </span>
          </div>
          
          <div className="q-order-page-container ml-8 md:flex-col">
              
            <div className="col-qv-6 mt-6">
              <label className="q-details-page-label" htmlFor="storefromFilter">
                Select Store Name
              </label>
              <div className="custom-dropdown">
                <div
                  className="custom-dropdown-header"
                  onClick={() => toggleDropdown("storefrom")}
                >
                  <span className="selected-option mt-1">
                    {selectedStorefrom}
                  </span>
                  <img src={DownIcon} alt="Down Icon" className="w-8 h-8" />
                </div>
                {storeFromDropdownVisible && (
                  <div className="dropdown-content" style={myStyles}>
                    <div
                      onClick={() =>
                        handleOptionClick(
                          { label: "-- Select Store --", merchant_id: null },
                          "storefrom"
                        )
                      }
                    >
                      -- Select Store --
                    </div>
                    {MerchantList &&
                      MerchantList.map((merchant) => (
                        <div
                          key={merchant.id}
                          onClick={() =>
                            handleOptionClick(
                              {
                                label: merchant.name+'-'+merchant.merchant_id,
                                merchant_id: merchant.merchant_id,
                              },
                              "storefrom"
                            )
                          }
                        >
                          {merchant.name}-{merchant.merchant_id}
                        </div>
                      ))}
                  </div>
                )}
              </div>
              <span className="input-error ">
                {storeFromError && (
                  <span className="input-error ">{storeFromError}</span>
                )}
              </span>
            </div>
             
                
              </div>
            
              <div className="q-add-categories-section-middle-footer " style={{ justifyContent: "start" }}  >
                <button className="save_btn" onClick={handleSubmit}  > Export </button>
              </div>
          
        </div>
      </div>

        
    </>;
}

export default MainInventoryExport;