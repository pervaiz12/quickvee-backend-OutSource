import React, { useState, useRef } from "react";
import AddNewCategory from "../../Assests/Taxes/Left.svg";
import axios from "axios";
import { BASE_URL, ADD_CATOGRY } from "../../Constants/Config";
import Upload from "../../Assests/Category/upload.svg";

import DeleteIcon from "../../Assests/Category/deleteIcon.svg";

const AddCategory = ({ seVisible }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const [category, setCategory] = useState({
    title: "",
    description: "",
    merchant_id: "MAL0100CA",
    online: 0,
    use_point: 0,
    earn_point: 0,
    image: "", // New property for the image file
  });

  const myStyles = {
    display: "flex",
  };

  const inputChange = (e) => {
    const { name, value } = e.target;
    setCategory((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (allowedTypes.includes(file.type)) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setCategory((prevValue) => ({
            ...prevValue,
            image: {
              file: file,
              base64: reader.result,
            },
          }));
        };
        reader.readAsDataURL(file);
      } else {
        alert(`${file.name} is not an image.\nOnly jpeg, png, jpg files can be uploaded`);
        e.target.value = null;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append your tax data
    formData.append("title", category.title);
    formData.append("description", category.description);
    formData.append("merchant_id", category.merchant_id);
    formData.append("use_point", category.use_point);
    formData.append("earn_point", category.earn_point);

    if (category.image && category.image.base64) {
      formData.append("online", category.online);
      formData.append("image", category.image.base64);
      formData.append("filename", category.image.file.name);
    } else {
      formData.append("image", "");
      formData.append("filename", "");
    }

    try {
      const res = await axios.post(BASE_URL + ADD_CATOGRY, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const data = await res.data.status;
      // console.log(res.data);
      // alert(data);
      const update_message = await res.data.msg;
      // alert(update_message);
      if (data == "Success") {
        seVisible("CategoryDetail");
        // alert(update_message)
      } else if (
        data == "Failed" &&
        update_message == "The name is Already exist"
      ) {
        setErrorMessage(update_message);
      } else if (data == "Failed" && update_message == "*Please enter title") {
        setErrorMessage(update_message);
      } else {
        alert(update_message);
        seVisible("CategoryDetail");
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  // Function to prevent default behavior for drag over
  const inputRef = useRef(null);

  const openFileInput = () => {
    inputRef.current.click();
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Function to handle image drop
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCategory((prevValue) => ({
          ...prevValue,
          image: {
            file: file,
            base64: reader.result,
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = (e) => {
    e.stopPropagation();
    setCategory((prevValue) => ({
      ...prevValue,
      image: {
        file: null,
        base64: null,
      },
    }));
  };

  return (
    <div className="q-add-categories-section">
      <form onSubmit={handleSubmit} enctype="multipart/form-data">
        <div className="q-add-categories-section-header">
          <span onClick={() => seVisible("CategoryDetail")}>
            <img src={AddNewCategory} alt="Add-New-Category" />
            <span>Add New Category</span>
          </span>
        </div>
        <div className="q-add-categories-section-middle-form">
          <div className="q-add-categories-single-input">
            <label for="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={category.title}
              onChange={inputChange}
            />
            {errorMessage && (
              <span className="error-message" style={{ color: "red" }}>
                {errorMessage}
              </span>
            )}
          </div>

          <div className="q-add-categories-single-input">
            <label for="description">Description</label>
            <textarea
              id="description"
              name="description"
              rows="4"
              cols="50"
              value={category.description}
              onChange={inputChange}
            ></textarea>
          </div>


          <div
            className={`h-1/2  h-[100px] flex items-center justify-center border-2 border-dashed border-[#BFBFBF] bg-white rounded-lg mt-2  defaultDrag_div`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={openFileInput}
            style={{
              cursor: "pointer",
              position: "relative",
              height: "auto",
              padding: "10px",
            }}
          >
            {category.image && category.image.base64 ? (
              <>
                <span
                  className="delete-image-icon img-DeleteIcon"
                  onClick={handleDeleteImage}
                  style={{
                    position: "absolute",
                    top: "7px",
                    right: "7px",
                  }}
                >
                  <img src={DeleteIcon} alt="delete-icon" />
                </span>
                <img
                  src={category.image.base64}
                  alt="Preview"
                  className="default-img"
                  style={{
                    height: "320px",
                    objectFit: "contain",
                    width: "100%",
                  }}
                />
              </>
            ) : (
              <div className="flex-column">
                <img
                  src={Upload}
                  style={{ transform: "translate(2.5rem, 0px)" }}
                  alt="Default"
                />
                <span>Category Image</span>
              </div>
            )}
            <div className="q-add-categories-single-input">
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                ref={inputRef}
                className="default-img-inputfield"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </div>
          </div>


          <div className="add-category-checkmark-div">
            <label className="add-category-checkmark-label mt-2">
              Show Online ?
              <input
                type="checkbox"
                checked={category.online === 1}
                onChange={(e) =>
                  setCategory((prevValue) => ({
                    ...prevValue,
                    online: e.target.checked ? 1 : 0,
                  }))
                }
              />
              <span className="add-category-checkmark"></span>
            </label>
          </div>
          <div className="row " style={myStyles}>
            <div className="add-category-checkmark-div">
              <label className="add-category-checkmark-label mt-2">
                Use Loyalty Point ?
                <input
                  type="checkbox"
                  checked={category.use_point === 1}
                  onChange={(e) =>
                    setCategory((prevValue) => ({
                      ...prevValue,
                      use_point: e.target.checked ? 1 : 0,
                    }))
                  }
                />
                <span className="add-category-checkmark"></span>
              </label>
            </div>
            <div className="add-category-checkmark-div">
              <label className="add-category-checkmark-label mt-2">
                Earn Loyalty Point ?
                <input
                  type="checkbox"
                  checked={category.earn_point === 1}
                  onChange={(e) =>
                    setCategory((prevValue) => ({
                      ...prevValue,
                      earn_point: e.target.checked ? 1 : 0,
                    }))
                  }
                />
                <span className="add-category-checkmark"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="q-add-categories-section-middle-footer">
          <button className="quic-btn quic-btn-save">Add</button>
          <button
            onClick={() => seVisible("CategoryDetail")}
            className="quic-btn quic-btn-cancle"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
