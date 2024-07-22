import axios from "axios";
import React, { useState } from "react";
import {
  BASE_URL,
  GET_EDIT_CUSTOMER,
  GET_UPDATE_CUSTOMER,
} from "../../../../Constants/Config";
import { useNavigate } from "react-router-dom";
import { useAuthDetails } from "../../../../Common/cookiesHelper";
import { ToastifyAlert } from "../../../../CommonComponents/ToastifyAlert";
const EditCustomerFunction = () => {
  const navigate = useNavigate();
  const { userTypeData } = useAuthDetails();
  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    reSet: "",
    phone: "",
    id: "",
    user_type: "",
  });
  const [password, setpassword] = useState("");
  const [loader, setLoader] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
  });

  const [customerRadio, setCustomerRadio] = useState(false);
  const [AdminRadio, setAdminRadio] = useState(false);
  const [merchantRadio, setMerchantRadio] = useState(false);
  const [storeRadio, setStoreRadio] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleEditData = async (data) => {
    const { token, ...newData } = data;
    await axios
      .post(BASE_URL + GET_EDIT_CUSTOMER, newData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.status == 200) {
          setCustomerData({
            ...customerData,
            reSet: "",
            ...response.data.message.row,
          });
          if (response.data.message.row.user_type.toLowerCase() == "customer") {
            setStoreRadio(response.data.message.row.user_type);
            setCustomerRadio(true);
          } else if (
            response.data.message.row.user_type.toLowerCase() == "admin"
          ) {
            setStoreRadio(response.data.message.row.user_type);
            setAdminRadio(true);
          }
        }
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedErrors = { ...errors };

    if (name === "name") {
      updatedErrors["name"] =
        value === "" ? `please fill the ${name} field` : "";
    }
    if (name === "phone") {
      const numericValue = value.replace(/[^0-9]/g, "");

      if (numericValue.length !== 10) {
        updatedErrors[name] = "Phone number must be 10 digits";
      } else {
        updatedErrors[name] = "";
      }
    }
    setErrors(updatedErrors);
    const trimmedValue = value.replace(/^\s+|\s+$/g, "");
    setCustomerData((prevCustomerData) => ({
      ...prevCustomerData,
      [name]: trimmedValue,
    }));
  };
  const onhandlePassword = (e) => {
    setpassword({
      password: e.target.value,
    });
  };

  const handleKeyPress = (e) => {
    if ((e.charCode < 48 || e.charCode > 57) && e.charCode !== 8) {
      e.preventDefault();
    }
  };

  const handleChangeRadio = (e) => {
    console.log(e.target.value);
    if (e.target.value == "merchant") {
      setMerchantRadio(true);
      setAdminRadio(false);
      setCustomerRadio(false);
    } else if (e.target.value == "admin") {
      setAdminRadio(true);
      setMerchantRadio(false);
      setCustomerRadio(false);
    } else if (e.target.value == "customer") {
      setCustomerRadio(true);
      setMerchantRadio(false);
      setAdminRadio(false);
    }
    setStoreRadio(e.target.value);
  };
  const handleSubmitCustomerRecord = async (e) => {
    e.preventDefault();
    const { token, ...newData } = userTypeData;
    const data = {
      id: customerData.id,
      user_type: storeRadio,
      name: customerData.name,
      phone: customerData.phone,
      password: customerData.reSet,
      user_created: "superadmin",
      login_type: newData?.login_type,
      token_id: newData?.token_id,
    };
    let validate = Object.values(errors).filter((error) => error !== "").length;
    if (validate == 0) {
      setLoader(true);
      await axios
        .post(BASE_URL + GET_UPDATE_CUSTOMER, data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setLoader(false);
          if (response.data.status == 200) {
            setSuccessMessage(response.data.message);
            ToastifyAlert(response.data.message, "success");

            if (response.data.record.user_type == "customer") {
              console.log("1");
              setCustomerRadio(true);
              setMerchantRadio(false);
              setAdminRadio(false);
            } else if (response.data.record.user_type == "admin") {
              console.log("2");
              setAdminRadio(true);
              setMerchantRadio(false);
              setCustomerRadio(false);
            } else if (response.data.record.user_type == "merchant") {
              console.log("3");
              console.log(customerData.id);
              navigate(`/users/editMerchant/${customerData.id}`);
            }
          } else {
            ToastifyAlert(response.data.message, "warn");
          }
        });
    }
  };
  return {
    handleEditData,
    customerData,
    handleChange,
    customerRadio,
    AdminRadio,
    merchantRadio,
    handleChangeRadio,
    handleSubmitCustomerRecord,
    successMessage,
    handleKeyPress,
    errors,
    onhandlePassword,
    password,
    loader,
  };
};
export default EditCustomerFunction;
