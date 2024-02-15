import React from "react";
import { FaCheckCircle, FaTruck, FaShuttleVan, FaHome } from "react-icons/fa";
import AcceptIcon from "../../../../Assests/Defaults/accepts.svg"
import ProcessingIcon from "../../../../Assests/Defaults/processing.svg"
import DeliveryIcon from "../../../../Assests/Defaults/delivery.svg"
import CompleteIcon from "../../../../Assests/Defaults/complete.svg"


const MultiSteporder = () => {
  return (
    <>
      <div className="q_main_multistep_summary my-12 ">
   
        <div class="q-order-payement-stepper">
            <span className="active-payment-component"><img src={AcceptIcon} className="w-10 h-10 text-center multiSVG "/>Accepts</span>
               <p className="active-payment-stepper-status">
                </p><hr className="" />
                <span className="active-payment-component"><img src={ProcessingIcon} className="w-10 h-10 text-center multiSVG"/>Processing</span>
            <p className=""></p><hr className="" />
            <span className="active-payment-component"><img src={DeliveryIcon} className="w-10 h-10 text-center multiSVG"/>Out for Delivery</span>
            <p className=""></p><hr className="" />
            <span className="active-payment-component"><img src={CompleteIcon} className="w-10 h-10 text-center multiSVG"/>Delivered</span>
          
    
     </div>

     </div>
     <div className="border-b-2 mx-12 my-4"></div>
      
  
  
    </>
  );
};

export default MultiSteporder;
