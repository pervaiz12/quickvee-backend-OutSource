import React from 'react';

import AddressIcon from "../../../../Assests/Dashboard/flag.png";
import ContactIcon from "../../../../Assests/Dashboard/contact.png";
import LoactionIcone from "../../../../Assests/Dashboard/location.png";

const MainHeaderOrder = () => {
  return (
    <div className="content_order_main">
      <div className="q_order_bg_img_section">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mx-auto sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto">
          <div className="q_order_images_details">
            {/* <img src={OrderImg} alt="Order Image" className="w-full h-auto" /> */}
          </div>
          <div className="q_customer_location ml-16 my-36">
            <div className="text-white space-y-4">
              <div>
                <p className="flex space-x-4">
                  <span>
                    <img src={LoactionIcone} alt="Location Icon" className="w-8 h-8" />
                  </span>
                  <span className="text-[20px]">230 Sterling Drive Suite 260, Tracy, CA 95391</span>
                </p>
              </div>
              <p className="flex space-x-4">
                <span>
                  <img src={AddressIcon} alt="Address Icon" className="w-8 h-8" />
                </span>
                <span className="text-[20px]">Delivery Radius: 15 Miles</span>
              </p>
              <p className="flex space-x-4">
                <span>
                  <img src={ContactIcon} alt="Contact Icon" className="w-8 h-8" />
                </span>
                <span className="text-[20px]">555-555-4587</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainHeaderOrder;
