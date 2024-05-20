import React, { useState } from "react";
import AddCoupon from "./AddCoupon";
import CouponDiscount from "./CouponDiscount";
import CustomeDateTime from "./CustomeDateTime";

const MainCoupon = () => {
  const [visible, seVisible] = useState("CouponDiscount");
  return (
    <>
      <div className="q-category-main-page">

        {visible === "CouponDiscount" && (
          <CouponDiscount seVisible={seVisible} />
        )}
      </div>
      <div className="q-category-main-page">
        {visible === "AddCoupon" && <AddCoupon seVisible={seVisible} />}
      </div>

      <div className="q-category-main-page">
        {visible === "CustomeDate" && <CustomeDateTime seVisible={seVisible} />}
      </div>

    </>
  );
};


export default MainCoupon;


