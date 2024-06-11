import React, { useState, useRef } from "react";
import AddNewCategory from "../../Assests/Taxes/Left.svg";
import DeleteIcon from "../../Assests/Category/deleteIcon.svg";
import DownIcon from "../../Assests/Dashboard/Down.svg";
import { BASE_URL, ADD_DEFAULTS } from "../../Constants/Config";
import axios from "axios";
import { useAuthDetails } from "./../../Common/cookiesHelper";
import Upload from "../../Assests/Category/upload.svg";
import { Grid } from "@mui/material";
import SelectDropDown from "../../reuseableComponents/SelectDropDown";
import { ToastifyAlert } from "../../CommonComponents/ToastifyAlert";
import AlertModal from "../../reuseableComponents/AlertModal";

const AddDefaults = ({ setVisible }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const { LoginGetDashBoardRecordJson, LoginAllStore, userTypeData } =
    useAuthDetails();
  const [defaults, setDefaults] = useState({
    name: "",
    type: "",
    image: "", // New property for the image file
  });

  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    type: "",
    image: "",
  });
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [alertModalHeaderText, setAlertModalHeaderText] = useState("");
  const showModal = (headerText) => {
    setAlertModalHeaderText(headerText);
    setAlertModalOpen(true);
  };

  const inputChange = (e) => {
    const { name, value } = e.target;
    setDefaults((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });

    setFieldErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    let valid = true;
    const newFieldErrors = {};

    // Validate name
    if (!defaults.name.trim()) {
      newFieldErrors.name = "Name is required";
      valid = false;
    } else if (/\d/.test(defaults.name)) {
      // Check if the name contains any numbers
      newFieldErrors.name = "Only Alphabets are allowed.";
      valid = false;
    }

    // Validate type
    if (selectedCatSource === "Select") {
      newFieldErrors.type = "Type is required";
      valid = false;
    }

    // Validate image
    if (!defaults.image || !defaults.image.base64) {
      newFieldErrors.image = "Image is required";
      valid = false;
    }

    setFieldErrors(newFieldErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Form is not valid, do not proceed
      return;
    }

    const formData = new FormData();

    // Append your tax data
    formData.append("name", defaults.name);
    formData.append("type", defaults.type);

    if (defaults.image && defaults.image.base64) {
      formData.append("image", defaults.image.base64);
      formData.append("filename", defaults.image.file.name);
    } else {
      formData.append("image", "");
      formData.append("filename", "");
    }
    formData.append("token_id", userTypeData.token_id);
    formData.append("login_type", userTypeData.login_type);

    try {
      const res = await axios.post(BASE_URL + ADD_DEFAULTS, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userTypeData.token}`, // Use data?.token directly
        },
      });
      const data = await res.data.status;
      const update_message = await res.data.msg;
      if (data === "Success") {
        ToastifyAlert("Default Menu Created", "success");
        setVisible("DefaultsDetail");
      } else if (
        data === "Failed" &&
        update_message === "Default Menu Entered Already Exits"
      ) {
        setErrorMessage("Default Menu Already Exits");
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

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Function to handle image drop
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDefaults((prevValue) => ({
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (allowedTypes.includes(file.type)) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setDefaults((prevValue) => ({
            ...prevValue,
            image: {
              file: file,
              base64: reader.result,
            },
          }));
        };
        reader.readAsDataURL(file);
      } else {
        // alert(
        //   `${file.name} is not an image.\nOnly jpeg, png, jpg files can be uploaded`
        // );
        showModal(`${file.name} is not an image.\nOnly jpeg, png, jpg files can be uploaded`)
        e.target.value = null;
      }
    }
  };

  const handleDeleteImage = (e) => {
    e.stopPropagation();
    setDefaults((prevValue) => ({
      ...prevValue,
      image: {
        file: null,
        base64: null,
      },
    }));
  };

  const handleKeyPress = (e) => {
    // Check if the pressed key is a number
    if (/\d/.test(e.key)) {
      e.preventDefault(); // Prevent input of numbers
      // alert("Only Alphabets are allowed.");
      showModal("Only Alphabets are allowed.")
    }
  };

  //   for dropdown select start
  const [selectedCatSource, setSelectedCatSource] = useState("Select");
  const [catSourceDropdownVisible, setCatSourceDropdownVisible] =
    useState(false);
  const toggleDropdown = (dropdown) => {
    switch (dropdown) {
      case "category":
        setCatSourceDropdownVisible(!catSourceDropdownVisible);
        break;
      default:
        break;
    }
  };

  const handleOptionClick = (option, dropdown) => {
    switch (dropdown) {
      case "category":
        setSelectedCatSource(option.title);
        setCatSourceDropdownVisible(false);

        // Set defaults.type based on the selected option
        let typeValue;
        switch (option.title) {
          case "Select":
            typeValue = ""; // You can set it to an empty string or another default value
            break;
          case "Category":
            typeValue = 1;
            break;
          // Add more cases if needed
          default:
            typeValue = ""; // Set a default value if necessary
            break;
        }

        setDefaults((prevValue) => ({
          ...prevValue,
          type: typeValue,
        }));
        break;

      default:
        break;
    }
  };

  //   for dropdown select End

  const category = [
    {
      title: "Select",
    },
    {
      title: "Category",
    },
  ];

  return (
    <>
      <div className="box">
        <div className="q-add-categories-section">
          <div className="mt-10 mb-4">
            <form onSubmit={handleSubmit} enctype="multipart/form-data">
              <div className="q-add-categories-section-header">
                <span onClick={() => setVisible("DefaultsDetail")}>
                  <img src={AddNewCategory} alt="Add-New-Category" />
                  <span>Add New Defaults</span>
                </span>
              </div>
              <div className="q-add-categories-section-middle-form">
                <div className="q-add-categories-single-input">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={defaults.name}
                    onChange={inputChange}
                    onKeyPress={(e) => handleKeyPress(e)}
                  />
                </div>
                {errorMessage && (
                  <span className="error-message">{errorMessage}</span>
                )}
                {fieldErrors.name && (
                  <span className="error-message">{fieldErrors.name}</span>
                )}

                {/* <div className="q-add-categories-single-input mb-5">
                  <label
                    className="q-details-page-label"
                    htmlFor="orderSourceFilter"
                  >
                    Type
                  </label>
                  <div className="custom-dropdown">
                    <div
                      className="custom-dropdown-header"
                      onClick={() => toggleDropdown("category")}
                    >
                      <span className="selected-option ">
                        {selectedCatSource}
                      </span>
                      <img src={DownIcon} alt="Down Icon" className="w-8 h-8" />
                    </div>
                    {catSourceDropdownVisible && (
                      <div className="dropdown-content ">
                        <div
                          onClick={() =>
                            handleOptionClick("Select", "category")
                          }
                        >
                          Select
                        </div>
                        <div
                          onClick={() =>
                            handleOptionClick("Category", "category")
                          }
                        >
                          Category
                        </div>
                      </div>
                    )}
                  </div>
                </div> */}

                <Grid item xs={6}>
                  <label className="q-details-page-label">Type</label>
                  <SelectDropDown
                    listItem={category}
                    title={"title"}
                    onClickHandler={handleOptionClick}
                    selectedOption={selectedCatSource}
                    dropdownFor={"category"}
                  />
                </Grid>

                {fieldErrors.type && (
                  <span className="error-message">{fieldErrors.type}</span>
                )}

                <div
                  className={`h-1/2  h-[100px] mt-6 flex items-center justify-center border-2 border-dashed border-[#BFBFBF] bg-white rounded-lg mt-2  defaultDrag_div`}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={openFileInput}
                >
                  {defaults.image && defaults.image.base64 ? (
                    <>
                      <span
                        className="delete-image-icon img-DeleteIcon"
                        onClick={handleDeleteImage}
                      >
                        <img src={DeleteIcon} alt="delete-icon" />
                      </span>
                      <img
                        src={defaults.image.base64}
                        alt="Preview"
                        className="default-img"
                      />
                    </>
                  ) : (
                    <div className="flex-column">
                      <img
                        src={Upload}
                        style={{ transform: "translate(2.5rem, 0px)" }}
                        alt="Default"
                      />
                      <span>Default Image</span>
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
                    />
                  </div>
                </div>
                {fieldErrors.image && (
                  <span className="error-message">{fieldErrors.image}</span>
                )}
              </div>

              <div className="q-add-categories-section-middle-footer">
                <button className="quic-btn quic-btn-save">Add</button>
                <button
                  onClick={() => setVisible("DefaultsDetail")}
                  className="quic-btn quic-btn-cancle"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <AlertModal
      headerText={alertModalHeaderText}
      open={alertModalOpen}
      onClose={() => {setAlertModalOpen(false)}}
       />
    </>
  );
};

export default AddDefaults;
