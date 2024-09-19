import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from "../../Assests/Category/addIcon.svg";
import LotteryList from "./LotteryList";
import { useAuthDetails } from "../../Common/cookiesHelper";
import { useDispatch } from "react-redux";
import {
  emptyProduct,
  fetchProductsData,
} from "../../Redux/features/Product/ProductSlice";
import PasswordShow from "../../Common/passwordShow";
export default function LotteryMain() {
 
  const { userTypeData, LoginGetDashBoardRecordJson } = useAuthDetails();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getUnAutherisedTokenMessage, handleCoockieExpire, getNetworkError } =
    PasswordShow();
  useEffect(() => {
    filterCategoryOnDropDown();
  }, []);
  const filterCategoryOnDropDown = async () => {
    let data = {
      merchant_id: LoginGetDashBoardRecordJson?.data?.merchant_id,
      format: "json",
      category_id: "all",
      show_status: "all",
      name: " ",
      is_media_blank: 1,
      listing_type: 0,
      is_lottery: "1",
      ...userTypeData,
    };

    dispatch(emptyProduct([]));
    try {
      await dispatch(fetchProductsData(data)).unwrap();
      // Handle response if needed
    } catch (error) {
      if (error?.status == 401 || error?.response?.status === 401) {
        getUnAutherisedTokenMessage();
        handleCoockieExpire();
      } else if (error?.status == "Network Error") {
        getNetworkError();
      }
    }
  };
  return (
    <>
      <Grid container className="box_shadow_div">
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <div className="q-category-bottom-header">
                <span>Lottery List</span>
              </div>
            </Grid>
            <Grid item>
              <div className="q-category-bottom-header">
                <p
                  onClick={() => {
                    navigate("/inventory/lottery/add-lottery");
                  }}
                >
                  Add New Lottery <img src={AddIcon} alt="add-icon" />{" "}
                </p>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <LotteryList />
        </Grid>
      </Grid>
    </>
  );
}
