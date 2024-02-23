import React, { useState , useEffect } from "react";
import axios from "axios";
import DownIcon from "../../../Assests/Dashboard/Down.svg";
import { BASE_URL, ORDER_REFUND_REPORT} from "../../../Constants/Config";

const OrderRefundFilter = ({title,onCategoryChange,onReasonChange}) => {

    const Categoryfilter = (event) => {
        const selectedCategoryId = event.target.value;
        // console.log(selectedCategoryId)
        onCategoryChange(selectedCategoryId);
    };


    const reasonfilter = (event) => {
        const selectedReason = event.target.value;
        // console.log(selectedReason)
        onReasonChange(selectedReason);
    };
    

    const [categoryList, setCategoryList] = useState([]);
    const staticMerchantId = "MAL0100CA";

    useEffect(() => {
    const fetchData = async () => {
        try {
        const response = await axios.post(BASE_URL + ORDER_REFUND_REPORT, {
            merchant_id: staticMerchantId,
        }, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        // console.log(response.data['vendor_list']);

        setCategoryList(response.data['category_list']);
        } catch (error) {
        console.error("Error fetching category list:", error);
        }
    };

    fetchData();
    }, []);

  return (
    <>
    <div className="box">
      <div className="q-category-bottom-detail-section">
        <div className="q-category-bottom-header-sticky">
          <div className="q-category-bottom-header">
            <div className='q_details_header ml-2'>{title}</div>
          </div>
          <div className='q_details_header ml-8'>Filter by</div>
        </div>

        <div className="q-order-page-container ml-8">
          {/* Order Source Dropdown */}
          {/* <div className="q-order-page-filter">
            <label className="q-details-page-label" htmlFor="orderSourceFilter">
              Select Category
            </label>
            <div className="custom-dropdown">
            <select onChange={Categoryfilter}>
                <option key="all" value="all">All</option>
                {categoryList.map(category => (
                    <option key={category.id} value={category.id}>
                        {category.title}
                    </option>
                ))}
            </select>
            </div>
          </div> */}

          <div className="q-order-page-filter">
            <label className="q-details-page-label" htmlFor="orderSourceFilter">
              Select Reason
            </label>
            <div className="custom-dropdown">
            <select onChange={reasonfilter}>
                <option  value="all">All</option>
                <option  value="Accidental Charge">Accidental Charge</option>
                <option  value="Cancelled Order">Cancelled Order</option>
                <option  value="Defective Item">Defective Item</option>
                <option  value="Fraudulent Order">Fraudulent Order</option>
                <option  value="Returned Goods">Returned Goods</option>
            </select>
            </div>
          </div>


          

          
        </div>
      </div>
      </div>
    </>
  );
};

export default OrderRefundFilter;
