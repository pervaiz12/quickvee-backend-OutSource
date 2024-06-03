import axios from "axios";
import React, { useState } from "react";

import {
  BASE_URL,
  GET_Edit_STORE_INFO,
  UPDATE_STORE_INFO,
} from "../../../Constants/Config";
import { useAuthDetails } from "../../../Common/cookiesHelper";
export default function InfoFunction() {
  const {
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    userTypeData,
    GetSessionLogin,
  } = useAuthDetails();
  const [successsMessage, setSuccessMessage] = useState("");
  const [hideSucess, setHideSuccess] = useState(false);
  const [image, setImage] = useState("");
  const [imageBanner, setImageBanner] = useState("");
  const [infoRecord, setInfoRecord] = useState({
    merchant_id: "",
    store: "",
    email: "",
    menuLink: "",
    domain: "",
    image: "",
    banners: "",
    address_1: "",
    address_2: "",
    city: "",
    zip: "",
    state: "",
    phone: "",
  });
  const [errors, setErrors] = useState({
    imageErrors: "",
    bannerErrors: "",
    phoneError: "",
  });
  const [imageBoolean, setImageBoolean] = useState(false);
  const [BannersBoolean, setBannersBoolean] = useState(false);
  const [approve, setApprove] = useState("");
  const handleDelete = (data) => {
    if (data === "banners") {
      setInfoRecord({ ...infoRecord, banners: "" });
      const fileInput = document.getElementById("fileInput3");
      if (fileInput) {
        fileInput.value = "";
      }
    } else if (data === "image") {
      setInfoRecord({ ...infoRecord, image: "" });
      const fileInput = document.getElementById("file-input2");
      if (fileInput) {
        fileInput.value = "";
      }
    }
  };
  let validate = () => {
    let errorMessage = { ...errors }; // Assuming errors is already defined elsewhere
    let isValidate = true;

    if (infoRecord.image === "") {
      errorMessage.imageErrors = "Please select image field";
      isValidate = false;
    } else {
      errorMessage.imageErrors = "";
    }

    if (infoRecord.banners === "") {
      errorMessage.bannerErrors = "Please select banners field";
      isValidate = false;
    } else {
      errorMessage.bannerErrors = "";
    }

    setErrors(errorMessage);

    return isValidate;
  };

  const handleEditRecord = async (dataRecord) => {
    // console.log(data.id) datat
    let data = {
      id: dataRecord.id,
      login_type: userTypeData?.login_type,
      token_id: userTypeData?.token_id,
    };
    let response = await axios.post(BASE_URL + GET_Edit_STORE_INFO, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userTypeData?.token}`,
      },
    });
    if (response.data.status == 200) {
      const merchant_id =
        response.data.message.merchant_id !== null
          ? response.data.message.merchant_id
          : "";
      const name =
        response.data.message.name !== null ? response.data.message.name : "";
      const email =
        response.data.message.email !== null ? response.data.message.email : "";
      const menu_link =
        response.data.message.menu_link !== null
          ? response.data.message.menu_link
          : "";
      const domain_url =
        response.data.message.domain_url !== null
          ? response.data.message.domain_url
          : "";
      const img =
        response.data.message.img !== null ? response.data.message.img : "";
      const banner_img =
        response.data.message.banner_img !== null
          ? response.data.message.banner_img
          : "";
      const a_address_line_1 =
        response.data.message.a_address_line_1 !== null
          ? response.data.message.a_address_line_1
          : "";
      const a_address_line_2 =
        response.data.message.a_address_line_2 !== null
          ? response.data.message.a_address_line_2
          : "";
      const a_city =
        response.data.message.a_city !== null
          ? response.data.message.a_city
          : "";
      const a_zip =
        response.data.message.a_zip !== null ? response.data.message.a_zip : "";
      const state =
        response.data.message.a_state !== null
          ? response.data.message.a_state
          : "";
      const phone =
        response.data.message.a_phone !== null
          ? response.data.message.a_phone
          : "";
      setApprove("approve");
      setImageBanner(banner_img);
      setImage(img);
      setInfoRecord({
        merchant_id: merchant_id,
        store: name,
        email: email,
        menuLink: menu_link,
        domain: domain_url,
        image: img,
        banners: banner_img,
        address_1: a_address_line_1,
        address_2: a_address_line_2,
        city: a_city,
        zip: a_zip,
        state: state,
        phone: phone,
      });
    }
  };

  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    let errorMeesage = { ...errors };
    if (name == "image") {
      if (e.target.value == "") {
        errorMeesage.imageErrors = "Please select image field";
      } else {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
          const reader = new FileReader();
          reader.onloadend = () => {
            // setInfoRecord({...infoRecord,infoRecord.image:reader.result});
            setInfoRecord({ ...infoRecord, image: reader.result });
          };
          reader.readAsDataURL(selectedFile);
          setImageBoolean(true);
        }
        errorMeesage.imageErrors = "";
      }
    }
    if (name == "banners") {
      if (e.target.value == "") {
        errorMeesage.bannerErrors = "Please select image field";
      } else {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
          const reader = new FileReader();
          reader.onloadend = () => {
            // setInfoRecord({...infoRecord,infoRecord.image:reader.result});
            setInfoRecord({ ...infoRecord, banners: reader.result });
          };
          reader.readAsDataURL(selectedFile);
          setBannersBoolean(true);
        }
        errorMeesage.bannerErrors = "";
      }
    }
    if (name == "phone") {
      if (value !== "") {
        // console.log(value.length)
        if (value.length !== 10) {
          errorMeesage.phoneError = "Please fill proper number";
        } else {
          errorMeesage.phoneError = "";
        }
      } else {
        errorMeesage.phoneError = "";
      }
    }
    setErrors(errorMeesage);
    setInfoRecord({ ...infoRecord, [name]: value });
  };
  const handleKeyPress = (e) => {
    // Allow only numeric characters (key codes 48 to 57) and backspace (key code 8)
    if ((e.charCode < 48 || e.charCode > 57) && e.charCode !== 8) {
      e.preventDefault();
    }
  };
  const handleSuccessMessage = () => {
    setTimeout(() => {
      setSuccessMessage("");
      setHideSuccess(false);
    }, 3000);
  };
  let CurrentValidate = (error) => {
    if (
      error.imageErrors == "" &&
      error.bannerErrors == "" &&
      error.phoneError == ""
    ) {
      return true;
    } else {
      return false;
    }
  };
  const handleSubmitInfo = async (e) => {
    e.preventDefault();
    let validateData = validate();
    let currentValidate = CurrentValidate(errors);
    if (validateData == true) {
      if (currentValidate == true) {
        const packect = {
          merchant_id: infoRecord.merchant_id,
          banners: infoRecord.banners,
          image: infoRecord.image,
          address_1: infoRecord.address_1,
          address_2: infoRecord.address_2,
          phone: infoRecord.phone,
          zip: infoRecord.zip,
          city: infoRecord.city,
          state: infoRecord.state,
          domain: infoRecord.domain,
          imageBanner: imageBanner,
          original_name: image,
          approve: approve,
          login_type: userTypeData?.login_type,
          token_id: userTypeData?.token_id,
        };
        let response = await axios.post(BASE_URL + UPDATE_STORE_INFO, packect, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userTypeData?.token}`,
          },
        });
        if (response.status == 200) {
          setSuccessMessage(response.data.message);
          setHideSuccess(true);
          handleSuccessMessage();
        }
      }
    }
  };
  return {
    handleSubmitInfo,
    imageBanner,
    image,
    handleDelete,
    handleEditRecord,
    infoRecord,
    onChangeHandle,
    imageBoolean,
    BannersBoolean,
    successsMessage,
    hideSucess,
    errors,
    handleKeyPress,
  };
}
