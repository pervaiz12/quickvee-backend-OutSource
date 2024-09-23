import React, { useEffect, useState } from "react";


import MainSummary from "./Summary/SumaryMain";
import MainSalesbyHour from "./SalebyHour/SalebyHourMain";

import { useAuthDetails } from "../../../Common/cookiesHelper";

import { useParams } from "react-router-dom";
import DateRangeComponent from "../../../reuseableComponents/DateRangeComponent";

const MainSalesReport = () => {
  const { start_date, end_date, order_env, order_method } = useParams();
  const [activeTab, setActiveTab] = useState("Salesbyhour");

  const [OrderSourceData, setOrderSourceData] = useState(null);
  const [OrderTypeData, setOrderTypeData] = useState(
    order_env ? "Closed" : "New"
  );
  const [OnlSearchIdData, setOnlSearchIdData] = useState("");
  const [OffSearchIdData, setOffSearchIdData] = useState("");
  const [EmployeeIDData, setEmployeeIDData] = useState(null);
  const [searchId, setSearchId] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [isloading, setIsLoading] = useState(false);
  const [dateRangefromorderTypePage, setDateRangeFromOrderTypePage] = useState(
    {}
  );

  const {
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    userTypeData,
    GetSessionLogin,
    future_date,
  } = useAuthDetails();
  // let futureDate = "5"
  const merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;
  const handleDateRangeChange = (dateRange) => {
    setSelectedDateRange(dateRange);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setSearchId("");
  };

  // console.log("OrderTypeData",OrderTypeData)
  useEffect(() => {

    start_date && setSelectedDateRange({ start_date, end_date });
    // order_env === "5" && setOrderTypeData("Closed")
  }, [order_env, start_date, end_date]);
  // console.log("dateRangefromorderTypePage", dateRangefromorderTypePage);
  const handleFilterDataChange = (OrderSource, OrderType, SearchId) => {
    setOrderSourceData(OrderSource);
    setOrderTypeData(OrderType);
    setOnlSearchIdData(SearchId);
  };

  const handleFilterEmpDataChange = (OrderSource, EmployeeID, SearchId) => {
    setOrderSourceData(OrderSource);
    setEmployeeIDData(EmployeeID);
    setOffSearchIdData(SearchId);
  };

    const handleDataFiltered = (data) => {
     console.log("Dayebdvcj km ")
    }

  const renderInStoreContent = () => {
    return <DateRangeComponent onDateRangeChange={handleDataFiltered} />;
  };

  return (
    <>
      <div className="q-order-main-page">
        <h1 className="heading py-2 my-2">Sales Report</h1>
        <div className="box">
          <div className="" style={{ overflow: "unset" }}>
            <div className="mb6_border">
              {/* <div
                onClick={() => handleTabClick("Summary")}
                className={`${
                  activeTab === "Summary"
                    ? "bg-[#EBF2FF] text-[#0A64F9] font-circular-bold relative  cursor-pointer"
                    : "bg-white text-[#6A6A6A]  cursor-pointer"
                } orderfilter`}
              >
                Summary
              </div> */}
              <div
                onClick={() => handleTabClick("Salesbyhour")}
                className={`${
                  activeTab === "Salesbyhour"
                    ? "bg-[#EBF2FF] text-[#0A64F9]  font-circular-bold relative cursor-pointer"
                    : "bg-white text-[#6A6A6A] cursor-pointer"
                } orderfilter`}
              >
                Sales by hour of day
              </div>
              <div
                onClick={() => handleTabClick("individual")}
                className={`${
                  activeTab === "individual"
                    ? "bg-[#EBF2FF] text-[#0A64F9]  font-circular-bold relative cursor-pointer"
                    : "bg-white text-[#6A6A6A] cursor-pointer"
                } orderfilter`}
              >
                Individual performance
              </div>
            </div>

            <div className="">
              <div className="">{renderInStoreContent()}</div>
            </div>
          </div>


          <div className="q_dateRange_header">
            {activeTab === "Summary" ? (
              <MainSummary/>
            ) : activeTab === "Salesbyhour" ? (
                <MainSalesbyHour/>
            ): (
              "Individual"
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainSalesReport;
