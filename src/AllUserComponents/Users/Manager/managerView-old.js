import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ManagerRecord } from "../../../Redux/features/user/managerSlice";
import ManagerFunctionality from "./managerFunctionality";
import ViewMerchant from "./viewMerchantModel";
import PasswordShow from "../../../Common/passwordShow";

export default function ManagerView() {
  const {
    setShowMerchant,
    showMerchant,
    handleViewMerchant,
    handleCloseMerchantModel,
    showMerchantData,
  } = ManagerFunctionality();
  const dispatch = useDispatch();
  const managerList = useSelector((state) => state.managerRecord);
  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();

  // state.managerRecord.ManagerRecord

  const fetchManagerRecord = async () => {
    try {
      await dispatch(ManagerRecord()).unwrap();
    } catch (error) {
      if (error.status == 401 || error.response.status === 401) {
        getUnAutherisedTokenMessage();
        handleCoockieExpire();
      } else if (error.status == "Network Error") {
        getNetworkError();
      }
    }
  };

  useEffect(() => {
    fetchManagerRecord();
  }, []);

  return (
    <>
      <div className="box_shadow_div">
        <div className="table_main_area">
          <div className="table_header_sticky">
            <div className="table_header_top">
              <h1>Table Area</h1>
            </div>
            <div className="table_header">
              <p className="table25">Name</p>
              <p className="table30">Email</p>
              <p className="table20">Phone</p>
              <p className="table5">View</p>
            </div>
          </div>
          <div className="table_body">
            {managerList &&
              Array.isArray(managerList.ManagerRecord) &&
              managerList.ManagerRecord.map((result, index) => {
                // console.log(result)
                return (
                  <div className="table_row" key={index}>
                    <p className="table25">{result.name}</p>
                    <p className="table30">{result.email}</p>
                    <p className="table20">{result.phone}</p>
                    <p
                      className="table20"
                      onClick={() => handleViewMerchant(result.merchant_id)}
                    >
                      View Merchant
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <ViewMerchant
        showMerchant={showMerchant}
        showMerchantData={showMerchantData}
        handleCloseMerchantModel={handleCloseMerchantModel}
      />
    </>
  );
}
