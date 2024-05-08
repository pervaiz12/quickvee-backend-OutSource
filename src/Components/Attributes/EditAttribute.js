
import React, { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { editAttribute } from "../../Redux/features/Attributes/attributesSlice";
import CrossIcon from "../../Assests/Dashboard/cross.svg";
import { BASE_URL, ADD_ATTRIBUTE } from "../../Constants/Config";
import EditIcon from "../../Assests/Category/editIcon.svg";
import BasicTextFields from "../../reuseableComponents/TextInputField";

const EditDeliveryAddress = ({ attribute, allattributes }) => {

  const [nameExists, setNameExists] = useState("");
  const [old_title, setold_title] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [newAttribute, setNewAttribute] = useState("");
  const [submitmessage, setsubmitmessage] = useState("");

  const openModal = () => {
    setShowModal(true);
    setNewAttribute(attribute.title);
    setold_title(attribute.title);
  };


  const closeModal = () => {
    setShowModal(false);
  };

  const dispatch = useDispatch();
  const changeTittleHandler = (event) => {
    const inputValue = event.target.value;
    setNewAttribute(inputValue);
    const nameExists = allattributes.some(
      (item) => item.title === inputValue && item.id !== attribute.id
    );
    if (inputValue.trim() === "") {
      setErrorMessage("Attribute name cannot be blank");
      setNameExists(true);
    } else if (nameExists) {
      setErrorMessage("Attribute name already exists");
      setNameExists(true);
    } else {
      setErrorMessage("");
      setNameExists(false);
    }
  };
  const handleEditAttribute = async () => {
    console.log(attribute);
    if (nameExists) {
      return false;
    }
    const editItem = {
      merchant_id: "MAL0100CA",
      varient_id: attribute.id,
      title: newAttribute,
      old_title: attribute.title,
    };
    const data = editItem;
    console.log(data);
    const response = await axios.post(BASE_URL + ADD_ATTRIBUTE, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (response) {
      dispatch(editAttribute({ id: attribute.id, title: newAttribute }))
      setShowModal(false);

    } else {
      setsubmitmessage(response.data.message);
    }
  };


  setTimeout(() => {
    setsubmitmessage("")
  }, 4000);
  return (
    <>
      <div>
        <Button className="modal-main-button edit-delivery-address-button" onClick={openModal}>
          {/* <img src={Edit}  alt="edit" /> */}<img src={EditIcon} alt="" className="" />
        </Button>
        {showModal && (
          <div className="q-custom-modal-container" id="addtributes_">
            {/* Your modal JSX */}
            <div className="q-custom-modal-content" style={{height:"max-content",top:"unset"}}>
              {/* Your modal content */}
              <div className="q-custom-modal-header">
                  <div className="mt_card_header q_dashbaord_netsales">
                    <h1 className="">Update Attribute</h1>
                  </div>
                  <img src={CrossIcon} alt="icon" className="ml-auto mb-4 cursor-pointer" onClick={closeModal} />
              </div>
                <div className="my-2">
                  <div className="border-b border-[#ccc]"></div>
                </div>
              {/* ... other modal content ... */}
              <div className="title_attributes_section">
              <label className="mb-2">Title</label>
              {/* <input
                type="text"
                placeholder="Enter attribute title"
                className="q-custom-input-field"
                value={newAttribute}
                onChange={changeTittleHandler}
              /> */}
              <BasicTextFields
                    value={newAttribute}
                    onChangeFun={changeTittleHandler}
                    placeholder="Enter attribute title"
                  />
              <span className="input-error">
                {errorMessage !== "" ? errorMessage : ""}
              </span>
              </div>
              <div className='q-add-categories-section-middle-footer'>
                <button onClick={(handleEditAttribute)} className='quic-btn quic-btn-save'>
                  Update
                </button>
                <button onClick={(closeModal)} className='quic-btn quic-btn-cancle'>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
};
export default EditDeliveryAddress;
