import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import {
  CategoryAllData,
  getCategorySalesSummeryData,
} from "../../../Redux/features/CategorySalesSummeryReport/categorySalesSummeryReportSlice";
import { SortTableItemsHelperFun } from "../../../helperFunctions/SortTableItemsHelperFun";
import PasswordShow from "../../../Common/passwordShow";

export default function CategorySalesSummeryReportLogic() {
  const dispatch = useDispatch();
  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();

  const AllCategoryData = useSelector(
    (state) => state?.categorySalesReportData
  );
  const {
    LoginGetDashBoardRecordJson,
    LoginAllStore,
    userTypeData,
    GetSessionLogin,
  } = useAuthDetails();
  const title = "Category Sales Summary Report";
  let merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;
  let data = { merchant_id, ...userTypeData };
  const [categoryAll, setCategoryAll] = useState([]);
  const [selectedLCategoryType, setselectedLCategoryType] = useState("All");
  const [selectedCategoryId, setSelectedCategoryId] = useState("All");
  const [getCategorySalesReport, setCategorySalesReport] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [TableLoader, setTableLoader] = useState("");
  const [totalCost, setTotalCost] = useState({
    unitsold: 0,
    totalSales: 0.0,
    totalCost: 0.0,
    // totalSelling: 0.0,
    // sellingPrice: 0.0,
    // profit: 0.0,
    // profitPercentage: 0.0,
  });
  const rowHeader = [
    "Name of Category",
    "Units Sold",
    "Totals Sales",
    "Total Cost",
  ];
  // const rowHeader = [
  //   {
  //     id: 1,
  //     title: "Name of Category",
  //   },
  //   {
  //     id: 2,
  //     title: "Units Sold",
  //   },
  //   {
  //     id: 3,
  //     title: "Totals Sales",
  //   },
  //   {
  //     id: 4,
  //     title: "Total Cost",
  //   },
  // ];

  //   listing category
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      await dispatch(CategoryAllData(data)).unwrap();
    } catch (error) {
      if (error.status == 401 ) {
        getUnAutherisedTokenMessage();
        handleCoockieExpire();
      } else if (error.status == "Network Error") {
        getNetworkError();
      }
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
    setTableLoader(AllCategoryData?.categoryloading);
    if (AllCategoryData?.CategorySalesReportRecord) {
      setCategorySalesReport(AllCategoryData.CategorySalesReportRecord);
      getDiscountRecord(AllCategoryData.CategorySalesReportRecord);
    } else {
      setCategorySalesReport([]);
    }
  }, [AllCategoryData?.categoryloading]);
  // ------ Category sales report --------------
  // -------category add totla data---------
  // const getDiscountRecord = (data) => {
  //   if (Array.isArray(data) && data.length > 0) {
  //     const { unitsold, totalSales, totalCost } = data.reduce(
  //       (acc, item) => {
  //         const unitsold = item?.total_sale_qty || 0;
  //         const totalSales =
  //           parseFloat(
  //             !!item?.total_sale_price ? item?.total_sale_price : 0.0
  //           ) || 0;
  //         // const totalCost = !!item?.variant_cpi
  //         //   ? parseFloat(item?.variant_cpi)
  //         //   : item?.variant_cpi == (null || undefined) && !!item?.product_cpi
  //         //     ? parseFloat(item?.product_cpi)
  //         //     : item?.variant_cpi == (null || undefined) &&
  //         //         item?.product_cpi == (null || undefined)
  //         //       ? 0.0
  //         //       : !!item?.variant_cpi && !!item?.product_cpi
  //         //         ? parseFloat(item?.variant_cpi)
  //         //         : 0.0;
  //         const totalCost =
  //           item?.total_sale_qty *
  //           parseFloat(item?.variant_cpi || item?.product_cpi || 0);
  //         // const TotalNewCost = totalCost * item?.total_sale_qty;
  //         return {
  //           unitsold: parseInt(acc.unitsold) + parseInt(unitsold),
  //           totalSales: parseFloat(acc.totalSales) + totalSales,
  //           totalCost: parseFloat(acc.totalCost) + totalCost,
  //           // profitTotal: acc.profitTotal + profit,
  //         };
  //       },
  //       { unitsold: 0, totalSales: 0 }
  //     );
  //     // const profitPercentage = (profitTotal / sellingTotal) * 100 || 0;
  //     console.log("unitsold", unitsold);
  //     console.log("totalSales", totalSales);
  //     console.log("total cost", totalCost);

  //     setTotalCost({
  //       unitsold: unitsold,
  //       totalSales: totalSales.toFixed(2),
  //       // totalSelling: sellingTotal.toFixed(2),
  //       // profit: profitTotal.toFixed(2),
  //       // profitPercentage: profitPercentage.toFixed(2),
  //     });
  //   } else {
  //     console.log("No report data available");
  //   }
  // };
  const getDiscountRecord = (data) => {
    if (Array.isArray(data) && data.length > 0) {
      const { unitsold, totalSales, totalCost } = data.reduce(
        (acc, item) => {
          const unitsold = item?.total_sale_qty || 0;
          const totalSales = parseFloat(item?.total_sale_price || 0);
          const totalCost =
            item?.total_sale_qty *
            parseFloat(item?.variant_cpi || item?.product_cpi || 0);

          return {
            unitsold: parseInt(acc.unitsold) + parseInt(unitsold),
            totalSales: parseFloat(acc.totalSales) + totalSales,
            totalCost: parseFloat(acc.totalCost) + totalCost,
          };
        },
        { unitsold: 0, totalSales: 0, totalCost: 0 } // Initial values including totalCost
      );

      console.log("unitsold", unitsold);
      console.log("totalSales", totalSales);
      console.log("totalCost", totalCost);

      setTotalCost({
        unitsold: unitsold,
        totalSales: totalSales.toFixed(2),
        totalCost: totalCost.toFixed(2),
      });
    } else {
      console.log("No report data available");
    }
  };

  // -------category add total data-----

  // ----------sort function start---------------
  const sortByItemName = (type, name) => {
    const { sortedItems, newOrder, sortIcon } = SortTableItemsHelperFun(
      getCategorySalesReport,
      type,
      name,
      sortOrder
    );
    setCategorySalesReport(sortedItems);
    setSortOrder(newOrder);
  };

  // ----------sort function end-----------------
  //  drop down select drop down-------------
  const onDateRangeChange = async (Date) => {
    const newPacket = {
      category_id:
        selectedCategoryId === "All"
          ? selectedCategoryId.toLocaleLowerCase()
          : selectedCategoryId,
      ...Date,
      ...data,
    };
    try {
      await dispatch(getCategorySalesSummeryData(newPacket)).unwrap();
    } catch (e) {
      if (e.status == 401) {
        getUnAutherisedTokenMessage();
        handleCoockieExpire();
      }
    }
  };
  //  drop down select drop down end---------
  const handleOptionClick = (option, dropdown) => {
    console.log(option);
    switch (dropdown) {
      case "category":
        if (option === "All") {
          setselectedLCategoryType("All");
          setSelectedCategoryId("All");
        } else {
          const category_id = option.id;
          setselectedLCategoryType(option.title);
          setSelectedCategoryId(category_id);
          // setselectedLCategoryType(option.title);
        }
        break;
      default:
        break;
    }
  };
  //  selected drop down ---------------
  //  listing category
  // sort table start---------------
  // sort table end-----------------
  return {
    title,
    categoryAll,
    handleOptionClick,
    selectedLCategoryType,
    onDateRangeChange,
    getCategorySalesReport,
    sortByItemName,
    totalCost,
    rowHeader,
    TableLoader,
  };
}
