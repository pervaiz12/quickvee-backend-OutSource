import React, { useEffect } from "react";
import infoImage from "../../image/Group 196.svg";
import InfoFunction from "./infoFunctionality/infoFunction";
import { BASE_URL } from "../../Constants/Config";
import BasicTextFields from "../../reuseableComponents/TextInputField";
import { Grid } from "@mui/material";
import StoreHeading from "./StoreHeading";
import MenuLink from "./MenuLink";
import LogoAndBanner from "./LogoAndBanner";
import AddressForm from "./AddressForm";
import SocialMediaForm from "./SocialMediaForm";
import ChangePasswordForm from "./ChangePasswordForm";
const Info = () => {
  const {
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
    handleSubmitChangePassword
  } = InfoFunction();
  let data = {
    id: 100, //dynamic id give
  };
  useEffect(() => {
    handleEditRecord(data);
  }, []);
  console.log("infoRecord", infoRecord.store);
  return (
    <>
      <StoreHeading
        hideSucess={hideSucess}
        successsMessage={successsMessage}
        infoRecord={infoRecord}
      />

      <MenuLink infoRecord={infoRecord} onChangeHandle={onChangeHandle} />

      <LogoAndBanner
        BannersBoolean={BannersBoolean}
        infoRecord={infoRecord}
        handleDelete={handleDelete}
        onChangeHandle={onChangeHandle}
        imageBoolean={imageBoolean}
        errors={errors}
      />
      <form>
        <AddressForm infoRecord={infoRecord} onChangeHandle={onChangeHandle} />

        <SocialMediaForm handleSubmitInfo={handleSubmitInfo} />
      </form>

      <ChangePasswordForm
        onPasswordInputChange={onPasswordInputChange}
        handleSubmitChangePassword={handleSubmitChangePassword}
        passwordInput={passwordInput}
        passwordError={passwordError}
      />
    </>
  );
};

export default Info;
