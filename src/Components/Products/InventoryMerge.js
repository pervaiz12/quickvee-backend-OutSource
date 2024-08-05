import React, { useEffect, useRef, useState } from "react";
import SwitchToBackButton from "../../reuseableComponents/SwitchToBackButton";
import SearchableDropdown from "../../CommonComponents/SearchableDropdown";
import CkEditorInput from "../../CommonComponents/CkEditorInput";
import CreatableDropdown from "../../CommonComponents/CreatableDropdown";
import {
  checkProductTitle,
  emptyProduct,
  fetchBrands,
  fetchCategoryList,
  fetchProductList,
  fetchTags,
  fetchTaxList,
  fetchVarientList,
  getInventorySetting,
  updateVariantMerging,
} from "../../Redux/features/Product/ProductSlice";
import { useDispatch } from "react-redux";
import { useAuthDetails } from "../../Common/cookiesHelper";
import UploadIMG from "../../Assests/Filter/imgupload.svg";
import CloseIcon from "../../Assests/Dashboard/cross.svg";
import { BASE_URL } from "../../Constants/Config";
import { ToastifyAlert } from "../../CommonComponents/ToastifyAlert";
import PasswordShow from "../../Common/passwordShow";
import Validation from "../../Constants/Validation";
import "../../Styles/ProductPage.css";
import { Box, CircularProgress, Grid } from "@mui/material";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import ProductSelection from "./ProductSelection";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const InventoryMerge = () => {
  const {
    userTypeData,
    LoginGetDashBoardRecordJson,
    GetSessionLogin,
    LoginAllStore,
  } = useAuthDetails();
  const { getUnAutherisedTokenMessage, handleCoockieExpire, getNetworkError } =
    PasswordShow();
  const { validatTitle } = Validation();
  const dispatch = useDispatch();
  let titleTimeoutId;
  const fileUploadRef = useRef();
  const animatedComponents = makeAnimated();
  const navigate = useNavigate();

  const dropDownStyle = {
    clearIndicator: (provided) => ({
      ...provided,
      display: "none",
    }),
    indicatorSeparator: (provided, state) => ({
      ...provided,
      display: "none",
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: "#000", // Change this to your desired color
      fontWeight: "500", // Change this to your desired font weight
      fontSize: "15px", // Change this to your desired font size
      // Add more CSS properties as needed
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: "#fff", // Change the background color of selected item
      color: "#000", // Change the text color of selected item
      cursor: "pointer",
    }),
    menu: (provided, state) => ({
      ...provided,
      zIndex: 1000, // Change this to a higher value to ensure the dropdown is on top
      cursor: "pointer",
    }),
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? "black" : provided.borderColor,
      boxShadow: state.isFocused ? "0 0 0 1px black" : provided.boxShadow,
      // height: 40,
      minHeight: 40,
      "&:hover": {
        borderColor: "black" ? "black" : provided["&:hover"].borderColor,
      },
      cursor: "pointer",
    }),
    input: (provided) => ({
      ...provided,
      "&:focus": {
        borderColor: "black",
        outline: "none",
      },
    }),
  };

  const [isDeleted, setIsDeleted] = useState(true);
  const [varientName, setVarientName] = useState([{ value: "", label: "" }]);
  const [selectedVariant, setSelectedVarient] = useState({});
  const [productField, setProductField] = useState([]);
  const [productInfo, setProductInfo] = useState({
    title: "",
    description: "",
    category: [],
    taxes: [],
    files: [],
    uploadFiles: [],
    selectProducts: [],
  });
  const [titleWarn, setTitleWarn] = useState("");

  const [error, setError] = useState({
    title: "",
    description: "",
    category: "",
    taxes: "",
    files: "",
    formValue: [],
  });

  const [dropdownData, setDropdowndata] = useState({
    varientList: [],
    taxList: [],
    categoryList: [],
    selectProducts: [],
  });

  const [productTitleError, SetProductTitleError] = useState(false);

  const [speciality, setSpeciality] = useState({
    tags: [],
    brands: [],
  });

  const [selectedSpeciality, setSelectedSpeciality] = useState({
    tags: [],
    brands: [],
  });

  const handleProductInfo = async (e, ckEditorData) => {
    let name, value;
    if (e?.target?.name === "title") {
      name = e?.target?.name;
      value = e?.target?.value;
    }

    if (name === "title") {
      const formData = new FormData();
      formData.append("title", value);
      // formData.append("id", productData?.id);
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
            SetProductTitleError(false);
          } else {
            SetProductTitleError(true);
          }
        } catch (error) {
          // Handle any errors from the API call
          console.error("Error:", error);
        }
      }, 500);
    }
    // update only when CkEditor value change
    else if (e?.name === "change:data") {
      setProductInfo((prev) => ({
        ...prev,
        ["description"]: ckEditorData,
      }));
    }

    // update when type in any input
    setProductInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
    switch (name) {
      case "title":
        await validatTitle(value, error);
        break;
      default:
        break;
    }
    handleUpdateError(error);
  };

  const handleUpdateError = (updatedErrorValue) => {
    setError((prev) => ({
      ...prev,
      ...updatedErrorValue,
    }));
  };

  const openFileInput = () => {
    fileUploadRef.current.click();
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Function to handle image drop
  const handleDrop = (event) => {
    event.preventDefault();
    let files = [];
    files = [...event?.dataTransfer?.files];
    if (files?.length) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      files?.forEach((img) => {
        if (allowedTypes.includes(img?.type)) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setProductInfo((prevValue) => ({
              ...prevValue,
              ["files"]: [
                ...prevValue["files"],
                { file: img, base64: reader.result },
              ],
              ["uploadFiles"]: [
                ...prevValue["uploadFiles"],
                { file: img, base64: reader.result },
              ],
            }));
          };
          reader.readAsDataURL(img);
        } else {
          alert(`Only jpeg, png, jpg files can be uploaded`);
          event.target.value = null;
        }
      });
    }
  };

  const handleImageChange = (e) => {
    let files = [];
    files = [...e?.target?.files];
    if (files?.length) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      files?.forEach((img) => {
        if (allowedTypes.includes(img?.type)) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setProductInfo((prevValue) => ({
              ...prevValue,
              ["files"]: [
                ...prevValue["files"],
                { file: img, base64: reader.result },
              ],
              ["uploadFiles"]: [
                ...prevValue["uploadFiles"],
                { file: img, base64: reader.result },
              ],
            }));
          };
          reader.readAsDataURL(img);
        } else {
          alert(`Only jpeg, png, jpg files can be uploaded`);
          e.target.value = null;
        }
      });
    }
  };

  const handleDeleteSelectedImage = (type, imageToDelete) => {
    let deleteImage;
    if (type === "string") {
      deleteImage = productInfo?.files?.filter((img) => {
        return img !== imageToDelete;
      });
    } else {
      deleteImage = productInfo?.files?.filter((img) => {
        return img?.file?.name !== imageToDelete?.file?.name;
      });
      setProductInfo((prev) => ({
        ...prev,
        ["uploadFiles"]: deleteImage,
      }));
    }
    setProductInfo((prev) => ({
      ...prev,
      ["files"]: deleteImage,
    }));
  };

  const handleSelectSpeciality = (value, name) => {
    if (name === "tags") {
      const titleExists = (array, title) => {
        return array?.some((item) =>
          item?.title
            ? item?.title?.toLowerCase() === title?.toLowerCase()
            : item?.toLowerCase() === title?.toLowerCase()
        );
      };

      if (titleExists(selectedSpeciality[name], value?.title)) {
        return;
      }

      if (selectedSpeciality[name]?.length < 15) {
        setSelectedSpeciality((prev) => ({
          ...prev,
          [name]: [...prev[name], value],
        }));
      } else {
        ToastifyAlert("Reached maximum limit.", "error");
        return;
      }
    } else if (name === "brands") {
      setSelectedSpeciality((prev) => ({
        ...prev,
        [name]: [value],
      }));
    }
    setSpeciality((prev) => ({ ...prev }));
  };
  const handleSelectProductOptions = (value, name) => {
    setProductInfo((prev) => ({
      ...prev,
      [name]: [...prev[name], value],
    }));
  };

  const handleDeleteSelectedOption = (id, name) => {
    const filterOptionItems = productInfo[name].filter(
      (item) => item?.id !== id
    );
    setProductInfo((prev) => ({
      ...prev,
      [name]: filterOptionItems,
    }));
  };

  const handleDeleteSpeciality = (id, name) => {
    const numberRegex = /^[0-9]+$/;
    const isNumber = numberRegex.test(id);
    const filterOptionItems = selectedSpeciality[name].filter((item) =>
      isNumber ? item?.id !== id : item !== id
    );
    setSelectedSpeciality((prev) => ({
      ...prev,
      [name]: filterOptionItems,
    }));
  };

  const handleInsertItemInList = (value, name) => {
    if (name === "tags" && value) {
      const filterData = selectedSpeciality[name]?.filter((item) => {
        return item?.title
          ? item?.title?.trim().toLowerCase() === value?.trim().toLowerCase()
          : item?.trim().toLowerCase() === value?.trim().toLowerCase();
      });
      if (filterData?.length) {
        return;
      } else {
        setSelectedSpeciality((prev) => ({
          ...prev,
          [name]: [
            ...prev[name],
            {
              id: (Math.floor(Math.random() * (99000 - 1)) + 1).toString(),
              title: value?.trim(),
              merchant_id: LoginGetDashBoardRecordJson?.data?.merchant_id,
              type: "0",
            },
          ],
        }));
      }
    } else {
      setSelectedSpeciality((prev) => ({
        ...prev,
        [name]: [
          {
            id: (Math.floor(Math.random() * (10000 - 1)) + 1).toString(),
            title: value?.trim(),
            merchant_id: LoginGetDashBoardRecordJson?.data?.merchant_id,
            type: "1",
          },
        ],
      }));
    }
  };

  const handlechange = (e) => {
    setSelectedVarient(e);
  };

  useEffect(() => {
    if (dropdownData?.varientList?.length) {
      const setDefaultValue = dropdownData?.varientList?.map((sec, index) => {
        return {
          value: sec?.title,
          label: sec?.title,
        };
      });
      setVarientName(setDefaultValue);
      setSelectedVarient({
        value: dropdownData?.varientList[0]?.title,
        label: dropdownData?.varientList[0]?.title,
      });
    }
  }, [dropdownData?.varientList]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tagsData = new FormData();
        tagsData.append(
          "merchant_id",
          LoginGetDashBoardRecordJson?.data?.merchant_id
        );
        tagsData.append("type", 0);
        tagsData.append("login_type", userTypeData?.login_type);
        tagsData.append("token_id", userTypeData?.token_id);
        tagsData.append("token", userTypeData?.token);

        const brandsData = new FormData();
        brandsData.append(
          "merchant_id",
          LoginGetDashBoardRecordJson?.data?.merchant_id
        );
        brandsData.append("type", 1);
        brandsData.append("login_type", userTypeData?.login_type);
        brandsData.append("token_id", userTypeData?.token_id);
        brandsData.append("token", userTypeData?.token);

        const formData = new FormData();
        formData.append(
          "merchant_id",
          LoginGetDashBoardRecordJson?.data?.merchant_id
        );
        formData.append("login_type", userTypeData?.login_type);
        formData.append("token_id", userTypeData?.token_id);
        formData.append("token", userTypeData?.token);

        const inventoryData = new FormData();
        inventoryData.append(
          "merchant_id",
          LoginGetDashBoardRecordJson?.data?.merchant_id
        );
        inventoryData.append("login_type", userTypeData?.login_type);
        inventoryData.append("token_id", userTypeData?.token_id);
        inventoryData.append("token", userTypeData?.token);

        const inventoryList = {
          merchant_id: LoginGetDashBoardRecordJson?.data?.merchant_id,
          ...userTypeData,
        };

        const [
          inventorySetting,
          varientList,
          categoryList,
          taxList,
          tags,
          brands,
          productList,
        ] = await Promise.all([
          dispatch(getInventorySetting(formData)).unwrap(),
          dispatch(fetchVarientList(inventoryList)).unwrap(),
          dispatch(fetchCategoryList(inventoryData)).unwrap(),
          dispatch(fetchTaxList(inventoryData)).unwrap(),
          dispatch(fetchTags(tagsData)).unwrap(),
          dispatch(fetchBrands(brandsData)).unwrap(),
          dispatch(fetchProductList(inventoryData)).unwrap(),
        ]);

        // Handle variant list
        setDropdowndata((prev) => ({
          ...prev,
          varientList: varientList?.result,
        }));

        // Handle category list
        setDropdowndata((prev) => ({
          ...prev,
          categoryList: categoryList?.result,
        }));

        // Handle tax list
        setDropdowndata((prev) => ({
          ...prev,
          taxList: taxList?.result,
        }));

        // Handle product list
        setDropdowndata((prev) => ({
          ...prev,
          selectProducts: productList?.result,
        }));

        // Handle tags
        setSpeciality((prev) => ({
          ...prev,
          tags: tags?.data,
        }));

        // Handle brands
        setSpeciality((prev) => ({
          ...prev,
          brands: brands?.data,
        }));
      } catch (err) {
        if (err.status == 401 || err.response?.status === 401) {
          getUnAutherisedTokenMessage();
          handleCoockieExpire();
        } else if (err.message === "Network Error") {
          getNetworkError();
        } else {
          console.error("Error in fetching data:", err);
        }
      }
    };

    fetchData();

    return () => {
      dispatch(emptyProduct([]));
    };
  }, []);

  const toggleDeletedOption = (e) => {
    const { checked } = e.target;
    setIsDeleted(checked);
  };

  const onSelectUpdateState = (newData) => {
    setProductField((prevState) => {
      // Create a mapping of previous state with id as key and the whole object as value
      const prevStateMap = new Map(prevState.map((item) => [item.id, item]));

      const searchTitle = productInfo?.title?.trim()?.toLowerCase();

      // Map over the new data and merge with the previous state where necessary
      const updatedState = newData?.map((item) => {
        // If the item exists in the previous state, preserve the name
        let newTitle = item.title?.toLowerCase() || "";

        const titleNameUpdate = newTitle
          .toLowerCase()
          .replace(searchTitle, "")
          .trim();

        // Capitalize the first letter of each word in titleName
        const formattedTitleNameUpdate = newTitle.replace(/\b\w/g, (char) =>
          char.toUpperCase()
        );

        if (prevStateMap.has(item.id)) {
          let prevTitle = prevStateMap.get(item.id).title;

          // Remove the search title from the previous title
          const titleName = prevTitle
            .toLowerCase()
            .replace(searchTitle, "")
            .trim();

          // Capitalize the first letter of each word in titleName
          const formattedTitleName = titleName.replace(/\b\w/g, (char) =>
            char.toUpperCase()
          );

          return {
            ...item,
            title: titleName,
          };
        }
        // Otherwise, just return the new item
        return {
          ...item,
          title: titleNameUpdate,
        };
      });

      return updatedState;
    });
  };

  // const searchTitle = productInfo.title.trim().toLowerCase();
  // const titleWords = opt.title.split(" ");
  // let titleName = titleWords
  //   .filter(
  //     (word) => word.trim().toLowerCase() !== searchTitle
  //   )
  //   .join(" ");

  const handleChangeProductTitle = (e, index) => {
    const { target, value } = e.target;
    const updateField = [...productField];
    // Create a deep copy of the object at the specified index
    const updatedProduct = { ...updateField[index], title: value };
    // Replace the object at the specified index with the updated object
    updateField[index] = updatedProduct;
    // Update the state with the new array
    setProductField(updateField);
  };
  const disallowedCharactersRegex = /[~\/\\,-]/;

  const formValueInnerSchema = yup.object().shape({
    title: yup
      .string()
      .required("Title is required")
      .test(
        "no-disallowed-characters",
        "Title contains invalid characters",
        (value) => !disallowedCharactersRegex.test(value)
      ),
  });

  const formValueSchema = yup.array().of(formValueInnerSchema);

  const formSchema = yup.object().shape({
    title: yup
      .string()
      .required("Title is required")
      .test(
        "no-disallowed-characters",
        "Title contains invalid characters",
        (value) => !disallowedCharactersRegex.test(value)
      ),
    category: yup.array().min(1, "Select Category").required("Select Category"),
    productField: formValueSchema,
  });

  const updateVarientMerging = async () => {
    const files = productInfo?.files
      ?.map((file) => file)
      .filter((i) => typeof i === "object")
      ?.map((i) => i?.file);
    const previous = productInfo?.files
      ?.map((file) => file)
      .filter((i) => typeof i === "string")
      .toString();

    const data = {
      merchant_id: LoginGetDashBoardRecordJson?.data?.merchant_id,
      admin_id: LoginGetDashBoardRecordJson?.data?.merchant_id,
      title: productInfo?.title ? productInfo?.title : "",
      attribute: selectedVariant?.value,
      is_delete: +isDeleted,
      sel_product_id:
        productField?.map((item) => item?.title + "~" + item?.id).toString() ??
        "",
      tags:
        selectedSpeciality["tags"]
          ?.map((item) => (item?.title ? item?.title?.trim() : item?.trim()))
          .toString() ?? [],
      brand:
        selectedSpeciality["brands"]
          ?.map((item) => (item?.title ? item?.title?.trim() : item?.trim()))
          .toString() ?? [],
      collection: productInfo?.category?.map((item) => item?.id).toString(),
      other_taxes: productInfo?.taxes?.map((item) => item?.id).toString(),
      description: productInfo?.description,
      files: files,
      ...userTypeData,
    };

    try {
      const response = await formSchema.validate(
        { ...productInfo, productField },
        {
          abortEarly: false,
        }
      );
      setError({});
      // check any error exist in error state and if response success and any productTitleError is exist
      if (!!response && !productTitleError) {
        try {
          const res = await dispatch(updateVariantMerging(data)).unwrap();
          if (res?.success_message === "Successfully created product.") {
            ToastifyAlert("Update Successfully", "success");
            navigate("/inventory/products");
          } else {
            ToastifyAlert(res?.update_message, "error");
          }
        } catch (error) {
          if (error.status == 401 || error.response.status === 401) {
            getUnAutherisedTokenMessage();
            handleCoockieExpire();
          } else if (error.status == "Network Error") {
            getNetworkError();
          }
        }
      }
    } catch (err) {
      let errorsList = {};
      setError({});
      if (err && err.inner) {
        err?.inner?.forEach((error) => {
          if (error?.path) {
            errorsList[error.path] = error.message;
          }
        });
      }
      setError(errorsList);
    }
  };

  return (
    <div className="box ">
      {/* edit modal */}

      <div
        className="q-attributes-main-page box_shadow_div"
        style={{ overflow: "unset", marginBottom: "110px" }}
      >
        <div className="q-add-categories-section">
          <SwitchToBackButton
            linkTo={"/inventory/products"}
            title="Inventory Merge"
          />

          <div
            style={{ padding: 0 }}
            className="q-add-categories-section-middle-form mt-1"
          >
            <div className="q-add-categories-single-input px-5">
              <label htmlFor="title" className="product-input-title">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={productInfo?.title}
                onChange={handleProductInfo}
              />
              {error?.title ? (
                <span className="error-alert mb-2">{error?.title}</span>
              ) : (
                ""
              )}
              {productTitleError ? (
                <span className="error-alert">*The name is already exist</span>
              ) : (
                ""
              )}
            </div>

            <div className="q-add-categories-single-input  px-5">
              <label htmlFor="description" className="mb-1 product-input-title">
                Description
              </label>
              <div className="mt-2">
                <CkEditorInput
                  value={productInfo?.description}
                  onChange={handleProductInfo}
                />
              </div>
            </div>

            <div className=" mt-2 px-5">
              <div className="q-add-categories-single-input">
                <SearchableDropdown
                  title="Category"
                  keyName="category"
                  name="title"
                  optionList={dropdownData?.categoryList}
                  handleSelectProductOptions={handleSelectProductOptions}
                  handleDeleteSelectedOption={handleDeleteSelectedOption}
                  selectedOption={productInfo?.category}
                  error={error}
                  handleUpdateError={handleUpdateError}
                  placeholder="Search Category"
                />
              </div>
            </div>

            <div className="q-add-categories-single-input mt-3 px-5">
              <SearchableDropdown
                title="Taxes"
                keyName="taxes"
                name="title"
                optionList={dropdownData?.taxList}
                handleSelectProductOptions={handleSelectProductOptions}
                handleDeleteSelectedOption={handleDeleteSelectedOption}
                selectedOption={productInfo?.taxes}
                // error={error}
                // handleUpdateError={handleUpdateError}
                placeholder="Search Taxes"
              />
            </div>

            <div className="q-add-categories-single-input  mt-3 px-5">
              <CreatableDropdown
                title="Tags"
                keyName="tags"
                name="title"
                optionList={speciality?.tags}
                handleSelectProductOptions={handleSelectSpeciality}
                handleDeleteSelectedOption={handleDeleteSpeciality}
                onEnter={handleInsertItemInList}
                selectedOption={selectedSpeciality?.tags}
                // error={error}
                // handleUpdateError={handleUpdateError}
                placeholder="Select Tags"
              />
            </div>

            <div className="q-add-categories-single-input  mt-3 px-5">
              <CreatableDropdown
                title="Brand"
                keyName="brands"
                name="title"
                optionList={speciality?.brands}
                handleSelectProductOptions={handleSelectSpeciality}
                handleDeleteSelectedOption={handleDeleteSpeciality}
                onEnter={handleInsertItemInList}
                selectedOption={selectedSpeciality?.brands}
                // error={error}
                // handleUpdateError={handleUpdateError}
                placeholder="Search Brand"
              />
            </div>

            <div className="q-add-categories-single-input image-list mt-6 px-5">
              <div className="q_dashbaord_netsales ">
                <h1>Product Images</h1>
              </div>

              <label className="image-title-show">
                Select Default Image if in case some color image is not
                available.
              </label>
              <div className="q_border_product image-upload-gallery">
                <div
                  className="py-10"
                  style={{
                    border: "2px solid #0A64F9",
                    width: "180px",
                    height: "180px",
                    cursor: "pointer",
                    display: "grid",
                    placeContent: "center",
                  }}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={openFileInput}
                >
                  <div
                    className=""
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "200px",
                    }}
                  >
                    <img
                      src={UploadIMG}
                      alt="Default"
                      className="w-6 h-6 text-center"
                    />
                    <span style={{ color: "#0A64F9", fontSize: "12px" }}>
                      Choose Files
                    </span>
                  </div>
                  <div className="q-add-categories-single-input">
                    <input
                      type="file"
                      id="image"
                      name="files"
                      accept="image/*"
                      ref={fileUploadRef}
                      multiple
                      className="default-img-inputfield"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>

                <div class="image-list">
                  {productInfo?.files?.length
                    ? productInfo?.files?.map((img, index) => {
                        // if img type is string

                        if (typeof img === "string") {
                          return (
                            <div
                              className="py-10 image-display"
                              style={{
                                border: "2px solid #0A64F9",
                                // width: "20%",
                                cursor: "pointer",
                              }}
                              key={index}
                            >
                              <>
                                <span
                                  className="delete-image-icon img-DeleteIcon"
                                  style={{
                                    position: "absolute",
                                    top: "7px",
                                    right: "7px",
                                  }}
                                >
                                  <img
                                    src={CloseIcon}
                                    className="delete-image"
                                    onClick={() =>
                                      handleDeleteSelectedImage("string", img)
                                    }
                                  />
                                </span>
                                <img
                                  src={
                                    BASE_URL +
                                    `upload/products/${LoginGetDashBoardRecordJson?.data?.merchant_id}/` +
                                    img
                                  }
                                  alt="Preview"
                                  className="default-img"
                                />
                              </>
                            </div>
                          );
                        }
                        // if img type is object
                        return (
                          <div
                            className="py-10 image-display"
                            style={{
                              border: "2px solid #0A64F9",
                              // width: "20%",
                              cursor: "pointer",
                            }}
                            key={index}
                          >
                            <>
                              <span
                                className="delete-image-icon img-DeleteIcon"
                                style={{
                                  position: "absolute",
                                  top: "7px",
                                  right: "7px",
                                }}
                              >
                                <img
                                  src={CloseIcon}
                                  className="delete-image"
                                  onClick={() =>
                                    handleDeleteSelectedImage("object", img)
                                  }
                                />
                              </span>
                              <img
                                src={img?.base64}
                                alt="Preview"
                                className="default-img"
                              />
                            </>
                          </div>
                        );
                      })
                    : ""}
                </div>
              </div>
              {error["files"] ? (
                <span className="error-alert">{error["files"]}</span>
              ) : (
                ""
              )}
            </div>

            <div class="mt-6 px-5 multiple-items">
              <div class="checkbox-area">
                <input
                  type="checkbox"
                  name="isMultiple"
                  checked={isDeleted}
                  onChange={(e) => toggleDeletedOption(e)}
                  className="checkbox-input"
                  style={{ marginRight: "10px" }}
                />
                <span>Delete Selected Product</span>
              </div>
            </div>

            <Grid container className="varient-select-section mt-6 px-5">
              <Grid item xs={12} className="">
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <Grid item>
                    <h2 className="text-[18px] text-black opacity-100 Admin_std">
                      Variant Attributes
                    </h2>
                  </Grid>
                </Grid>

                <>
                  <Grid container sx={{ mb: 1.3 }}>
                    <Grid item xs={12}>
                      <Grid container sx={{ mt: 1.5 }}>
                        <Grid item xs={12}>
                          <Select
                            closeMenuOnSelect={true}
                            components={{ ...animatedComponents }}
                            value={selectedVariant}
                            onChange={(e) => handlechange(e)}
                            className="dropdown"
                            options={varientName}
                            isSearchable
                            isClearable
                            styles={dropDownStyle}
                            placeholder="Select Variant"
                            // isDisabled={
                            //   index + 1 < varientLength?.length || isProductEdit
                            // }
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              </Grid>
            </Grid>

            <div class="mt-6 mb-6 px-5 multiple-items">
              <ProductSelection
                optionList={dropdownData?.selectProducts}
                handleSelectProductOptions={handleSelectProductOptions}
                handleDeleteSelectedOption={handleDeleteSelectedOption}
                selectedOption={productInfo?.selectProducts}
                error={error}
                onSelectUpdateState={onSelectUpdateState}
                // handleUpdateError={handleUpdateError}
                placeholder="Select Products"
                productTitle={productInfo?.title}
              />
            </div>

            {productField?.length ? (
              <div class="inputFields mt-6 mb-6 px-5">
                <Grid item>
                  <h2 className="text-[18px] text-black opacity-100 Admin_std">
                    Selected Products:
                  </h2>
                </Grid>
                {productField?.length
                  ? productField?.map((opt, index) => {
                      const searchTitle = productInfo?.title
                        ?.trim()
                        .toLowerCase();
                      let prevTitle = opt?.title;

                      // Remove the search title from the previous title
                      const titleName = prevTitle
                        .toLowerCase()
                        .replace(searchTitle, "")
                        .trim();

                      // Capitalize the first letter of each word in titleName
                      const formattedTitleName = titleName.replace(
                        /\b\w/g,
                        (char) => char.toUpperCase()
                      );

                      return (
                        <div className="inventory-input-area">
                          <input
                            type="text"
                            placeholder=""
                            value={formattedTitleName}
                            onChange={(e) => handleChangeProductTitle(e, index)}
                          />
                          {error[`productField[${index}].${`title`}`] ? (
                            <div className="error-alert">
                              {error[`productField[${index}].${`title`}`]}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      );
                    })
                  : ""}
              </div>
            ) : (
              ""
            )}
            <div
              className="q-category-bottom-header varient-box "
              style={{ marginRight: "0px" }}
            >
              <button
                className="quic-btn quic-btn-save submit-btn-click"
                onClick={updateVarientMerging}
                // disabled={varientLoading || enbaledSubmit}
              >
                {/* {varientLoading || enbaledSubmit ? ( */}
                {/* <Box className="loader-box">
                  <CircularProgress />
                </Box> */}
                {/* ) : ( "" )}  */}
                Update
              </button>
              <button
                className="quic-btn quic-btn-cancle"
                onClick={() => {
                  // navigate("/inventory/products");
                }}
                style={{ marginLeft: "20px" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryMerge;
