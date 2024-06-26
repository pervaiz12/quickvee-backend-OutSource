// import react from 'react'
import react, { useState, useEffect } from "react";
import axios from "axios";
import {
  BASE_URL,
  ADD_MERCHAN_EMPLOYEE,
  GET_MERCHAN_STATE,
  GET_ADMIN_DATA,
  ADMIN_CHECK_USER,
} from "../../../../Constants/Config";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuthDetails } from "../../../../Common/cookiesHelper";
import { ToastifyAlert } from "../../../../CommonComponents/ToastifyAlert";
import PasswordShow from "../../../../Common/passwordShow";
import { getAuthInvalidMessage } from "../../../../Redux/features/Authentication/loginSlice";

const MerchantFunction = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { LoginGetDashBoardRecordJson, LoginAllStore, userTypeData } =
    useAuthDetails();

  const { handleCoockieExpire } = PasswordShow();
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
  // ==================== get state and admin data---------
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
    // console.log('hello')
    //  await axios.get(BASE_URL+GET_MERCHAN_STATE).then(result=>{
    //     if(result.status==200)
    //     {
    //         setStateList(result.data.states)
    //         setAdminList(result.data.admin_list)
    //     }else{
    //         setStateList([])
    //         setAdminList([])
    //     }
    //  })
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
        // setErrorPin('')

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
  // const onChangeAdminId = async (e) => {
  //     const { name, value } = e.target;
  //     setAdminId(value);

  //     if (value === '') {
  //         setErrorAdminId('Please select adminId field');
  //         return; // No need to proceed further if value is empty
  //     } else {
  //         setErrorAdminId('');
  //     }

  //     const data = { m_id: value };

  //     try {
  //         const result = await axios.post(BASE_URL + GET_ADMIN_DATA, data, {
  //             headers: {
  //                 'Content-Type': 'multipart/form-data'
  //             }
  //         });

  //         setStore({
  //             ...store,
  //             storename: result.data.own_store,
  //             state: result.data.a_state,
  //             phone: result.data.phone,
  //             ownerName: result.data.owner_name,
  //             errors: {
  //                 ownerName: '',
  //                 state: '',
  //                 storename: '',
  //                 email: '',
  //                 phone: '',
  //                 password:''
  //             }
  //         });

  //         if (result.data.login_pin !== '') {
  //             setMerchantStore({
  //                 ...merchantStore,
  //                 pin: result.data.login_pin
  //             });
  //             setErrorPin('');
  //         }
  //     } catch (error) {
  //         console.error('Error fetching admin data:', error);
  //         // Handle error if necessary
  //     }
  // };

  // ==================== get state and admin data---------

  // --------------------radio button---------------------------

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
  // -------------------radio button end---------------------------

  const handleChangeMerchant = (e) => {
    const { name, value } = e.target;

    setMerchantStore({
      ...merchantStore,
      [name]: value,
    });

    if (value === "") {
      setErrorPin("Please select pin field");
    } else if (value.length < 4) {
      // Modified condition to check if length is less than 4
      setErrorPin("Please give proper length");
    } else {
      setErrorPin("");
    }
  };

  const handleChange = (e) => {
    // console.log("handleChange, ",e)
    let updatedErrors = { ...store.errors };
    // const { name, value } = e.target;
    const { name, value } = e.target || {};
    if (e?.target?.name) {
      let emailRegex =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let reg = /^[0-9\b]+$/;
      console.log(value);

      if (name === "storename") {
        console.log(name);
        // updatedErrors[name] = value === "" ? `Please fill the ${name} field` : "";
        updatedErrors[name] =
          value.trim() === ""
            ? `Store Name is required`
            : value[0] === " "
              ? `The ${name} can not start with a space`
              : "";
      }
      if (name == "ownerName") {
        updatedErrors[name] = value === "" ? `Owner Name is required` : "";
        // updatedErrors[name] =
        //   value.trim() === ""
        //     ? `Please fill in the ${name} field`
        //     : value[0] === " "
        //       ? `The ${name} field cannot start with a space`
        //       : "";
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
  console.log("store updated ", store);
  const handleKeyPress = (e) => {
    if ((e.charCode < 48 || e.charCode > 57) && e.charCode !== 8) {
      e.preventDefault();
    }
  };

  const validateForm = (errors) => {
    // console.log(errors);

    if (
      // errors.storename === '' &&
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
    // console.log(errors.password)(errors.storename === '')&&
    if (
      errors.phone == "" &&
      errors.state == "" &&
      errors.email == "" &&
      errors.ownerName == "" &&
      errors.password == ""
      // &&
      // errorPin == ""
    ) {
      return true;
    } else {
      return false;
    }
  };
  // =====================================================
  const validate = async () => {
    let error = false;
    let errorMessage = "";
    let errors = { ...store.errors };
    if (userRadioData === "") {
      errorMessage = "Please enter the input";
      error = true;
    } else {
      errorMessage = "";
      error = false;
    }

    if (
      userRadioData === "" ||
      userRadioData === "admin" ||
      userRadioData === "merchant"
    ) {
      if (store.storename === "") {
        errors.storename = "Store Name is required";
        error = true;
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
          // console.log('heloo password')
          if (errors.password === "" && errors.email == "") {
            setLoader(true);
            const emailValid = await passwordValidate(
              store.email,
              store.password
            );
            if (emailValid == true) {
              setLoader(false);
              errors.password = "Password already exists";
              error = true;
            } else {
              setLoader(false);
              errors.password = "";
              error = false;
            }
          }
        } catch (error) {
          console.error("Error validating email:", error);
          // error = true; // You should handle this error case accordingly
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

    if (error == true) {
      return false;
    } else {
      return true;
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
      console.error("Error validating email:", error);
      // console.log("hellooo", error?.message);
      // dispatch(getAuthInvalidMessage(error?.message));
      handleCoockieExpire();
      throw error;
    }
  };
  // ------------------------
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
  // ------------------------
  function validateData() {
    let error = false;
    // console.log(adminId)
    if (adminId == undefined) {
      setErrorAdminId("Please select admin");
      error = true;
    } else if (adminId == "") {
      setErrorAdminId("Please select admin");
      error = true;
    } else {
      setErrorAdminId("");
      error = false;
    }
    if (merchantStore.pin == "") {
      setErrorPin("Please enter pin");
      error = true;
    } else if (merchantStore.pin !== "" && errorPin == "") {
      setErrorPin("");
      error = false;
    }
    if (error == true) {
      return false;
    } else {
      return true;
    }
  }

  const handleSubmitMerchant = async (e) => {
    e.preventDefault();
    console.log("hello rinkesh");
    // let validateMerchant = validateData();
    const currentValidate = validateFormNew(store.errors);
    const isValidate = await validate();
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
              // else {
              //   ToastifyAlert("Merchant not Added!", "warn");
              // }
            });
        }
      }
    } catch (error) {
      // console.log("hellooo", error?.message);
      // dispatch(getAuthInvalidMessage(error?.message));
      handleCoockieExpire();
    }
  };

  // =====================================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // const data=[{name:'rinkekse',lastname:'yadav',}]

    // let id='123'
    // navigate(`/user/editcustomer/${id}`,{ state: data})

    // ====================================================
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
                    // storename: "",
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
    // ===============================================================================
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
  };
};
export default MerchantFunction;
