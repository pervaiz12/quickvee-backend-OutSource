export function checkUniqueUpcCode(
  value,
  name,
  LoginGetDashBoardRecordJson,
  action,
  id,
  userTypeData,
  titleTimeoutId,
  dispatch,
  checkUpcCodeSingle,
  setFormError,
  setLoader
) {
  setLoader(true)
  const data = {
    merchant_id: LoginGetDashBoardRecordJson?.data?.merchant_id,
    upc: value.trim(),
    product_id: action === "update-lottery" ? id : "",
    ...userTypeData,
  };
  clearTimeout(titleTimeoutId);
  // Call the API after one second
  titleTimeoutId = setTimeout(async () => {
      try {
        const res = await dispatch(checkUpcCodeSingle(data)).unwrap();
        console.log("res", res);
        if (res) {
          // SetProductTitleError(false);
        } else {
          setFormError((prevErrors) => ({
            ...prevErrors,
            upc: "upc already exists",
          }));
        }
      } catch (error) {
        // Handle any errors from the API call
        console.error("Error:", error);
      }
      setLoader(false)
    }, 500);
}
