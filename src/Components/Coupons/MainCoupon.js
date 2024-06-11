import React, { useState } from "react";
import AddCoupon from "./AddCoupon";
import CouponDiscount from "./CouponDiscount";
import CustomeDateTime from "./CustomeDateTime";
import EditCoupon from "./EditCoupon";

const MainCoupon = () => {
  const [visible, seVisible] = useState("CouponDiscount");
  const [couponId, setCouponId] = useState()
  return (
    <>
      <div className="q-category-main-page">

        {visible === "CouponDiscount" && (
          <CouponDiscount seVisible={seVisible} setCouponId={setCouponId}/>
        )}
      </div>
      <div className="q-category-main-page">
        {visible === "AddCoupon" && <AddCoupon seVisible={seVisible} />}
      </div>

      <div className="q-category-main-page">
        {visible === "CustomeDate" && <CustomeDateTime seVisible={seVisible} />}
      </div>
        {visible === "EditCopon" && <EditCoupon seVisible={seVisible} couponId={couponId} />}
    </>
  );
};


export default MainCoupon;


