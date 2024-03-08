import { event } from "jquery";
import React, { useState ,useEffect} from "react";
import { useDispatch , useSelector} from "react-redux";

const FlatDelivery = () => {
const [deleveryChange , setDelveryChange] = useState();
const [delveryRates , setDeleveryRate] = useState();

  const dispatch = useDispatch();
  // State to keep track of the active tab
  const [activeTab, setActiveTab] = useState("delivery");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };



  const handleDelChanges =(event) =>{
  //  console.log(event.target.error);
    setDelveryChange(event.target.value);
  }

  const handleRateMiles =(event) =>{
    setDeleveryRate(event.target.value);
  }
  
  const setupDataState = useSelector((state)=>state?.StoreSetupList?.storesetupData)

  useEffect(() => {
  //console.log(setupDataState?.deliver_min_time)
  if (setupDataState?.delivery_fee) {
    setDelveryChange(setupDataState.delivery_fee);
  }
  if (setupDataState?.rate_per_miles){
    setDeleveryRate(setupDataState.rate_per_miles);
  }
}, [setupDataState])


  return (
    <>
      <div className="box">
        <div className="box_shadow_div">
          <div className="" style={{ padding: "20px" }}>
            <h5 class="box_shadow_heading"></h5>

            <div className="qvrow">
              <div className="">
                <div className="" style={{ display: "flex", width: "50%", }}>
                  {/* delivery tab */}
                  <div
                    className={`cursor-pointer px-12 rounded py-2 text-[14px]  ${
                      activeTab === "delivery" ? "bg-[#0A64F9] text-white" : "bg-[#F5F5F5] text-[#6A6A6A]"
                    }`}
                    onClick={() => handleTabClick("delivery")}
                  >
                    Flat Delivery Fee
                  </div>

                  {/* miledelivery tab */}
                  <div
                    className={`cursor-pointer px-12 rounded py-2  text-[14px]  ${
                      activeTab === "miledelivery" ? "bg-[#0A64F9] text-white" : "bg-[#F5F5F5] text-[#6A6A6A]"
                    }`}
                    onClick={() => handleTabClick("miledelivery")}
                  >
                  Per Mile Delivery Fee
                  </div>
                </div>
              </div>
            </div>

            {/* Conditionally render rows based on activeTab */}
            {activeTab === "delivery" && (
                <div className="mt-5">
              <div className="qvrow">
                <div className="col-qv-6">
                  <div className="input_area">
                    <label>Delivery Fee ($)</label>
                    
                    <input
                type="text"
                placeholder="%0.00"
                maxlength="8"
                name="default_delvery_setup"
                id="delvery_setup"
                value={deleveryChange}
                onChange={handleDelChanges}
              />
                  </div>
                </div>
                <div className="col-qv-6">
                  <div className="input_area">
                    {/* <label>Delivery Rate per Mile ($)</label>
                    <input type="" id="" className="" value="" /> */}
                  </div>
                </div>
              </div>
              </div>
            )}

            {activeTab === "miledelivery" && (
                 <div className="mt-5">
              <div className="qvrow">
                <div className="col-qv-6">
                  <div className="input_area">
                    <label>Min Delivery Fee ($)</label>
                     <input
                type="text"
                placeholder="%0.00"
                maxlength="8"
                name="default_delvery_setup"
                id="delvery_setup"
                value={deleveryChange}
                onChange={handleDelChanges}
              />
                  </div>
                </div>
                <div className="col-qv-6">
                  <div className="input_area">
                    <label>Delivery Rate per Miles ($)</label>
                    <input
                type="text"
                placeholder="%0.00"
                maxlength="8"
                name="default_delvery_setup"
                id="delvery_setup"
                value={delveryRates}
                onChange={handleRateMiles}
              />
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
