import React from "react";

const ResigterDiscount = () => {
  return (
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

          <div className="q_resigter_checkboxfiled mt-8">
            <ul className="custom-checkbox-list flex space-x-5">
              <label class="q_resigter_setting_section">
                Disabled
                <input type="radio" checked="checked" name="radio" />
                <span class="checkmark_section"></span>
              </label>
              <label class="q_resigter_setting_section">
                $0.05
                <input type="radio" checked="checked" name="radio" />
                <span class="checkmark_section"></span>
              </label>
              <label class="q_resigter_setting_section">
                $0.10
                <input type="radio" checked="checked" name="radio" />
                <span class="checkmark_section"></span>
              </label>
              <label class="q_resigter_setting_section">
                $1.00
                <input type="radio" checked="checked" name="radio" />
                <span class="checkmark_section"></span>
              </label>
              <label class="q_resigter_setting_section">
                Nearest $0.05
                <input type="radio" checked="checked" name="radio" />
                <span class="checkmark_section"></span>
              </label>
              <label class="q_resigter_setting_section">
                Nearest $0.10
                <input type="radio" checked="checked" name="radio" />
                <span class="checkmark_section"></span>
              </label>
              <label class="q_resigter_setting_section">
                Nearest $0.05
                <input type="radio" checked="checked" name="radio" />
                <span class="checkmark_section"></span>
              </label>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResigterDiscount;

