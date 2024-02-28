import React from "react";
import Switch from "@mui/material/Switch";

const OnlineOrderingPage = () => {
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
                  checked={{}}
                  onChange={{}}
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
