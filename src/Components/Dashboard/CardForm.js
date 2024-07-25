import React, { useState, useEffect } from "react";
import { BiCaretUp } from "react-icons/bi";
import "../../Styles/Settings/Side.css";
import { priceFormate } from "../../hooks/priceFormate";
import Skeleton from "react-loading-skeleton";

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

      <div className="">
        <div className="qvrow">
          <div className={`Card_admin ${isTablet ? "col-qv-6" : "col-qv-3"}`}>
            <div className="box_shadow_div mt_card_header">
              <div className="text-[#707070] font-normal text-[18px] tracking-normal opacity-100 Admin_std">
                Total Orders
              </div>
              <div className="text-black lg:text-[40px] sm:text-[24px] font-normal Admin_std mt-1 mb-1">
                {/* 76.55% */}
                { !props.loadingCount && props?.dashboardCount ?  priceFormate(Number(props?.dashboardCount?.total_order)) : <Skeleton /> }
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
                { !props.loadingCount && props?.dashboardCount  ?  priceFormate(Number(props?.dashboardCount?.deliver_order)) : <Skeleton /> }
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
                { !props.loadingCount && props?.dashboardCount ?  priceFormate(Number(props?.dashboardCount?.open_order)) : <Skeleton /> }
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
                { !props.loadingCount && props?.dashboardCount  ?  priceFormate(Number(props?.dashboardCount?.cancel_order)) : <Skeleton /> }
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
