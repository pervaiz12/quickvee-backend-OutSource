import React, { useEffect, useMemo, useRef, useState } from "react";
import AddNewCategory from "../../Assests/Dashboard/Left.svg";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { colourOptions } from "../Products/data";
import VariantAttributes from "./VariantAttributes";
import UploadIMG from "../../Assests/Filter/imgupload.svg";
import GeneratePUC from "./GeneratePUC";
import { useDispatch } from "react-redux";
import {
  addProduct,
  fetchCategoryList,
  fetchDropdownContentByCategory,
  fetchProductList,
  fetchTaxList,
  fetchVarientList,
  getInventorySetting,
} from "../../Redux/features/Product/ProductSlice";
import { type } from "@testing-library/user-event/dist/type";
import Upload from "../../Assests/Category/upload.svg";
import DeleteIcon from "../../Assests/Category/deleteIcon.svg";
import SearchableDropdown from "../../CommonComponents/SearchableDropdown";
import "../../Styles/ProductPage.css";
import { Swiper, SwiperSlide } from "swiper/react";
import CloseIcon from "../../Assests/Dashboard/cross.svg";

const AddProducts = () => {
  const fileUploadRef = useRef();
  const dispatch = useDispatch();
  const animatedComponents = makeAnimated();
  const [items, setItems] = useState([]);
  const [formValue, setFormValue] = useState([]);
  const [productInfo, setProductInfo] = useState({
    title: "",
    description: "",
    category: [],
    taxes: [],
    relatedProduct: [],
    frequentlyBought: [],
    image: [],
  });

  const [dropdownData, setDropdowndata] = useState({
    varientList: [],
    taxList: [],
    categoryList: [],
    relatedProducttList: [],
    frequentlyBroughtList: [],
  });

  // const [productImage, setProductImage] = useState(null);

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

  const handleProductInfo = (e) => {
    const { name, value, type } = e.target;
    setProductInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeleteSelectedImage = (img) => {
    const deleteImage = productInfo?.image?.filter((img) => {
      return String(img?.base64) !== String(img?.base64);
    });
    console.log(deleteImage, productInfo, img);
    // setProductInfo((prev) => ({
    //   ...prev,
    //   ["image"]: deleteImage,
    // }));
  };
  // const []
  const [costPer, setCostPer] = useState(null);

  const nameArray = ["costPerItem", "upcCode", "customCode"];

  const notAllowDecimalValue = [
    "qty",
    "upcCode",
    "customCode",
    "reorderQty",
    "reorderLevel",
  ];

  let varientTitle = [];

  // react-selected item style
  const customStyles = {
    multiValue: (provided, state) => ({
      ...provided,
      backgroundColor: "#e1e1e1", // Customize background color
      color: "black",
      fontWeight: 400,
      borderRadius: "50px",
      overflow: "hidden",
      paddingLeft: "7px",
      boxSizing: "border-box",
    }),
  };

  const handleSetItem = (data) => {
    setItems(data);
  };

  const addNewVarient = (newItem) => {
    setItems([...items, newItem]);
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
              ["image"]: [
                ...prevValue["image"],
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

  useEffect(() => {
    // called API
    const formData = new FormData();
    formData.append("merchant_id", "MAL0100CA");
    formData.append("adv_id", "");

    dispatch(getInventorySetting(formData)).then((res) => {
      if (!!+res?.payload) {
        setCostPer(+res?.payload);
      }
    });

    const inventoryData = new FormData();
    inventoryData.append("merchant_id", "MAL0100CA");

    dispatch(fetchVarientList(inventoryData)).then((res) => {
      setDropdowndata((prev) => ({
        ...prev,
        ["varientList"]: res?.payload?.result,
      }));
    });
    dispatch(fetchCategoryList(inventoryData)).then((res) => {
      setDropdowndata((prev) => ({
        ...prev,
        ["categoryList"]: res?.payload?.result,
      }));
    });
    dispatch(fetchTaxList(inventoryData)).then((res) => {
      setDropdowndata((prev) => ({
        ...prev,
        ["taxList"]: res?.payload?.result,
      }));
    });
    dispatch(fetchProductList(inventoryData)).then((res) => {
      setDropdowndata((prev) => ({
        ...prev,
        ["relatedProducttList"]: res?.payload?.result,
        ["frequentlyBroughtList"]: res?.payload?.result,
      }));
    });
  }, []);

  // const handleImageChange = (event) => {
  //   const selectedFile = event.target.files[0];
  //   // You can perform additional validation here if needed
  //   setProductImage(URL.createObjectURL(selectedFile));
  // };

  console.log(productInfo);
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
              ["image"]: [
                ...prevValue["image"],
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

  const handleBlur = (e, i) => {
    const { name, value, type } = e.target;
    // margin and profit calculation
    let totalPriceValue;
    let marginValue;
    let profitValue;
    let price_total_value;

    if (name === "costPerItem") {
      // price field total value
      totalPriceValue = (costPer / 100) * value;
      price_total_value = parseFloat(value) + parseFloat(totalPriceValue);

      // margin and profit total value
      let marginvl = (value * 100) / price_total_value.toFixed(2);
      let showmargin = 100 - marginvl;
      marginValue = parseFloat(showmargin).toFixed(2);
      profitValue = parseFloat(price_total_value - value).toFixed(2);
    }

    // if price value is change manually the recalculate margin and profit value
    if (name === "price") {
      if (value > 0) {
        let costPerValue = formValue[i]["costPerItem"];
        let marginvl = (costPerValue * 100) / value;
        let showmargin = 100 - marginvl;
        marginValue = parseFloat(showmargin).toFixed(2);
        profitValue = parseFloat(value - costPerValue).toFixed(2);
      }
    }

    // when remove focus on input value
    const updatedFormValue = formValue.map((item, index) => {
      // if section is 0 and field is 1 and fielname is costPerItem and value is more than 0 / null / undefined => onblur
      if (i == 0 && name === "costPerItem" && value) {
        return {
          ...item,
          [name]:
            type === "checkbox" ? (value === "true" ? false : true) : value,
          ["costPerItem"]: value,
          ["price"]: price_total_value ? price_total_value?.toFixed(2) : "",
          ["margin"]: !isNaN(marginValue) ? marginValue : "",
          ["Profit"]: !isNaN(profitValue) ? profitValue : "",
        };
      }
      // when section is 0 and price field value is change manually and costPerItem field value is not empty => onchange
      else if (i === 0 && name === "price" && !!formValue[i]["costPerItem"]) {
        return {
          ...item,
          ["price"]: value ? value : "",
          ["margin"]: !isNaN(marginValue) ? marginValue : "",
          ["Profit"]: !isNaN(profitValue) ? profitValue : "",
        };
      }
      // show alert "Compare Price must be greater than price." when compare value < price && price > compare value / when compareAtPrice field value change manually
      else if (
        (index === i || i === 0) &&
        name === "compareAtPrice" &&
        value &&
        !!formValue[i]["price"]
      ) {
        if (+value < +formValue[i]["price"]) {
          alert("Compare Price must be greater than price.");
          return {
            ...item,
            ["compareAtPrice"]: "",
          };
        } else {
          return {
            ...item,
            [name]: value,
          };
        }
      }

      // show alert "Compare Price must be greater than price." when compare value < price && price > compare value / when price field value change manually
      else if (
        (index === i || i === 0) &&
        name === "price" &&
        value &&
        !!formValue[i]["compareAtPrice"]
      ) {
        if (+value > +formValue[i]["compareAtPrice"]) {
          alert("Compare Price must be greater than price.");
          return {
            ...item,
            [name]: value,
            ["compareAtPrice"]: "",
          };
        } else {
          return {
            ...item,
            [name]: value,
          };
        }
      }

      // when section is only 0 and name of field is any but not costPerItem => onblur
      else if (i === 0 && !nameArray.includes(name)) {
        return {
          ...item,
          [name]: value,
        };
      }
      return item;
    });
    setFormValue(updatedFormValue);
  };

  const handleOnChange = (e, i) => {
    const { name, value, type } = e.target;

    /// convert input value format 0.00
    let fieldValue;
    if (!notAllowDecimalValue.includes(name)) {
      fieldValue = value
        // Remove extra dots and ensure only one dot exists at most
        .replace(/[^\d.]/g, "") // Allow digits and dots only
        .replace(/^(\d*\.)(.*)\./, "$1$2") // Remove extra dots
        .replace(/^(\d*\.\d*)(.*)\./, "$1$2"); // Remove extra dots after the decimal point

      let inputStr = fieldValue.replace(/\D/g, "");
      inputStr = inputStr.replace(/^0+/, "");

      if (inputStr.length === 0) {
        // fieldValue = "0.00";
      } else if (inputStr.length === 1) {
        fieldValue = "0.0" + inputStr;
      } else if (inputStr.length === 2) {
        fieldValue = "0." + inputStr;
      } else {
        fieldValue =
          inputStr.slice(0, inputStr.length - 2) + "." + inputStr.slice(-2);
      }
    }
    // normal input value format
    else {
      fieldValue = value
        // Remove extra dots and ensure only one dot exists at most
        .replace(/[^\d.]/g, "") // Allow digits and dots only
        .replace(/^(\d*\.)(.*)\./, "$1$2") // Remove extra dots
        .replace(/^(\d*\.\d*)(.*)\./, "$1$2"); // Remove extra dots after the decimal point

      let inputStr = fieldValue.replace(/\D/g, "");
      inputStr = inputStr.replace(/^0+/, "");
      fieldValue = inputStr;
    }

    // margin and profit calculation
    let totalPriceValue;
    let marginValue;
    let profitValue;
    let price_total_value;

    // price field total value calculation based on costPer value which is fetch from API.
    if (name === "costPerItem") {
      totalPriceValue = (costPer / 100) * fieldValue;
      price_total_value = parseFloat(fieldValue) + parseFloat(totalPriceValue);

      // margin and profit total value calculation
      let marginvl = (fieldValue * 100) / price_total_value.toFixed(2);
      let showmargin = 100 - marginvl;
      marginValue = parseFloat(showmargin).toFixed(2);
      profitValue = parseFloat(price_total_value - fieldValue).toFixed(2);
    }

    // if price value is change manually the recalculate margin and profit value
    if (name === "price") {
      if (value > 0) {
        let costPerValue = formValue[i]["costPerItem"];
        let marginvl = (costPerValue * 100) / fieldValue;
        let showmargin = 100 - marginvl;
        marginValue = parseFloat(showmargin).toFixed(2);
        profitValue = parseFloat(fieldValue - costPerValue).toFixed(2);
      }
    }

    // manually onchange
    const updatedFormValue = formValue.map((item, index) => {
      // if section is 0 and name is costPerItem => onchange
      if (i === 0 && name === "costPerItem") {
        return {
          ...item,
          ["costPerItem"]: index == 0 ? fieldValue : "",
          ["price"]: price_total_value ? price_total_value.toFixed(2) : "",
          ["margin"]:
            index == 0 ? (!isNaN(marginValue) ? marginValue : "") : "",
          ["Profit"]:
            index == 0 ? (!isNaN(profitValue) ? profitValue : "") : "",
        };
      }
      // if section is any but field is 1 and field name is costPerItem => onchange
      else if (i === index && name === "costPerItem") {
        return {
          ...item,
          ["costPerItem"]: fieldValue,
          ["price"]: price_total_value ? price_total_value.toFixed(2) : "",
          ["margin"]: !isNaN(marginValue) ? marginValue : "",
          ["Profit"]: !isNaN(profitValue) ? profitValue : "",
        };
      }
      // when section is 0 and price field value is change manually and costPerItem field value is not empty => onchange
      else if (i === 0 && name === "price" && !!formValue[i]["costPerItem"]) {
        if (index === 0) {
          return {
            ...item,
            ["price"]: fieldValue ? fieldValue : "",
            ["margin"]: !isNaN(marginValue) ? marginValue : "",
            ["Profit"]: !isNaN(profitValue) ? profitValue : "",
          };
        }
      }
      // when section is any and price field value is change manually and costPerItem field value is not empty => onchange
      else if (
        index === i &&
        name === "price" &&
        !!formValue[i]["costPerItem"]
      ) {
        return {
          ...item,
          ["price"]: fieldValue ? fieldValue : "",
          ["margin"]: !isNaN(marginValue) ? marginValue : "",
          ["Profit"]: !isNaN(profitValue) ? profitValue : "",
        };
      }
      // when section is any and field index is any and name is any => onchange
      else if (index === i) {
        // if checkbox is already check make it false
        // fieldValue is decimal value => 0.00
        return {
          ...item,
          [name]:
            type === "checkbox"
              ? value === "true"
                ? false
                : true
              : fieldValue,
        };
      }
      return item;
    });

    setFormValue(updatedFormValue);
  };

  const handleVarientTitleBasedItemList = () => {
    if (items.length) {
      if (items?.length === 1) {
        for (let i of items[0]?.options) {
          varientTitle.push(i);
        }
      } else if (items?.length === 2) {
        for (let i of items[0]?.options) {
          for (let j of items[1]?.options) {
            varientTitle.push(i + "/" + j);
          }
        }
      } else {
        for (let i of items[0]?.options) {
          for (let j of items[1]?.options) {
            for (let k of items[2]?.options) {
              varientTitle.push(i + "/" + j + "/" + k);
            }
          }
        }
      }
    }

    return [...new Set(varientTitle)];
  };

  useEffect(() => {
    if (items?.length > 0) {
      handleVarientTitleBasedItemList();
      setFormValue(
        varientTitle?.length > 0
          ? [...new Set(varientTitle)]?.map((_) => ({
              costPerItem: "",
              compareAtPrice: "",
              price: "",
              margin: "",
              Profit: "",
              qty: "",
              upcCode: "",
              customCode: "",
              reorderQty: "",
              reorderLevel: "",
              trackQuantity: true,
              sellOutOfStock: true,
              checkId: false,
              disable: false,
              itemForAllLinkedLocation: false,
            }))
          : []
      );
    }
  }, [items]);

  const characters = "0123456789";
  function generateString(length) {
    let result = " ";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const handleGenerateUPC = () => {
    const updatedUpcData = formValue?.map((item) => {
      return {
        ...item,
        ["upcCode"]: generateString(20),
      };
    });
    setFormValue(updatedUpcData);
  };

  const handleSubmitForm = () => {
    const data = {
      merchant_id: "MAL0100CA",
      title: productInfo?.title,
      description: productInfo?.description,
      price: "",
      compare_price: "",
      costperItem: "",
      margin: "",
      profit: "",
      ischargeTax: "",
      //sku:
      //barcode:
      trackqnty: "",
      isstockcontinue: "",
      quantity: "",
      //ispysical_product:
      //country_region:
      collection: 5377,
      //HS_code:
      isvarient: 1,
      //featured_product:1,2
      //multiplefiles[]:product2.png
      //img_color_lbl:
      //created_on:
      //productid:111
      optionarray: "size",
      optionarray1: "material",
      optionvalue: "small,large",
      optionvalue1: "glass,wood",
      varvarient: "small/glass",
      varprice: [34, 45],
      varquantity: [30, 20, 30, 40],
      varsku: "redsku,bluesku,sku3,sku4",
      //varbarcode[]:123321,5456464
      //optionarray2:Material
      //optionvalue2:glass
      //upc:abcupc
      varupc: "qqup1,qqup2,upc3,upc4",
      varcustomcode: "c1,c2,c3,c4",
      varcostperitem: [20, 30, 20, 20],
      vartrackqnty: [1, 1, 1, 0],
      varcontinue_selling: [1, 1, 1, 1],
      varcheckid: [1, 1, 1, 1],
      vardisable: [0, 0, 0, 1],
      varmargin: [10, 10, 10, 10],
      varprofit: [20, 20, 20, 20],
      varreorder_qty: [2, 2, 4, 4],
      reorder_level: [4, 4, 5, 5],
      reorder_cost: [10, 10, 10, 10],
    };
    dispatch(addProduct(data));
  };

  return (
    <div className="box">
      <div className="q-attributes-main-page">
        <div className="q-add-categories-section">
          <div className="q-add-categories-section-header">
            <span>
              <img src={AddNewCategory} alt="Add-New-Category" />
              <span style={{ width: "153px" }}>Add Product</span>
            </span>
          </div>
          <div className="q-add-categories-section-middle-form">
            <div className="q-add-categories-single-input">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={productInfo?.title}
                onChange={handleProductInfo}
              />
            </div>

            <div className="q-add-categories-single-input">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                rows="4"
                cols="50"
                value={productInfo?.description}
                onChange={handleProductInfo}
              ></textarea>
            </div>
            <div className="">
              <div className="q-add-categories-single-input">
                <SearchableDropdown
                  title="Category"
                  keyName="category"
                  optionList={dropdownData?.categoryList}
                  handleSelectProductOptions={handleSelectProductOptions}
                  handleDeleteSelectedOption={handleDeleteSelectedOption}
                  selectedOption={productInfo?.category}
                />
              </div>
            </div>

            <div className="q-add-categories-single-input">
              <SearchableDropdown
                title="Taxes"
                keyName="taxes"
                optionList={dropdownData?.taxList}
                handleSelectProductOptions={handleSelectProductOptions}
                handleDeleteSelectedOption={handleDeleteSelectedOption}
                selectedOption={productInfo?.taxes}
              />
            </div>

            <div className="q-add-categories-single-input">
              <SearchableDropdown
                title="Related Products"
                keyName="relatedProduct"
                optionList={dropdownData?.relatedProducttList}
                handleSelectProductOptions={handleSelectProductOptions}
                handleDeleteSelectedOption={handleDeleteSelectedOption}
                selectedOption={productInfo?.relatedProduct}
              />
            </div>

            <div className="q-add-categories-single-input">
              <SearchableDropdown
                title="Frequently Bought Together"
                keyName="frequentlyBought"
                optionList={dropdownData?.frequentlyBroughtList}
                handleSelectProductOptions={handleSelectProductOptions}
                handleDeleteSelectedOption={handleDeleteSelectedOption}
                selectedOption={productInfo?.frequentlyBought}
              />
            </div>

            <div className="q-add-categories-single-input">
              <div className="q_dashbaord_netsales">
                <h1>Product Image</h1>
              </div>

              <label>
                Select Default Image if in case some color image is not
                available.
              </label>
              <div className="q_border_product image-upload-gallery">
                <div
                  className="py-10"
                  style={{
                    border: "2px solid #0A64F9",
                    width: "20%",
                    cursor: "pointer",
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
                      name="image"
                      accept="image/*"
                      ref={fileUploadRef}
                      multiple
                      className="default-img-inputfield"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>

                {productInfo?.image?.length
                  ? productInfo?.image?.map((img, index) => {
                      return (
                        <div
                          className="py-10 image-display"
                          style={{
                            border: "2px solid #0A64F9",
                            width: "20%",
                            cursor: "pointer",
                          }}
                          key={index}
                        >
                          <>
                            <span
                              className="delete-image-icon img-DeleteIcon"
                              // onClick={handleDeleteImage}
                              style={{
                                position: "absolute",
                                top: "7px",
                                right: "7px",
                              }}
                            >
                              <img
                                src={CloseIcon}
                                className="delete-image"
                                onClick={() => handleDeleteSelectedImage(img)}
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
              {}
            </div>

            <div className="mt_card_header">
              <VariantAttributes
                handleSetItem={handleSetItem}
                items={items}
                addNewVarient={addNewVarient}
              />
            </div>

            <div className="mt_card_header">
              <GeneratePUC
                handleVarientTitleBasedItemList={
                  handleVarientTitleBasedItemList
                }
                handleGenerateUPC={handleGenerateUPC}
                handleOnChange={handleOnChange}
                formValue={formValue}
                handleBlur={handleBlur}
              />
            </div>

            <div className="box">
              <div className="variant-attributes-container">
                {/* Your existing JSX for variant attributes */}

                <div className="q-add-categories-section-middle-footer">
                  <div
                    className="q-category-bottom-header"
                    style={{ marginRight: "67px" }}
                  >
                    <button
                      className="quic-btn quic-btn-save"
                      onClick={handleSubmitForm}
                    >
                      Update
                    </button>
                    <button className="quic-btn quic-btn-cancle">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
