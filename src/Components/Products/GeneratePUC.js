import React from "react";
import AddIcon from "../../Assests/Category/addIcon.svg";

const GeneratePUC = () => {
  return (
    <>
      <div className="mx-0">
        <div className="q-add-categories-single-input">
          <div className="q-category-bottom-header">
            <span>Pax 3</span>
            <p>
              Generate UPC
              {/* <img src={AddIcon} alt="add-icon" />{" "} */}
            </p>
          </div>
          <div className="mx-4 my-4">Pax - 3 - Small</div>
          <div className="qvrow">
            <div className="col-qv-3">
              <div className="q-add-categories-single-input">
                <label>Price</label>
                <div className="input_area">
                  <input class="" type="text" name="storename" value="" />
                </div>
              </div>
            </div>
            <div className="col-qv-3">
              <div className="q-add-categories-single-input">
                <label>Compare At Price</label>
                <div className="input_area">
                  <input class="" type="text" name="storename" value="" />
                </div>
              </div>
            </div>
            <div className="col-qv-3">
              <div className="q-add-categories-single-input">
                <label>Cost per item</label>
                <div className="input_area">
                  <input class="" type="text" name="storename" value="" />
                </div>
              </div>
            </div>
            <div className="col-qv-3">
              <div className="q-add-categories-single-input">
                <label>Profit ($)</label>
                <div className="input_area">
                  <input class="" type="text" name="storename" value="" />
                </div>
              </div>
            </div>
          </div>
          <div className="qvrow">
            <div className="col-qv-3">
              <div className="q-add-categories-single-input">
                <label>QTY</label>
                <div className="input_area">
                  <input class="" type="text" name="storename" value="" />
                </div>
              </div>
            </div>
            <div className="col-qv-3">
              <div className="q-add-categories-single-input">
                <label>UPC Code</label>
                <div className="input_area">
                  <input class="" type="text" name="storename" value="" />
                </div>
              </div>
            </div>
            <div className="col-qv-3">
              <div className="q-add-categories-single-input">
                <label>Custom Code</label>
                <div className="input_area">
                  <input class="" type="text" name="storename" value="" />
                </div>
              </div>
            </div>
            <div className="col-qv-3">
              <div className="q-add-categories-single-input">
                <label>Reorder Level</label>
                <div className="input_area">
                  <input class="" type="text" name="storename" value="" />
                </div>
              </div>
            </div>
          </div>


          <div className="flex flex-wrap gap-3 ">
          <label class="q_resigter_setting_section" style={{color:"#000",fontSize:"18px"}}>Track Quantity<input type="checkbox" name="ebt_type[]" value="1" /><span class="checkmark"></span></label>
          <label class="q_resigter_setting_section" style={{color:"#000",fontSize:"18px"}}>Continue selling when out of stock<input type="checkbox" name="ebt_type[]" value="1" /><span class="checkmark"></span></label>
          <label class="q_resigter_setting_section" style={{color:"#000",fontSize:"18px"}}>Check ID<input type="checkbox" name="ebt_type[]" value="1" /><span class="checkmark"></span></label>
          <label class="q_resigter_setting_section" style={{color:"#000",fontSize:"18px"}}>Disable<input type="checkbox" name="ebt_type[]" value="1" /><span class="checkmark"></span></label>
          <label class="q_resigter_setting_section" style={{color:"#000",fontSize:"18px"}}>Create this item for all linked locations<input type="checkbox" name="ebt_type[]" value="1" /><span class="checkmark"></span></label>

          </div>
        </div>
      </div>
    </>
  );
};

export default GeneratePUC;
