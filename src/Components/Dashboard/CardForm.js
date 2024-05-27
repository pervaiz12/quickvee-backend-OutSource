import React, { useState, useEffect } from "react";
import { BiCaretUp } from "react-icons/bi";
import "../../Styles/Settings/Side.css";

const CardForm = (props) => {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth <= 995); // Assuming tablet width as 768px
    };

    // Initial check
    handleResize();

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="box">
      {/* <div className="qvrow">
        <div className={`Card_admin ${isTablet ? "col-qv-6" : "col-qv-3"}`}>
          <div className="box_shadow_div mt_card_header">
            <div className="text-[#707070] font-normal lg:text-[18px]  sm:text-[14px] tracking-normal opacity-100 Admin_std">
              Transactions
            </div>
            <div className="text-black lg:text-[40px] sm:text-[24px] font-normal Admin_std mt-1 mb-1">
              20
            </div>
            <div className="flex items-center text-green-500">
              <BiCaretUp className="mr-1" />
              <span className="text-green-500 Admin_std">+21.00%</span>
            </div>
          </div>
        </div>

        <div
          className={`col-qv-3 Card_admin ${
            isTablet ? "col-qv-6" : "col-qv-3"
          }`}
        >
          <div className="box_shadow_div mt_card_header">
            <div className="text-[#707070] font-normal  lg:text-[18px]  sm:text-[14px] tracking-normal opacity-100 Admin_std">
              Average Sale Value
            </div>
            <div className="text-black lg:text-[40px] sm:text-[24px] font-normal Admin_std mt-1 mb-1">
              21.79
            </div>
            <div className="flex items-center text-green-500">
              <BiCaretUp className="mr-1" />
              <span className="text-green-500 Admin_std">+21.00%</span>
            </div>
          </div>
        </div>

        <div className={`Card_admin ${isTablet ? "col-qv-6" : "col-qv-3"}`}>
          <div className="box_shadow_div mt_card_header ">
            <div className="text-[#707070] font-normal  lg:text-[18px]  sm:text-[14px] tracking-normal opacity-100 Admin_std">
              Average Item Sale
            </div>
            <div className="text-black lg:text-[40px] sm:text-[24px] font-normal Admin_std mt-1 mb-1">
              1.5
            </div>
            <div className="flex items-center text-green-500">
              <BiCaretUp className="mr-1" />
              <span className="text-green-500 Admin_std">+21.00%</span>
            </div>
          </div>
        </div>

        <div className={`Card_admin ${isTablet ? "col-qv-6" : "col-qv-3"}`}>
          <div className="box_shadow_div mt_card_header">
            <div className="text-[#707070] font-normal  lg:text-[18px]  sm:text-[14px] tracking-normal opacity-100 Admin_std">
              Net COGS
            </div>
            <div className="text-black lg:text-[40px] sm:text-[24px] font-normal Admin_std mt-1 mb-1">
              116.50
            </div>
            <div className="flex items-center text-green-500">
              <BiCaretUp className="mr-1" />
              <span className="text-green-500 Admin_std">+21.00%</span>
            </div>
          </div>
        </div>
      </div> */}
      <div className="">
        <div className="qvrow">
          <div className={`Card_admin ${isTablet ? "col-qv-6" : "col-qv-3"}`}>
            <div className="box_shadow_div mt_card_header">
              <div className="text-[#707070] font-normal text-[18px] tracking-normal opacity-100 Admin_std">
                Total Orders
              </div>
              <div className="text-black lg:text-[40px] sm:text-[24px] font-normal Admin_std mt-1 mb-1">
                {/* 76.55% */}
                {props?.dashboardCount?.total_order}
              </div>
              {/* <div className="flex items-center text-green-500">
                <BiCaretUp className="mr-1" />
                <span className="text-green-500 Admin_std">+21.00%</span>
              </div> */}
            </div>
          </div>

          {/* Add more cards as needed */}
          {/* Example of a second card */}
          <div className={`Card_admin ${isTablet ? "col-qv-6" : "col-qv-3"}`}>
            <div className="box_shadow_div mt_card_header">
              <div className="text-[#707070] font-normal text-[18px] tracking-normal opacity-100 Admin_std">
                Delivered Orders
              </div>
              <div className="text-black lg:text-[40px] sm:text-[24px] font-normal Admin_std mt-1 mb-1">
                {props?.dashboardCount?.deliver_order}
              </div>
              {/* <div className="flex items-center text-green-500">
                <BiCaretUp className="mr-1" />
                <span className="text-green-500 Admin_std">+21.00%</span>
              </div> */}
            </div>
          </div>

          {/* Example of a third card */}
          <div className={`Card_admin ${isTablet ? "col-qv-6" : "col-qv-3"}`}>
            <div className="box_shadow_div mt_card_header">
              <div className="text-[#707070] font-normal text-[18px] tracking-normal opacity-100 Admin_std">
                Open Orders
              </div>
              <div className="text-black lg:text-[40px] sm:text-[24px] font-normal Admin_std mt-1 mb-1">
                {props?.dashboardCount?.open_order}
              </div>
              {/* <div className="flex items-center text-green-500">
                <BiCaretUp className="mr-1" />
                <span className="text-green-500 Admin_std">+21.00%</span>
              </div> */}
            </div>
          </div>

          {/* Example of a fourth card */}
          <div className={`Card_admin ${isTablet ? "col-qv-6" : "col-qv-3"}`}>
            <div className="box_shadow_div mt_card_header">
              <div className="text-[#707070] font-normal text-[18px] tracking-normal opacity-100 Admin_std">
                Cancelled Orders
              </div>
              <div className="text-black lg:text-[40px] sm:text-[24px] font-normal Admin_std mt-1 mb-1">
                {props?.dashboardCount?.cancel_order}
              </div>
              {/* <div className="flex items-center text-green-500">
                <BiCaretUp className="mr-1" />
                <span className="text-green-500 Admin_std">+21.00%</span>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardForm;
