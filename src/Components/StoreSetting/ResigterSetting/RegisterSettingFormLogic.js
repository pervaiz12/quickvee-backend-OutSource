import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Validation from "../../../Constants/Validation";
import { BASE_URL, UPDATE_REGISTER_SETTINGS } from "../../../Constants/Config";
import { fetchRegisterSettingsData } from "../../../Redux/features/StoreSettings/RegisterSettings/RegisterSettingsSlice";
import { useSelector, useDispatch } from "react-redux";
import { useAuthDetails } from "../../../Common/cookiesHelper";

const RegisterSettingFormLogic = () => {
  const {
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    userTypeData,
    GetSessionLogin,
  } = useAuthDetails();
  const [registerData, setRegisterData] = useState();
  const RegisterSettings = useSelector((state) => state.RegisterSettingsData);
  const dispatch = useDispatch();

  // console.log(RegisterSettings_data);
  const { isNumber, isText } = Validation();
  const [submitmessage, setsubmitmessage] = useState("");
  // const Navigate = useNavigate();
  const scrollRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  const [values, setValues] = useState({
    regi_setting: "",
    ebt_type: "",
    idel_logout: "",
    device_name: "",
    customer_loyalty: "",
    barcode_msg: "",
    round_invoice: "",
    discount_prompt: "",
    denomination: "",
    errors: {
      regi_setting: "",
      ebt_type: "",
      idel_logout: "",
      device_name: "",
      customer_loyalty: "",
      barcode_msg: "",
      round_invoice: "",
      discount_prompt: "",
      denomination: "",
    },
  });
  let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;
  useEffect(() => {
    if (!RegisterSettings.loading && RegisterSettings.RegisterSettingsData) {
      setRegisterData(RegisterSettings.RegisterSettingsData);
    }
  }, [RegisterSettings, RegisterSettings.loading]);
  let data = {
    merchant_id,
    ...userTypeData,
  };
  useEffect(() => {
    if (data) {
      dispatch(fetchRegisterSettingsData(data));
    }
  }, [data.merchant_id]);
  useEffect(() => {
    setValues((prevValues) => ({
      ...prevValues,
      regi_setting:
        registerData && registerData.regi_setting
          ? registerData.regi_setting
          : "",
      ebt_type: registerData && registerData.ebt ? registerData.ebt : "",
      idel_logout:
        registerData && registerData.idel_logout
          ? registerData.idel_logout
          : "",
      device_name:
        registerData && registerData.device_name
          ? registerData.device_name
          : "",
      customer_loyalty:
        registerData && registerData.customer_loyalty
          ? registerData.customer_loyalty
          : "",
      barcode_msg:
        registerData && registerData.barcode_msg
          ? registerData.barcode_msg
          : "",
      round_invoice:
        registerData && registerData.round_invoice
          ? registerData.round_invoice
          : "",
      discount_prompt:
        registerData && registerData.discount_prompt
          ? registerData.discount_prompt
          : "",
      denomination:
        registerData &&
        registerData.denomination &&
        parseInt(registerData.denomination) === 1
          ? true
          : false,
    }));
  }, [registerData]);

  const handleRegisterSettingInput = async (event) => {
    let { errors } = values;
    const fieldName = event.target.name;
    const fieldValue =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    // console.log(values.ebt_type)
    // console.log(fieldValue)
    switch (fieldName) {
      case "idel_logout":
        await isNumber(fieldValue, fieldName, errors);
        break;
      case "device_name":
        await isText(fieldValue, fieldName, errors);
        break;
      case "denomination":
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

      case "regi_setting[]":
        let regi_settingsArray = values.regi_setting
          ? values.regi_setting.split(",")
          : [];
        // console.log(regi_settingsArray)
        if (regi_settingsArray.includes(event.target.value)) {
          regi_settingsArray = regi_settingsArray.filter(
            (item) => item !== event.target.value
          );
        } else {
          regi_settingsArray.push(event.target.value);
        }
        const updatedregi_setting = regi_settingsArray.join(",");
        // console.log(updatedregi_setting)
        setValues({
          ...values, // Spread the existing state
          regi_setting: updatedregi_setting, // Update only the permissions property
        });

        break;
      case "ebt_type[]":
        let ebt_typeArray = values.ebt_type ? values.ebt_type.split(",") : [];
        if (ebt_typeArray.includes(event.target.value)) {
          ebt_typeArray = ebt_typeArray.filter(
            (item) => item !== event.target.value
          );
        } else {
          ebt_typeArray.push(event.target.value);
        }
        const update_ebt_type = ebt_typeArray.join(",");
        setValues({
          ...values, // Spread the existing state
          ebt_type: update_ebt_type, // Update only the permissions property
        });
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

  const handleRegisterSettingSubmit = async (e) => {
    e.preventDefault();
    let { errors } = values;
    await isNumber(values.idel_logout, "idel_logout", errors);
    await isText(values.device_name, "device_name", errors);
    // await isNumber(values.paid_breaks,'paid_breaks', errors);
    // await validateRadioBtn(values.role,errors);

    if (errors.idel_logout === "" && errors.device_name === "") {
      const data = {
        merchant_id,
        regi_setting: values.regi_setting,
        ebt: values.ebt_type,
        idel_logout: values.idel_logout,
        discount_prompt: values.discount_prompt,
        round_invoice: values.round_invoice,
        customer_loyalty: values.customer_loyalty,
        device_name: values.device_name,
        barcode_msg: values.barcode_msg,
        denomination: values.denomination === true ? "1" : "0",
        token_id: userTypeData?.token_id,
        login_type: userTypeData?.login_type,
      };
      // console.log(data);

      try {
        const response = await axios.post(
          BASE_URL + UPDATE_REGISTER_SETTINGS,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${userTypeData?.token}`,
            },
          }
        );

        if (response.data.status === true) {
          setsubmitmessage(response.data.message);
        } else {
          setsubmitmessage(response.data.message);
        }
      } catch (error) {
        // console.log('33 catch err');
        return new Error(error);
      }
    }

    setValues((prevState) => ({
      ...prevState,
      errors,
    }));
  };

  return {
    handleRegisterSettingInput,
    values,
    handleRegisterSettingSubmit,
    submitmessage,
    setsubmitmessage,
    showModal,
    setShowModal,
    scrollRef,
  };
};

export default RegisterSettingFormLogic;
