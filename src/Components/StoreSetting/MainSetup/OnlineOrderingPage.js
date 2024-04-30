

import { useState,useEffect} from "react";
import React from "react";
import Switch from "@mui/material/Switch";
import { useDispatch , useSelector} from "react-redux";

const OnlineOrderingPage = ({onlineorderstatus}) => {

  const [isEnableOrderNumber, setisEnableOrderNumber] = useState(true);
  const dispatch = useDispatch();

  const handleCheckedSwitch=(e)=>{
    setisEnableOrderNumber(!isEnableOrderNumber)
  }


  const setupDataState = useSelector((state)=>state?.StoreSetupList?.storesetupData)

  useEffect(() => {
    // console.log(setupDataState?.clover_customer_id)
    onlineorderstatus(isEnableOrderNumber);
  }, [setupDataState, isEnableOrderNumber])


  
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
