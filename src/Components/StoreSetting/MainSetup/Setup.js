import React from "react";
import OnlineOrderingPage from "./OnlineOrderingPage";
import StoreWorkingHrs from "./StoreWorkingHrs";
import PickupDeliveryDetails from "./PickupDeliveryDetails";
import FlatDelivery from "./FlatDelivery";
import DelveryPickupDetails from "./DelveryPickupDetails";

const Setup = () => {
  return (
    <>
      <div className="q-order-main-page">
        <OnlineOrderingPage />
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
    </>
  );
};

export default Setup;
