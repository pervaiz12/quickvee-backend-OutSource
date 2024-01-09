import React, { useState,useEffect }  from "react";
import { useSelector, useDispatch } from "react-redux";
import {fetchRegisterSettingsData} from "../../../Redux/features/StoreSettings/RegisterSettings/RegisterSettingsSlice";
import { Box, Collapse, Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Input } from "@material-tailwind/react";
import RegisterSettingFormLogic from "./RegisterSettingFormLogic";

const MainResigtersetting = () => {
  const [alertmsg, setAlertMsg] = useState('');
  const [openAlert, setOpenAlert] = useState(true);
  const RegisterSettings= useSelector((state) => state.RegisterSettingsData);
  const dispatch = useDispatch();
  useEffect(() => {
      let data = {
          merchant_id: "MAL0100CA",
      };
      if (data) {
          dispatch(fetchRegisterSettingsData(data));
      }
  }, [])

  useEffect(() => {
    console.log(values)

  }, [RegisterSettings])
  
  const {
    handleEditEmpPermissionInput,
    values,
    handleEditEmpPermission,
    submitmessage,
    showModal , 
    setShowModal ,
    scrollRef,
    setsubmitmessage,
  } = RegisterSettingFormLogic({RegisterSettings});

  const handleSubmit = () => {
   
    const submissionSuccessful = true;

    if (submissionSuccessful) {
   
      setAlertMsg('Form submitted successfully!');
      setOpenAlert(true);
    } else {
      
      setAlertMsg('Form submission failed.');
      setOpenAlert(true);
    }
  };

  const goToTop = () => {

  };
  return (
    <>
    {/* resigter method */}
      <div className="q-resigtersetting-main-page">
        <div className="q-resigtersetting-top-detail-section">
        <div className=''>
        <div className="q-resigtersetting-bottom-section">

          <div className='q_setting_main_Section'>Register Settings</div>

          <div className='q_resigter_checkboxfiled flex-wrap mt-8'>
          
            <ul className="custom-checkbox-list flex space-x-5">
        
        <label class="q_resigter_setting_section">Stock Prompt
          <input type="checkbox" name="regi_setting[]" checked="checked" value={values.regi_setting}/> 
          <span class="checkmark"></span>
        </label>
        
        <label class="q_resigter_setting_section">Combine Lines
          <input type="checkbox" />
          <span class="checkmark"></span>
        </label>
        
        <label class="q_resigter_setting_section">Customer Last Price Prompt
          <input type="checkbox" />
          <span class="checkmark"></span>
        </label>
        <label class="q_resigter_setting_section">Prompt Customer Info on PinPad
          <input type="checkbox" />
          <span class="checkmark"></span>
        </label>
        <label class="q_resigter_setting_section">Denomination
        <input type="checkbox" />
          <span class="checkmark"></span>
        </label>
            
                  
                    </ul>
          </div>
        </div>
      </div>
        </div>
      </div>

{/* payment method */}

      <div className="q-resigtersetting-main-page">
        <div className="q-resigtersetting-top-detail-section">
        <div>
      <div className="q-resigtersetting-bottom-section">
        <div className="q_setting_main_Section">Paymwent Method</div>

        <div className="q_resigter_checkboxfiled mt-8">
        <ul className="custom-checkbox-list flex space-x-5">
        
        <label class="q_resigter_setting_section">Food EBT
          <input type="checkbox" checked="checked" /> 
          <span class="checkmark"></span>
        </label>
        
        <label class="q_resigter_setting_section">Cash EBT
          <input type="checkbox" />
          <span class="checkmark"></span>
        </label>
        
        <label class="q_resigter_setting_section">Gift Card
          <input type="checkbox" />
          <span class="checkmark"></span>
        </label>
        <label class="q_resigter_setting_section">Gift Card
          <input type="checkbox" />
          <span class="checkmark"></span>
        </label>
        <label class="q_resigter_setting_section">Gift Card
        <input type="checkbox" />
          <span class="checkmark"></span>
        </label>
            
                  
                    </ul>
        </div>
      </div>
    </div>
        </div>
      </div>
     
{/* discount promote */}
      <div className="q-resigtersetting-main-page">
        <div className="q-resigtersetting-top-detail-section">
        <div>
      <div className="">
        <div className="q-resigtersetting-bottom-section">
          <div className="q_setting_main_Section">Discount Prompt</div>

          <div className="q_resigter flex-wrap mt-8">
            <ul className="custom-checkbox-list flex space-x-5">
              <label class="q_setting_radio_resigter">
                No Reason
                <input type="radio" checked="checked" name="radio" />
                <span class="checkmark_section"></span>
              </label>

              <label class="q_setting_radio_resigter">
                Ask Reason
                <input type="radio" checked="checked" name="radio" />
                <span class="checkmark_section"></span>
              </label>
            </ul>
          </div>
        </div>



        <div className="q-resigtersetting-bottom-section mt-8">
          <div className="q_setting_main_Section">Round Invoice</div>

          <div className="q_resigter flex-wrap mt-8">
            <ul className="custom-checkbox-list flex space-x-5">
              <label class="q_setting_radio_resigter">
              Disabled
                <input type="radio" checked="checked" name="radio" />
                <span class="checkmark_section"></span>
              </label>

              <label class="q_setting_radio_resigter">
              $0.05
                <input type="radio" checked="checked" name="radio" />
                <span class="checkmark_section"></span>
              </label>
              <label class="q_setting_radio_resigter">
              $0.10
                <input type="radio" checked="checked" name="radio" />
                <span class="checkmark_section"></span>
              </label>
              <label class="q_setting_radio_resigter">
              $0.10
                <input type="radio" checked="checked" name="radio" />
                <span class="checkmark_section"></span>
              </label>
              <label class="q_setting_radio_resigter">
              $0.10
                <input type="radio" checked="checked" name="radio" />
                <span class="checkmark_section"></span>
              </label>
              <label class="q_setting_radio_resigter">
              $0.10
                <input type="radio" checked="checked" name="radio" />
                <span class="checkmark_section"></span>
              </label>
              <label class="q_setting_radio_resigter">
              $0.10
                <input type="radio" checked="checked" name="radio" />
                <span class="checkmark_section"></span>
              </label>
              <label class="q_setting_radio_resigter">
              $0.10
                <input type="radio" checked="checked" name="radio" />
                <span class="checkmark_section"></span>
              </label>

            </ul>
          
          </div>
        </div>
      </div>
    </div>
        </div>
      </div>
      {/* quick add */}
      <div className="q-resigtersetting-main-page">
        <div className="q-resigtersetting-top-detail-section">
        <div className=''>
      <div className="q-resigtersetting-bottom-section">

        <div className='q_setting_main_Section'>
        Quick Add</div>

<div className='text-sm text-[#545454] CircularSTDBook'>Quick Add
If bar code scanned is not found</div>
<div className="q_resigter flex-wrap mt-8">
            <ul className="custom-checkbox-list flex space-x-5">
              <label class="q_setting_radio_resigter">
              Display ‘Item not Found’
                <input type="radio" checked="checked" name="radio" />
                <span class="checkmark_section"></span>
              </label>

              <label class="q_setting_radio_resigter">
              Quick Enter, Forced
                <input type="radio" checked="checked" name="radio" />
                <span class="checkmark_section"></span>
              </label>
              <label class="q_setting_radio_resigter">
              Quick Enter, Prompt
                <input type="radio" checked="checked" name="radio" />
                <span class="checkmark_section"></span>
              </label>
              <label class="q_setting_radio_resigter">
              Full Enter, Forced
                <input type="radio" checked="checked" name="radio" />
                <span class="checkmark_section"></span>
              </label>
            </ul>
          </div>

     
      </div>
    </div>
    </div>
    </div>
 {/* device  section */}

      <div className="q-resigtersetting-main-page">
        <div className="q-resigtersetting-top-detail-section">
        <div>
      <div className="q-resigtersetting-bottom-section">
        <div className="q_setting_main_Section"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="q_resigter_label">
            <label className="text-[#6A6A6A] ml-2" htmlFor="idlelogout">
              Idle Logout
            </label>
            <div className="w-full">
              <Input className="q_input_resigter" name="idel_logout" value={values.idel_logout} placeholder="Enter idle logout" />
              <span className="input-error">
                {values.errors.idel_logout !== "" ? values.errors.idel_logout : ""}
              </span>
            </div>
          </div>
          <div className="q_resigter_label">
            <label className="text-[#6A6A6A] ml-2" htmlFor="devicename">
              device name
            </label>
            <div className="w-full">
              <Input className="q_input_resigter" name="device_name" value={values.devicename} placeholder="Enter device name"/>
            </div>
            <span className="input-error">
                {values.errors.device_name !== "" ? values.errors.device_name : ""}
            </span>
          </div>
        </div>
      </div>
    </div>
        </div>
      </div>




{/* customer loyalty promote */}
      <div className="q-resigtersetting-main-page">
        <div className="q-resigtersetting-top-detail-section">
        <div className=''>
      <div className="q-resigtersetting-bottom-section">

        <div className='q_setting_main_Section'>
             Customer Loyalty Prompt</div>

<div className='text-sm text-[#545454] CircularSTDBook'>When a loyalty card is not associated with a Customer:</div>
<div className="q_resigter flex-wrap mt-8">
            <ul className="custom-checkbox-list flex space-x-5">
              <label class="q_setting_radio_resigter">
              All the Sale
                <input type="radio"  name="customer_loyalty" value="1" checked={values.customer_loyalty === "1" }  />
                <span class="checkmark_section"></span>
              </label>
              <label class="q_setting_radio_resigter">
              Prompt to Create a Customer
                <input type="radio"  name="customer_loyalty" value="2" checked={values.customer_loyalty === "2" }  />
                <span class="checkmark_section"></span>
              </label>
              <label class="q_setting_radio_resigter">
              Require a Customer be Created
                <input type="radio" name="customer_loyalty" value="3" checked={values.customer_loyalty === "3" } />
                <span class="checkmark_section"></span>
              </label>
            </ul>
          </div>

     
      </div>
    </div>

    <div className="q-resigtersetting-bottom-section text-center mt-12">
                <button onClick={handleSubmit} className="bg-[#0A64F9] text-white px-4 py-2 rounded-md">
                  Submit
                </button>
                {alertmsg && (
        <Box sx={{ width: '40%', position: 'relative',top: '2rem', marginLeft: 'auto' }} className={alertmsg ? 'form-submit-info-message' : ''}>
          <Collapse in={openAlert}>
            <Alert
              severity="info"
              action={
                <IconButton
                  className="info-close-icon"
                  aria-label="close"
                  color="info"
                  size="small"
                  onClick={goToTop}
                >
                  <CloseIcon />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {alertmsg}
            </Alert>
          </Collapse>
        </Box>
      )}
              </div>
        </div>
      </div>
   
    </>
  );
};

export default MainResigtersetting;
