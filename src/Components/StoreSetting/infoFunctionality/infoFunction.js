import axios from "axios";
import React, { useState } from "react";

import {
  BASE_URL,
  GET_Edit_STORE_INFO,
  // UPDATE_STORE_INFO,
  CHANGE_PASSWORD_STORE,
  UPDATE_STORE_INFO,
} from "../../../Constants/Config";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import { ToastifyAlert } from "../../../CommonComponents/ToastifyAlert";
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
    qrCode: "",
    address_1: "",
    address_2: "",
    city: "",
    zip: "",
    state: "",
    phone: "",
    facebookUrl: "",
    instagramUrl: "",
    promotionalUrl:"",
    user_id: "",
    is_banner_change: "0",
    is_logo_change: "0",
    is_qr_code_change: "0",
  });
  console.log("infoRecord.image === selectedFile.name", infoRecord);
  // ============================password ======================
  const [passwordInput, setPassowordInput] = useState({
    password: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] = useState({
    password: "",
    confirmPassword: "",
  });
  const onPasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPassowordInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    validatePasswordInput(e);
  };

  const validatePasswordInput = (e) => {
    let { name, value } = e.target;

    setPasswordError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "password":
          if (!value) {
            stateObj[name] = "Please enter Password.";
          } else if (
            passwordInput.confirmPassword &&
            value !== passwordInput.confirmPassword
          ) {
            stateObj["confirmPassword"] =
              "Password and Confirm Password does not match.";
          } else {
            stateObj["confirmPassword"] = passwordInput.confirmPassword
              ? ""
              : passwordError.confirmPassword;
          }
          break;

        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Please enter Confirm Password.";
          } else if (
            passwordInput.password &&
            value !== passwordInput.password
          ) {
            stateObj[name] = "Password and Confirm Password does not match.";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };
  // ======================= end password ==========================

  const [errors, setErrors] = useState({
    imageErrors: "",
    bannerErrors: "",
    qrCodeError: "",
    address_1Error: "",
    cityError: "",
    zipCodeError: "",
    stateNameError: "",
    phoneError: "",
  });

  const [imageBoolean, setImageBoolean] = useState(false);
  const [BannersBoolean, setBannersBoolean] = useState(false);
  const [qrCodeBoolean, setQrCodeBoolean] = useState(false);
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
    } else if (data === "qrCode") {
      setInfoRecord({ ...infoRecord, qrCode: "" });
      const fileInput = document.getElementById("file-input5");
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

    if (infoRecord.qrCode === "") {
      errorMessage.qrCodeError = "QR Code field is required.";
      isValidate = false;
    } else {
      errorMessage.qrCodeError = "";
    }

    if (infoRecord.address_1 === "") {
      errorMessage.address_1Error = "Address Line 1 field is required.";
      isValidate = false;
    } else {
      errorMessage.address_1Error = "";
    }

    if (infoRecord.city === "") {
      errorMessage.cityError = "City field is required.";
      isValidate = false;
    } else {
      errorMessage.cityError = "";
    }

    if (infoRecord.zip === "") {
      errorMessage.zipCodeError = "Zip Code field is required.";
      isValidate = false;
    } else {
      errorMessage.zipCodeError = "";
    }

    if (infoRecord.state === "") {
      errorMessage.stateNameError = "State field is required.";
      isValidate = false;
    } else {
      errorMessage.stateNameError = "";
    }

    if (infoRecord.phone === "") {
      errorMessage.phoneError = "Phone field is required.";
      isValidate = false;
    } else {
      errorMessage.phoneError = "";
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
    console.log(response);
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
      const fb_url =
        response.data.message.insta_url !== null
          ? response.data.message.insta_url
          : "";
      const insta_url =
        response.data.message.insta_url !== null
          ? response.data.message.insta_url
          : "";
          const promotional_url =
        response.data.message.promo_url !== null
          ? response.data.message.promo_url
          : "";
      const user_id =
        response.data.message.id !== null ? response.data.message.id : "";
      const qr_img =
        response.data.message.qr_img !== null
          ? response.data.message.qr_img
          : "";
      setApprove("approve");
      setImageBanner(banner_img);
      setImage(img);
      setInfoRecord((prevState) => ({
        ...prevState,
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
        facebookUrl: fb_url,
        instagramUrl: insta_url,
        promotionalUrl:promotional_url,
        user_id: user_id,
        qrCode: qr_img,
      }));
    }
  };

  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    let errorMessage = { ...errors };

    if (name === "image") {
      if (e.target.value == "") {
        errorMessage.imageErrors = "Please select image field";
      } else {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setInfoRecord((prevState) => ({
              ...prevState,
              image: reader.result,
              is_logo_change: prevState.image === selectedFile.name ? "0" : "1",
            }));
          };
          reader.readAsDataURL(selectedFile);
          setImageBoolean(true);
        }
        errorMessage.imageErrors = "";
      }
    }
    if (name == "banners") {
      if (e.target.value == "") {
        errorMessage.bannerErrors = "Please select Banner field";
      } else {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setInfoRecord((prevState) => ({
              ...prevState,
              banners: reader.result,
              is_banner_change:
                prevState.banners === selectedFile.name ? "0" : "1",
            }));
          };

          reader.readAsDataURL(selectedFile);
          setBannersBoolean(true);
        }
        errorMessage.bannerErrors = "";
      }
    }
    if (name === "qrCode") {
      console.log("QR Code", name);
      if (e.target.value == "") {
        errorMessage.qrCodeError = "Please select QR Code field";
      } else {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setInfoRecord((prevState) => ({
              ...prevState,
              qrCode: reader.result,
              is_qr_code_change:
                prevState.qrCode === selectedFile.name ? "0" : "1",
            }));
          };

          reader.readAsDataURL(selectedFile);
          setQrCodeBoolean(true);
        }
        errorMessage.qrCodeError = "";
      }
    }
    if (name == "phone") {
      if (value !== "") {
        // console.log(value.length)
        if (value.length !== 10) {
          errorMessage.phoneError = "Please fill proper number";
        } else {
          errorMessage.phoneError = "";
        }
      } else {
        errorMessage.phoneError = "";
      }
    }
    setErrors(errorMessage);
    setInfoRecord((prevInfoRecord) => ({
      ...prevInfoRecord,
      [name]: value,
    }));
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
          login_type: userTypeData?.login_type, //
          merchant_id: infoRecord.merchant_id, //
          user_id: infoRecord.user_id, //
          menu_link: infoRecord.menuLink, //
          domain_url: infoRecord.domain, //
          banner_img: infoRecord.banners, //
          is_banner_change: infoRecord.is_banner_change, //
          logo_img: infoRecord.image, //
          is_logo_change: infoRecord.is_logo_change, //
          qr_code: infoRecord.qrCode, //
          is_qr_code_change: infoRecord.is_qr_code_change, //
          address_line_1: infoRecord.address_1, //
          address_line_2: infoRecord.address_2, //
          phone: infoRecord.phone, //
          zip: infoRecord.zip, //
          city: infoRecord.city, //
          state: infoRecord.state, //
          fb_url: infoRecord.facebookUrl,
          insta_url: infoRecord.instagramUrl,
          promo_url: infoRecord.promotionalUrl,
          // imageBanner: imageBanner,
          // original_name: image,
          // approve: approve,

          token_id: userTypeData?.token_id,
        };
        let response = await axios.post(BASE_URL + UPDATE_STORE_INFO, packect, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userTypeData?.token}`,
          },
        });
        console.log(response.data);
        if (response.data.status === true) {
          ToastifyAlert(response.data.msg, "success");
          setSuccessMessage(response.data.message);
          setHideSuccess(true);
          handleSuccessMessage();
        } else {
          ToastifyAlert(response.data.msg, "error");
        }
      }
    }
  };
  const currentPassordValidate = (passwordError) => {
    if (passwordInput.password === "") {
      setPasswordError((prevState) => ({
        ...prevState,
        password: "Please enter Password.",
      }));
      return;
    }
    if (passwordInput.confirmPassword === "") {
      setPasswordError((prevState) => ({
        ...prevState,
        confirmPassword: "Please enter Confirm Password.",
      }));
      return;
    }
    if (passwordError.password === "" && passwordError.confirmPassword === "") {
      return true;
    } else {
      return false;
    }
  };
  const handleSubmitChangePassword = async (e) => {
    e.preventDefault();
    let CurrentPassordValidate = currentPassordValidate(passwordError);
    if (CurrentPassordValidate === true) {
      let data = {
        new_password: passwordInput.password,
        confirm_password: passwordInput.confirmPassword,
        merchant_id: infoRecord.merchant_id,
        user_id: 100,
        login_type: userTypeData?.login_type,
      };
      let response = await axios.post(BASE_URL + CHANGE_PASSWORD_STORE, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userTypeData?.token}`,
        },
      });
      if (response.status == 200) {
        ToastifyAlert(response.data.msg, "success");

        console.log("password changes");
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
    onPasswordInputChange,
    passwordInput,
    passwordError,
    handleSubmitChangePassword,
    qrCodeBoolean,
  };
}
