import React from "react";
import AddressIcon from "../../../../Assests/Defaults/Address.svg";
import CallIcon from "../../../../Assests/Defaults/Phone.svg";
import MilesIcon from "../../../../Assests/Defaults/Miles.svg";

const PaymentCalDetails = ({ OrderSummaryData }) => {
  // console.log(OrderSummaryData);
  const orderDetail = OrderSummaryData.order_detail || {};
  const grandTotal = (parseFloat(orderDetail.amt) || 0) - (parseFloat(orderDetail.refund_amount) || 0);

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
          {OrderSummaryData && OrderSummaryData.order_detail && OrderSummaryData.order_detail.payment_result == 'Approved' && (
            <button className="success_btn">SUCCESS</button>
          )}
        </div>
        <div className="border-b-2 mx-2 my-4"></div>
        <div className="payment-stepper-checkout-content">
          <div className="flex justify-between py-2">
            <span>Order Id</span>
            <p>{OrderSummaryData && OrderSummaryData.order_detail && OrderSummaryData.order_detail.order_id}</p>
          </div>
          <div className="flex justify-between py-2">
            <span>Order Number</span>
            <p>{OrderSummaryData && OrderSummaryData.order_detail && OrderSummaryData.order_detail.order_number}</p>
          </div>
          <div className="flex justify-between py-2">
            <span>Payment Id</span>
            <p>
              {OrderSummaryData && OrderSummaryData.order_detail && OrderSummaryData.order_detail.is_split_payment == '1'
                ? 'Split Payment'
                : OrderSummaryData && OrderSummaryData.order_detail && OrderSummaryData.order_detail.payment_id == ''
                ? 'Cash'
                : OrderSummaryData && OrderSummaryData.order_detail && OrderSummaryData.order_detail.payment_id
              }
            </p>
          </div>
          {/* Repeat similar blocks for other coupon and input sections */}
          <div className="quickvee-checkout-final-amount flex justify-between">
            <span style={{ color: "rgb(20, 174, 45)" }}>Amount</span>
            <p style={{ color: "rgb(20, 174, 45)" }}>${grandTotal.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {OrderSummaryData && OrderSummaryData.order_detail && OrderSummaryData.order_detail.deliver_name ? (
        <>
        <div className="border-b-2 mx-2 my-4"></div>
        <div className="my-12">
          <div className="text-[20px] font-normal opacity-100 text-black admin_medium">
            Customer Details
          </div>
          <div className="border-b-2 mx-2 my-4"></div>
          <div className="flex justify-between">
            <p>{OrderSummaryData && OrderSummaryData.order_detail && OrderSummaryData.order_detail.billing_name}</p>
            {/* <button className="delivery_btn">Delivery Address</button> */}
          </div>
          {/* <p className="flex space-x-4">
            <span>
              <img src={AddressIcon} alt="" className="w-4 h-4" />
            </span>
            <span className="text-[15px] text-[#3A3A3A]">
              230 Sterling Drive Suite 260, Tracy, CA 95391
            </span>
          </p> */}
          <p className="flex space-x-4">
            <span>
              <img src={CallIcon} alt="" className="w-4 h-4" />
            </span>
            <span className="text-[15px] text-[#3A3A3A]">{OrderSummaryData && OrderSummaryData.order_detail && OrderSummaryData.order_detail.delivery_phn}</span>
            {/* <span>
              <img src={MilesIcon} alt="" className="w-4 h-4" />
            </span>
            <span className="text-[15px] text-[#3A3A3A]">5 Miles away</span> */}
          </p>

          {/* <div className="border-b-2 mx-2 my-4"></div>

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
          </div> */}
        </div>
        </>
      ) : (
        <div></div>
      )}


      {OrderSummaryData && OrderSummaryData.id_card_detail && OrderSummaryData.id_card_detail.i_card_type != 'verify_non_id_person'  ? 
      (
        <>
          <div className="my-10">
            <div className="text-[20px] font-normal opacity-100 text-black admin_medium">
              Identification Card
            </div>
            <div className="border-b-2 mx-2 my-4"></div>
            <div className="flex justify-between py-2">
              <span>ID Number</span>
              <p>{OrderSummaryData && OrderSummaryData.id_card_detail && OrderSummaryData.id_card_detail.i_card_number}</p>
            </div>
           
            <div className="flex justify-between py-2">
              <span>Expiration Date</span>
              <p>{OrderSummaryData && OrderSummaryData.id_card_detail && OrderSummaryData.id_card_detail.i_card_ex_date}</p>
            </div>

            {OrderSummaryData && OrderSummaryData.id_card_detail && OrderSummaryData.id_card_detail.i_card_dob != '' && OrderSummaryData.id_card_detail.i_card_dob != '0000-00-00' && (
              <div className="flex justify-between py-2">
                <span>Date Of Birth</span>
                <p>{OrderSummaryData.id_card_detail.i_card_dob}</p>
              </div>
            )}

            <div className="">
              <div className="id-card bg-white p-4 rounded-md shadow-md">
              <img 
                  src={OrderSummaryData.id_card_detail.i_card_front_img ? `https://www.quickvees.com/upload/customer/id_proof/${OrderSummaryData.id_card_detail.i_card_front_img}` : ''}
                  alt="ID Card" 
                  className="w-96 h-96 object-cover" 
              />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default PaymentCalDetails;