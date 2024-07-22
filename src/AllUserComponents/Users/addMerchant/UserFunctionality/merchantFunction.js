// import react from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import {
  BASE_URL,
  ADD_MERCHAN_EMPLOYEE,
  GET_MERCHAN_STATE,
  GET_ADMIN_DATA,
  ADMIN_CHECK_USER,
  CHECK_EXIST_STORENAME,
} from "../../../../Constants/Config";
import { useNavigate } from "react-router-dom";
import { useAuthDetails } from "../../../../Common/cookiesHelper";
import { ToastifyAlert } from "../../../../CommonComponents/ToastifyAlert";
import PasswordShow from "../../../../Common/passwordShow";
const MerchantFunction = () => {
  const navigate = useNavigate();
  const { userTypeData } = useAuthDetails();
  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();
  const [store, setStore] = useState({
    storename: "",
    ownerName: "",
    email: "",
    password: "",
    phone: "",
    state: "",
    errors: {
      storename: "",
      ownerName: "",
      email: "",
      password: "",
      phone: "",
      state: "",
    },
  });
  const [loader, setLoader] = useState(false);
  const [merchantStore, setMerchantStore] = useState({
    pin: "",
  });
  const [userRadio, setUserRadio] = useState(true);
  const [userRadioData, setUserRadioData] = useState("merchant");
  const [radioErros, setRadioError] = useState("");
  const [stateList, setStateList] = useState([]);
  const [adminList, setAdminList] = useState([]);
  const [adminId, setAdminId] = useState();
  const [errorAdminId, setErrorAdminId] = useState("");
  const [errorPin, setErrorPin] = useState("");
  const getState = async () => {
    const { token, ...newData } = userTypeData;
    await axios
      .post(BASE_URL + GET_MERCHAN_STATE, newData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        if (result.status == 200) {
          setStateList(result.data.states);
          setAdminList(result.data.admin_list);
        } else {
          setStateList([]);
          setAdminList([]);
        }
      });
  };
  useEffect(() => {
    getState();
  }, []);

  const onChangeAdminId = async (e) => {
    const { name, value } = e.target;
    const { token, ...newData } = userTypeData;
    setAdminId(value);
    const data = { m_id: value, ...newData };
    await axios
      .post(BASE_URL + GET_ADMIN_DATA, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setStore({
          ...store,
          storename: result.data.own_store,
          state: result.data.a_state,
          phone: result.data.phone,
          ownerName: result.data.owner_name,
          errors: {
            ...store.errors,
            ownerName: "",
            state: "",
            storename: "",
            phone: "",
          },
        });
        if (result.data.login_pin !== "") {
          setMerchantStore({
            ...merchantStore,
            pin: result.data.login_pin,
          });
          setErrorPin("");
        }
      });
    if (e.target.value == "") {
      setErrorAdminId("Please select adminId field");
    } else {
      setErrorAdminId("");
    }
  };
  const onClickUserRadio = (e) => {
    const { value } = e.target;
    if (value.toLowerCase().trim() == "admin") {
      setUserRadio(false);
      setUserRadioData(e.target.value);
      setAdminId("");
      setMerchantStore({ pin: "" });
      setStore({
        ...store,
        storename: "",
        ownerName: "",
        email: "",
        password: "",
        phone: "",
        state: "",
        errors: {
          storename: "",
          ownerName: "",
          email: "",
          password: "",
          phone: "",
          state: "",
        },
      });
    } else if (value.toLowerCase().trim() == "merchant") {
      setUserRadio(true);
      setUserRadioData(e.target.value);
    }
    setRadioError("");
  };
  const handleChangeMerchant = (e) => {
    const { name, value } = e.target;
    setMerchantStore({
      ...merchantStore,
      [name]: value,
    });
    if (value === "") {
      setErrorPin("Please select pin field");
    } else if (value.length < 4) {
      setErrorPin("Please give proper length");
    } else {
      setErrorPin("");
    }
  };

  const handleChange = (e) => {
    let updatedErrors = { ...store.errors };
    const { name, value } = e.target || {};
    if (e?.target?.name) {
      let emailRegex =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (name === "storename") {
        updatedErrors[name] =
          value.trim() === ""
            ? `Store Name is required`
            : value[0] === " "
              ? `The ${name} can not start with a space`
              : "";
      }
      if (name == "ownerName") {
        updatedErrors[name] = value === "" ? `Owner Name is required` : "";
      }
      if (name == "email") {
        updatedErrors[name] =
          value === ""
            ? `Email is required`
            : !emailRegex.test(value)
              ? "Please enter a valid email"
              : "";
      }
      if (name == "password") {
        updatedErrors[name] = value === "" ? `Password is required` : "";
      }
      if (name == "state") {
        updatedErrors[name] = value === "" ? `State is required` : "";
      }
      if (name === "phone") {
        const numericValue = value.replace(/[^0-9]/g, "");
        if (numericValue == "") {
          updatedErrors[name] = "Phone is required";
        } else if (numericValue.length !== 10) {
          updatedErrors[name] = "Phone number must be 10 digits";
        } else {
          updatedErrors[name] = "";
        }
      }
      const trimmedValue = value.replace(/^\s+|\s+$/g, "");
      setStore({
        ...store,
        errors: updatedErrors,

        [name]: value.replace(/^\s+/, ""),
      });
    } else {
      if (e.name == "state") {
        updatedErrors[e.name] = e.title === "" ? `State is required` : "";
      }
      setStore((prevState) => ({
        ...prevState,
        errors: updatedErrors,
        [e.name]: e.title,
      }));
    }
  };
  const handleKeyPress = (e) => {
    if ((e.charCode < 48 || e.charCode > 57) && e.charCode !== 8) {
      e.preventDefault();
    }
  };

  const validateForm = (errors) => {
    if (
      errors.state === "" &&
      errors.phone === "" &&
      errors.password === "" &&
      errors.ownerName === "" &&
      errors.email === ""
    ) {
      return true;
    } else {
      return false;
    }
  };

  const validateFormNew = (errors) => {
    if (
      errors.phone == "" &&
      errors.state == "" &&
      errors.email == "" &&
      errors.ownerName == "" &&
      errors.password == "" &&
      errors.storename === ""
    ) {
      return true;
    } else {
      return false;
    }
  };
  const validate = async () => {
    let error = false;
    let errorMessage = "";
    let errors = { ...store.errors };
    if (userRadioData === "") {
      errorMessage = "Please enter the input";
      error = true;
    }
    if (
      userRadioData === "" ||
      userRadioData === "admin" ||
      userRadioData === "merchant"
    ) {
      if (store.storename === "") {
        errors.storename = "Store Name is required";
        error = true;
      } else {
        try {
          if (!errors.storename && !errors.email) {
            setLoader(true);
            const emailValid = await StorenameValidate(
              store.email,
              store.storename
            );
            setLoader(false);
            if (emailValid.status === true) {
              errors.storename = "Store already exists";
              error = true;
            } else {
              errors.storename = "";
            }
          }
        } catch (validationError) {
          setLoader(false);
          console.error("Error validating store name:", validationError);
          errors.storename = "Error validating store name";
          error = true;
        }
      }
      if (store.ownerName === "") {
        errors.ownerName = "Owner Name is required";
        error = true;
      }

      if (store.email === "") {
        errors.email = "Email is required";
        error = true;
      }

      if (store.password === "") {
        errors.password = "Password is required";
        error = true;
      } else {
        try {
          if (!errors.password && !errors.email) {
            setLoader(true);
            const passwordValid = await passwordValidate(
              store.email,
              store.password
            );
            setLoader(false);
            if (passwordValid === true) {
              errors.password = "Password already exists";
              error = true;
            } else {
              errors.password = "";
            }
          }
        } catch (validationError) {
          setLoader(false);
          console.error("Error validating password:", validationError);
          errors.password = "Error validating password";
          error = true;
        }
      }
      if (store.state === "") {
        errors.state = "Please select the State";
        error = true;
      }
      if (store.phone === "") {
        errors.phone = "Phone is required";
        error = true;
      }
    }

    setRadioError(errorMessage);
    setStore({ ...store, errors });

    return !error;
  };
  const StorenameValidate = async (email, store) => {
    const { token, ...newData } = userTypeData;
    const dataNew = { email: email, name: store, ...newData };
    try {
      const response = await axios.post(
        BASE_URL + CHECK_EXIST_STORENAME,
        dataNew,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
  const handleBlurStoreFound = async () => {
    if (
      store.errors.storename == "" &&
      store.storename !== "" &&
      store.email !== ""
    ) {
      let result = await StorenameValidate(store.email, store.storename);
      console.log(result);
      if (result.status == true) {
        setStore((prev) => ({
          ...prev,
          errors: {
            ...prev.errors,
            storename: "Store already exists",
          },
        }));
      } else {
        setStore((prev) => ({
          ...prev,
          errors: {
            ...prev.errors,
            storename: "",
          },
        }));
      }
    } else {
      console.log("nooo");
    }
  };

  const handleBlur = async (name) => {
    if (name === "password" || name === "email") {
      if (store.errors.password == "" && store.errors.email == "") {
        let result = await passwordValidate(store.email, store.password);
        if (result == true) {
          setStore((prev) => ({
            ...prev,
            errors: {
              ...prev.errors,
              password: "Password already exists",
            },
          }));
        } else {
          setStore((prev) => ({
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
  const keyEnter = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setStore((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
      if (loader == false) {
        handleSubmitMerchant(event);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyEnter);
    return () => {
      document.removeEventListener("keydown", keyEnter);
    };
  }, [store]);
  const handleSubmitMerchant = async (e) => {
    e.preventDefault();
    const currentValidate = validateFormNew(store.errors);
    const isValidate = await validate();
    console.log(isValidate);
    try {
      if (isValidate) {
        if (currentValidate) {
          const { token, ...newData } = userTypeData;
          const data = {
            login_pin: merchantStore.pin,
            admin: adminId,
            storename: store.storename.trim(),
            ownerName: store.ownerName.trim(),
            email: store.email.trim(),
            password: store.password.trim(),
            phone: store.phone,
            state: store.state,
            created_by_user: "superadmin",
            user_type: userRadioData,
            ...newData,
          };
          setLoader(true);
          await axios
            .post(BASE_URL + ADD_MERCHAN_EMPLOYEE, data, {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            })
            .then((result) => {
              setLoader(false);
              if (result.data.status == 200) {
                ToastifyAlert("Merchant Added Successfully!", "success");
                setUserRadioData("");
                setUserRadio(false);
                setStore({
                  storename: "",
                  ownerName: "",
                  email: "",
                  password: "",
                  phone: "",
                  state: "",
                  errors: {
                    storename: "",
                    ownerName: "",
                    email: "",
                    password: "",
                    phone: "",
                    state: "",
                  },
                });
                navigate(`/users/unapprove/editMerchant/${result.data.id}`);
              }
            });
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
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValidate = await validate();
    const currentValidate = validateForm(store.errors);
    if (userRadioData.toLowerCase() == "admin") {
      if (isValidate) {
        if (currentValidate) {
          const { token, ...newData } = userTypeData;
          const data = {
            storename: store.storename,
            ownerName: store.ownerName,
            email: store.email,
            password: store.password,
            phone: store.phone,
            state: store.state,
            created_by_user: "superadmin",
            user_type: userRadioData,
            ...newData,
          };
          await axios
            .post(BASE_URL + ADD_MERCHAN_EMPLOYEE, data, {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            })
            .then((result) => {
              if (result.data.status == 200) {
                setUserRadioData("");
                setUserRadio(false);
                setStore({
                  storename: "",
                  ownerName: "",
                  email: "",
                  password: "",
                  phone: "",
                  state: "",
                  errors: {
                    ownerName: "",
                    email: "",
                    password: "",
                    phone: "",
                    state: "",
                  },
                });
                navigate(`/users/editCustomer/${result.data.id}`);
              }
            });
        }
      }
    }
  };
  return {
    handleChange,
    store,
    handleSubmit,
    onClickUserRadio,
    userRadio,
    merchantStore,
    handleChangeMerchant,
    radioErros,
    stateList,
    adminList,
    stateList,
    adminId,
    onChangeAdminId,
    handleSubmitMerchant,
    errorAdminId,
    errorPin,
    handleKeyPress,
    handleBlur,
    userRadioData,
    loader,
    keyEnter,
    handleBlurStoreFound,
  };
};
export default MerchantFunction;
