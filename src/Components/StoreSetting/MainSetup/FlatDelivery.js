import React, { useState } from "react";

const FlatDelivery = () => {
  // State to keep track of the active tab
  const [activeTab, setActiveTab] = useState("amount");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="box">
        <div className="box_shadow_div">
          <div className="" style={{ padding: "20px" }}>
            <h5 class="box_shadow_heading"></h5>

            <div className="qvrow">
              <div className="">
                <div className="" style={{ display: "flex", width: "50%", }}>
                  {/* Amount tab */}
                  <div
                    className={`cursor-pointer px-16 rounded py-2 text-[14px]  ${
                      activeTab === "amount" ? "bg-[#0A64F9] text-white" : "bg-[#F5F5F5] text-[#6A6A6A]"
                    }`}
                    onClick={() => handleTabClick("amount")}
                  >
                    Amount
                  </div>

                  {/* Percentage tab */}
                  <div
                    className={`cursor-pointer px-16 rounded py-2  text-[14px]  ${
                      activeTab === "percentage" ? "bg-[#0A64F9] text-white" : "bg-[#F5F5F5] text-[#6A6A6A]"
                    }`}
                    onClick={() => handleTabClick("percentage")}
                  >
                    Percentage
                  </div>
                </div>
              </div>
            </div>

            {/* Conditionally render rows based on activeTab */}
            {activeTab === "amount" && (
                <div className="mt-5">
              <div className="qvrow">
                <div className="col-qv-6">
                  <div className="input_area">
                    <label>Delivery Fee ($)</label>
                    <input type="" id="" className="" value="" />
                  </div>
                </div>
                <div className="col-qv-6">
                  <div className="input_area">
                    <label>Delivery Rate per Mile ($)</label>
                    <input type="" id="" className="" value="" />
                  </div>
                </div>
              </div>
              </div>
            )}

            {activeTab === "percentage" && (
                 <div className="mt-5">
              <div className="qvrow">
                <div className="col-qv-6">
                  <div className="input_area">
                    <label>Percentage Fee (%)</label>
                    <input type="" id="" className="" value="" />
                  </div>
                </div>
                <div className="col-qv-6">
                  <div className="input_area">
                    <label>Percentage Rate per Mile (%)</label>
                    <input type="" id="" className="" value="" />
                  </div>
                </div>
              </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FlatDelivery;
