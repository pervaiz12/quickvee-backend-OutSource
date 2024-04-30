import React, { useState } from "react";
import FilterEmp from "./FilterEmp";
import DateRange from "./DateRange";
import ContentList from "./ContentList";
import InstoreTableViewData from "./InstoreTableViewData";
import OnlineTableViewData from "../OnlineOrder/OnlineTableViewData";
import MainOnline from "../OnlineOrder/MainOnline";

const MainInStore = () => {
  const [activeTab, setActiveTab] = useState("offline");

  const [OrderSourceData, setOrderSourceData] = useState(null);
  const [OrderTypeData, setOrderTypeData] = useState(null);
  const [EmployeeIDData, setEmployeeIDData] = useState(null);

  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const handleDateRangeChange = (dateRange) => {
      setSelectedDateRange(dateRange);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleFilterDataChange = (OrderSource , OrderType) => {
    setOrderSourceData(OrderSource);
    setOrderTypeData(OrderType);
  };

  const handleFilterEmpDataChange = (OrderSource , EmployeeID) => {
    setOrderSourceData(OrderSource);
    setEmployeeIDData(EmployeeID);
  };

  const renderInStoreContent = () => {
    if (activeTab === "online") {
      return (
        <>
          <MainOnline 
            onFilterDataChange={handleFilterDataChange} 
          />
        </>
      );
    } else if (activeTab === "offline") {
      return (
        <>
          <FilterEmp 
            onFilterEmpDataChange={handleFilterEmpDataChange} 
          />
        </>
      );
    }
    return null;
  };

  return (
    <>
      <div className="q-order-main-page">
        <div className="box">
          <div className="box_shadow_div" style={{overflow:"unset"}}>
            <div className="mb6_border">
              <button
                onClick={() => handleTabClick("offline")}
                className={`${
                  activeTab === "offline"
                    ? "bg-[#EBF2FF] text-[#0A64F9] "
                    : "bg-white text-[#6A6A6A]"
                } px-12 py-2 rounded  lg:text-[20px] md:text-[14px] sm:text-[12px] focus:outline-none`}
              >
                In-Store Orders
              </button>
              <button
                onClick={() => handleTabClick("online")}
                className={`${
                  activeTab === "online"
                    ? "bg-[#EBF2FF] text-[#0A64F9] "
                    : "bg-white text-[#6A6A6A]"
                } px-12 py-2 rounded focus:outline-none lg:text-[20px] md:text-[14px] sm:text-[12px]`}
              >
                Online Orders
              </button>
              
            </div>

            <div className="">
              <div className="">{renderInStoreContent()}</div>
            </div>
          </div>
          <div className="q_dateRange_header">
            <DateRange 
              onDateRangeChange={handleDateRangeChange}
            />
          </div>
          <div className="q_dateRange_header">
            <ContentList />
          </div>

          <div className="q_dateRange_header">
            {activeTab === "offline" ? (
              <InstoreTableViewData 
                OrderSourceData={OrderSourceData} 
                EmployeeIDData={EmployeeIDData} 
                selectedDateRange={selectedDateRange} 
              />
            ) : (
              <OnlineTableViewData
                OrderSourceData={OrderSourceData} 
                OrderTypeData={OrderTypeData} 
                selectedDateRange={selectedDateRange} 
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainInStore;
