

import { useState,useEffect} from "react";
import React from "react";
import Switch from "@mui/material/Switch";
import { useDispatch } from "react-redux";
import {fetchStoreSettingSetupData} from '../../../Redux/features/SettingSetup/SettingSetupSlice'

const OnlineOrderingPage = () => {

  const [isEnableOrderNumber, setisEnableOrderNumber] = useState(true);
  const dispatch = useDispatch();

  const handleCheckedSwitch=(e)=>{
    setisEnableOrderNumber(!isEnableOrderNumber)
  }



  const data={
    merchant_id:'MAL0100CA'
  }

  useEffect(() => {
    dispatch(fetchStoreSettingSetupData(data))
  
  }, [])
  
  return (
    <>
      <div className="box">
        <div class="box_shadow_div" style={{ padding: "20px" }}>
          <div class="qvrow">
            <div
              className=""
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div className="">
                <h5 class="box_shadow_heading">Online Ordering</h5>
                <label className="text-[12px]">
                  Select Default Image if in case some color image is not
                  available.
                </label>
              </div>

              <div className="fr">
                <Switch
                  // {...label}
                  name="cost_method"
                  onChange={handleCheckedSwitch}
                  checked={isEnableOrderNumber}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OnlineOrderingPage;
