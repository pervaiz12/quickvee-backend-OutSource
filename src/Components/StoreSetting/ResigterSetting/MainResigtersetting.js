import React, { useState } from "react";
import ResigterSettingdata from "./ResigterSettingdata";
import PaymentMethod from "./PaymentMethod";
import ResigterDevice from "./ResigterDevice";
import ResigterDiscount from "./ResigterDiscount";

const MainResigtersetting = () => {
  return (
    <>
      <div className="q-resigtersetting-main-page">
        <div className="q-resigtersetting-top-detail-section">
          <ResigterSettingdata />
        </div>
      </div>
      <div className="q-resigtersetting-main-page">
        <div className="q-resigtersetting-top-detail-section">
          <PaymentMethod />
        </div>
      </div>
     

      <div className="q-resigtersetting-main-page">
        <div className="q-resigtersetting-top-detail-section">
          <ResigterDiscount />
        </div>
      </div>
      <div className="q-resigtersetting-main-page">
        <div className="q-resigtersetting-top-detail-section">
          <ResigterDevice />
        </div>
      </div>
    </>
  );
};

export default MainResigtersetting;
