import React, { useState }  from "react";
import { Box, Collapse, Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Input } from "@material-tailwind/react";

const MainResigtersetting = () => {
  const [alertmsg, setAlertMsg] = useState('');
  const [openAlert, setOpenAlert] = useState(true);

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
          <input type="checkbox" checked="checked" /> 
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
              <Input className="q_input_resigter" placeholder=" enter idle logout" />
            </div>
          </div>
          <div className="q_resigter_label">
            <label className="text-[#6A6A6A] ml-2" htmlFor="devicename">
              device name
            </label>
            <div className="w-full">
              <Input className="q_input_resigter" placeholder="enter device name"/>
            </div>
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
                <input type="radio" checked="checked" name="radio" />
                <span class="checkmark_section"></span>
              </label>

              <label class="q_setting_radio_resigter">
              Prompt to Create a Customer
                <input type="radio" checked="checked" name="radio" />
                <span class="checkmark_section"></span>
              </label>
              <label class="q_setting_radio_resigter">
              Require a Customer be Created
                <input type="radio" checked="checked" name="radio" />
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
