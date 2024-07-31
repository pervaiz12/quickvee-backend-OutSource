import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import {
  Box,
  CircularProgress,
  Divider,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
} from "@mui/material";

import backIcon from "../../Assests/Taxes/Left.svg";
import axios from "axios";
import { BASE_URL, GET_RELATED_PRODUCT,IMAGE_DUPLICATE } from "../../Constants/Config";
import { useAuthDetails } from "../../Common/cookiesHelper";

import CloseIcon from "../../Assests/Dashboard/cross.svg";
import Select from "react-select";
import ImportImage from "../../Assests/Defaults/Import_Image.svg";

const myStyles = {
  width: "60%",
  position: "absolute",
  top: "47%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  fontFamily: "'CircularSTDMedium', sans-serif !important",
};

export default function ImportImageModal({ productTitle,productId }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSuggestedProducts([]);
  };

  const [selectedStore, setSelectedStore] = useState("");
  const [selectedSuggestedProduct, setSelectedSuggestedProduct] = useState("");
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [selectedProductTitle, setSelectedProductTitle] = useState("");
  const [selectedImageArray, setSelectedImageArray] = useState([]);
  console.log("selectedImageArray", selectedImageArray);
  const { LoginGetDashBoardRecordJson, LoginAllStore, userTypeData } =
    useAuthDetails();
  let AuthDecryptDataDashBoardJSONFormat = LoginGetDashBoardRecordJson;

  const merchant_id = AuthDecryptDataDashBoardJSONFormat?.data?.merchant_id;

  const handleOptionClick = async (value) => {
    setSelectedStore(value.merchant_id);

    const data = {
      merchant_id: value.merchant_id,
      title: productTitle,
    };

    try {
      const res = await axios.post(BASE_URL + GET_RELATED_PRODUCT, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userTypeData?.token}`,
        },
      });
      if (res.data.status === true) {
        setSuggestedProducts(res.data.data);
      } else {
        setSuggestedProducts([]);
      }
    } catch (e) {
      // Handle error
    }
  };

  const defaultImage = `${BASE_URL}upload/products/MaskGroup4542.png`;

  const getInitialImageState = (media) => {
    return media
      .split(",")
      .map(
        (mediaItem) =>
          `${BASE_URL}upload/products/${selectedStore}/${mediaItem}`
      );
  };

  const [imageSources, setImageSources] = useState([]);

  useEffect(() => {
    setImageSources(
      suggestedProducts.map((product) => getInitialImageState(product.media))
    );
  }, [suggestedProducts]);

  const handleImageError = (productIndex, mediaIndex) => {
    setImageSources((prevImageSources) => {
      const newImageSources = [...prevImageSources];
      newImageSources[productIndex][mediaIndex] = defaultImage;
      return newImageSources;
    });
  };

  const checkImage = (src, onError) => {
    const img = new Image();
    img.src = src;
    img.onerror = onError;
  };

  useEffect(() => {
    imageSources.forEach((productImages, productIndex) => {
      productImages.forEach((src, mediaIndex) => {
        checkImage(src, () => handleImageError(productIndex, mediaIndex));
      });
    });
  }, [imageSources]);
  const handleProductChange = (event) => {
    let selectedProduct = event.target.value;
    let arr = suggestedProducts.find(
      (product) => selectedProduct === product.title
    );
    console.log("handleProductChange", arr);
    setSelectedImageArray([...arr.media.split(",")]);
  };
  const addImageToselectedImageArrayState = (media)=>{
    setSelectedImageArray((prevSelectedImageArray) => {
      if (prevSelectedImageArray.includes(media)) {
        // Remove the image if it's already in the array
        return prevSelectedImageArray.filter((item) => item !== media);
      } else {
        // Add the image if it's not in the array
        return [...prevSelectedImageArray, media];
      }
    });
  }
  const handleSubmitButton = async () =>{
    const data ={
      product_id:productId,
      fromstore:selectedStore,
      tostore:merchant_id,
      media_str:selectedImageArray.join(',')
    }
    try{
      const res = await axios.post(BASE_URL + IMAGE_DUPLICATE,data,{
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userTypeData?.token}`,
        }
      })
     
    }catch(e){

    }
  }
  return (
    <>
      <img
        className="cursor-pointer"
        onClick={handleOpen}
        src={ImportImage}
        height={"50px"}
        width={"50px"}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className="view-category-item-modal mass-inventory-modal"
          style={myStyles}
        >
          <div
            className="q-add-categories-section-header text-[18px]"
            style={{
              justifyContent: "space-between",
              fontFamily: "CircularSTDBook",
            }}
          >
            <span onClick={() => handleClose()}>
              <img src={backIcon} alt="Timesheet" className="w-6 h-6" />
              <span>{productTitle}</span>
            </span>
            <div className="cancel-btn">
              <img
                src={CloseIcon}
                className="cancel-image"
                onClick={() => handleClose()}
              />
            </div>
          </div>
          <Grid container sx={{ p: 2.5 }}>
            <Grid item xs={12}>
              <label>Product Status</label>
              <Select
                options={JSON.parse(localStorage.getItem("AllStore"))
                  .filter((item) => item.merchant_id !== merchant_id)
                  .map((item) => ({
                    value: item.id,
                    label: item.name,
                    merchant_id: item.merchant_id,
                  }))}
                onChange={handleOptionClick}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              onChange={handleProductChange}
            >
              <Grid container sx={{ px: 2.5 }}>
                {suggestedProducts.length > 0 ?
                  suggestedProducts.map((product, productIndex) => (
                    <React.Fragment key={productIndex}>
                      <Grid item xs={4} sx={{ px: 1 }}>
                        <Grid container>
                          <Grid item xs={12}>
                            <FormControlLabel
                              value={product.title}
                              control={<Radio />}
                              label={product.title}
                            />
                          </Grid>
                        </Grid>
                        <Grid container>
                          <Grid item xs={12}>
                            <Grid
                              container
                              direction="row"
                              justifyContent="start"
                              alignItems="center"
                            >
                              {product.media
                                .split(",")
                                .map((media, mediaIndex) => (
                                  <Grid
                                    key={mediaIndex}
                                    item
                                    sx={{ mx: 0.5, mb: 0.5 }}
                                    style={{
                                      backgroundImage: `url(${imageSources[productIndex]?.[mediaIndex]})`,
                                      backgroundSize: "cover",
                                      backgroundPosition: "center",
                                      height: "50px",
                                      width: "50px",

                                      borderRadius: "5px",
                                      border: `${
                                        selectedImageArray.includes(media)
                                          ? "2px solid #0a64f9"
                                          : "2px solid #ccc"
                                      }`,
                                    }}
                                    onClick={()=>addImageToselectedImageArrayState(media)}
                                  />
                                ))}
                            </Grid>
                          </Grid>
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                      </Grid>
                    </React.Fragment>
                  )): ""}
              </Grid>
            </RadioGroup>
          </Grid>

          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            sx={{ pb: 2.5, px: 2.5 }}
          >
            <Grid item>
              <div className="">
                <button onClick={handleSubmitButton} className="quic-btn quic-btn-save attributeUpdateBTN">
                  {false && (
                    <CircularProgress
                      color={"inherit"}
                      className="loaderIcon"
                      width={15}
                      size={15}
                    />
                  )}
                  Import Image
                </button>
                <button className="quic-btn quic-btn-cancle attributeUpdateBTN ms-8">
                  Cancel
                </button>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
