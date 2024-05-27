import React from "react";
import PaymentCalDetails from "./PaymentCalDetails";
import MultiSteporder from "./MultiSteporder";

const OrderStatusSummary = ({ OrderSummaryData }) => {
  // console.log(OrderSummaryData);
  // console.log(ShowOrderMethod);
  const CouponCodeData =
    OrderSummaryData &&
    OrderSummaryData.order_detail &&
    OrderSummaryData.order_detail.coupon_code
      ? JSON.parse(OrderSummaryData.order_detail.coupon_code)
      : null;
  // console.log(CouponCodeData);

  const orderDetail = OrderSummaryData.order_detail || {};
  const FinalTotal =
    (parseFloat(orderDetail.amt) || 0) -
    (parseFloat(orderDetail.refund_amount) || 0);

  const capitalizeWords = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const mainDivStyle = {
    display: "flex",
  };
  const mainPTag = {
    backgroundColor: "rgb(227 227 227)",
    fontSize: "14px",
    padding: "2px 10px",
    borderRadius: "15px",
    marginRight: "15px",
  };

  return (
    <>
      {/* <div className="q_order_status_header_section "> */}
      {/* <div className="q_order_content_multistepform border-r-2">
          <div className="">
            <div className="text-[20px] font-normal opacity-100 text-black admin_medium ml-20">
              Order Status
            </div>

            <MultiSteporder />

            <div>
              <div className="text-[20px] font-normal opacity-100 text-black  admin_medium ml-20">
                {OrderSummaryData &&
                  OrderSummaryData.order_detail &&
                  capitalizeWords(
                    OrderSummaryData.order_detail.order_method
                  )}{" "}
                Now
              </div>

              {OrderSummaryData &&
              OrderSummaryData.cart_data &&
              OrderSummaryData.cart_data.length >= 1 ? (
                OrderSummaryData.cart_data.map((SumData, index) => {
                  const price = parseFloat(SumData.price);
                  const discount = parseFloat(SumData.discount_amt);
                  const finalAmount = price - discount;

                  const inputString = SumData.note;
                  const keyValuePairs = inputString.split("~");

                  const parsedData = {};
                  keyValuePairs.forEach((pair) => {
                    const [key, value] = pair.split("-");
                    if (key && value) {
                      parsedData[key.toLowerCase()] = value;
                    }
                  });

                  return (
                    <div
                      key={index}
                      className="flex items-center gap-4 mt-12 mr-22 ml-20"
                    >
                      <div className="order-image-details">
                        <img
                          src="https://www.quickvee.com/upload/products/MAL4284CA/1664311244Screenshot%202022-09-27%20132829.png"
                          alt="Product"
                          className="w-24 h-24 object-cover"
                        />
                      </div>
                      <div className="order-details-container w-full">
                        <div className="order-summary-title text-xl font-semibold">
                          {parsedData && parsedData.name}
                        </div>
                        <div style={mainDivStyle}>
                          {parsedData && parsedData.size && (
                            <p style={mainPTag}>Size : {parsedData.size}</p>
                          )}
                          {parsedData && parsedData.colors && (
                            <p style={mainPTag}>Colors : {parsedData.colors}</p>
                          )}
                          {parsedData && parsedData.material && (
                            <p style={mainPTag}>
                              Material : {parsedData.material}
                            </p>
                          )}
                        </div>
                        <div className="grid grid-cols-3 gap-2 mt-2">
                          <div className="text-gray-600">
                            ${finalAmount.toFixed(2)}
                          </div>
                          <div className="text-gray-600 bold">
                            {SumData.qty}x
                          </div>
                          <div className="text-lg">
                            ${finalAmount.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="empty-div">No data available</div>
              )}
            </div>
          </div>
          <div className="border-b-2 mx-12 my-4"></div>

          <div>
            <div className="text-[20px] font-normal opacity-100 text-black  admin_medium ml-20">
              Order Summary
              <span style={{ color: "#F55353" }}>
                {OrderSummaryData &&
                OrderSummaryData.cart_data &&
                OrderSummaryData.cart_data.length == "1"
                  ? " (1 item)"
                  : OrderSummaryData &&
                      OrderSummaryData.order_detail &&
                      OrderSummaryData.cart_data.length > 1
                    ? " (" + OrderSummaryData.cart_data.length + " item)"
                    : OrderSummaryData &&
                      OrderSummaryData.order_detail &&
                      OrderSummaryData.order_detail.payment_id}
              </span>
            </div>
            <div className="payment-stepper-checkout-content">
              <div className="flex justify-between py-2 mx-24">
                <span>Subtotal</span>
                <p>
                  $
                  {OrderSummaryData &&
                    OrderSummaryData.order_detail &&
                    parseFloat(OrderSummaryData.order_detail.subtotal).toFixed(
                      2
                    )}
                </p>
              </div>

              {OrderSummaryData &&
              OrderSummaryData.order_detail &&
              parseFloat(OrderSummaryData.order_detail.cash_discounting) > 0 ? (
                <div className="flex justify-between py-2 mx-24">
                  <span>NCA</span>
                  <p>
                    $
                    {OrderSummaryData &&
                      OrderSummaryData.order_detail &&
                      parseFloat(
                        OrderSummaryData.order_detail.cash_discounting
                      )}
                  </p>
                </div>
              ) : (
                <div></div>
              )}

              {OrderSummaryData &&
              OrderSummaryData.order_detail &&
              OrderSummaryData.order_detail.order_method == "delivery" ? (
                <div className="flex justify-between py-2 mx-24">
                  <span>Delivery Fee</span>
                  <p>
                    $
                    {OrderSummaryData &&
                      OrderSummaryData.order_detail &&
                      parseFloat(OrderSummaryData.order_detail.del_fee)}
                  </p>
                </div>
              ) : (
                <div></div>
              )}

              {OrderSummaryData &&
              OrderSummaryData.order_detail &&
              parseFloat(OrderSummaryData.order_detail.con_fee) > 0 ? (
                <div className="flex justify-between py-2 mx-24">
                  <span>Convenience Fee</span>
                  <p>
                    $
                    {OrderSummaryData &&
                      OrderSummaryData.order_detail &&
                      parseFloat(OrderSummaryData.order_detail.con_fee).toFixed(
                        2
                      )}
                  </p>
                </div>
              ) : (
                <div></div>
              )}

              <div className="flex justify-between py-2 mx-24">
                <span>
                  {" "}
                  {`Sales Tax (${
                    OrderSummaryData &&
                    OrderSummaryData.order_detail &&
                    OrderSummaryData.order_detail.tax_rate
                  })`}{" "}
                </span>
                <p>
                  $
                  {OrderSummaryData &&
                    OrderSummaryData.order_detail &&
                    parseFloat(OrderSummaryData.order_detail.tax).toFixed(2)}
                </p>
              </div>

              {OrderSummaryData &&
                OrderSummaryData.order_detail &&
                OrderSummaryData.order_detail.coupon_code !== "" && (
                  <>
                    {CouponCodeData &&
                      CouponCodeData.coupon_code !== "" &&
                      CouponCodeData.coupon_code_amt > 0 && (
                        <div className="flex justify-between py-2 mx-24">
                          <span>{`Coupon (${
                            CouponCodeData && CouponCodeData.coupon_code
                          })`}</span>
                          <p>
                            {CouponCodeData && CouponCodeData.coupon_code_amt}
                          </p>
                        </div>
                      )}

                    {CouponCodeData &&
                      CouponCodeData.loyalty_point_spent > 0 && (
                        <div className="flex justify-between py-2 mx-24">
                          <span>{`Points Applied (${
                            CouponCodeData && CouponCodeData.loyalty_point_spent
                          })`}</span>
                          <p>
                            {CouponCodeData &&
                              CouponCodeData.loyalty_point_amt_spent}
                          </p>
                        </div>
                      )}

                    {CouponCodeData &&
                      CouponCodeData.store_credit_amt_spent > 0 && (
                        <div className="flex justify-between py-2 mx-24">
                          <span>Store Credit</span>
                          <p>
                            {CouponCodeData &&
                              CouponCodeData.store_credit_amt_spent}
                          </p>
                        </div>
                      )}
                  </>
                )}

              {CouponCodeData &&
                CouponCodeData.coupon_code === "" &&
                OrderSummaryData &&
                OrderSummaryData.order_detail &&
                OrderSummaryData.order_detail.discount > 0 && (
                  <div className="flex justify-between py-2 mx-24">
                    <span>Discount</span>
                    <p>{OrderSummaryData.order_detail.discount}</p>
                  </div>
                )}

              {OrderSummaryData &&
              OrderSummaryData.order_detail &&
              parseFloat(OrderSummaryData.order_detail.tip) > 0 ? (
                <div className="flex justify-between py-2 mx-24">
                  <span>Tip</span>
                  <p>
                    $
                    {OrderSummaryData &&
                      OrderSummaryData.order_detail &&
                      parseFloat(OrderSummaryData.order_detail.tip).toFixed(2)}
                  </p>
                </div>
              ) : (
                <div></div>
              )}

              {OrderSummaryData &&
              OrderSummaryData.order_detail &&
              parseFloat(OrderSummaryData.order_detail.is_refunded) == 1 ? (
                <div className="flex justify-between py-2 mx-24">
                  <span style={{ color: "#E6962E" }}>Refunded Amount</span>
                  <p style={{ color: "#E6962E" }}>
                    $
                    {OrderSummaryData &&
                      OrderSummaryData.order_detail &&
                      parseFloat(
                        OrderSummaryData.order_detail.refund_amount
                      ).toFixed(2)}
                  </p>
                </div>
              ) : (
                <div></div>
              )}

              <div className="quickvee-checkout-final-amount flex justify-between mx-24">
                <span
                  className=""
                  style={{ color: "#000", fontWeight: "bold" }}
                >
                  Amount
                </span>
                <p className="" style={{ color: "#000", fontWeight: "bold" }}>
                  ${FinalTotal.toFixed(2)}
                </p>
              </div>

              {CouponCodeData && CouponCodeData.loyalty_point_earned > 0 ? (
                <div className="flex justify-between py-2 mx-24">
                  <span>Refunded Amount</span>
                  <p>
                    ${CouponCodeData && CouponCodeData.loyalty_point_earned}
                  </p>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div> */}
      {/* order summary details */}

      {/* <div className="q_order_summary_billing_page mx-14"> */}
      <PaymentCalDetails />
      {/* </div> */}
      {/* </div> */}
    </>
  );
};

export default OrderStatusSummary;
