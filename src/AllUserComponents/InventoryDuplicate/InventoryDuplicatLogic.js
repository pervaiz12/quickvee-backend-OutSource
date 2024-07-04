import { useState } from "react";
import Validation from "../../Constants/Validation";
import axios from "axios";
import {
  BASE_URL,
  INVENTORY_DUPLICATE,
  SETTINGS_DUPLICATE,
} from "../../Constants/Config";
import { useAuthDetails } from "../../Common/cookiesHelper";
import { ToastifyAlert } from "../../CommonComponents/ToastifyAlert";
import PasswordShow from "./../../Common/passwordShow";
const InventoryExportLogic = () => {
  const [submitmessage, setsubmitmessage] = useState();
  const { validateDropdown } = Validation();
  const [values, setValues] = useState({
    store_name_from: "",
    store_name_to: "",
    upc_check: "",
    errors: {
      store_name_from: "",
      store_name_to: "",
      upc_check: "",
    },
  });
  const { userTypeData } = useAuthDetails();
  const {handleCoockieExpire,getUnAutherisedTokenMessage}=PasswordShow()
  const [alertOpen, setAlertOpen] = useState(false);
  const [modalHeaderText, setModalHeaderText] = useState("");
  const [userInput, setUserInput] = useState(''); 
  const [captchaText, setCaptchaText] = useState(''); 
  const [loader, setLoader] = useState(false);
  const [loadersetting, setLoaderSetting] = useState(false);
  const [confirmModalOpensetting, setConfirmModalOpensetting] = useState(false);
  const [confirmfinalModalOpensetting, setConfirmFinalModalOpensetting] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmfinalModalOpen, setConfirmFinalModalOpen] = useState(false);

  const handleStoreInput = async (event) => {
    let { errors } = values;
    const fieldName = event.target.name;
    const fieldValue =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    // console.log(values.ebt_type)
    console.log(fieldValue);
    switch (fieldName) {
      case "store_name_from":
        await validateDropdown(fieldValue, fieldName, errors);
        break;
      case "store_name_to":
        await validateDropdown(fieldValue, fieldName, errors);
        break;
      case "upc_check":
        let newval = parseInt(event.target.value) === 1 ? 0 : 1;
        let newval1 = event.target.checked ? 1 : 0;
        console.log(newval);
        console.log(newval1);
        setValues((prevValues) => ({
          ...prevValues,
          errors,
          [fieldName]: newval,
        }));
        break;

      default:
        break;
    }
    setValues((prevValues) => ({
      errors,
      ...prevValues,
      [fieldName]: fieldValue,
    }));
  };

  const { token, ...userTypeDataNew } = userTypeData;

  const confirmFinalLogic = async (e) => {
    const data = {
      store_name_from: values.store_name_from,
      store_name_to: values.store_name_to,
      upc_check: values.upc_check,
      ...userTypeDataNew,
    };
          setConfirmModalOpen(true);

    setConfirmFinalModalOpen(false)
    setLoader(true);
    try {
      const response = await axios.post(
        BASE_URL + INVENTORY_DUPLICATE,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data) {
        setsubmitmessage(response.data);
        ToastifyAlert("Duplicate Inventory Success!", "success");
      } else {
        setsubmitmessage(response.data);
      }
    } catch (error) {
      // console.log('33 catch err');
      ToastifyAlert("Error!", "error");
      handleCoockieExpire()
      getUnAutherisedTokenMessage()
      return new Error(error);
    }
    setLoader(false);
  }

  const dupplicateInventory = async (e) => {
    e.preventDefault();
    let { errors } = values;
    await validateDropdown(values.store_name_from, "store_name_from", errors);
    await validateDropdown(values.store_name_to, "store_name_to", errors);
    
    if (errors.store_name_from === "" && errors.store_name_to === "") {
      if (values.store_name_from == values.store_name_to) {
        // alert("Both the stores cannot be same.");
        setModalHeaderText("Both the stores cannot be same.")
        setAlertOpen(true)
        return false;
      }else {
        if (userInput === captchaText) { 
          setConfirmModalOpen(true);
          // const data = {
          //   store_name_from: values.store_name_from,
          //   store_name_to: values.store_name_to,
          //   upc_check: values.upc_check,
          //   ...userTypeDataNew,
          // };
          // setLoader(true);
          // try {
          //   const response = await axios.post(
          //     BASE_URL + INVENTORY_DUPLICATE,
          //     data,
          //     {
          //       headers: {
          //         "Content-Type": "multipart/form-data",
          //         Authorization: `Bearer ${token}`,
          //       },
          //     }
          //   );
          //   if (response.data) {
          //     setsubmitmessage(response.data);
          //     ToastifyAlert("Duplicate Inventory Success!", "success");
          //   } else {
          //     setsubmitmessage(response.data);
          //   }
          // } catch (error) {
          //   // console.log('33 catch err');
          //   ToastifyAlert("Error!", "error");
          //   handleCoockieExpire()
          //   getUnAutherisedTokenMessage()
          //   return new Error(error);
          // }
        }else{
          setModalHeaderText("Please Fill Captcha Correctly!")
          setAlertOpen(true)
          return false;
        }
        setLoader(false);
      }
    }

    setValues((prevState) => ({
      ...prevState,
      errors,
    }));
  };


  const confirmFinalSettingLogic = async (e) => {
    const data = {
      store_name_from: values.store_name_from,
      store_name_to: values.store_name_to,
      //   upc_check: values.upc_check,
      ...userTypeDataNew,
    };
    setConfirmFinalModalOpensetting(false)
    setLoaderSetting(true);
    try {
      const response = await axios.post(
        BASE_URL + SETTINGS_DUPLICATE,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        setsubmitmessage(response.data);
        // ToastifyAlert("Duplicate Settings Success!", "success");
        ToastifyAlert("Duplicate Settings Success!", "success");
      } else {
        setsubmitmessage(response.data);
      }
    } catch (error) {
      handleCoockieExpire()
      getUnAutherisedTokenMessage()
      ToastifyAlert("Error!", "error");
      // console.log('33 catch err');
      return new Error(error);
    }
    setLoaderSetting(false);
  }

  const dupplicateSettings = async (e) => {
    e.preventDefault();
    let { errors } = values;
    await validateDropdown(values.store_name_from, "store_name_from", errors);
    await validateDropdown(values.store_name_to, "store_name_to", errors);

    if (errors.store_name_from === "" && errors.store_name_to === "") {
      if (values.store_name_from == values.store_name_to) {
        // alert("Both the stores cannot be same.");
        setModalHeaderText("Both the stores cannot be same.")
        setAlertOpen(true)
        return false;
      } else {
        if (userInput === captchaText) { 
          setConfirmModalOpensetting(true);
        // const data = {
        //   store_name_from: values.store_name_from,
        //   store_name_to: values.store_name_to,
        //   //   upc_check: values.upc_check,
        //   ...userTypeDataNew,
        // };
        // setLoader(true);
        // try {
        //   const response = await axios.post(
        //     BASE_URL + SETTINGS_DUPLICATE,
        //     data,
        //     {
        //       headers: {
        //         "Content-Type": "multipart/form-data",
        //         Authorization: `Bearer ${token}`,
        //       },
        //     }
        //   );

        //   if (response.data) {
        //     setsubmitmessage(response.data);
        //     // ToastifyAlert("Duplicate Settings Success!", "success");
        //     ToastifyAlert("Added Successfully", "success");
        //   } else {
        //     setsubmitmessage(response.data);
        //   }
        // } catch (error) {
        //   handleCoockieExpire()
        //   getUnAutherisedTokenMessage()
        //   ToastifyAlert("Error!", "error");
        //   // console.log('33 catch err');
        //   return new Error(error);
        // }
        }else{
          setModalHeaderText("Please Fill Captcha Correctly!")
          setAlertOpen(true)
          return false;
        }
        setLoader(false);
      }
    }

    setValues((prevState) => ({
      ...prevState,
      errors,
    }));
  };
  return {
    handleStoreInput,
    dupplicateInventory,
    dupplicateSettings,
    values,
    submitmessage,
    setsubmitmessage,
    alertOpen,
    modalHeaderText,
    userInput,
    setUserInput,
    captchaText,
    setCaptchaText,
    loader,
    setLoader,
    loadersetting,
    setLoaderSetting,
    confirmModalOpen,
    setConfirmModalOpen,
    setConfirmFinalModalOpen,
    confirmfinalModalOpen,
    confirmModalOpensetting,
    confirmfinalModalOpensetting,
    setConfirmModalOpensetting,
    setConfirmFinalModalOpensetting,
    confirmFinalLogic,
    confirmFinalSettingLogic
  };
};

export default InventoryExportLogic;
