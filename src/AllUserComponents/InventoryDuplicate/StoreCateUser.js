import React from "react";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Box, Collapse, Alert, IconButton, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DownIcon from "../../Assests/Dashboard/Down.svg";
import ReCAPTCHA from "./ReCAPTCHA";
import { fetchMerchantsList } from "../../Redux/features/ExportInventory/ExportInventorySlice";
import { useSelector } from "react-redux";
import InventoryExportLogic from "./InventoryDuplicatLogic";
import { useAuthDetails } from "../../Common/cookiesHelper";
import SelectDropDown from "../../reuseableComponents/SelectDropDown";
import AlertModal from "../../reuseableComponents/AlertModal";
import { LuRefreshCw } from "react-icons/lu";
import BasicTextFields from "../../reuseableComponents/TextInputField";
import PasswordShow from "./../../Common/passwordShow";
import CircularProgress from "@mui/material/CircularProgress";
import ConfirmModal from "../../reuseableComponents/ConfirmModal";
import FinalConfirm from "../../reuseableComponents/FinalConfirm";

const StoreCateUser = () => {
  const [openAlert, setOpenAlert] = useState(true);
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [alertModalHeaderText, setAlertModalHeaderText] = useState("");

  const goToTop = () => {
    setsubmitmessage();
  };
  const {
    handleStoreInput,
    dupplicateInventory,
    dupplicateSettings,
    submitmessage,
    setsubmitmessage,
    values,
    alertOpen,
    modalHeaderText,
    userInput,
    setUserInput,
    captchaText,
    setCaptchaText,
    loader,
    setLoader,
    confirmModalOpen,
    setConfirmModalOpen,
    setConfirmFinalModalOpen,
    confirmfinalModalOpen
  } = InventoryExportLogic();
  console.log("alertOpen",alertOpen)
  console.log("modalHeaderText",modalHeaderText)

  const { userTypeData } = useAuthDetails();
  const {handleCoockieExpire,getUnAutherisedTokenMessage}=PasswordShow()
  const [MerchantList, setMerchantList] = useState();
  const MerchantListData = useSelector((state) => state.ExportInventoryData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!MerchantListData.loading && MerchantListData.MerchantListData) {
      setMerchantList(MerchantListData.MerchantListData);
    }
  }, [MerchantListData, MerchantListData.loading]);

  useEffect(() => {
    // dispatch(fetchMerchantsList(userTypeData));
    getFetchMerchantsList()
  }, []);

  const getFetchMerchantsList=async()=>{
    try{
      const data = {
        ...userTypeData
      };
      if (data) {
        await dispatch(fetchMerchantsList(data)).unwrap();
      }
    }catch(error){
      handleCoockieExpire()
      getUnAutherisedTokenMessage()
    }
  }

  // for change dropdown start
  const myStyles = {
    height: "300px",
    overflow: "auto",
  };
  const [selectedStorefrom, setSelectedStorefrom] =
    useState("-- Select Store --");
  const [selectedStoreto, setSelectedStoreto] = useState("-- Select Store --");
  const [storeFromDropdownVisible, setStoreFromDropdownVisible] =
    useState(false);
  const [storeToDropdownVisible, setStoreToDropdownVisible] = useState(false);

  const toggleDropdown = (dropdown) => {
    switch (dropdown) {
      case "storefrom":
        setStoreFromDropdownVisible(!storeFromDropdownVisible);
        break;
      case "storeto":
        setStoreToDropdownVisible(!storeToDropdownVisible);
        break;
      default:
        break;
    }
  };

  const [storeFromError, setStoreFromError] = useState("");
  const [storeToError, setStoreToError] = useState("");

  const showModal = (headerText,img) => {
    setAlertModalHeaderText(headerText);
    setAlertModalOpen(true);
  };

  useEffect(() => {
    if(alertOpen){
      if(modalHeaderText === "Both the stores cannot be same."){
        setAlertModalHeaderText("Both the stores cannot be same.")
        setAlertModalOpen(alertOpen);
      }else if(modalHeaderText === "Please Fill Captcha Correctly!"){
        setAlertModalHeaderText("Please Fill Captcha Correctly!")
        setAlertModalOpen(alertOpen);
      }
    }
  }, [alertOpen,modalHeaderText]);

  // const handleOptionClick = async (option, dropdown) => {
  const handleOptionClick = async (value, dropdown) => {
    switch (dropdown) {
      case "copyFrom":
        setSelectedStorefrom(value?.title ? value?.title : value);
        setStoreFromDropdownVisible(false);
        if (value?.id !== null) {
          handleStoreInput({
            target: { name: "store_name_from", value: value?.id },
          });
          setStoreFromError("");
        } else {
          setStoreFromError("This field is required");
        }
        break;
      case "copyTo":
        setSelectedStoreto(value?.title ? value?.title : value);
        setStoreToDropdownVisible(false);
        if (value?.id !== null) {
          handleStoreInput({
            target: { name: "store_name_to", value: value?.id },
          });
          setStoreToError("");
        } else {
          setStoreToError("This field is required");
        }
        break;
      default:
        break;
    }
  };

  

  const dupplicateInventoryHandler = async (e) => {
    if (selectedStorefrom === "-- Select Store --") {
      // alert("Please select Store From");
      // showModal("Please select Store From");
      showModal("Select where you want to move inventory from");
    } else if (selectedStoreto === "-- Select Store --") {
      // alert("Please select Store To");
      showModal("Please select Store To");
    } else {
      await dupplicateInventory(e);
      setSelectedStorefrom("-- Select Store --");
      setSelectedStoreto("-- Select Store --");
    }
  };

  const dupplicateSettingsHandler = (e) => {
    if (selectedStorefrom === "-- Select Store --") {
      // alert("Please select Store From");
      // showModal("Please select Store From");
      showModal("Select where you want to move inventory from");
    } else if (selectedStoreto === "-- Select Store --") {
      // alert("Please select Store To");
      showModal("Please select Store To");
    } else {
      dupplicateSettings(e);
      setSelectedStorefrom("-- Select Store --");
      setSelectedStoreto("-- Select Store --");
    }
  };

  // for change dropdown End

  // for captcha start

  
   
    const canvasRef = useRef(null); 
  
    useEffect(() => { 
        const canvas = canvasRef.current; 
        const ctx = canvas.getContext('2d'); 
        initializeCaptcha(ctx); 
    }, []); 
  
    const generateRandomChar = (min, max) => 
        String.fromCharCode(Math.floor 
            (Math.random() * (max - min + 1) + min)); 
  
    const generateCaptchaText = () => { 
        let captcha = ''; 
        for (let i = 0; i < 3; i++) { 
            captcha += generateRandomChar(65, 90); 
            // captcha += generateRandomChar(97, 122); 
            captcha += generateRandomChar(48, 57); 
        } 
        return captcha.split('').sort( 
            () => Math.random() - 0.5).join(''); 
    }; 
  
    const drawCaptchaOnCanvas = (ctx, captcha) => { 
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); 
        const textColors = ['rgb(0,0,0)', 'rgb(130,130,130)']; 
        const letterSpace = 150 / captcha.length; 
        for (let i = 0; i < captcha.length; i++) { 
            const xInitialSpace = 25; 
            ctx.font = '20px Roboto Mono'; 
            ctx.fillStyle = textColors[Math.floor( 
                Math.random() * 2)]; 
            ctx.fillText( 
                captcha[i], 
                xInitialSpace + i * letterSpace, 
                // Randomize Y position slightly 
                Math.floor(Math.random() * 16 + 25), 
                100 
            ); 
        } 
    }; 
  
    const initializeCaptcha = (ctx) => { 
        setUserInput(''); 
        const newCaptcha = generateCaptchaText(); 
        setCaptchaText(newCaptcha); 
        drawCaptchaOnCanvas(ctx, newCaptcha); 
    }; 
  
    const handleUserInputChange = (e) => { 
        setUserInput(e.target.value); 
    }; 
   
  // for captcha End

  const confirmfun = () => {
    setConfirmModalOpen(false)
    setConfirmFinalModalOpen(true)
  }
  const confirmFinalfun = async () => {
    console.log("function call kardo")
  }

  return (
    <>
      <div className="q-order-main-page">
        <div className=" box_shadow_div_order ">
          {/* <div className="alert">
            {submitmessage && (
              <Box
                sx={{
                  width: "100%",
                  position: "relative",
                  top: "2rem",
                  marginLeft: "auto",
                }}
                className={submitmessage ? "form-submit-info-message" : ""}
              >
                <Collapse in={openAlert}>
                  <Alert
                    severity="success"
                    action={
                      <IconButton
                        className="info-close-icon"
                        aria-label="close"
                        color="success"
                        size="small"
                        onClick={goToTop}
                      >
                        <CloseIcon />
                      </IconButton>
                    }
                    sx={{ mb: 2 }}
                  >
                    {submitmessage}
                  </Alert>
                </Collapse>
              </Box>
            )}
          </div> */}
          <div className="q-add-categories-section-header">
            <span>
              {/* <img src={()} alt="Add-New-Category" /> */}
              <span>Inventory Duplicate</span>
            </span>
          </div>

          <div className="q-order-page-container mx-6 mt-6 md:flex-col d-flex">
            {/* Employee Dropdown */}
            <Grid container spacing={4} className="">
              <Grid item xs={6} sm={12} md={6}>
                <label
                  className="q-details-page-label"
                  htmlFor="storefromFilter"
                >
                  Copy from this store
                </label>
                <SelectDropDown
                  listItem={
                    MerchantList?.length &&
                    MerchantList?.map((item) => ({
                      title: item?.name,
                      id: item?.merchant_id,
                    }))
                  }
                  heading={"-- Select Store --"}
                  title={"title"}
                  selectedOption={selectedStorefrom}
                  onClickHandler={handleOptionClick}
                  dropdownFor={"copyFrom"}
                  // onClickHandler={(handleOptionClick, "copyFrom")}
                  name="permission"
                />
              </Grid>

              <Grid item xs={6} sm={12} md={6}>
                <label className="q-details-page-label" htmlFor="storetoFilter">
                  Paste to this store
                </label>
                <SelectDropDown
                  listItem={
                    MerchantList?.length &&
                    MerchantList?.map((item) => ({
                      title: item?.name,
                      id: item?.merchant_id,
                    }))
                  }
                  heading={"-- Select Store --"}
                  title={"title"}
                  selectedOption={selectedStoreto}
                  onClickHandler={handleOptionClick}
                  dropdownFor={"copyTo"}
                  name="permission"
                />
              </Grid>
            </Grid>
          </div>

          <div className="q-order-page-container ml-8 md:flex-col d-inline-block"></div>

          <div className="q-add-inventory-section-header mx-2">
            <div class="qv_checkbox">
              <label class="qv_checkbox_add_checkmark_label">
                Want to Replicated UPC's for inventory
                <input
                  type="checkbox"
                  id="upc_check"
                  name="upc_check"
                  value={values.upc_check}
                  onChange={handleStoreInput}
                />
                <span class="qv_add_checkmark"></span>
              </label>
              <span className="input-error">
                {values.errors.upc_check !== "" ? values.errors.upc_check : ""}
              </span>
            </div>
          </div>


          {/* for captcha start  */}

              <div className="captcha_wrapper ">
                  <div className="captue_Img_Reload"> 
                    <canvas ref={canvasRef} width="200" height="50" onClick={  () => initializeCaptcha(canvasRef.current.getContext('2d'))}> 
                    </canvas> 
                    <button id="reload-button" onClick={   () => initializeCaptcha(canvasRef.current.getContext('2d'))}> 
                        <LuRefreshCw /> 
                    </button> 
                  </div>
              </div>
              <div className="q-order-page-container mx-6 mb-6 md:flex-col d-flex">
                <Grid container spacing={4} >
                  <Grid item xs={6} sm={12} md={6}>
                    <BasicTextFields
                    type="text"
                    id="user-input"
                    name="actual_amt"
                    onChangeFun={handleUserInputChange}
                    value={userInput} 
                    placeholder={"Enter the text in the image"}
                    /> 
                  </Grid>
                </Grid>
                </div>
          {/* for captcha End */}

          <div
            className="q-add-categories-section-middle-footer "
            style={{ justifyContent: "start" }}
          >
            <button
              className="quic-btn quic-btn-save"
              // onClick={dupplicateInventory}
              onClick={(e) => dupplicateInventoryHandler(e)}
              disabled={loader}
            >
              Duplicate Inventory
            </button>
            <button
              className="quic-btn quic-btn-cancle"
              // onClick={dupplicateSettings}
              onClick={(e) => dupplicateSettingsHandler(e)}
              disabled={loader}
            >
              Duplicate setting
            </button>
          </div>
        </div>
      </div>
      <AlertModal
      headerText={alertModalHeaderText}
      open={alertModalOpen}
      onClose={() => {setAlertModalOpen(false)}}
       />
       <ConfirmModal
            headerText="The existing Variants of the selected Store 2 Must be same as selected Store 1 Variants. Do you want to proceed?"
            open={confirmModalOpen}
            onClose={() => {setConfirmModalOpen(false)}}
            onConfirm={confirmfun}
        />
        <FinalConfirm
            headerText="Final Confirmation!!!"
            open={confirmfinalModalOpen}
            onClose={() => {setConfirmFinalModalOpen(false)}}
            onConfirm={confirmFinalfun}
        />
    </>
  );
};

export default StoreCateUser;
