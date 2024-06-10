import React, { useState } from "react";
import Validate from "../validationFile/validate";
import axios from "axios";
import { BASE_URL, EMAIL_VARIFICATION } from "../../../Constants/Config";

export default function ForgetPasswordLogic() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState("");
  const { UsernameValidate } = Validate({ setErrors, errors });
  const [message, setMessage] = useState("");
  let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    let newErrors = { ...errors }; // Copy errors object to avoid direct state mutation

    // // Validate email field
    if (name === "email") {
      newErrors[name] =
        value === ""
          ? `Please fill in the ${name} field`
          : !emailRegex.test(value)
            ? `Please provide a valid ${name}`
            : "";
    }

    setErrors({ ...newErrors });

    setEmail(value.replace(/^\s+/, ""));
  };

  function Currentvalidate(errors) {
    if (errors?.email === "") {
      return true;
    } else {
      return false;
    }
  }

  const handleHideErrorMessage = () => {
    setMessage("");
  };

  // Update errors state
  // setErrors(newErrors);

  const handleSubmitData = async (e) => {
    e.preventDefault();
    let IsValidate = Currentvalidate(errors);
    if (IsValidate) {
      try {
        let emailRecord = { email: email.trim() };
        let response = await axios.post(
          BASE_URL + EMAIL_VARIFICATION,
          emailRecord
        );
        console.log(response?.data?.message);
        setMessage(response?.data?.message);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return {
    handleOnChange,
    email,
    handleSubmitData,
    errors,
    message,
    handleHideErrorMessage,
  };
}
