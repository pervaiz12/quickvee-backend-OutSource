import React from "react";

import { Link } from "react-router-dom";
import RightIcon from "../../Assests/Dashboard/Right.svg";
// import ProgressBar from "@ramonak/react-progress-bar";
import ProgressBar from "./ProgressBar";

const SellItems = () => {
  const progressValue = "$446.58"; // Set your progress values accordingly
  const progressValue1 = "$132.34"; // Set your second progress value

  const column1Data = [
    { product: "T2 3000-4500 Single 19.99", price: "$179.18" },
    { product: "Hemp Product", price: "$179.18" },
    { product: "Misc Taxable", price: "$79.19" },
    { product: "Product 4", price: "$49.99" },
    { product: "Product 5", price: "$19.99" },
  ];

  return (
    <>
      <div className="box">
        <div className="qvrow">
          <div className="col-qv-6">
            <div className="box_shadow_div ">
              <div className="q_saleitem_header">
                <Link to="/toptraders" className="q_dashbaord_netsales flex">
                  <h1> Top Selling Items</h1>

                  <div className="ml-3">
                    <img src={RightIcon} alt="down" className="w-8 h-8" />{" "}
                  </div>
                </Link>
              </div>
              <div className="q_background_status">
                <div className="q_sales_trading_data">
                  <p>T2 3000-4500 Single 19.99</p>
                  <p>179.18</p>
                </div>
              </div>
              <div className="q_sales_trading_data">
                <p>T2 3000-4500 Single 19.99</p>
                <p>179.18</p>
              </div>
              <div class="q_background_status">
                <div class="q_sales_trading_data">
                  <p>T2 3000-4500 Single 19.99</p>
                  <p>179.18</p>
                </div>
              </div>
              <div className="q_sales_trading_data">
                <p>T2 3000-4500 Single 19.99</p>
                <p>179.18</p>
              </div>
            </div>
          </div>

          <div className="col-qv-6">
            <div className="box_shadow_div ">
              <div className="q_saleitem_header flex justify-between">
                <Link to="/toptraders" className="q_dashbaord_netsales flex">
                  <h1>Sales Tenders</h1>
                  <div className="ml-3">
                    <img src={RightIcon} alt="down" className="w-8 h-8" />{" "}
                  </div>
                </Link>
                <div className="py-2 lg:text-[20px] admin_medium sales md:text-sm sm:text-xs">
                  Total: 578.92
                </div>
              </div>
              <div className="q_extranal_text">
                <p className="">External Credit</p>

                <div className="extranal_progress_value">
                  <p>$446.58</p>
                </div>
              </div>
              <div className="q_extranal_text">
                <p className="">Cash</p>

                <div className="cash_progress_value">
                  <p>$132.34</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SellItems;
