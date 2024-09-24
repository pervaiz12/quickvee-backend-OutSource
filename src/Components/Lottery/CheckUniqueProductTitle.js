export function CheckUniqueProductTitle(
  value,
  formValues,
  LoginGetDashBoardRecordJson,
  userTypeData,
  titleTimeoutId,
  dispatch,
  setFormError,
  checkProductTitle,
  setLoader
) {
  setLoader(true)
  const formData = new FormData();
  formData.append("title", value);
  formData.append("id", formValues?.id);
  formData.append(
    "merchant_id",
    LoginGetDashBoardRecordJson?.data?.merchant_id
  );
  formData.append("login_type", userTypeData?.login_type);
  formData.append("token_id", userTypeData?.token_id);
  formData.append("token", userTypeData?.token);
  // Clear previous timeout if exists
  clearTimeout(titleTimeoutId);
  // Call the API after one second
  titleTimeoutId = setTimeout(async () => {
    try {
      const res = await dispatch(checkProductTitle(formData)).unwrap();
      if (res?.status) {
        // SetProductTitleError(false);
      } else {
        setFormError((prevErrors) => ({
          ...prevErrors,
          title: "title already exists",
        }));
      }
    } catch (error) {
      // Handle any errors from the API call
      console.error("Error:", error);
    }
    setLoader(false)
  }, 500);
}
