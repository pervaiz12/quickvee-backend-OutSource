import React, { useState } from "react";
import { GET_MANAGER_MERCHANT, BASE_URL } from "../../../Constants/Config";
import axios from "axios";
import PasswordShow from "../../../Common/passwordShow";

export default function ManagerFunctionality() {
  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();
  const [showMerchant, setShowMerchant] = useState(false);
  const [showMerchantData, setShowMerchantData] = useState([]);
  const [name, setName] = useState("");
  const handleViewMerchant = async (data, name, userTypeData) => {
    setName(name);
    const dataArray = data.split(",");
    const sports = [];
    const { token, ...newData } = userTypeData;
    if (Array.isArray(dataArray)) {
      try {
        await Promise.all(
          dataArray.map(async (result) => {
            const postData = { merchant_id: result, ...newData };
            const response = await axios.post(
              BASE_URL + GET_MANAGER_MERCHANT,
              postData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (response.data.status === 200) {
              sports.push(response.data.message[0]);
            }
          })
        );
        setShowMerchantData(sports);
        setShowMerchant(true);
      } catch (error) {
        if (error.status == 401 || error.response.status === 401) {
          getUnAutherisedTokenMessage();
          handleCoockieExpire();
        } else if (error.status == "Network Error") {
          getNetworkError();
        }
      }
    }
  };
  const handleCloseMerchantModel = () => {
    setShowMerchant([]);
    setShowMerchant(false);
  };
  return {
    setShowMerchant,
    showMerchant,
    handleViewMerchant,
    handleCloseMerchantModel,
    showMerchantData,
    name,
  };
}
