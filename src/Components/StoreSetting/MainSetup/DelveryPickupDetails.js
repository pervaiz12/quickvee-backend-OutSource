import React, { useState ,useEffect} from "react";
import Switch from "@mui/material/Switch";
import { useDispatch , useSelector} from "react-redux";


const DelveryPickupDetails = () => {
  const dispatch = useDispatch();
  const [delverypickup, setDelverypickup] = useState(true);
  const [pickupDefaultTip, setPickupDefaultTip] = useState("");
  const [deliveryDefaultTip, setDeliveryDefaultTip] = useState("");


  const handleCheckedenbale=(e)=>{
    setDelverypickup(!delverypickup)
  }

  const setupDataState = useSelector((state)=>state?.StoreSetupList?.storesetupData)

  useEffect(() => {
   //console.log(setupDataState?.deliver_min_time)
  }, [setupDataState])



  const handlePickupDefaultTipChange = (e) => {

    const { name, value } = e.target;
    setupDataState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // setPickupDefaultTip(e.target.value);
  };

  const handleDeliveryDefaultTipChange = (e) => {
    setDeliveryDefaultTip(e.target.value);
  };
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
                value={setupDataState.default_tip_d || ""}
                onChange={handlePickupDefaultTipChange}
              >
                <option value="1" selected={setupDataState.default_tip_d == 1}>
                 None
                </option>
                <option value="2" selected={setupDataState.default_tip_d == 2}>
                  10%
                </option>
                <option value="3" selected={setupDataState.default_tip_d == 3}>
                 15%
                </option>
                <option value="3" selected={setupDataState.default_tip_d == 3}>
                 20%
                </option>
                <option value="3" selected={setupDataState.default_tip_d == 3}>
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
                value={setupDataState.default_tip_p || ""}
                onChange={handleDeliveryDefaultTipChange}
              >
                <option value="1" selected={setupDataState.default_tip_p == 1}>
                 None
                </option>
                <option value="2" selected={setupDataState.default_tip_p == 2}>
                  10%
                </option>
                <option value="3" selected={setupDataState.default_tip_p == 3}>
                15%
                </option>
                <option value="3" selected={setupDataState.default_tip_d == 3}>
                25%
                </option>
                <option value="3" selected={setupDataState.default_tip_d == 3}>
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


