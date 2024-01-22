import React from "react";
import { Input } from "@material-tailwind/react";
import { Select } from "@mui/material";
const MainInventoryExport =  () => {
    return <>
        <div className="q-resigtersetting-main-page">
        <div className="q-resigtersetting-top-detail-section">
          <div>
            <div className="q-resigtersetting-bottom-section">
            <div className="q_setting_main_Section">Quick Add</div>
              <div className="q_setting_main_Section"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="q_resigter_label">
                  <label className="text-[#6A6A6A] ml-2" htmlFor="idlelogout">
                    Idle Logout Minutes
                  </label>
                  <div className="w-full">
                    <Select className="q_input_resigter" name="idel_logout"  placeholder="Enter idle logout">
                        <option value={1}>store</option>
                    </Select> 
                    {/* onChange={handleRegisterSettingInput} value={values.idel_logout} */}
                  </div>
                  <span className="input-error">
                    {/* {values.errors.idel_logout !== "" ? values.errors.idel_logout : ""} */}
                  </span>
                </div>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </>;
}

export default MainInventoryExport;
console.log('hii')