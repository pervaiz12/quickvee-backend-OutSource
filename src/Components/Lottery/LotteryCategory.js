import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
// import SearchableDropdown from "../Products/SearchableDropdown";
import { useAuthDetails } from "../../Common/cookiesHelper";
import { useDispatch } from "react-redux";
import PasswordShow from "../../Common/passwordShow";
import { fetchCategoryList } from "../../Redux/features/Product/ProductSlice";
import SearchableDropdown from "../../CommonComponents/SearchableDropdown";

export default function LotteryCategory({
  categoryList,
  setCategoryList,
  formValues,
  setFormValues,
  formError,
  setFormError,
  collectionForEditProductData,
}) {
 
  const { userTypeData, LoginGetDashBoardRecordJson } = useAuthDetails();
  const { getUnAutherisedTokenMessage, handleCoockieExpire, getNetworkError } =
    PasswordShow();
  const dispatch = useDispatch();

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryListData = async () => {
      try {
        const inventoryData = new FormData();
        inventoryData.append(
          "merchant_id",
          LoginGetDashBoardRecordJson?.data?.merchant_id
        );
        inventoryData.append("login_type", userTypeData?.login_type);
        inventoryData.append("token_id", userTypeData?.token_id);
        inventoryData.append("token", userTypeData?.token);

        const response = await dispatch(
          fetchCategoryList(inventoryData)
        ).unwrap();
        if (response?.result.length > 0) {
          const lotteryProducts = response.result.filter(
            (product) => product.is_lottery === "1"
          );
          setCategoryList(lotteryProducts); // Update collection list
        
          const sortedLotteryProducts = response?.result?.filter(
            (product) => collectionForEditProductData.includes(product.id) // Compare product.id with each ID in the array
          ); 
          setFormValues((prevState) => {
            return {
              ...prevState,
              collection: sortedLotteryProducts ||[], 
            };
          });
        }
      } catch (err) {
        if (err.status === 401 || err.response?.status === 401) {
          getUnAutherisedTokenMessage();
          handleCoockieExpire();
        } else if (err.message === "Network Error") {
          getNetworkError();
        } else {
          console.error("Error in fetching data:", err);
          setError("Failed to fetch collection list"); // Update error state
        }
      }
    };

    fetchCategoryListData(); // Call the async function
  }, [collectionForEditProductData]);

  // Handle selecting a collection from dropdown
  const handleSelectProductOptions = (selectedOption) => {
    setFormValues((prevState) => ({
      ...prevState,
      collection: [...prevState.collection, selectedOption],
    }));

    setFormError((prevState) => ({
      ...prevState,
      collection: null,
    }));
  };

  // Handle deleting selected option
  const handleDeleteSelectedOption = (id) => {
    setFormValues((prevState) => ({
      ...prevState,
      collection: prevState.collection.filter(
        (collection) => collection.id !== id
      ),
    }));
  };

  // Handle error update
  const handleUpdateError = (newError) => {
    setError(newError);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className="">
            <div className="q-add-categories-single-input">
              <SearchableDropdown
                title="collection"
                keyName="collection"
                name="title"
                optionList={categoryList} // Pass the fetched collection list
                handleSelectProductOptions={handleSelectProductOptions}
                handleDeleteSelectedOption={handleDeleteSelectedOption}
                selectedOption={formValues.collection}
                // error={error}
                // handleUpdateError={handleUpdateError}
                placeholder="Search collection"
              />
            </div>
          </div>
          {formError.collection && (
            <span className="error">{formError.collection}</span>
          )}
        </Grid>
      </Grid>
    </>
  );
}
