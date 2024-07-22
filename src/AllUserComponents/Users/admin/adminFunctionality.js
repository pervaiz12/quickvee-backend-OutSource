import { useState } from "react";
import { GET_ADMIN_MERCHANT, BASE_URL } from "../../../Constants/Config";
import axios from "axios";
import PasswordShow from "../../../Common/passwordShow";

export default function AdminFunctionality() {
  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();
  const [showAdmin, setShowAdmin] = useState(false);
  const [showMerchantData, setShowMerchantData] = useState([]);
  const [adminName, setAdminName] = useState("");

  const handleViewAdmin = async (data, name, userTypeData) => {
    setAdminName(name);
    const { token, ...newData } = userTypeData;
    const dataNew = { email: data, ...newData };
    try {
      await axios
        .post(BASE_URL + GET_ADMIN_MERCHANT, dataNew, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.data.status == 200) {
            setShowMerchantData(response.data.message);
            setShowAdmin(true);
          } else {
            setShowMerchantData(response.data.message);
            setShowAdmin(true);
          }
        });
    } catch (error) {
      if (error.status == 401 || error.response.status === 401) {
        getUnAutherisedTokenMessage();
        handleCoockieExpire();
      } else if (error.status == "Network Error") {
        getNetworkError();
      }
    }
  };
  const handleCloseAdminModel = () => {
    setShowAdmin(false);
  };
  return {
    handleCloseAdminModel,
    handleViewAdmin,
    showAdmin,
    showMerchantData,
    adminName,
  };
}
