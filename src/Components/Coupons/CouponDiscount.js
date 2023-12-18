import React, { useState } from "react";
import { Link } from "react-router-dom";
import DeletIcon from '../../Assests/Dashboard/delete.svg';
import Edit from '../../Assests/Dashboard/edit.svg'

const CouponDiscount = () => {
  const [coupons, setCoupons] = useState([
    {
      id: 1,
      code: "FLAT20",
      discount: "20% OFF on a minimum order of $30.00",
      validDate: "1/08/2022 - 12:00AM to 1/09/2022 - 12:00AM",
      maxDiscount: "$50",
      status: "Enabled",
    },
    // Add more coupons as needed
  ]);

  const handleEdit = (id) => {
    // Add logic to handle edit
    console.log(`Edit coupon with ID ${id}`);
  };

  const handleDelete = (id) => {
    // Add logic to handle delete
    setCoupons((prevCoupons) =>
      prevCoupons.filter((coupon) => coupon.id !== id)
    );
    console.log(`Delete coupon with ID ${id}`);
  };

  const handleToggleStatus = (id) => {
    setCoupons((prevCoupons) =>
      prevCoupons.map((coupon) =>
        coupon.id === id
          ? {
              ...coupon,
              status: coupon.status === "Enabled" ? "Disabled" : "Enabled",
            }
          : coupon
      )
    );
  };

  return (
    <>
      <div className="mx-2 my-2">
        <div
          className="box-content w-70 p-4 border-4 border-white bg-white rounded-xl opacity-100 my-9 mx-8"
          style={{ boxShadow: "0px 3px 6px #0000001F" }}
        >
          <div className="flex justify-between gap-2 mx-6 my-2">
            <div className="text-[18px] Admin_std leading-0 text-black admin_medium font-semibold opacity-100">
              Coupons
            </div>
            <div>
              <div className="text-[18px] Admin_std leading-0 text-blue-500 admin_medium font-semibold opacity-100">
                <Link to="/addCoupon">
                  Add New Coupon
                  <button className="text-[18px] text-blue-500 ml-1 focus:outline-none">
                    +
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-2 bg-[#000] border-b-2 w-full mb-4"></div>

          <div className="flex flex-col md:flex-row gap-4">
            {coupons.map((coupon) => (
              <div
                key={coupon.id}
                className={`flex flex-col rounded-lg shadow-md p-4 w-full md:w-[500px] mb-4 ${
                  coupon.status === "Enabled"
                    ? "border-blue-500 bg-white"
                    : "border-[#f0f0f0] bg-[#f0f0f0]"
                }`}
              >
                <div className="flex justify-between mb-2">
                  <h5 className="text-xl font-medium text-[#0A64F9] bg-[#F2F6FF] p-2">
                    {coupon.code}
                  </h5>
                  <div className="flex space-x-2">
                    <img src={Edit} alt="" className="h-12 w-16"  onClick={() => handleEdit(coupon.id)} />
                    
                   
                 <img src={DeletIcon} alt="delet" className="h-12 w-16"
                      onClick={() => handleDelete(coupon.id)}
                     />
                  
                  </div>
                </div>
                <p className="mb-2 text-[18px] text-[#000000] Admin_bold opacity-100">
                  {coupon.discount}
                </p>
                <p className="mb-2 text-[13px] text-black admin_medium">
                  Valid Date:{" "}
                  <span className="mb-2 text-[13px] text-[#7D7D7D] opacity-100 adminstdbook flex justify-end">
                    {coupon.validDate}
                  </span>
                </p>
                <p className="mb-2 text-[13px] text-black admin_medium">
                  Max Discount:{" "}
                  <span className="mb-2 text-[13px] text-[#7D7D7D] opacity-100 adminstdbook flex justify-end">
                    {coupon.maxDiscount}
                  </span>
                </p>
                <p className="mb-2 text-[13px] text-black admin_medium">
                  Status: {coupon.status}
                </p>
                <button
                  onClick={() => handleToggleStatus(coupon.id)}
                  className={`text-xs px-2 py-1 rounded-md mt-2 ${
                    coupon.status === "Enabled"
                      ? "bg-green-500 text-white"
                      : "bg-gray-500 text-gray-200"
                  }`}
                >
                  {coupon.status === "Enabled" ? "Disable" : "Enable"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CouponDiscount;
