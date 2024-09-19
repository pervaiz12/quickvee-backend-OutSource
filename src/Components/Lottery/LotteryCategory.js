import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
// import SearchableDropdown from "../Products/SearchableDropdown";
import { useAuthDetails } from "../../Common/cookiesHelper";
import { useDispatch } from "react-redux";
import PasswordShow from "../../Common/passwordShow";
import { fetchCategoryList } from "../../Redux/features/Product/ProductSlice";
import SearchableDropdown from "../../CommonComponents/SearchableDropdown";

export default function LotteryCategory() {
  const { userTypeData, LoginGetDashBoardRecordJson } = useAuthDetails();
  const { getUnAutherisedTokenMessage, handleCoockieExpire, getNetworkError } =
    PasswordShow();
  const dispatch = useDispatch();
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
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
          setCategoryList(response?.result || []); // Update category list
        }
      } catch (err) {
        if (err.status === 401 || err.response?.status === 401) {
          getUnAutherisedTokenMessage();
          handleCoockieExpire();
        } else if (err.message === "Network Error") {
          getNetworkError();
        } else {
          console.error("Error in fetching data:", err);
          setError("Failed to fetch category list"); // Update error state
        }
      }
    };

    fetchCategoryListData(); // Call the async function
  }, []);

  // Handle selecting a category from dropdown
  const handleSelectProductOptions = (selectedOption) => {

    setSelectedCategory((prevState) => [...prevState, selectedOption]);
  };

  // Handle deleting selected option
  const handleDeleteSelectedOption = (id) => {
    setSelectedCategory(selectedCategory.filter((option)=>option.id !== id))
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
                title="Category"
                keyName="Category"
                name="title"
                optionList={categoryList} // Pass the fetched category list
                handleSelectProductOptions={handleSelectProductOptions}
                handleDeleteSelectedOption={handleDeleteSelectedOption}
                selectedOption={selectedCategory}
                // error={error}
                // handleUpdateError={handleUpdateError}
                placeholder="Search Category"
              />
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
}
