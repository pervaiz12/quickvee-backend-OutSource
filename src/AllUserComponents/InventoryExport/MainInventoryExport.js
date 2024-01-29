import React from "react";
import { useState ,useEffect} from "react";
import { useDispatch } from "react-redux";
// import {fetchMerchantsList} from "../../Redux/features/ExportInventory/ExportInventorySlice";
import { fetchMerchantsList } from "../../Redux/features/ExportInventory/ExportInventorySlice";
import { useSelector } from "react-redux";
import InventoryExportLogic from "./InventoryExportLogic";

const MainInventoryExport =  () => {
    const [MerchantList, setMerchantList] = useState()
    const MerchantListData = useSelector((state) => state.ExportInventoryData);
    //console.log(MerchantListData);
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
        <div className="box_shadow_div">
          <div className="qvrow">
              <h5 className="box_shadow_heading">Inventory Export</h5>
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
          <div className="col-qv-12">
              <button className="save_btn" onClick={handleSubmit}  >
                  Export
              </button>
          </div>
        </div>
    </>;
}

export default MainInventoryExport;
console.log('hii')