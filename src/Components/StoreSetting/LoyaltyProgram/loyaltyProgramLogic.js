import React, { useEffect, useState } from "react";

import { fetchloyaltyProgramStore } from "../../../Redux/features/LoyaltyProgramStore/loyaltyProgramStoreSlice";
import { useSelector, useDispatch } from "react-redux";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import PasswordShow from "../../../Common/passwordShow";
import CurrencyInputHelperFun from "../../../helperFunctions/CurrencyInputHelperFun";
import dayjs from "dayjs";
import axios from "axios";

import {
  SAVE_LOYALITY_PROGRAM,
  BASE_URL,
  ADD_LOYALITY_PROGRAM,
} from "../../../Constants/Config";
import { ToastifyAlert } from "../../../CommonComponents/ToastifyAlert";

export default function LoyaltyProgramLogic() {
  const { LoginGetDashBoardRecordJson, userTypeData } = useAuthDetails();
  const { handleCoockieExpire, getUnAutherisedTokenMessage, getNetworkError } =
    PasswordShow();
  const [loyaltyProgramList, setLoyaltyProgramList] = useState([]);
  const LoyaltyProgramStateData = useSelector(
    (state) => state?.LoyaltyProgramStoreData
  );
  // ===========================listing stage=================================
  const [inventorySwitch, setInventorySwitch] = useState(false);
  const [InventorAwardedPoints, setInventoryAwardedPoints] = useState({
    CurrentDollarSpent: "",
    DollarSpent: "",
    RedemptionValue: "",
    MinRedemption: "",
  });
  const [SwitchList, setSwitchList] = useState([]);
  const [enabledSwitchId, setEnabledSwitchId] = useState([]);
  const [merchantIds, setMerchantIds] = useState("");
  const [adminIds, setAdminIds] = useState("");
  const [errorMessageLoyality, setErrorMessageLoyality] = useState({
    pointAwardedError: "",
    PointRedemptionError: "",
    MinimumPointRedemptionError: "",
  });

  const [errors, setErrors] = useState({
    BonusPointError: "",
    BonusPointAwardError: "",
    startDateError: "",
    EndDateError: "",
  });

  // ----------------- add loyality program -------------setEnabledPromotionalId(!enabledPromotionalId)
  const [enabledPromotionalId, setEnabledPromotionalId] = useState(false);
  const [addPrmotionName, setPromotionName] = useState({
    promotionName: "",
    DollarSpent: "",
  });
  const [dateValid, setDateValid] = useState({
    startDate: null,
    endDate: null,
  });
  const [loader, setLoader] = useState(false);
  const [loaderSave, setLoaderSave] = useState(false);
  const [dataLoadingApi, setDataLoading] = useState(true);
  // console.log("dataLoadingApi", dataLoadingApi);

  // ----------------- add loyality program ------------- setIds
  // ---------------- edit loyal-------------------------
  const [ids, setIds] = useState("");
  const [updateChecked, setUpdateChecked] = useState(false);
  const [updateBonusTest, setUpdateBonusTest] = useState("");
  // ---------------- edit loyality----------------------
  // ---------------- delete loyality--------------------
  const [deleteTableId, setDeleteTableId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  // ---------------- delete loyality--------------------

  // =========================listing stage end ===================
  // console.log("switchList",SwitchList)

  // =========== date format =======================
  // =========== end date format ===================

  useEffect(() => {
    setDataLoading(LoyaltyProgramStateData?.loading);
    if (
      !LoyaltyProgramStateData?.loading &&
      LoyaltyProgramStateData?.loyaltyProgramStore
    ) {
      setLoyaltyProgramList(LoyaltyProgramStateData?.loyaltyProgramStore);
      setSwitchList(
        LoyaltyProgramStateData?.loyaltyProgramStore?.promotion_array
      );

      // ------------------------
    } else {
      setLoyaltyProgramList([]);
      setSwitchList([]);
    }
  }, [LoyaltyProgramStateData]);

  const dispatch = useDispatch();
  const [openAddModel, setAddModel] = useState(false);
  let merchantId = !!LoginGetDashBoardRecordJson?.data?.merchant_id
    ? LoginGetDashBoardRecordJson?.data?.merchant_id
    : // LoginGetDashBoardRecordJson?.data?.merchant_id
      "";
  let tokenId = !!LoginGetDashBoardRecordJson?.token_id
    ? LoginGetDashBoardRecordJson?.token_id
    : "";
  let tokenType = !!LoginGetDashBoardRecordJson?.login_type
    ? LoginGetDashBoardRecordJson?.login_type
    : "";
  let token = !!LoginGetDashBoardRecordJson?.token
    ? LoginGetDashBoardRecordJson?.token
    : "";

  const dataNew = { merchantId, tokenId, tokenType, token };
  useEffect(() => {
    getLoyaltyProgramStoreData(dataNew);
  }, []);

  const getLoyaltyProgramStoreData = async (data) => {
    try {
      let result = await dispatch(fetchloyaltyProgramStore(data)).unwrap();
      // console.log("result", result);
      if (!!result) {
        setInventorySwitch(result?.enable_loyalty == "1" ? true : false);
        // -------------------------------------
        setMerchantIds(!!result?.merchant_id ? result?.merchant_id : "");
        setAdminIds(!!result?.admin_id ? result?.admin_id : "");

        const currentPointAwarder = !!result?.points_per_dollar
          ? result?.points_per_dollar
          : "";
        let currentPointFloat = !!currentPointAwarder
          ? parseFloat(currentPointAwarder)
          : "";
        const activePromotions = result?.promotion_array?.filter(
          (promotion) => promotion.enable_promotion === true
        );
        const totalBonusPoints = activePromotions?.reduce((acc, promotion) => {
          return acc + parseFloat(promotion.bonus_points);
        }, 0);
        const totalPointsPerDollar = currentPointFloat + totalBonusPoints;
        // =====================================
        setInventoryAwardedPoints({
          CurrentDollarSpent: !!totalPointsPerDollar
            ? totalPointsPerDollar
            : "",
          DollarSpent: !!result?.points_per_dollar
            ? result?.points_per_dollar
            : "",
          RedemptionValue: !!result?.redemption_value
            ? result?.redemption_value
            : "",
          MinRedemption: !!result?.min_points_redemption
            ? result?.min_points_redemption
            : "",
        });
        // ======================= get All switch start here-------
        const enabledPromotionIds = !!result?.promotion_array
          ? result?.promotion_array
              .filter((promotion) => promotion.enable_promotion === true)
              .map((promotion) => promotion.promotion_id)
          : "";
        setEnabledSwitchId(enabledPromotionIds);

        // ======================= get All switch end here--------
      } else {
        setInventorySwitch(false);
        setInventoryAwardedPoints({
          CurrentDollarSpent: "",
          DollarSpent: "",
          RedemptionValue: "",
          MinRedemption: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleModalOpen = () => {
    setAddModel(true);
  };
  const handleCloseAddModal = () => {
    setAddModel(false);
    setUpdateChecked(false);
    setIds("");
    setUpdateBonusTest("");
    setDateValid({
      startDate: null,
      endDate: null,
    });
    setPromotionName({
      promotionName: "",
      DollarSpent: "",
    });
    setErrors({
      BonusPointError: "",
      BonusPointAwardError: "",
      startDateError: "",
      EndDateError: "",
    });
  };

  const handleCheckedSwitch = ({ target: { name, checked } }) => {
    checked ? setInventorySwitch(true) : setInventorySwitch(false);
  };
  const handleDollarValue = ({ target: { name, value } }) => {
    const numericValue = value.replace(/\D/g, "");
    const formattedValue = CurrencyInputHelperFun(numericValue);
    if (name == "DollarSpent") {
      setInventoryAwardedPoints((prev) => ({
        ...prev,
        DollarSpent: formattedValue,
      }));
    }
    if (name == "RedemptionValue") {
      setInventoryAwardedPoints((prev) => ({
        ...prev,
        RedemptionValue: formattedValue,
      }));
    }
    if (name == "MinRedemption") {
      setInventoryAwardedPoints((prev) => ({
        ...prev,
        MinRedemption: formattedValue,
      }));
    }
  };

  // ------------------------------------------
  const canTogglePromotion = (promotion, currentDate) => {
    const endDate = dayjs(promotion.end_date);

    // Check if the promotion has expired
    if (currentDate.isAfter(endDate) && !currentDate.isSame(endDate, "day")) {
      if (promotion.enable_promotion === false) {
        alert("This promotion has expired and cannot be enabled.");
        return false; // Do not allow enabling the expired promotion
      }
    }

    return true; // Allow toggling if not expired or disabling
  };

  // -------------- get All switch on api data--------
  const getAllSwichOnData = (promotionId) => {
    const updatedPromotionIds = () => {
      const idSet = new Set(enabledSwitchId);

      if (idSet.has(promotionId)) {
        idSet.delete(promotionId);
      } else {
        idSet.add(promotionId);
      }
      return Array.from(idSet);
    };

    setEnabledSwitchId(updatedPromotionIds);
  };

  // -------------- get All switch on api data--------

  const handleChangeSwitch = (promotionId) => {
    const currentDate = dayjs();

    const updatedList = SwitchList.map((promotion) => {
      if (promotion.promotion_id === promotionId) {
        if (!canTogglePromotion(promotion, currentDate)) {
          return promotion;
        }
        getAllSwichOnData(promotionId);
        // =========
        // const enabledPromotionIds = SwitchList.filter(
        //   (promotion) => promotion.enable_promotion === true
        // ).map((promotion) => promotion.promotion_id);

        // const updatedPromotionIds = (() => {
        //   const idSet = new Set(enabledPromotionIds);

        //   if (idSet.has(promotionId)) {
        //     idSet.delete(promotionId);
        //   } else {
        //     idSet.add(promotionId);
        //   }

        //   return Array.from(idSet);
        // })();

        // setEnabledSwitchId(updatedPromotionIds);
        return { ...promotion, enable_promotion: !promotion.enable_promotion };
      }
      return promotion;
    });
    setSwitchList(updatedList);
  };

  // ------------------------------------------
  // --------------------------------- save data----------------enable_loyalty-------
  // ----------------------------check existing loyalty program data----------

  // ----------------------------check existing loyalty program data end -----
  const validateError = () => {
    let errorMessage = { ...errorMessageLoyality };
    let isError = false;
    if (InventorAwardedPoints?.DollarSpent == "") {
      errorMessage.pointAwardedError = "Points Awarded is required";
      isError = true;
    }
    if (InventorAwardedPoints?.RedemptionValue == "") {
      errorMessage.PointRedemptionError = "Point Redemption is required";
      isError = true;
    }
    if (InventorAwardedPoints?.MinRedemption == "") {
      errorMessage.MinimumPointRedemptionError =
        "MinimumPointRedemption is required";
      isError = true;
    }
    setErrorMessageLoyality(errorMessage);
    if (isError) {
      return false;
    } else {
      return true;
    }
  };
  const handleSaveData = async (e) => {
    e.preventDefault();
    let iserror = validateError();
    if (iserror) {
      const data = {
        merchant_id: merchantIds,
        admin_id: adminIds,
        enable_loyalty: inventorySwitch ? "1" : "0",
        current_points: InventorAwardedPoints?.CurrentDollarSpent,
        points_per_dollar: InventorAwardedPoints?.DollarSpent,
        redemption_value: InventorAwardedPoints?.RedemptionValue,
        min_points_redemption: InventorAwardedPoints?.MinRedemption,
        enable_promotion_id: enabledSwitchId.join(","),
        token_id: tokenId,
        login_type: tokenType,
      };
      setLoaderSave(true);
      let response = await axios.post(BASE_URL + SAVE_LOYALITY_PROGRAM, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setLoaderSave(false);

      if (response?.data?.status == true) {
        ToastifyAlert("Updated Successfully", "success");
        setErrorMessageLoyality({
          pointAwardedError: "",
          PointRedemptionError: "",
          MinimumPointRedemptionError: "",
        });
        setErrorMessageLoyality({
          pointAwardedError: "",
          PointRedemptionError: "",
          MinimumPointRedemptionError: "",
        });
        setSwitchList([]);
        setEnabledSwitchId([]);
        getLoyaltyProgramStoreData(dataNew);
      }
    }
  };

  // --------------------------------- Add loyality program----------------====================
  const checkErrorMessage = (errors) => {
    // console.log("errors", errors);
    if (
      errors.BonusPointAwardError == "" &&
      errors.BonusPointError == "" &&
      errors.EndDateError == "" &&
      errors.startDateError == ""
    ) {
      return true;
    } else {
      return false;
    }
  };
  const isValidError = () => {
    let isError = { ...errors };
    let isErrorCheck = false;
    const start = new Date(dateValid.startDate);
    const end = new Date(dateValid?.endDate);
    if (addPrmotionName.promotionName == "") {
      isError.BonusPointError = "PromotionName is required";
      isErrorCheck = true;
    }
    if (addPrmotionName?.DollarSpent == "") {
      isError.BonusPointAwardError = "DollarSpent is required";
      isErrorCheck = true;
    }
    if (dateValid.startDate == null) {
      isError.startDateError = "Start Date is required";
      isErrorCheck = true;
    }
    if (dateValid?.endDate == null) {
      isError.EndDateError = "End Date is required";
      isErrorCheck = true;
    }
    if (start > end) {
      isError.EndDateError =
        "End Date should be equal or greater than Start Date";
      isErrorCheck = true;
    }
    setErrors(isError);
    if (isErrorCheck) {
      return false;
    } else {
      return true;
    }
  };
  const handleCheckedProEnabledSwitch = () => {
    setEnabledPromotionalId(!enabledPromotionalId);
  };
  // console.log("enabledPromotionalId", enabledPromotionalId);

  const onChangeAddLoyality = ({ target: { name, value } }) => {
    const numericValue = value.replace(/\D/g, "");
    let errorData = { ...errors };
    const formattedValue = CurrencyInputHelperFun(numericValue);
    if (name == "DollarSpent") {
      errorData.BonusPointAwardError =
        formattedValue == "" ? "DollarSpent is required" : "";
      setPromotionName((prev) => ({
        ...prev,
        DollarSpent: formattedValue,
      }));
    }
    if (name == "promotionName") {
      errorData.BonusPointError =
        value.trim() == "" ? "PromotionName is required" : "";
      setPromotionName((prev) => ({
        ...prev,
        promotionName: value,
      }));
    }
    setErrors(errorData);
  };

  const onChangeStartDate = (date) => {
    let errorData = { ...errors };
    const currentDate = dayjs();
    const selectedDate = dayjs(date);

    if (selectedDate.isBefore(currentDate, "day")) {
      errorData.startDateError = "Invalid Start Date";
    } else {
      const dateFormat = selectedDate.format("YYYY-MM-DD");

      if (!selectedDate.isValid() || dateFormat === "Invalid Date") {
        errorData.startDateError = "Start Date is required or Invalid";
      } else {
        errorData.startDateError = "";
      }

      setDateValid((prev) => ({
        ...prev,
        startDate: dateFormat,
      }));
    }
    setErrors(errorData);
  };

  const onChangeEndDate = (date) => {
    console.log(date);
    let errorData = { ...errors };
    const currentDate = dayjs();
    const selectedDate = dayjs(date);
    if (selectedDate.isBefore(currentDate, "day")) {
      errorData.EndDateError = "Invalid End Date";
    } else {
      const dateFormat = selectedDate.format("YYYY-MM-DD");
      if (!selectedDate.isValid() || dateFormat === "Invalid Date") {
        errorData.EndDateError = "End Date is required or Invalid";
      } else {
        errorData.EndDateError = "";
      }
      setDateValid((prev) => ({
        ...prev,
        endDate: dateFormat,
      }));
    }
    setErrors(errorData);
  };
  // --------------- existing promotional name---------
  const checkExistingPromotionalName = (promotionalName) => {
    const brandtest = SwitchList.find(
      (item) =>
        item?.promotion_name?.toLowerCase() === promotionalName.toLowerCase()
    );
    let isValidate = false;
    if (brandtest) {
      if (
        updateChecked &&
        updateBonusTest.toLocaleLowerCase() ===
          promotionalName.toLocaleLowerCase()
      ) {
        setErrors((prev) => ({
          ...prev,
          BonusPointError: "",
        }));

        isValidate = false;
      } else {
        setErrors((prev) => ({
          ...prev,
          BonusPointError: "PromotionName is exists",
        }));

        isValidate = true;
      }
    } else {
      setErrors((prev) => ({
        ...prev,
        BonusPointError: "",
      }));
      isValidate = false;
    }
    if (isValidate) {
      return true;
    } else {
      return false;
    }

    // return !!brandtest;
  };
  // --------------- existing promotional name---------
  const handleSubmitAddLoyalty = async (e) => {
    e.preventDefault();
    let isError = isValidError();
    let checkErrorMessageValidate = checkErrorMessage(errors);
    if (isError) {
      if (checkErrorMessageValidate) {
        let checkExiPromotional = checkExistingPromotionalName(
          addPrmotionName?.promotionName.trim()
        );
        if (!checkExiPromotional) {
          setLoader(true);
          let data = {
            merchant_id: merchantIds,
            admin_id: adminIds,
            enable_promotion: enabledPromotionalId ? "1" : "0",
            start_date: dateValid?.startDate,
            end_date: dateValid?.endDate,
            current_points: InventorAwardedPoints?.CurrentDollarSpent,
            promotion_name: addPrmotionName?.promotionName?.trim(),
            bonus_points: addPrmotionName?.DollarSpent,
            token_id: tokenId,
            login_type: tokenType,
          };
          let response = await axios.post(
            BASE_URL + ADD_LOYALITY_PROGRAM,
            data,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setLoader(false);
          if (response?.data?.status == true) {
            ToastifyAlert("Added Successfully", "success");

            setErrors({
              BonusPointError: "",
              BonusPointAwardError: "",
              startDateError: "",
              EndDateError: "",
            });
            setPromotionName({
              promotionName: "",
              DollarSpent: "",
            });
            setDateValid((prev) => ({
              ...prev,
              startDate: null,
              endDate: null,
            }));
            handleCloseAddModal();
            getLoyaltyProgramStoreData(dataNew);
          }
        }
      }
    }
  };
  // -------------------------------- Add loyality program -----========================
  // -------------------------------- Edit Loyality program-----------------------------
  const onClickEditIcon = (ids) => {
    if (ids) {
      const record = loyaltyProgramList?.promotion_array?.filter(
        (res) => res?.promotion_id === ids // Ensure matching type (if ids is a number)
      );
      setIds(record[0].promotion_id);

      setEnabledPromotionalId(record[0]?.enable_promotion);
      setPromotionName((prev) => ({
        ...prev,
        promotionName: record[0].promotion_name,
        DollarSpent: record[0].bonus_points,
      }));
      setUpdateBonusTest(record[0].promotion_name.trim());

      setDateValid((prev) => ({
        ...prev,
        startDate: record[0].start_date,
        endDate: record[0].end_date,
      }));
      setUpdateChecked(true);
      handleModalOpen();
    }
    // setIds
  };
  const handleUpdateLoyalty = async (e) => {
    e.preventDefault();
    let isError = isValidError();
    let checkErrorMessageValidate = checkErrorMessage(errors);
    if (isError) {
      if (checkErrorMessageValidate) {
        let checkExiPromotional = checkExistingPromotionalName(
          addPrmotionName?.promotionName.trim()
        );
        if (!checkExiPromotional) {
          setLoader(true);
          let data = {
            promotion_id: ids,
            merchant_id: merchantIds,
            admin_id: adminIds,
            enable_promotion: enabledPromotionalId ? "1" : "0",
            start_date: dateValid?.startDate,
            end_date: dateValid?.endDate,
            current_points: InventorAwardedPoints?.CurrentDollarSpent,
            promotion_name: addPrmotionName?.promotionName?.trim(),
            bonus_points: addPrmotionName?.DollarSpent,
            token_id: tokenId,
            login_type: tokenType,
          };
          let response = await axios.post(
            BASE_URL + ADD_LOYALITY_PROGRAM,
            data,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setLoader(false);
          if (response?.data?.status == true) {
            ToastifyAlert("Updated Successfully", "success");

            setErrors({
              BonusPointError: "",
              BonusPointAwardError: "",
              startDateError: "",
              EndDateError: "",
            });
            setPromotionName({
              promotionName: "",
              DollarSpent: "",
            });
            setDateValid((prev) => ({
              ...prev,
              startDate: null,
              endDate: null,
            }));
            handleCloseAddModal();
            getLoyaltyProgramStoreData(dataNew);
          }
        }
      }
    }
  };

  // -------------------------------- Edit Loyality program-----------------------------
  // ---------------------------------delete start here------------
  const handleDeleteLoyalty = async (tableData) => {
    console.log("tableData", tableData);
    // setDeleteTableId(tableData);
    // setDeleteModalOpen(true);
  };
  const confirmDeleteCategory = async () => {
    // if (deleteTableId) {
    //   try {
    //     const { token, ...otherUserData } = userTypeData;
    //     const delVendor = {
    //       merchant_id: deleteTableId.merchant_id,
    //       id: deleteTableId.id,
    //       ...otherUserData,
    //     };
    //     setDeleteModalOpen(false);
    //     setDeleteLoader(true);
    //     setDeletedId(deleteTableId.id);
    //     const response = await axios.post(
    //       BASE_URL + DELETE_SINGLE_STORE,
    //       delVendor,
    //       {
    //         headers: {
    //           "Content-Type": "multipart/form-data",
    //           Authorization: `Bearer ${token}`,
    //         },
    //       }
    //     );
    //     if (response) {
    //       setDeleteLoader(false);
    //       setDeletedId("");
    //       dispatch(getVerifiedMerchant(data_verified));
    //     } else {
    //       setDeleteLoader(false);
    //       setDeletedId("");
    //       console.error(response);
    //     }
    //   } catch (error) {
    //     if (error.status == 401 || error.response.status === 401) {
    //       getUnAutherisedTokenMessage();
    //       handleCoockieExpire();
    //     } else if (error.status == "Network Error") {
    //       getNetworkError();
    //     }
    //   }
    // }
    // setDeleteModalOpen(false);
    // setDeleteTableId(null);
  };

  // ---------------------------------delete end here -------------

  return {
    handleModalOpen,
    openAddModel,
    handleCloseAddModal,
    loyaltyProgramList,
    inventorySwitch,
    handleCheckedSwitch,
    InventorAwardedPoints,
    handleDollarValue,
    SwitchList,
    handleChangeSwitch,
    handleSaveData,
    onChangeAddLoyality,
    addPrmotionName,
    onChangeStartDate,
    onChangeEndDate,
    dateValid,
    handleSubmitAddLoyalty,
    errors,
    enabledPromotionalId,
    handleCheckedProEnabledSwitch,
    loader,
    errorMessageLoyality,
    loaderSave,
    dataLoadingApi,
    onClickEditIcon,
    updateChecked,
    handleUpdateLoyalty,
    handleDeleteLoyalty,
  };
}
