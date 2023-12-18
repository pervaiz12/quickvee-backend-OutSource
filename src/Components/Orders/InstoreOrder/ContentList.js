import React from "react";
import { BsDot } from 'react-icons/bs';


const ContentList = () => {
  return (
    <div className="main_block_content">
      <div
        className="box-content h-[100px] w-70 p-4 border-4 border-white bg-white rounded-xl opacity-100"
        style={{ boxShadow: "0px 3px 6px #0000001F" }}
      >
        <div className="text-[18px] Admin_std opacity-100  my-2 text-[#818181] flex">
        <BsDot  className="text-[#000000] text-sm mr-1"/>The customer will be notified of order Status changes.
        </div>

        <div className="text-[18px] Admin_std opacity-100 my-2 text-[#818181] flex">
        <BsDot className="text-[#000000] text-sm mr-1" />Cancellation and refunds must be made through your Payment gateway.
        </div>

        <div className="text-[18px] Admin_std opacity-100 my-2 text-[#818181] flex">
        <BsDot  className="text-[#000000]  text-sm mr-1"/>The below record is only showing successfully placed orders.
        </div>
      </div>
    </div>
  );
};

export default ContentList;
