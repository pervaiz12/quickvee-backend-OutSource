import React from "react";
import { useState ,useEffect} from "react";
import { useDispatch } from "react-redux";
import { Box, Collapse, Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
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
    const {
      handleStoreInput,
      handleSubmit,
      submitmessage,
      setsubmitmessage,
    } = InventoryExportLogic();

  useEffect(() => {
    if (!MerchantListData.loading && MerchantListData.MerchantListData) {
        setMerchantList(MerchantListData.MerchantListData)
        console.log(MerchantList)
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
              <div className="col-qv-6">
                    <div className="input_area">
                        <label>Select Store Name</label>
                        <select name="store_name" 
                            onChange={handleStoreInput}
                        >
                          <option value=''>--Select Store--</option>
                        {MerchantList && MerchantList.length >= 1 && MerchantList.map(item => (
                          <option key={item.id} value={item.merchant_id}>{item.name}-{item.merchant_id}</option>
                          ))}
                              
                        </select>
                    </div>
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
// console.log('hii')