import React from 'react';


const ResigterSettingdata = () => {
  return (
    <div>
      {/* resigter block */}
      <div className=''>
        <div className="q-resigtersetting-bottom-section">

          <div className='q_setting_main_Section'>Register Settings</div>

          <div className='q_resigter_checkboxfiled mt-8'>
          
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
  );
};

export default ResigterSettingdata;


