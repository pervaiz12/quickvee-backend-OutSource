import React from 'react'
import Switch from "@mui/material/Switch";

const DelveryPickupDetails = () => {
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
                  checked={{}}
                  onChange={{}}
                />
              </div>
            </div>
          </div>
          <div className="qvrow">
              <div className="col-qv-6">
                <div className="input_area">
                  <label>Pickup Default Tip</label>

                  <input type="" id="" className="" value="" />
                </div>
              </div>
              <div className="col-qv-6">
                <div className="input_area">
                  <label>Delivery Default Tip</label>

                  <input type="" id="" className="" value="" />
                </div>
              </div>
            </div>
   </div>
   </div>
   
   
   </>
  )
}

export default DelveryPickupDetails
