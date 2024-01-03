import React from "react";

const PaymentMethod = () => {
  return (
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
  );
};

export default PaymentMethod;
