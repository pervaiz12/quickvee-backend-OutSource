import React from "react";
import AddressIcon from "../../../../Assests/Defaults/Address.svg";
import CallIcon from "../../../../Assests/Defaults/Phone.svg";
import MilesIcon from "../../../../Assests/Defaults/Miles.svg";

const PaymentCalDetails = () => {
  return (
    <>
    {/* payment details */}
      <div className="payment-details-container">
        <div className="payment-header flex justify-between">
          <div className="payment-header-text">
            <div className="text-[20px] font-normal opacity-100 text-black admin_medium">
              Payment Detail
            </div>
          </div>
          <button className="success_btn">SUCCESS</button>
        </div>
        <div className="border-b-2 mx-2 my-4"></div>
        <div className="payment-stepper-checkout-content">
          <div className="flex justify-between py-2">
            <span>Order Id</span>
            <p>KJHGFAAFG</p>
          </div>
          <div className="flex justify-between py-2">
            <span>Payment Date</span>
            <p>17 Nov 2020 - 10:00 PM</p>
          </div>
          <div className="flex justify-between py-2">
            <span>Order Number</span>
            <p>21</p>
          </div>
          <div className="flex justify-between py-2">
            <span>Payment Id</span>
            <p>X214354667677</p>
          </div>

          {/* Repeat similar blocks for other coupon and input sections */}
          <div className="quickvee-checkout-final-amount flex justify-between">
            <span style={{ color: "rgb(20, 174, 45)" }}>Amount</span>
            <p style={{ color: "rgb(20, 174, 45)" }}>$91.90</p>
          </div>
        </div>
      </div>
      <div className="border-b-2 mx-2 my-4"></div>
{/* Customer details */}
      <div className="my-12">
        <div className="text-[20px] font-normal opacity-100 text-black admin_medium">
          Customer Details
        </div>
        <div className="flex justify-between">
          <p>Sumit Mhatre</p>
          <button className="delivery_btn">Delivery Address</button>
        </div>
        <p className="flex space-x-4">
          <span>
            <img src={AddressIcon} alt="" className="w-4 h-4" />
          </span>
          <span className="text-[15px] text-[#3A3A3A]">
            230 Sterling Drive Suite 260, Tracy, CA 95391
          </span>
        </p>
        <p className="flex space-x-4">
          <span>
            <img src={CallIcon} alt="" className="w-4 h-4" />
          </span>
          <span className="text-[15px] text-[#3A3A3A]">+44 098765432</span>
          <span>
            <img src={MilesIcon} alt="" className="w-4 h-4" />
          </span>
          <span className="text-[15px] text-[#3A3A3A]">5 Miles away</span>
        </p>

        <div className="border-b-2 mx-2 my-4"></div>
        {/* Billing Address */}

        <div className="my-10">
          <div className="flex justify-between">
            <p>Sumit Mhatre</p>
            <button className="success_btn">Billing Address</button>
          </div>
          <p className="flex space-x-4">
            <span>
              <img src={AddressIcon} alt="" className="w-4 h-4" />
            </span>
            <span className="text-[15px] text-[#3A3A3A]">
              230 Sterling Drive Suite 260, Tracy, CA 95391
            </span>
          </p>
        </div>
      </div>


      <div className="border-b-2 mx-2 my-4"></div>
      {/* indentification card */}

      <div className="my-10">
      <div className="text-[20px] font-normal opacity-100 text-black admin_medium">
      Identification Card
        </div>
        <div className="flex justify-between py-2">
            <span>ID Number</span>
            <p>S123-4445-33355-1122</p>
          </div>
          <div className="flex justify-between py-2">
            <span>Expiration Date</span>
            <p>15 JAN 2050</p>
          </div>
          <div className="flex justify-between py-2">
            <span>Date Of Birth</span>
            <p>14 MAR 1976</p>
          </div>

          <div className="">
          <div className="id-card bg-white p-4 rounded-md shadow-md">
        <img src="https://www.quickvee.com/upload/products/MAL4284CA/1664311244Screenshot%202022-09-27%20132829.png" alt="ID Card" className="w-96 h-96 object-cover" />
      </div>
          </div>
      </div>
    </>
  );
};

export default PaymentCalDetails;
