import React, { useState, forwardRef } from "react";
import { Box, Modal } from "@mui/material";
import DeleteIcon from "../Assests/Category/deleteIcon.svg";
import Slide from "@mui/material/Slide";
import Storefrom from "../Assests/ModalImages/storefrom.svg";
import Bothsame from "../Assests/ModalImages/bothsame.svg";
import Categorie from "../Assests/ModalImages/nocategory.svg";
import OneCategorie from "../Assests/ModalImages/atlestone.svg";
import Oneproduct from "../Assests/ModalImages/altlestoneProduct.svg";
import Range from "../Assests/ModalImages/range.svg";
import Image from "../Assests/ModalImages/imageonly.svg";
import Less from "../Assests/ModalImages/less.svg";
import Csv from "../Assests/ModalImages/csv.svg";
import Alphabate from "../Assests/ModalImages/alphabate.svg";
import Move from "../Assests/ModalImages/moved.svg";
import calender from "../Assests/ModalImages/calender.svg";
import timestop from "../Assests/ModalImages/timestop.svg";
import time from "../Assests/ModalImages/time.svg";

const AlertModal = ({ headerText, otherMSG, open, onClose }) => {
  const myStyles = {
    width: "45vh",
    position: "absolute",
    top: "40%",
    left: "40%",
    transform: "translate(-50%, -50%)",
    fontFamily: "'CircularSTDMedium', sans-serif !important",
  };

  const imageDisplay = (headerText) => {
    switch (headerText) {
      case "Select where you want to move inventory from":
      case "Select where you want to move category from":
      case "Select where you want to move product from":
      case "Please select Store To":
        return Storefrom;
      case "Both the stores cannot be same.":
        return Bothsame;
      case "Please select at least on category":
        return OneCategorie;
      case "Please select at least on product":
      case "Product is already added.":
        return Oneproduct;
      case "No categories found is not a Category":
      case "Something went wrong !":
        return Categorie;
      case "You can select up to 5 options.":
        return Range;
      case "Only jpeg, png, jpg files can be uploaded":
        return Image;
      case "Minimum order amount must be greater than the discount amount.":
      case "Advance day count must be less than 12":
        return Less;
      case "Only files with .CSV extension is supported":
        return Csv;
      case "Only alphabet characters are allowed":
        return Alphabate;
      case "You can't drop outside the list!":
      case "You haven't moved the item!":
        return Move;
      case "Start date cannot be the same as the end date":
      case "End date cannot be the same as the start date":
      case "Start date and end date are required":
      case "Start date cannot be greater than the end date":
      case "End date cannot be less than the start date":
        return calender;
      case "End time cannot be empty":
        return timestop;
      case "The end time cannot be the same as or before the start time":
      case "The selected time range overlaps with an existing slot":
        return time;

      default:
        return DeleteIcon;
    }
  };
  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
        className="delete-modal-outer-div"
        closeAfterTransition
      >
        <Slide direction="down" in={open} mountOnEnter unmountOnExit>
          <Box className="delete-Box-modal" style={myStyles}>
            <div className="delete-modal">
              <div className="delete-modal-content">
                <img
                  src={imageDisplay(headerText)}
                  alt={`Delete-icon`}
                  loading="lazy"
                />
                <span>
                  {headerText ? headerText : ""} <br />{" "}
                  {otherMSG ? (
                    <>
                      <br />
                      {otherMSG}
                    </>
                  ) : (
                    ""
                  )}
                </span>
              </div>
              <div className="info_alertBTN">
                <button className="save_btn" onClick={onClose}>
                  Ok
                </button>
              </div>
            </div>
          </Box>
        </Slide>
      </Modal>
    </>
  );
};

export default AlertModal;
