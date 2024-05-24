import React, { useState, useEffect, useRef } from "react";
import AddNewCategory from "../../Assests/Taxes/Left.svg";
import DeleteIcon from "../../Assests/Category/deleteIcon.svg";
import DownIcon from "../../Assests/Dashboard/Down.svg";
import axios from "axios";
import { useAuthDetails } from './../../Common/cookiesHelper';
import Upload from "../../Assests/Category/upload.svg";
import { Link, useParams } from "react-router-dom";
import { BASE_URL, DEFAULTDATA, EDIT_DEFAULTS } from "../../Constants/Config";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Grid } from '@mui/material';
import SelectDropDown from "../../reuseableComponents/SelectDropDown";

const EditDefaults = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const {LoginGetDashBoardRecordJson,LoginAllStore,userTypeData} = useAuthDetails();
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

  const params = useParams();
  async function fetchData() {
    const getdefaultsData = {
      id: params.defaultsCode,
      token_id:userTypeData.token_id,
      login_type:userTypeData.login_type,
    };

    try {
      const response = await axios.post(
        BASE_URL + DEFAULTDATA,
        getdefaultsData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': `Bearer ${userTypeData.token}`
          },
        }
      );

      if (response.data.status === "Success") {
        return response.data.result;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchDataAndUpdateState = async () => {
      const res = await fetchData();
      if (res) {
        setDefaults({
          id: res[0].id,
          name: res[0].name,
          type: res[0].type,
          image: res[0].media,
        });
        const initialSelectedCatSource =
          res[0].type === "1" ? "Category" : "Select";
        setSelectedCatSource(initialSelectedCatSource);
      }
    };

    fetchDataAndUpdateState();
  }, [params.defaultsCode]);

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
    }

    // Validate type
    if (selectedCatSource === "Select") {
      newFieldErrors.type = "Type is required";
      valid = false;
    }

    // Validate image

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
    formData.append("id", defaults.id);
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
      const res = await axios.post(BASE_URL + EDIT_DEFAULTS, formData, {
        headers: { "Content-Type": "multipart/form-data",'Authorization': `Bearer ${userTypeData.token}` },
      });

      const data = await res.data.status;
      const update_message = await res.data.msg;
      if (data == "Success") {
        navigate("/users/view/unapprove/menu/defaults");
      } else if (
        data == "Failed" &&
        update_message == "Default Title Already Exist!"
      ) {
        setErrorMessage(update_message);
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
      const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
      if (!allowedExtensions.exec(file.name)) {
        alert(file.name + " is not an image. Only jpeg, png, jpg files can be uploaded.");
      } else {
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

  const myStyles = {
    display: "flex",
  };

  //   for dropdown select start
  const [selectedCatSource, setSelectedCatSource] = useState("");
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

  const category = [
    {
      title: "Select",
    },
    {
      title: "Category",
    },

  ];

  //   for dropdown select End

  return (
    <>
      <div className="q-category-main-page ">
        <div className="q-add-categories-section">
          <div className="mt-10 mb-4">
            <form onSubmit={handleSubmit} enctype="multipart/form-data">
              <div className="q-add-categories-section-header">
                <Link to={`/users/view/unapprove/menu/defaults`}>
                  <span style={myStyles}>
                    <img src={AddNewCategory} alt="Add-New-Category" />
                    <span>Edit Defaults</span>
                  </span>
                </Link>
              </div>
              <div className="q-add-categories-section-middle-form">
                <div className="q-add-categories-single-input">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={defaults.name}
                    onChange={inputChange}
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
                            <label className="q-details-page-label ">Type</label>
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
                  className={`h-1/2  h-[100px] mt-6 flex items-center justify-center border-2 border-dashed border-[#BFBFBF] bg-white rounded-lg mt-2 defaultDrag_div`}
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
                    <>
                      {defaults.image && defaults.image.length > 0 ? (
                        <div className="flex-column">
                          <img
                            src={`${BASE_URL}upload/defaults_images/${defaults.image}`}
                            alt="Default"
                            className="default-img"
                          />
                          <span
                            className="delete-image-icon img-DeleteIcon"
                            onClick={handleDeleteImage}
                          >
                            <img src={DeleteIcon} alt="delete-icon" />
                          </span>
                        </div>
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
                    </>
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
                {fieldErrors.image && !defaults.image && (
                  <span className="error-message">{fieldErrors.image}</span>
                )}
              </div>

              <div className="q-add-categories-section-middle-footer">
                <button className="quic-btn quic-btn-save">Save</button>
                <Link to={`/users/view/unapprove/menu/defaults`}>
                  <button className="quic-btn quic-btn-cancle">Cancel</button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditDefaults;
