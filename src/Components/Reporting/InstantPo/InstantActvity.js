import React, { useState } from "react";
import DateRange from "../../Orders/InstoreOrder/DateRange";
import MainInstantDetails from "./MainInstantDetails";

const InstantActvity = () => {
  const [filteredData, setFilteredData] = useState([]);
  const handleDataFiltered = (data) => {

    const updatedData = {
      ...data,
      merchant_id: "MAL0100CA",
    };
    setFilteredData(updatedData);
  }
  return (
    <>
      <div className="">
        <div className="q-order-main-page">
          <DateRange onDateRangeChange={handleDataFiltered} />
        </div>

        <div className="q-order-main-page">
          <MainInstantDetails data={filteredData} />
        </div>
      </div>
    </>
  );
};

export default InstantActvity;
