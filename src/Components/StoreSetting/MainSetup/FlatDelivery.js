import { event } from "jquery";
import React, { useState ,useEffect} from "react";
import { useDispatch , useSelector} from "react-redux";

const FlatDelivery = ({DeliveryFeeData}) => {
const [deleveryChange , setDelveryChange] = useState();
const [delveryRates , setDeleveryRate] = useState();

  const dispatch = useDispatch();
  // State to keep track of the active tab
  const [activeTab, setActiveTab] = useState("0");

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
    // console.log(setupDataState?.float_delivery)
    if (setupDataState?.delivery_fee) {
      setDelveryChange(setupDataState.delivery_fee);
    }
    if (setupDataState?.rate_per_miles){
      setDeleveryRate(setupDataState.rate_per_miles);
    }
    if (setupDataState?.float_delivery){
      setActiveTab(setupDataState.float_delivery);
    }
  }, [setupDataState])

  useEffect(() => {
    DeliveryFeeData(activeTab, deleveryChange, delveryRates)
  }, [activeTab, deleveryChange, delveryRates])

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
                      activeTab === "0" ? "bg-[#0A64F9] text-white" : "bg-[#F5F5F5] text-[#6A6A6A]"
                    }`}
                    onClick={() => handleTabClick("0")}
                  >
                    Flat Delivery Fee
                  </div>

                  {/* miledelivery tab */}
                  <div
                    className={`cursor-pointer px-12 rounded py-2  text-[14px]  ${
                      activeTab === "1" ? "bg-[#0A64F9] text-white" : "bg-[#F5F5F5] text-[#6A6A6A]"
                    }`}
                    onClick={() => handleTabClick("1")}
                  >
                  Per Mile Delivery Fee
                  </div>
                </div>
              </div>
            </div>

            {/* Conditionally render rows based on activeTab */}
            {activeTab === "0" && (
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

            {activeTab === "1" && (
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
