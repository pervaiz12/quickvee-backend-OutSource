import React, { useEffect, useState } from "react";
import AddNewCategory from "../../Assests/Dashboard/Left.svg";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { colourOptions } from "../Products/data";
import VariantAttributes from "./VariantAttributes";
import UploadIMG from "../../Assests/Filter/imgupload.svg";
import GeneratePUC from "./GeneratePUC";

const AddProducts = () => {
  const animatedComponents = makeAnimated();
  const [items, setItems] = useState([]);
  const [formValue, setFormValue] = useState([]);

  let varientTitle = [];

  const handleSetItem = (data) => {
    setItems(data);
  };

  const addNewVarient = (newItem) => {
    setItems([...items, newItem]);
  };

  const [productImage, setProductImage] = useState(null);

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    // You can perform additional validation here if needed
    setProductImage(URL.createObjectURL(selectedFile));
  };

  const handleOnChange = (e, i) => {
    const { name, value, type } = e.target;
    const updatedFormValue = formValue.map((item, index) => {
      if (index === i) {
        return {
          ...item,
          [name]:
            type === "checkbox" ? (value === "true" ? false : true) : value,
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

  console.log("value", formValue);

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
              <input type="text" id="title" name="title" />
            </div>

            <div className="q-add-categories-single-input">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                rows="4"
                cols="50"
              ></textarea>
            </div>
            <div className="">
              <div className="q-add-categories-single-input">
                <label htmlFor="tax">Category</label>
                <Select
                  closeMenuOnSelect={false}
                  components={{ ...animatedComponents }}
                  defaultValue={{}}
                  isMulti
                  options={colourOptions}
                />
              </div>
            </div>

            <div className="q-add-categories-single-input">
              <label htmlFor="tax">Taxes</label>
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                defaultValue={colourOptions}
                isMulti
                options={colourOptions}
              />
            </div>

            <div className="q-add-categories-single-input">
              <label htmlFor="related-product">Related Products</label>
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                defaultValue={{}}
                isMulti
                options={colourOptions}
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
              <div className="q_border_product">
                <div
                  className="px-8 py-10"
                  style={{ border: "2px solid #0A64F9", width: "20%" }}
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
                      className="default-img-inputfield"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
              </div>
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
                    <button className="quic-btn quic-btn-save">Update</button>
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
