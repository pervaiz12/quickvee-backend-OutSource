import React from "react";
import PaymentCalDetails from "./PaymentCalDetails";
import MultiSteporder from "./MultiSteporder";

const OrderStatusSummary = () => {
  return (
    <>
      <div className="q_order_status_header_section ">
        <div className="q_order_content_multistepform border-r-2">
          <div className="">
            <div className="text-[20px] font-normal opacity-100 text-black admin_medium ml-20">
              Order Status
            </div>

            <MultiSteporder />

            {/* order summary */}
            <div className="mx-12">
              <div className="text-[20px] font-normal opacity-100 text-black  admin_medium ml-20">
                Delivery
              </div>

              <div className="flex justify-center items-center gap-4 mt-12 mr-22">
                <div className="order-image-details">
                  <img
                    src="https://www.quickvee.com/upload/products/MAL4284CA/1664311244Screenshot%202022-09-27%20132829.png"
                    alt="Product"
                    className="w-24 h-24 object-cover"
                  />
                </div>
                <div className="order-details-container">
                  <div className="order-summary-title text-xl font-semibold">
                    3-IN-1 Silicone Glass Double Percolator Water Pipe
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    <div className="text-gray-600">$35.00</div>
                    <div className="text-gray-600 bold">1x</div>
                    <div className="text-lg">$35.00</div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center gap-4 mt-12 mr-22">
                <div className="order-image-details">
                  <img
                    src="https://www.quickvee.com/upload/products/MAL4284CA/1664311244Screenshot%202022-09-27%20132829.png"
                    alt="Product"
                    className="w-24 h-24 object-cover"
                  />
                </div>
                <div className="order-details-container">
                  <div className="order-summary-title text-xl font-semibold">
                    3-IN-1 Silicone Glass Double Percolator Water Pipe
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    <div className="text-gray-600">$35.00</div>
                    <div className="text-gray-600 bold">1x</div>
                    <div className="text-lg">$35.00</div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center gap-4 mt-12 mr-22">
                <div className="order-image-details">
                  <img
                    src="https://www.quickvee.com/upload/products/MAL4284CA/1664311244Screenshot%202022-09-27%20132829.png"
                    alt="Product"
                    className="w-24 h-24 object-cover"
                  />
                </div>
                <div className="order-details-container">
                  <div className="order-summary-title text-xl font-semibold">
                    3-IN-1 Silicone Glass Double Percolator Water Pipe
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-2 ">
                    <div className="text-gray-600">$35.00</div>
                    <div className="text-gray-600 bold">1x</div>
                    <div className="text-lg">$35.00</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-b-2 mx-12 my-4"></div>

          <div className="mx-12 mt-12">
              <div className="text-[20px] font-normal opacity-100 text-black  admin_medium ml-20">
              Order Summary <span style={{ color: "#F55353" }}>(2items)</span>
              </div>
              <div className="payment-stepper-checkout-content">
          <div className="flex justify-between py-2 mx-24">
            <span>Subtotal</span>
            <p>$95.00</p>
          </div>
          <div className="flex justify-between py-2 mx-24">
            <span style={{color:"#E6962E"}}>Refunded Amount</span>
            <p  style={{color:"#E6962E"}}>-$60.00</p>
          </div>
          <div className="quickvee-checkout-final-amount flex justify-between mx-24">
            <span className="" style={{ color: "#000", fontWeight:"bold" }}>Amount</span>
            <p  className="" style={{ color: "#000",fontWeight:"bold" }}>$91.90</p>
          </div>
          </div>
              </div>

              
        </div>

        {/* order summary details */}
        
        

        <div className="q_order_summary_billing_page mx-14">
          <PaymentCalDetails />
        </div>
      </div>
    </>
  );
};

export default OrderStatusSummary;
