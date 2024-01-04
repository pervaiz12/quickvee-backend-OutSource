import React from "react";
import { BsDot } from "react-icons/bs";

const ImportData = () => {
  return (
    <>
      <div className="q-category-main-page">
      <div className="q-category-top-detail-section flex justify-between w-full">
  <div className="col-span-8 mt-4">
    <div className="CircularSTDBook text-[14px] flex text-[#818181]">
      <BsDot className="text-black text-[22px] mr-1" />
      Download and check sample CSV file for proper file format and fields.
    </div>

    <div className="CircularSTDBook text-[14px] flex text-[#818181]">
      <BsDot className="text-black text-[22px] mr-1" />
      <span>
        Please enter variant names which are created for the store. (Also, they
        are case sensitive).
      </span>
    </div>
  </div>

  <div className="col-span-4">
    <button
      className="px-4 py-2 border-[#0A64F9] text-blue text-[#0A64F9] border-2 rounded-md opacity-100 mt-3"
      onClick={() => {
        // Handle the download functionality here
        window.location.href =
          "https://sandbox.quickvee.com/upload/SampleCSV/SampleProductsCSVnew.csv";
      }}
    >
      Sample CSV Download
    </button>
  </div>
</div>

      </div>
    </>
  );
};

export default ImportData;
