import React, { useState , useEffect } from "react";
import axios from "axios";
import DownIcon from "../../../Assests/Dashboard/Down.svg";
import { BASE_URL, VENDORS_LIST} from "../../../Constants/Config";

const FilterVendorList = ({title,onVendorChange}) => {

    const handleVendorChange = (event) => {
        const selectedVendorId = event.target.value;
        // console.log(selectedVendorId)
        onVendorChange(selectedVendorId);
    };
    

    const [vendorList, setVendorList] = useState([]);
    const staticMerchantId = "MAL0100CA";

    useEffect(() => {
    const fetchData = async () => {
        try {
        const response = await axios.post(BASE_URL + VENDORS_LIST, {
            merchant_id: staticMerchantId,
        }, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        // console.log(response.data['vendor_list']);

        setVendorList(response.data['vendor_list']);
        } catch (error) {
        console.error("Error fetching vendor list:", error);
        }
    };

    fetchData();
    }, []);

  return (
    <>
      <div className="q-category-bottom-detail-section">
        <div className="q-category-bottom-header-sticky">
          <div className="q-category-bottom-header">
            <div className='q_details_header ml-2'>{title}</div>
          </div>
          <div className='q_details_header ml-8'>Filter by</div>
        </div>

        <div className="q-order-page-container ml-8">
          {/* Order Source Dropdown */}
          <div className="q-order-page-filter">
            <label className="q-details-page-label" htmlFor="orderSourceFilter">
              Vendor Name
            </label>
            <div className="custom-dropdown">
            <select onChange={handleVendorChange}>
                <option key="all" value="all">All</option>
                {vendorList.map(vendor => (
                    <option key={vendor.id} value={vendor.id}>
                        {vendor.name}
                    </option>
                ))}
            </select>
            </div>
          </div>

          
        </div>
      </div>
    </>
  );
};

export default FilterVendorList;
