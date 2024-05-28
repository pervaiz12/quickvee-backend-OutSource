import React, { useState } from "react";
import DateRange from "../../Orders/InstoreOrder/DateRange";
import MainInstantDetails from "./MainInstantDetails";
import { useAuthDetails } from "../../../Common/cookiesHelper";

const InstantActvity = () => {
  const { LoginGetDashBoardRecordJson, LoginAllStore, userTypeData } =
    useAuthDetails();

  const [filteredData, setFilteredData] = useState([]);
  const handleDataFiltered = (data) => {
    let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;
    const updatedData = {
      ...data,
      merchant_id,
      ...userTypeData,
    };
    setFilteredData(updatedData);
  };
  return (
    <>
      <div className="">
        <div className="q-order-main-page">
          <div className="box instantPOReport">
            <DateRange onDateRangeChange={handleDataFiltered} />
          </div>
        </div>

        <div className="q-order-main-page">
          <MainInstantDetails data={filteredData} />
        </div>
      </div>
    </>
  );
};

export default InstantActvity;
