import React from "react";
import { Input } from "@material-tailwind/react";

const ResigterDevice = () => {
  return (
    <div>
      <div className="q-resigtersetting-bottom-section">
        <div className="q_setting_main_Section"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="q_resigter_label">
            <label className="" htmlFor="employeeFilter">
              Idle Logout
            </label>
            <div className="w-full">
              <Input className="q_input_resigter" placeholder=" enter id" />
            </div>
          </div>
          <div className="q_resigter_label">
            <label className="" htmlFor="employeeFilter">
              device name
            </label>
            <div className="w-full">
              <Input className="q_input_resigter" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResigterDevice;
