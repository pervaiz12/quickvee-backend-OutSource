import React, { useState, useEffect } from "react";
import { useAuthDetails } from "../../Common/cookiesHelper";
import { useSelector, useDispatch } from "react-redux";
import { fetchBrandData } from "../../Redux/features/Brand/brandsSlice";
import { ToastifyAlert } from "../../CommonComponents/ToastifyAlert";
import PasswordShow from "../../Common/passwordShow";
import axios from "axios";

import {
  BASE_URL,
  ADD_NEW_BRANDS_DATA,
  UPDATE_BRANDS_DATA,
  DELETE_BRAND_DATA,
} from "../../Constants/Config";

export default function TagLogic() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const { LoginGetDashBoardRecordJson, userTypeData } = useAuthDetails();
  const { handleCoockieExpire, getUnAutherisedTokenMessage } = PasswordShow();

  const getBrandListSlice = useSelector((state) => state?.brandData);
  const [getTagList, setGetTagList] = useState([]);
  const [filterSearchData, setFilterSearch] = useState([]);
  const [controltext, setControlText] = useState(false);
  const [tagText, setTagText] = useState({ Tag: "", id: "" });
  const [errors, setErrors] = useState({ tagError: "" });
  const [checkTagExist, setCheckTagExist] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteTableId] = useState("");
  const [searchRecord, setSearchRecord] = useState("");
  const [loader, setLoader] = useState(false);
  const [tableLoader, setTableLoader] = useState(false);
  const [skeletonLoader, setSkeltonLoader] = useState("");

  let merchant_id =
    !!LoginGetDashBoardRecordJson?.data?.merchant_id ||
    LoginGetDashBoardRecordJson?.data?.merchant_id !== "no_id"
      ? LoginGetDashBoardRecordJson?.data?.merchant_id
      : "";

  let data = { merchant_id, type: 0, ...userTypeData };
  const rowSkaleton = ["Tag", "", ""];
  const rowHeader = [
    {
      id: 1,
      title: "Tag",
    },
    {
      id: 2,
      title: "",
    },
    {
      id: 3,
      title: "",
    },
  ];
  // =========================
  useEffect(() => {
    getBrandData();
  }, []);
  useEffect(() => {
    setSkeltonLoader(getBrandListSlice?.loading);
    if (
      !getBrandListSlice?.loading &&
      !!getBrandListSlice?.BrandsData &&
      getBrandListSlice?.BrandsData.length > 0
    ) {
      setGetTagList(getBrandListSlice?.BrandsData);
      setFilterSearch(getBrandListSlice?.BrandsData);
    } else {
      setGetTagList([]);
      setFilterSearch([]);
    }
  }, [getBrandListSlice?.loading]);

  const getBrandData = async () => {
    try {
      await dispatch(fetchBrandData(data)).unwrap();
    } catch (error) {
      if (error?.status == 401) {
        getUnAutherisedTokenMessage();
        handleCoockieExpire();
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === ",") {
      event.preventDefault();
    }
  };
  // =========================

  const openModal = () => {
    setControlText(false);
    setShowModal(true);
  };
  const handleClose = () => {
    setControlText(false);
    setShowModal(false);
    setErrors({ tagError: "" });
    setTagText({ Tag: "", id: "" });
    setCheckTagExist("");
    // setSearchRecord("");
  };
  const handlePaste = (e) => {
    e.preventDefault();
  };
  // ===========onchange function ===============
  const onChangeGetData = (e) => {
    const { name, value } = e.target;
    let errorData = { ...errors };
    if (name.toLowerCase() === "tag") {
      errorData.tagError = value.trim() == "" ? "Tag is required" : "";
    }
    setErrors(errorData);
    setTagText((prev) => ({
      ...prev,
      [name]: value.replace(/^\s+/, ""),
    }));
  };
  // ===========onchange function ===============
  const handleGetEditData = (id) => {
    let brandtest = getBrandListSlice?.BrandsData?.find(
      (item) => item.id === id
    );
    if (brandtest) {
      setTagText((prev) => ({
        ...prev,
        Tag: brandtest?.title,
        id: brandtest?.id,
      }));
      setCheckTagExist(brandtest?.title);
      setControlText(true);
      setShowModal(true);
    }
  };

  const checkExistingBrand = (brand) => {
    let error = true;
    let brandtest = getBrandListSlice?.BrandsData?.find(
      (item) => item.title.toLowerCase() === brand.toLowerCase()
    );
    if (brandtest) {
      if (
        checkTagExist !== "" &&
        checkTagExist.toLowerCase() !== brandtest?.title?.toLowerCase()
      ) {
        error = false;
        setErrors((prev) => ({
          ...prev,
          tagError: "Tag already exists",
        }));
      } else if (brandtest && checkTagExist == "") {
        error = false;
        setErrors((prev) => ({
          ...prev,
          tagError: "Tag already exists",
        }));
      }
    } else {
      error = true;
      setErrors((prev) => ({
        ...prev,
        tagError: "",
      }));
    }
    if (error) {
      return true;
    } else {
      return false;
    }
  };
  // =========== delete Tag start =================
  // ==========delete brand=========
  const handleDeleteMerchant = async (tableData) => {
    setDeleteTableId(tableData);
    setDeleteModalOpen(true);
  };
  const handleDeleteTag = async () => {
    setDeleteModalOpen(false);
    let brandtest = getBrandListSlice?.BrandsData?.find(
      (item) => item.id === deleteId
    );
    const { token, ...newData } = data;
    const packet = { id: deleteId, ...newData, title: brandtest?.title };
    setTableLoader(true);
    try {
      let response = await axios.post(BASE_URL + DELETE_BRAND_DATA, packet, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response?.data?.status == true) {
        ToastifyAlert("Deleted Successfully", "success");
        setDeleteModalOpen(false);
        setDeleteTableId("");
        getBrandData();
      }
    } catch (e) {
      console.log(e);
    }
    setTableLoader(false);
  };
  // ==========detete brand=========
  // =========== delete Tag end   =================
  // =========== validation start =================
  function Currentvalidate(errors) {
    if (errors.tagError == "") {
      return true;
    } else {
      return false;
    }
  }
  const validateData = () => {
    let formIsValid = true;
    let newError = { ...errors };
    if (tagText.Tag == "") {
      newError.tagError = "Tag is required";
      formIsValid = false;
    }
    setErrors(newError);
    if (formIsValid) {
      return true;
    } else {
      return false;
    }
  };
  // ====search=========
  const handleSearchInputChange = (value) => {
    setSearchRecord(value);
    let data = filterSearchData.filter((brand) =>
      brand?.title.toLowerCase().includes(value.toLowerCase())
    );
    setGetTagList(data);
  };
  // ===========
  // ==============================================
  // ============    submit add data===============
  const handleSubmitAddData = async (e) => {
    e.preventDefault();
    let isValidate = validateData();
    let currentValidate = Currentvalidate(errors);
    if (isValidate) {
      if (currentValidate) {
        let isExistingBrand = checkExistingBrand(tagText?.Tag.trim());
        if (isExistingBrand) {
          const { token, ...newData } = data;
          try {
            setLoader(true);
            const packet = { title: tagText?.Tag.trim(), ...newData };
            let response = await axios.post(
              BASE_URL + ADD_NEW_BRANDS_DATA,
              packet,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (response?.data?.status == true) {
              setShowModal(false);
              ToastifyAlert("Added Successfully", "success");
              setErrors({ tagError: "" });
              setTagText({ Tag: "", id: "" });
              setControlText(false);
              setCheckTagExist("");
              setSearchRecord("");
              getBrandData();
            }
          } catch (error) {}
        }
      }
    }
    setLoader(false);
  };
  // ==============================================
  // ============ update submit data ==============
  const handleSubmitUpdateData = async (e) => {
    e.preventDefault();
    let isValidate = validateData();
    let currentValidate = Currentvalidate(errors);
    if (isValidate) {
      if (currentValidate) {
        let isExistingBrand = checkExistingBrand(tagText?.Tag.trim());
        if (isExistingBrand) {
          console.log("update hello");

          try {
            setLoader(true);
            const { token, ...newData } = data;
            const packet = {
              title: tagText?.Tag.trim(),
              ...newData,
              id: tagText?.id,
              old_title: checkTagExist,
            };
            let response = await axios.post(
              BASE_URL + UPDATE_BRANDS_DATA,
              packet,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (response?.data?.status == true) {
              ToastifyAlert("Update Successfully", "success");
              setErrors({ tagError: "" });
              setTagText({ Tag: "", id: "" });
              setControlText(false);
              setCheckTagExist("");
              setSearchRecord("");
              setShowModal(false);
              getBrandData();
            }
          } catch (e) {}
        }
      }
    }
    setLoader(false);
  };

  // =============================================
  return {
    openModal,
    showModal,
    handleClose,
    rowHeader,
    getTagList,
    handleGetEditData,
    controltext,
    handlePaste,
    onChangeGetData,
    tagText,
    errors,
    handleKeyPress,
    handleSubmitAddData,
    handleSubmitUpdateData,
    handleDeleteTag,
    handleDeleteMerchant,
    deleteModalOpen,
    setDeleteModalOpen,
    handleSearchInputChange,
    searchRecord,
    loader,
    tableLoader,
    deleteId,
    rowSkaleton,
    skeletonLoader,
  };
}
