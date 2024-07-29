import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import {
  CategoryAllData,
  getCategorySalesSummeryData,
} from "../../../Redux/features/CategorySalesSummeryReport/categorySalesSummeryReportSlice";
import {
  BASE_URL,
  CATEGORY_SALES_SUMMERY_REPORT,
} from "../../../Constants/Config";
import axios from "axios";

export default function CategorySalesSummeryReportLogic() {
  const dispatch = useDispatch();
  const AllCategoryData = useSelector(
    (state) => state?.categorySalesReportData
  );
  const {
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    userTypeData,
    GetSessionLogin,
  } = useAuthDetails();
  const title = "Category Sales Report";
  let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;
  let data = { merchant_id, ...userTypeData };
  const [categoryAll, setCategoryAll] = useState([]);
  const [selectedLCategoryType, setselectedLCategoryType] = useState("All");
  const [getCategorySalesReport, setCategorySalesReport] = useState([]);

  //   listing category
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      await dispatch(CategoryAllData(data)).unwrap();
    } catch (error) {
      // if (error.status == 401 || error.response.status === 401) {
      //   getUnAutherisedTokenMessage();
      //   handleCoockieExpire();
      // } else if (error.status == "Network Error") {
      //   getNetworkError();
      // }
    } finally {
      // setLoadingCategories(false);
    }
  };
  useEffect(() => {
    if (
      !AllCategoryData?.loading &&
      AllCategoryData?.CategoryReport &&
      Array.isArray(AllCategoryData?.CategoryReport)
    ) {
      setCategoryAll(AllCategoryData?.CategoryReport);
    } else {
      setCategoryAll([]);
    }
  }, [AllCategoryData?.loading]);
  //   selected  drop down ------------
  // ------ Category sales report --------------
  useEffect(() => {
    if (AllCategoryData?.CategorySalesReportRecord) {
      setCategorySalesReport(AllCategoryData.CategorySalesReportRecord);
    } else {
      setCategorySalesReport([]);
    }
  }, [AllCategoryData?.CategorySalesReportRecord?.length]);
  // ------ Category sales report --------------
  //  drop down select drop down-------------
  const onDateRangeChange = async (Date) => {
    const newPacket = {
      category_id:
        selectedLCategoryType === "All"
          ? selectedLCategoryType.toLocaleLowerCase()
          : selectedLCategoryType,
      ...Date,
      ...data,
    };
    try {
      await dispatch(getCategorySalesSummeryData(newPacket)).unwrap();
    } catch (e) {}
  };
  //  drop down select drop down end---------
  const handleOptionClick = (option, dropdown) => {
    switch (dropdown) {
      case "category":
        if (option === "All") {
          setselectedLCategoryType("All");
        } else {
          const category_id = option.id;
          setselectedLCategoryType(option.title);
        }
        break;
      default:
        break;
    }
  };
  //  selected drop down ---------------
  //  listing category
  return {
    title,
    categoryAll,
    handleOptionClick,
    selectedLCategoryType,
    onDateRangeChange,
    getCategorySalesReport,
  };
}
