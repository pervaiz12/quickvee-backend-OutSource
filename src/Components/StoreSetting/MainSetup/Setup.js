import React, { useState } from "react";
import OnlineOrderingPage from "./OnlineOrderingPage";
import StoreWorkingHrs from "./StoreWorkingHrs";
import PickupDeliveryDetails from "./PickupDeliveryDetails";
import FlatDelivery from "./FlatDelivery";
import DelveryPickupDetails from "./DelveryPickupDetails";
import { fetchStoreSettingSetupData } from "../../../Redux/features/SettingSetup/SettingSetupSlice";




const Setup = () => {
  const [updateDetails, setUpdateDetails] = useState(true);

  const handleUpdateClick = () => {
    const details = "updated details";
    setUpdateDetails(details);
    window.alert(`Updates: ${details}`);
  };
  return (
    <>
      <div className="q-order-main-page">
        <OnlineOrderingPage  />
      </div>

      <div className="q-order-main-page">
        <div className="box">
          <StoreWorkingHrs />
        </div>
      </div>

      <div className="q-order-main-page">
        <PickupDeliveryDetails />
      </div>

      <div className="q-order-main-page">
        <FlatDelivery />
      </div>

      <div className="q-order-main-page">
        <DelveryPickupDetails />
      </div>

      <div className="">

      <div class="q-add-categories-section-middle-footer">
        <div class="q-category-bottom-header" style={{marginRight: "67px"}}>
        <button class="quic-btn quic-btn-save" onClick={handleUpdateClick}>Update</button>

        {/* <button class="quic-btn quic-btn-cancle">Cancel</button> */}
        </div>
        </div>
      </div>
    </>
  );
};

export default Setup;
