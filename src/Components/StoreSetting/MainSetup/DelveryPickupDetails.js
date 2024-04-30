import React, { useState ,useEffect} from "react";
import Switch from "@mui/material/Switch";
import { useDispatch , useSelector} from "react-redux";


const DelveryPickupDetails = ({DeliveryPickupData}) => {
  const dispatch = useDispatch();
  const [delverypickup, setDelverypickup] = useState(true);
  const [pickupDefaultTip, setPickupDefaultTip] = useState("");
  const [deliveryDefaultTip, setDeliveryDefaultTip] = useState("");


  const handleCheckedenbale=(e)=>{
    setDelverypickup(!delverypickup)
  }

  const setupDataState = useSelector((state)=>state?.StoreSetupList?.storesetupData)

  useEffect(() => {
    // console.log(setupDataState?.deliver_min_time)
    if (setupDataState?.default_tip_d) {
      setDeliveryDefaultTip(setupDataState.default_tip_d);
    }
    if (setupDataState?.default_tip_p) {
      setPickupDefaultTip(setupDataState.default_tip_p);
    }
  }, [setupDataState])



  const handlePickupDefaultTipChange = (event) => {
    setPickupDefaultTip(event.target.value);
  };

  const handleDeliveryDefaultTipChange = (event) => {
    setDeliveryDefaultTip(event.target.value);
  };

  useEffect(() => {
    DeliveryPickupData(delverypickup, pickupDefaultTip, deliveryDefaultTip)
  }, [delverypickup, pickupDefaultTip, deliveryDefaultTip])

  return (
   <>
 <div className="box">
        <div class="box_shadow_div" style={{ padding: "20px" }}>
          <div className="">
            <h5 class="box_shadow_heading">Delivery & Pickup Details</h5>
          </div>

          <div class="qvrow">
            <div
              className=""
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div className="">
                <h5 class="box_shadow_heading">Enable Tip</h5>
              </div>

              <div className="fr">
              <Switch
                  // {...label}
                  name="cost_method"
                  onChange={handleCheckedenbale}
                  checked={delverypickup}
                />
              </div>
            </div>
          </div>
          <div className="qvrow">
              <div className="col-qv-6">
                <div className="input_area">
                  <label>Pickup Default Tip</label>

                 <select
                name="default_tip_d"
                value={pickupDefaultTip}
                onChange={handlePickupDefaultTipChange}
              >
                <option value="0" selected={pickupDefaultTip == 0}>
                 None
                </option>
                <option value="10" selected={pickupDefaultTip == 10}>
                  10%
                </option>
                <option value="15" selected={pickupDefaultTip == 15}>
                 15%
                </option>
                <option value="20" selected={pickupDefaultTip == 20}>
                 20%
                </option>
                <option value="25" selected={pickupDefaultTip == 25}>
                 25%
                </option>
              </select>
                </div>
              </div>
              <div className="col-qv-6">
                <div className="input_area">
                  <label>Delivery Default Tip</label>

                 <select
                name="end_day_Allow"
                value={deliveryDefaultTip}
                onChange={handleDeliveryDefaultTipChange}
              >
                <option value="0" selected={deliveryDefaultTip == 0}>
                 None
                </option>
                <option value="10" selected={deliveryDefaultTip == 10}>
                  10%
                </option>
                <option value="15" selected={deliveryDefaultTip == 15}>
                15%
                </option>
                <option value="20" selected={deliveryDefaultTip == 20}>
                20%
                </option>
                <option value="25" selected={deliveryDefaultTip == 25}>
                25%
                </option>
              </select>
                </div>
              </div>
            </div>
   </div>
   </div>
   
   
   </>
  )
}

export default DelveryPickupDetails


