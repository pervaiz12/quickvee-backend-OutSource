import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { debounce } from "lodash";
import {
  BASE_URL,
  GET_Edit_STORE_INFO,
  // UPDATE_STORE_INFO,
  CHANGE_PASSWORD_STORE,
  UPDATE_STORE_INFO,
  ADMIN_CHECK_USER,
  GET_MERCHAN_STATE,
  GET_ZIP_CODE_CITY,
} from "../../../Constants/Config";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import { ToastifyAlert } from "../../../CommonComponents/ToastifyAlert";
import PasswordShow from "../../../Common/passwordShow";
import { isArray } from "jquery";
export default function InfoFunction() {
  const {
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    userTypeData,
    GetSessionLogin,
    user_id,
    // handleCloseModel,
  } = useAuthDetails();
  // console.log(LoginGetDashBoardRecordJson);
  let login_type = LoginGetDashBoardRecordJson?.login_type;
  let merchant_idNew = LoginGetDashBoardRecordJson?.data?.merchant_id;
  let store_email = LoginGetDashBoardRecordJson?.data?.email;
  const { getUnAutherisedTokenMessage, handleCoockieExpire, getNetworkError } =
    PasswordShow();
  const [successsMessage, setSuccessMessage] = useState("");
  const [hideSucess, setHideSuccess] = useState(false);
  const [image, setImage] = useState("");
  const [imageBanner, setImageBanner] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [infoRecord, setInfoRecord] = useState({
    merchant_id: "",
    store: "",
    email: "",
    menuLink: "",
    domain: "",
    image: "",
    banners: "",
    qrCode: "",
    receieptLogo: "",
    address_1: "",
    address_2: "",
    city: "",
    zip: "",
    state: "",
    phone: "",
    facebookUrl: "",
    instagramUrl: "",
    promotionalUrl: "",
    user_id: "",
    is_banner_change: "0",
    is_logo_change: "0",
    is_qr_code_change: "0",
    is_receipt_logo_change: "0",
  });
  const [passwordInput, setPassowordInput] = useState({
    password: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] = useState({
    password: "",
    confirmPassword: "",
  });
  const [stateList, setStateList] = useState([]);
  const [loader, setLoader] = useState(false);
  const urlPattern =
    /^(https:\/\/www\.instagram\.com\/|https:\/\/www\.facebook\.com\/|https:\/\/[a-z0-9]+(\.[a-z0-9]+)+\/).*$/;
  // console.log("infoRecord.image === selectedFile.name", infoRecord);
  // ===========================get state=========================
  const handleKeyPressNew = (event) => {
    const allowedChars = /^\S+$/;
    if (!allowedChars.test(event.key)) {
      event.preventDefault();
    }
  };
  // ==================== get state and admin data---------
  useEffect(() => {
    getState();
  }, []);
  const getState = async () => {
    const { token, ...newData } = userTypeData;
    const data = { merchant_id: merchant_idNew, ...newData };
    // console.log(data);
    await axios
      .post(BASE_URL + GET_MERCHAN_STATE, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log("state", result);
        if (result.status == 200) {
          setStateList(result?.data?.states);
          // setAdminList(result.data.admin_list);
        } else {
          setStateList([]);
          // setAdminList([]);
        }
      });
  };
  // ===========================get state end=====================
  // ============================password ======================

  const onPasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPassowordInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    validatePasswordInput(e);
  };
  const handleCloseModel = () => {
    setPassowordInput({ password: "", confirmPassword: "" });
    setPasswordError({ password: "", confirmPassword: "" });
  };

  const validatePasswordInput = (e) => {
    let { name, value } = e.target;

    setPasswordError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "password":
          if (!value) {
            stateObj[name] = "Password is required";
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
            stateObj[name] = "Confirm Password is required";
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
  // ======================= password check ========================
  const passwordValidate = async () => {
    // setLoader(true);
    const { token, ...newData } = userTypeData;
    let errorFlag = false;
    const dataNew = {
      email: store_email,
      password: passwordInput?.password,
      merchant_id: merchant_idNew,
      ...newData,
    };
    try {
      const response = await axios.post(BASE_URL + ADMIN_CHECK_USER, dataNew, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        console.log("111");
        setPasswordError((prev) => ({
          ...prev,
          password: "Password already exists",
        }));
        errorFlag = true;
      }

      // else {
      //   setPasswordError((prev) => ({
      //     ...prev,
      //     password: "",
      //   }));
      //   errorFlag = false;
      // }
      if (errorFlag) {
        // setLoader(false);
        return false;
      } else {
        // setLoader(false);
        return true;
      }

      // // return response.data;
      // console.log(response.data);
    } catch (error) {
      console.error("Error validating email:", error);
      // console.log("hellooo", error?.message);
      // dispatch(getAuthInvalidMessage(error?.message));
      if (error.response.status == 401) {
        getUnAutherisedTokenMessage();
        handleCoockieExpire();
      }

      throw error;
    }
  };
  const handleBlurPassword = (name) => {
    if (name == "password") {
      passwordValidate();
    }
  };
  // ======================= password check ========================

  const [errors, setErrors] = useState({
    imageErrors: "",
    bannerErrors: "",
    qrCodeError: "",
    address_1Error: "",
    cityError: "",
    zipCodeError: "",
    stateNameError: "",
    phoneError: "",
    receieptLogoError: "",
    facebookUrlError: "",
    instagramUrlError: "",
    promotionalUrlError: "",
  });

  const [imageBoolean, setImageBoolean] = useState(false);
  const [BannersBoolean, setBannersBoolean] = useState(false);
  const [qrCodeBoolean, setQrCodeBoolean] = useState(false);
  const [receieptLogoBool, setReceieptLogoBool] = useState(false);
  const [approve, setApprove] = useState("");
  const handleDelete = (data) => {
    if (data === "banners") {
      setInfoRecord({ ...infoRecord, banners: "", is_banner_change: "1" });
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
      setInfoRecord({ ...infoRecord, qrCode: "", is_qr_code_change: "1" });
      const fileInput = document.getElementById("file-input5");
      if (fileInput) {
        fileInput.value = "";
      }
    } else if (data === "receieptLogo") {
      setInfoRecord({
        ...infoRecord,
        receieptLogo: "",
        is_receipt_logo_change: "1",
      });
      const fileInput = document.getElementById("file-input4");
      if (fileInput) {
        fileInput.value = "";
      }
    }
  };

  const validate = () => {
    let errorMessage = { ...errors };
    let isValidate = true;

    if (!infoRecord.image) {
      errorMessage.imageErrors = "Image is required";
      isValidate = false;
      console.log("1");
    }

    // if (!infoRecord.banners) {
    //   errorMessage.bannerErrors = "Banner is required";
    //   isValidate = false;
    //   console.log("2");
    // }

    // if (!infoRecord.qrCode) {
    //   errorMessage.qrCodeError = "QR Code is required";
    //   isValidate = false;
    //   console.log("3");
    // }

    // if (!infoRecord.receieptLogo) {
    //   errorMessage.receieptLogoError = "Receipt Logo is required";
    //   isValidate = false;
    //   console.log("4");
    // }

    if (infoRecord.phone == "") {
      errorMessage.phoneError = "Phone is required";
      isValidate = false;
    } else if (infoRecord.phone.length !== 10) {
      errorMessage.phoneError = "Invalid phone number";
      isValidate = false;
    }
    // if (infoRecord.facebookUrl == "") {
    //   errorMessage.facebookUrlError = "Facebook URL is required";
    //   isValidate = false;
    // } else
    if (
      infoRecord.facebookUrl !== "" &&
      !urlPattern.test(infoRecord.facebookUrl)
    ) {
      errorMessage.facebookUrlError = "Enter valid Facebook URL";
      isValidate = false;
    }
    // if (infoRecord.instagramUrl == "") {
    //   errorMessage.instagramUrlError = "Instagram URL is required";
    //   isValidate = false;
    // } else
    if (
      infoRecord.instagramUrl !== "" &&
      !urlPattern.test(infoRecord.instagramUrl)
    ) {
      errorMessage.instagramUrlError = "Enter valid Instagram URL";
      isValidate = false;
    }
    // if (infoRecord.promotionalUrl == "") {
    //   errorMessage.promotionalUrlError = "Promotional URL is required";
    //   isValidate = false;
    // } else
    if (
      infoRecord.promotionalUrl !== "" &&
      !urlPattern.test(infoRecord.promotionalUrl)
    ) {
      errorMessage.promotionalUrlError = "Enter valid Promotional URL";
      isValidate = false;
    }
    if (infoRecord.address_1 == "") {
      errorMessage.address_1Error = "Address 1 is required";
      isValidate = false;
    }
    if (infoRecord.city == "") {
      errorMessage.cityError = "City is required";
      isValidate = false;
    }
    if (infoRecord.zip == "") {
      errorMessage.zipCodeError = "Zip is required";
      isValidate = false;
    }
    if (infoRecord.state == "") {
      errorMessage.stateNameError = "State is required";
      isValidate = false;
    }

    setErrors(errorMessage);
    return isValidate;
  };

  // const validate = () => {
  //   let errorMessage = { ...errors };
  //   let isValidate = true;

  //   if (infoRecord.image == "") {
  //     errorMessage.imageErrors = "Image is required";
  //     isValidate = false;
  //   }

  //   if (infoRecord.banners == "") {
  //     errorMessage.bannerErrors = "Banner is required";
  //     isValidate = false;
  //   }

  //   if (infoRecord.qrCode == "") {
  //     errorMessage.qrCodeError = "QR Code is required";
  //     isValidate = false;
  //   }

  //   if (infoRecord.receieptLogo == "") {
  //     errorMessage.receieptLogoError = "Receipt Logo is required";
  //     isValidate = false;
  //   }

  //   if (infoRecord.phone == "" || infoRecord.phone.length !== 10) {
  //     errorMessage.phoneError = "Invalid phone number";
  //     isValidate = false;
  //   }

  //   if (
  //     infoRecord.facebookUrl == "" &&
  //     !urlPattern.test(infoRecord.facebookUrl)
  //   ) {
  //     errorMessage.facebookUrlError = "Enter a valid Facebook URL";
  //     isValidate = false;
  //   }

  //   if (
  //     infoRecord.instagramUrl == "" &&
  //     !urlPattern.test(infoRecord.instagramUrl)
  //   ) {
  //     errorMessage.instagramUrlError = "Enter a valid Instagram URL";
  //     isValidate = false;
  //   }

  //   if (
  //     infoRecord.promotionalUrl == "" &&
  //     !urlPattern.test(infoRecord.promotionalUrl)
  //   ) {
  //     errorMessage.promotionalUrlError = "Enter a valid Promotional URL";
  //     isValidate = false;
  //   }

  //   setErrors(errorMessage);
  //   return isValidate;
  // };
  // let validate = () => {
  //   let errorMessage = { ...errors }; // Assuming errors is already defined elsewhere
  //   let isValidate = true;

  //   if (infoRecord.image === "") {
  //     errorMessage.imageErrors = "Image is required";
  //     isValidate = false;
  //   } else {
  //     errorMessage.imageErrors = "";
  //   }

  //   if (infoRecord.banners === "") {
  //     errorMessage.bannerErrors = "Banners is required";
  //     isValidate = false;
  //   } else {
  //     errorMessage.bannerErrors = "";
  //   }

  //   if (infoRecord.qrCode === "") {
  //     errorMessage.qrCodeError = "QR Code  is required.";
  //     isValidate = false;
  //   } else {
  //     errorMessage.qrCodeError = "";
  //   }

  //   if (infoRecord.receieptLogo === "") {
  //     errorMessage.receieptLogoError = "QR Reciept logo is required.";
  //     isValidate = false;
  //   } else {
  //     errorMessage.receieptLogoError = "";
  //   }

  //   if (infoRecord.address_1 === "") {
  //     errorMessage.address_1Error = "Address Line 1  is required.";
  //     isValidate = false;
  //   } else {
  //     errorMessage.address_1Error = "";
  //   }

  //   if (infoRecord.city === "") {
  //     errorMessage.cityError = "City  is required.";
  //     isValidate = false;
  //   } else {
  //     errorMessage.cityError = "";
  //   }

  //   if (infoRecord.zip === "") {
  //     errorMessage.zipCodeError = "Zip Code  is required.";
  //     isValidate = false;
  //   } else {
  //     errorMessage.zipCodeError = "";
  //   }

  //   if (infoRecord.state === "") {
  //     errorMessage.stateNameError = "State  is required.";
  //     isValidate = false;
  //   } else {
  //     errorMessage.stateNameError = "";
  //   }

  //   if (infoRecord.phone === "") {
  //     errorMessage.phoneError = "Phone  is required.";
  //     isValidate = false;
  //   } else {
  //     errorMessage.phoneError = "";
  //   }
  //   if (infoRecord.facebookUrl === "") {
  //     errorMessage.facebookUrlError = "This field is required.";
  //     isValidate = false;
  //   } else {
  //     errorMessage.facebookUrlError = "";
  //   }
  //   if (infoRecord.instagramUrl === "") {
  //     errorMessage.instagramUrlError = "This field is required.";
  //     isValidate = false;
  //   } else {
  //     errorMessage.instagramUrlError = "";
  //   }
  //   if (infoRecord.promotionalUrl === "") {
  //     errorMessage.promotionalUrlError = "This field is required.";
  //     isValidate = false;
  //   } else {
  //     errorMessage.promotionalUrlError = "";
  //   }
  //   setErrors(errorMessage);

  //   return isValidate;
  // };

  const handleEditRecord = async (dataRecord) => {
    // console.log(data.id) datat
    let data = {
      id: dataRecord.id,
      merchant_id: dataRecord.merchant_id,
      login_type: userTypeData?.login_type,
      token_id: userTypeData?.token_id,
    };
    try {
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
          response.data.message.email !== null
            ? response.data.message.email
            : "";
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
          response.data.message.a_zip !== null
            ? response.data.message.a_zip
            : "";
        const state =
          response.data.message.a_state !== null
            ? response.data.message.a_state
            : "";
        const phone =
          response.data.message.a_phone !== null
            ? response.data.message.a_phone
            : "";
        const fb_url =
          response.data.message.fb_url !== null
            ? response.data.message.fb_url
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
        const receipt_img =
          response.data.message.receipt_logo !== null
            ? response.data.message.receipt_logo
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
          promotionalUrl: promotional_url,
          user_id: user_id,
          qrCode: qr_img,
          receieptLogo: receipt_img,
        }));
      }
    } catch (error) {
      if (error.status == 401 || error.response.status === 401) {
        getUnAutherisedTokenMessage();
        handleCoockieExpire();
      } else if (error.status == "Network Error") {
        getNetworkError();
      }
    }
  };

  // ======================
  const handleGetZipCode = useRef(
    debounce(async (value) => {
      try {
        const response = await axios.get(`${GET_ZIP_CODE_CITY}${value}`);
        const places = response?.data?.places;

        if (Array.isArray(places)) {
          places.forEach((place) => {
            console.log(place);
            setErrors((prevState) => ({
              ...prevState,
              cityError: "",
              stateNameError: "",
            }));
            const option = {
              title: place["state abbreviation"],
              name: "state",
            };
            console.log(option);
            setInfoRecord((prevState) => ({
              ...prevState,
              city: place["place name"],
              state: option.title,
            }));
          });
        } else {
          console.log("hello");
        }
      } catch (error) {
        // Uncomment and modify the error handling as needed
        // if (error.response?.status === 401) {
        //   getUnAutherisedTokenMessage();
        //   handleCoockieExpire();
        // } else if (error.message === "Network Error") {
        //   getNetworkError();
        // }
        console.error("Error fetching ZIP code data:", error);
      }
    }, 500)
  );
  // ======================

  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    let errorMessage = { ...errors };

    if (name === "image") {
      if (e.target.value == "") {
        errorMessage.imageErrors = "Image is required";
      } else {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
          const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
          if (allowedTypes.includes(selectedFile.type)) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setInfoRecord((prevState) => ({
                ...prevState,
                image: reader.result,
                is_logo_change:
                  prevState.image === selectedFile.name ? "0" : "1",
              }));
            };
            reader.readAsDataURL(selectedFile);
            setImageBoolean(true);
          } else {
            setInfoRecord((prevState) => ({
              ...prevState,
              image: "", // Set qrCode to an empty string
              is_logo_change: "0",
            }));
            alert(
              `${selectedFile.name} is not an image.\nOnly jpeg, png, jpg files can be uploaded`
            );
            e.target.value = null;
          }
        }
        errorMessage.imageErrors = "";
      }
    }
    if (name == "banners") {
      // if (e.target.value == "") {
      //   errorMessage.bannerErrors = "Banner is required";
      // } else {
      const selectedFile = e.target.files[0];

      if (selectedFile) {
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (allowedTypes.includes(selectedFile.type)) {
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
          // }
          // errorMessage.bannerErrors = "";
        } else {
          setInfoRecord((prevState) => ({
            ...prevState,
            banners: "",
            is_banner_change: "0",
          }));
          alert(
            `${selectedFile.name} is not an image.\nOnly jpeg, png, jpg files can be uploaded`
          );
          e.target.value = null;
        }
      }
    }
    if (name === "qrCode") {
      // if (e.target.value == "") {
      //   errorMessage.qrCodeError = "QR Code is required";
      // } else {
      const selectedFile = e.target.files[0];

      if (selectedFile) {
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (allowedTypes.includes(selectedFile.type)) {
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
          // }
          // errorMessage.qrCodeError = "";
        } else {
          setInfoRecord((prevState) => ({
            ...prevState,
            qrCode: "",
            is_qr_code_change: "0",
          }));
          alert(
            `${selectedFile.name} is not an image.\nOnly jpeg, png, jpg files can be uploaded`
          );
          e.target.value = null;
        }
      }
    }
    if (name === "receieptLogo") {
      // console.log("receieptLogo", name);
      // if (e.target.value == "") {
      //   errorMessage.receieptLogoError = "Receipt Logo is required";
      // } else {
      const selectedFile = e.target.files[0];

      if (selectedFile) {
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (allowedTypes.includes(selectedFile.type)) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setInfoRecord((prevState) => ({
              ...prevState,
              receieptLogo: reader.result,
              is_receipt_logo_change:
                prevState.receieptLogo === selectedFile.name ? "0" : "1",
            }));
          };

          reader.readAsDataURL(selectedFile);
          setReceieptLogoBool(true);
          // }
          // errorMessage.receieptLogoError = "";
        } else {
          setInfoRecord((prevState) => ({
            ...prevState,
            receieptLogo: "",
            is_receipt_logo_change: "0",
          }));
          alert(
            `${selectedFile.name} is not an image.\nOnly jpeg, png, jpg files can be uploaded`
          );
          e.target.value = null;
        }
      }
    }
    if (name == "phone") {
      if (value !== "") {
        // console.log(value.length)
        if (value.length !== 10) {
          errorMessage.phoneError = "Invalid phone number";
        } else {
          errorMessage.phoneError = "";
        }
      } else if (value == "") {
        errorMessage.phoneError = "Phone is required";
      } else {
        errorMessage.phoneError = "";
      }
    }
    if (name == "address_1") {
      if (value == "") {
        // console.log(value.length)
        errorMessage.address_1Error = "Address 1 is required";
      } else {
        errorMessage.address_1Error = "";
      }
    }
    if (name == "city") {
      if (value == "") {
        // console.log(value.length)
        errorMessage.cityError = "City is required";
      } else {
        errorMessage.cityError = "";
      }
    }
    if (name == "zip") {
      if (value == "") {
        // console.log(value.length)
        errorMessage.zipCodeError = "Zip is required";
      } else if (value.length !== 5) {
        errorMessage.zipCodeError = "Invalid Zip Code";
      } else {
        errorMessage.zipCodeError = "";
        handleGetZipCode.current(value);
      }
    }
    if (name == "state") {
      if (value == "") {
        // console.log(value.length)
        errorMessage.stateNameError = "State is required";
      } else {
        errorMessage.stateNameError = "";
      }
    }
    switch (name) {
      case "facebookUrl":
        if (value !== "" && !urlPattern.test(value)) {
          errorMessage[`${name}Error`] = `Enter  valid Facebook URL`;
        } else {
          errorMessage[`${name}Error`] = "";
        }
        break;
      case "instagramUrl":
        if (value !== "" && !urlPattern.test(value)) {
          errorMessage[`${name}Error`] = `Enter  valid Instagram URL`;
        } else {
          errorMessage[`${name}Error`] = "";
        }
        break;
      case "promotionalUrl":
        if (value !== "" && !urlPattern.test(value)) {
          errorMessage[`${name}Error`] = `Enter  valid Promotional URL`;
        } else {
          errorMessage[`${name}Error`] = "";
        }
        break;

      default:
        break;
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
      error.phoneError == "" &&
      error.address_1Error == "" &&
      error.cityError == "" &&
      error.zipCodeError == ""
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
    console.log(validateData);
    console.log(currentValidate);
    try {
      setSubmitLoading(true);
      if (validateData == true) {
        if (currentValidate == true) {
          const packect = {
            //
            merchant_id: infoRecord.merchant_id, //
            user_id: infoRecord.user_id, //
            menu_link: infoRecord.menuLink, //
            domain_url: infoRecord.domain, //
            banner_img: infoRecord.banners, //
            is_banner_change: infoRecord.is_banner_change, //
            logo_img: infoRecord.image, //
            is_logo_change: infoRecord.is_logo_change, //
            qr_code: !!infoRecord.qrCode ? infoRecord.qrCode : "", //
            receipt_logo: infoRecord.receieptLogo || "",
            is_qr_code_change: infoRecord.is_qr_code_change, //
            is_receipt_logo_change: infoRecord.is_receipt_logo_change,
            address_line_1: infoRecord.address_1.trim(), //
            address_line_2: infoRecord.address_2.trim(), //
            phone: infoRecord.phone, //
            zip: infoRecord.zip, //
            city: infoRecord.city.trim(), //
            state: infoRecord.state, //
            fb_url: infoRecord.facebookUrl,
            insta_url: infoRecord.instagramUrl,
            promo_url: infoRecord.promotionalUrl,
            // imageBanner: imageBanner,
            // original_name: image,
            // approve: approve,

            token_id: userTypeData?.token_id,
            login_type: userTypeData?.login_type,
          };

          let response = await axios.post(
            BASE_URL + UPDATE_STORE_INFO,
            packect,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${userTypeData?.token}`,
              },
            }
          );
          console.log(response.data);
          if (response.data.status === true) {
            ToastifyAlert("Updated Successfully", "success");
            setSuccessMessage(response.data.message);
            setHideSuccess(true);
            handleSuccessMessage();
          } else {
            ToastifyAlert(response.data.msg, "error");
          }
          // let data = {
          //   id: user_id,
          //   merchant_id: merchant_idNew, //dynamic id give
          // };
          // await handleEditRecord(data);
        }
      }
    } catch (error) {
      if (error.status == 401 || error.response.status === 401) {
        getUnAutherisedTokenMessage();
        handleCoockieExpire();
      } else if (error.status == "Network Error") {
        getNetworkError();
      }
    }
    setSubmitLoading(false);
  };
  const currentPassordValidate = (passwordError) => {
    if (passwordInput.password === "") {
      setPasswordError((prevState) => ({
        ...prevState,
        password: "Password is required",
      }));
      return;
    }
    if (passwordInput.confirmPassword === "") {
      setPasswordError((prevState) => ({
        ...prevState,
        confirmPassword: "Confirm Password is required",
      }));
      return;
    }
    if (passwordError.password === "" && passwordError.confirmPassword === "") {
      return true;
    } else {
      return false;
    }
  };

  // -----------------modal closed-----------------
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    handleCloseModel();
  };
  // -----------------modal closed-----------------
  const handleSubmitChangePassword = async (e) => {
    e.preventDefault();

    let CurrentPassordValidate = currentPassordValidate(passwordError);
    let isExistPassword = await passwordValidate(passwordInput);
    // console.log(isExistPassword);
    if (isExistPassword) {
      if (CurrentPassordValidate === true) {
        setLoader(true);
        let data = {
          new_password: passwordInput.password,
          confirm_password: passwordInput.confirmPassword,
          merchant_id: merchant_idNew,
          user_id: user_id,
          token_id: userTypeData?.token_id,
          login_type: userTypeData?.login_type,
        };
        try {
          let response = await axios.post(
            BASE_URL + CHANGE_PASSWORD_STORE,
            data,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${userTypeData?.token}`,
              },
            }
          );
          if (response.data.status === true) {
            ToastifyAlert("Update Successfully", "success");
            handleClose();
            handleCloseModel();
            setPassowordInput({ password: "", confirmPassword: "" });
            setPasswordError({ password: "", confirmPassword: "" });
          }
        } catch (error) {
          // setLoader(false);
          if (error.response.status == 401) {
            getUnAutherisedTokenMessage();
            handleCoockieExpire();
          }
        } finally {
          setLoader(false);
        }
      }
    }
  };
  const onDropDownChangeHandle = (option) => {
    console.log(option);
    setInfoRecord((prev) => ({
      ...prev,
      state: option.title,
    }));
  };
  // console.log(infoRecord);

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
    receieptLogoBool,
    user_id,
    merchant_idNew,
    handleBlurPassword,
    handleCloseModel,
    submitLoading,
    stateList,
    onDropDownChangeHandle,
    loader,
    open,
    handleOpen,
    handleClose,
    handleKeyPressNew,
    login_type,
  };
}
