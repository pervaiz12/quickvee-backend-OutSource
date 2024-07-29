import React, { useEffect, useState } from "react";
import { useAuthDetails } from "../../Common/cookiesHelper";
import { useSelector, useDispatch } from "react-redux";
import { fetchBrandData } from "../../Redux/features/Brand/brandsSlice";
import PasswordShow from "../../Common/passwordShow";
import {
  BASE_URL,
  ADD_NEW_BRANDS_DATA,
  UPDATE_BRANDS_DATA,
  DELETE_BRAND_DATA,
} from "../../Constants/Config";
import { ToastifyAlert } from "../../CommonComponents/ToastifyAlert";
import axios from "axios";
export default function BrandLogic() {
  const dispatch = useDispatch();
  const { LoginGetDashBoardRecordJson, userTypeData } = useAuthDetails();
  const { handleCoockieExpire, getUnAutherisedTokenMessage } = PasswordShow();
  const getBrandListSlice = useSelector((state) => state?.brandData);
  const [showModal, setShowModal] = useState(false);
  const [controltext, setControlText] = useState(false);
  const [brandText, setBrandText] = useState({ brand: "", id: "" });
  const [errors, setErrors] = useState({ brandError: "" });
  const [getBrandList, setBrandList] = useState([]);
  const [filterSearchData, setFilterSearch] = useState([]);

  const [checkBrandExist, setCheckBrandExist] = useState("");
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

  let data = { merchant_id, type: 1, ...userTypeData };
  const rowSkaleton = ["Brand", "", ""];

  const rowHeader = [
    {
      id: 1,
      title: "Brand",
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
      setBrandList(getBrandListSlice?.BrandsData);
      setFilterSearch(getBrandListSlice?.BrandsData);
    } else {
      setBrandList([]);
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
  const checkExistingBrand = (brand) => {
    let error = true;
    let brandtest = getBrandListSlice?.BrandsData?.find(
      (item) => item.title.toLowerCase() === brand.toLowerCase()
    );
    if (brandtest) {
      // console.log("helloo")
      if (
        checkBrandExist !== "" &&
        checkBrandExist.toLowerCase() !== brandtest?.title?.toLowerCase()
      ) {
        error = false;
        setErrors((prev) => ({
          ...prev,
          brandError: "Brand already exists",
        }));
      } else if (brandtest && checkBrandExist == "") {
        error = false;
        setErrors((prev) => ({
          ...prev,
          brandError: "Brand already exists",
        }));
      }
    } else {
      error = true;
      setErrors((prev) => ({
        ...prev,
        brandError: "",
      }));
    }
    if (error) {
      return true;
    } else {
      return false;
    }
  };
  const openModal = () => {
    setControlText(false);
    setShowModal(true);
  };
  const handleClose = () => {
    setControlText(false);
    setShowModal(false);
    setErrors({ brandError: "" });
    setBrandText({ brand: "", id: "" });
    setCheckBrandExist("");
  };
  // ==========update=============
  const handleGetEditData = (id) => {
    console.log(id);
    let brandtest = getBrandListSlice?.BrandsData?.find(
      (item) => item.id === id
    );
    if (brandtest) {
      setBrandText((prev) => ({
        ...prev,
        brand: brandtest?.title,
        id: brandtest?.id,
      }));
      setCheckBrandExist(brandtest?.title);
      setControlText(true);
      setShowModal(true);
    }
  };
  // ==========update end===========
  // ==========delete brand=========
  const handleDeleteMerchant = async (tableData) => {
    setDeleteTableId(tableData);
    setDeleteModalOpen(true);
  };
  const handleDeleteBrand = async () => {
    setDeleteModalOpen(false);
    let brandtest = getBrandListSlice?.BrandsData?.find(
      (item) => item.id === deleteId
    );
    const { token, ...newData } = data;
    const packet = { id: deleteId, ...newData, title: brandtest?.title };
    console.log(packet);
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

  const handleKeyPress = (event) => {
    if (event.key === ",") {
      event.preventDefault();
    }
  };
  const onChangeGetData = (e) => {
    const { name, value } = e.target;
    let errorData = { ...errors };
    if (name.toLowerCase() === "brand") {
      errorData.brandError = value.trim() == "" ? "Brand is required" : "";
    }
    setErrors(errorData);
    setBrandText((prev) => ({
      ...prev,
      [name]: value.replace(/^\s+/, ""),
    }));
  };

  // ====search=========
  const handleSearchInputChange = (value) => {
    setSearchRecord(value);
    let data = filterSearchData.filter((brand) =>
      brand?.title.toLowerCase().includes(value.toLowerCase())
    );
    setBrandList(data);
  };
  // ===========

  function Currentvalidate(errors) {
    if (errors.brandError == "") {
      return true;
    } else {
      return false;
    }
  }

  const validateData = () => {
    let formIsValid = true;
    let newError = { ...errors };
    if (brandText.brand == "") {
      newError.brandError = "Brand is required";
      formIsValid = false;
    }
    setErrors(newError);
    if (formIsValid) {
      return true;
    } else {
      return false;
    }
  };
  const handleSubmitAddData = async (e) => {
    e.preventDefault();
    let isValidate = validateData();
    let currentValidate = Currentvalidate(errors);
    if (isValidate) {
      if (currentValidate) {
        let isExistingBrand = checkExistingBrand(brandText?.brand.trim());
        if (isExistingBrand) {
          console.log("hello addd");
          setLoader(true);
          const { token, ...newData } = data;
          try {
            const packet = { title: brandText?.brand.trim(), ...newData };
            console.log(packet);
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
            // console.log(response);
            if (response?.data?.status == true) {
              ToastifyAlert("Added Successfully", "success");
              setErrors({ brandError: "" });
              setBrandText({ brand: "", id: "" });
              setControlText(false);
              setCheckBrandExist("");
              setSearchRecord("");
              setShowModal(false);
              getBrandData();
            }
          } catch (error) {}
        }
      }
    }
    setLoader(false);
  };

  const handleSubmitUpdateData = async (e) => {
    e.preventDefault();
    let isValidate = validateData();
    let currentValidate = Currentvalidate(errors);
    if (isValidate) {
      if (currentValidate) {
        let isExistingBrand = checkExistingBrand(brandText?.brand.trim());
        if (isExistingBrand) {
          setLoader(true);
          try {
            const { token, ...newData } = data;
            const packet = {
              title: brandText?.brand.trim(),
              ...newData,
              id: brandText?.id,
              old_title: checkBrandExist,
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
              setErrors({ brandError: "" });
              setBrandText({ brand: "", id: "" });
              setControlText(false);
              setCheckBrandExist("");
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
  const handlePaste = (e) => {
    e.preventDefault();
  };
  return {
    openModal,
    setShowModal,
    showModal,
    handleClose,
    handleGetEditData,
    controltext,
    rowHeader,
    handleKeyPress,
    onChangeGetData,
    errors,
    brandText,
    handleSubmitAddData,
    handleSubmitUpdateData,
    handlePaste,
    getBrandList,
    handleDeleteBrand,
    setDeleteModalOpen,
    deleteModalOpen,
    handleDeleteMerchant,
    handleSearchInputChange,
    searchRecord,
    loader,
    deleteId,
    tableLoader,
    skeletonLoader,
    rowSkaleton,
  };
}
