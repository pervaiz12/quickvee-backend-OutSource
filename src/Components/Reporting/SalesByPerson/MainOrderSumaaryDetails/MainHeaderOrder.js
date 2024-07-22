import React, { useState } from "react";

import AddressIcon from "../../../../Assests/Dashboard/flag.png";
import ContactIcon from "../../../../Assests/Dashboard/contact.png";
import LoactionIcone from "../../../../Assests/Dashboard/location.png";

const MainHeaderOrder = ({ MerchantDetailsData, ShowOrderMethod }) => {
 

  return (
    <div className="content_order_main bg-[#ffffff]">
      <div className="q_order_bg_img_section">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mx-auto sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto">
          <div className="q_order_images_details">
            
          </div>

          {MerchantDetailsData && MerchantDetailsData.length >= 1 ? (
            MerchantDetailsData.map((addData, index) => {
              const phoneNumber = addData.a_phone;
              // Format the phone number
              const formattedPhoneNumber = `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;

              return(
                <div key={index} className="q_customer_location ml-16 my-36">
                  <div className="text-white space-y-4">
                    <div>
                      <p className="flex space-x-4">
                        <span>
                          <img
                            src={LoactionIcone}
                            alt="Location Icon"
                            className="w-8 h-8"
                          />
                        </span>
                        <span className="text-[20px]">
                          {addData.a_address_line_1+' '+addData.a_address_line_2+', '+addData.a_city+' '+addData.a_state+' '+addData.a_zip}
                        </span>
                      </p>
                    </div>
                    <p className="flex space-x-4">
                      <span>
                        <img
                          src={ContactIcon}
                          alt="Contact Icon"
                          className="w-8 h-8"
                        />
                      </span>
                      <span className="text-[20px]">{formattedPhoneNumber}</span>
                    </p>
                    {ShowOrderMethod && ShowOrderMethod == 'delivery' ? (
                      <p className="flex space-x-4">
                        <span>
                          <img
                            src={AddressIcon}
                            alt="Address Icon"
                            className="w-8 h-8"
                          />
                        </span>
                        <span className="text-[20px]">
                          Delivery Time {addData.deliver_min_time} - {addData.deliver_max_time} Min
                        </span>
                      </p>
                    ) : (
                      <p className="flex space-x-4">
                        <span>
                          <img
                            src={AddressIcon}
                            alt="Address Icon"
                            className="w-8 h-8"
                          />
                        </span>
                        <span className="text-[20px]">
                          Pickup Time {addData.pickup_min_time} - {addData.pickup_max_time} Min
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="empty-div">No data available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainHeaderOrder;