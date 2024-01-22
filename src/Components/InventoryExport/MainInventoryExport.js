import React from "react";
import { useEffect} from "react";
import { useDispatch } from "react-redux";
import {fetchMerchantsList} from "../../Redux/features/ExportInventory/ExportInventorySlice";
import { useSelector } from "react-redux";

const MainInventoryExport =  () => {
  const MerchantListData = useSelector((state) => state.MerchantListData);
  console.log(MerchantListData);
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
                      <select name="end_day_Allow" 
                      // value={systemAccess.end_day_Allow || ''}
                          // onChange={handleEndOfDayAllowanceChange}
                      >
                          <option value="1">Deny if staff clocked in</option>
                          {/* selected={systemAccess.end_day_Allow==1} */}
                          <option value="2" >Mass clock out staff clocked in</option>
                          <option value="3" >Ignore Time Clock</option>
                      </select>
                  </div>
              </div>
          </div>
          <div className="col-qv-12">
              <button className="save_btn" >
                  Export
              </button>
          </div>
        </div>
    </>;
}

export default MainInventoryExport;
console.log('hii')