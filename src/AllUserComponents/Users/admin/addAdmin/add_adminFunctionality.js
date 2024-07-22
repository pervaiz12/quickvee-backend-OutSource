import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  BASE_URL,
  GET_ADD_ADMIN,
  CHECK_ADMIN_EMAIL,
  ADMIN_CHECK_USER,
} from "../../../../Constants/Config";
import { useNavigate } from "react-router-dom";
import { useAuthDetails } from "../../../../Common/cookiesHelper";
import { ToastifyAlert } from "../../../../CommonComponents/ToastifyAlert";
import PasswordShow from "../../../../Common/passwordShow";

export default function Add_adminFunctionality({ setVisible }) {
  const { userTypeData } = useAuthDetails();
  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();
  const navigate = useNavigate();
  const [addAdminData, setAddAdminData] = useState({
    owner_name: "",
    email: "",
    password: "",
    phone: "",
    errors: {
      owner_name: "",
      email: "",
      password: "",
      phone: "",
    },
  });
  const [loader, setLoader] = useState(false);
  const handleChange = async (e) => {
    const { name, value } = e.target;
    let errors = { ...addAdminData.errors };
    let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (name === "owner_name") {
      errors[name] =
        value.trim() === ""
          ? `Owner Name is required`
          : value[0] === " "
            ? `Owner Name cannot start with a space`
            : "";
    }
    if (name === "email") {
      errors[name] =
        value === ""
          ? `Email is required`
          : !emailRegex.test(value)
            ? `Please enter a valid ${name}`
            : "";
    }
    if (name === "password") {
      errors[name] = value === "" ? `Password is required` : "";
    }
    if (name === "phone") {
      const numericValue = value.replace(/[^0-9]/g, "");
      if (numericValue == "") {
        errors[name] = ``;
      } else if (numericValue.length !== 10) {
        errors[name] = "Phone number must be 10 digits";
      } else {
        errors[name] = "";
      }
    }
    setAddAdminData((prev) => ({
      ...prev,
      errors: errors,
      [name]: value.replace(/^\s+/, ""),
    }));
  };

  const handleKeyPress = (e) => {
    if ((e.charCode < 48 || e.charCode > 57) && e.charCode !== 8) {
      e.preventDefault();
    }
  };
  const handleBlur = async (name) => {
    if (name === "email") {
      if (addAdminData.errors.email == "") {
        let result = await emailValidate(addAdminData.email);
        if (result == true) {
          setAddAdminData((prev) => ({
            ...prev,
            errors: {
              ...prev.errors,
              email: "Email already exists",
            },
          }));
        } else {
          setAddAdminData((prev) => ({
            ...prev,
            errors: {
              ...prev.errors,
              email: "",
            },
          }));
        }
      }
    }
  };
  const handleBlurPassword = async (name) => {
    if (name == "password") {
      if (
        addAdminData.errors.email == "" &&
        addAdminData.email !== "" &&
        addAdminData.password !== ""
      ) {
        let result = await passwordValidate(
          addAdminData.email,
          addAdminData.password
        );
        if (result == true) {
          setAddAdminData((prev) => ({
            ...prev,
            errors: {
              ...prev.errors,
              password: "Password already exists",
            },
          }));
        } else {
          setAddAdminData((prev) => ({
            ...prev,
            errors: {
              ...prev.errors,
              password: "",
            },
          }));
        }
      }
    }
  };
  function Currentvalidate(errors) {
    if (
      errors.owner_name == "" &&
      errors.email == "" &&
      errors.password == "" &&
      errors.phone == ""
    ) {
      return true;
    } else {
      return false;
    }
  }
  const emailValidate = async (data) => {
    const { token, ...newData } = userTypeData;

    const dataNew = { email: data, ...newData };

    try {
      const response = await axios.post(BASE_URL + CHECK_ADMIN_EMAIL, dataNew, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      if (error.status == 401 || error.response.status === 401) {
        getUnAutherisedTokenMessage();
        handleCoockieExpire();
      } else if (error.status == "Network Error") {
        getNetworkError();
      }
    }
  };
  const passwordValidate = async (email, password) => {
    const { token, ...newData } = userTypeData;
    const dataNew = { email: email, password: password, ...newData };

    try {
      const response = await axios.post(BASE_URL + ADMIN_CHECK_USER, dataNew, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      if (error.status == 401 || error.response.status === 401) {
        getUnAutherisedTokenMessage();
        handleCoockieExpire();
      } else if (error.status == "Network Error") {
        getNetworkError();
      }
    }
  };
  const validateForm = async () => {
    let formIsValid = true;
    let newErrors = { ...addAdminData.errors };
    if (addAdminData.owner_name === "") {
      newErrors.owner_name = "Owner Name is required";
      formIsValid = false;
      console.log("isvalid name", formIsValid);
    } else {
      newErrors.owner_name = "";
    }
    if (addAdminData.email === "") {
      newErrors.email = "Email is required";
      formIsValid = false;
      console.log("isvalid email", formIsValid);
    } else {
      try {
        setLoader(true);
        const emailValid = await emailValidate(addAdminData.email);
        if (emailValid) {
          setLoader(false);
          newErrors.email = "Email already exists";
          formIsValid = false;
          console.log("isvalid email exit", formIsValid);
        } else {
          setLoader(false);
          newErrors.email = "";
        }
      } catch (error) {
        console.error("Error validating email:", error);
        newErrors.email = "Email validation failed";
        formIsValid = false;
        console.log("isvalid email error", formIsValid);
      }
    }
    if (addAdminData.password === "") {
      newErrors.password = "Password is required";
      formIsValid = false;
      console.log("isvalid password", formIsValid);
    } else {
      try {
        setLoader(true);
        const passwordValid = await passwordValidate(
          addAdminData.email,
          addAdminData.password
        );
        if (passwordValid) {
          setLoader(false);
          newErrors.password = "Password already exists";
          formIsValid = false;
          console.log("isvalid password value", formIsValid);
        } else {
          setLoader(false);
          newErrors.password = "";
        }
      } catch (error) {
        console.error("Error validating password:", error);
        newErrors.password = "Password validation failed";
        formIsValid = false;
        console.log("isvalid passoword error", formIsValid);
      }
    }
    setAddAdminData((prevState) => ({
      ...prevState,
      errors: newErrors,
    }));

    return formIsValid;
  };
  const keyEnter = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setAddAdminData((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
      if (loader == false) {
        handleSubmit(event);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyEnter);
    return () => {
      document.removeEventListener("keydown", keyEnter);
    };
  }, [addAdminData]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formIsValid = await validateForm();
    const CurrentValidate = Currentvalidate(addAdminData.errors);
    const { token, ...newData } = userTypeData;
    if (formIsValid) {
      if (CurrentValidate == true) {
        const packet = {
          owner_name: addAdminData.owner_name.trim(),
          email: addAdminData.email.trim(),
          password: addAdminData.password.trim(),
          phone: addAdminData.phone,
          ...newData,
        };
        setLoader(true);
        try {
          await axios
            .post(BASE_URL + GET_ADD_ADMIN, packet, {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              if (res.data.status == 200) {
                ToastifyAlert("Added Successfully", "success");
                setAddAdminData({
                  owner_name: "",
                  email: "",
                  password: "",
                  phone: "",
                  errors: {
                    owner_name: "",
                    email: "",
                    password: "",
                    phone: "",
                  },
                });
                navigate("/users/admin");
              } else {
                ToastifyAlert("Admin not Added!", "warn");
              }
              setLoader(false);
            });
        } catch (error) {
          if (error.status == 401 || error.response.status === 401) {
            getUnAutherisedTokenMessage();
            handleCoockieExpire();
          } else if (error.status == "Network Error") {
            getNetworkError();
          }
        }
      }
    }
  };
  return {
    handleChange,
    addAdminData,
    handleSubmit,
    handleBlur,
    handleKeyPress,
    keyEnter,
    loader,
    handleBlurPassword,
  };
}
