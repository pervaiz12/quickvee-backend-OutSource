import { Box, Modal } from "@mui/material";
import React, { useState, useEffect } from "react";
import { BASE_URL, PRODUCT_LIST_BY_CATEGORY } from "../../Constants/Config";
import Table from 'react-bootstrap/Table';
import axios from "axios";

const ViewItemsModal = ({ selectedView, onViewClick }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [itemsData, setItemsData] = useState([]);
  const myStyles = {
    width: "50rem",
    transform: "translate(18rem, 4.5rem)",
  };

  const fetchCategoryProductData = async () => {
    const data = {
      cat_id: selectedView.id,
    };
    try {
      const response = await axios.post(
        BASE_URL + PRODUCT_LIST_BY_CATEGORY,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response.data.status === true) {
        setItemsData(response.data.result)
      }
    } catch (error) {
      console.error('API Error:', error);
    }
  };


  useEffect(() => {
    // console.log(selectedView)
    fetchCategoryProductData()
  }, [selectedView])
  
  const handleClick = () => {
    handleOpen(true);
    onViewClick(selectedView);
  };

  return (
    <>
      <div>
        <span
          className="categories-items categories-items-btn"
          onClick={handleClick}
        >
          View Items
        </span>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="view-category-item-modal" style={myStyles}>
            <div className="q-add-categories-section-header">
              <span>
                <span>{selectedView.title}</span>
              </span>
            </div>
            <div className="view-category-item-modal-header">
              {itemsData && itemsData.length >= 1 ? (

                            <Table striped style={{ marginLeft: '20px' }}>
                            <tbody>
                            {itemsData.map((item, index) => (

                                <tr key={index}>{item.title}</tr>
                            ))}
                            </tbody>
                            </Table>
                        ) : (
                            <p>No product data available</p>
                        )}
            </div>

            <div className="q-add-categories-section-middle-footer">
              <button
                onClick={() => handleClose()}
                className="quic-btn quic-btn-cancle"
              >
                Ok{" "}
              </button>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default ViewItemsModal;
