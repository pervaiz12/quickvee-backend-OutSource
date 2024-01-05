import React from "react";
import "../../../Styles/ReceiptMainpage.css";
import { Input } from "@material-tailwind/react";

const ReceiptMainpage = () => {
  return (
    <>
      <div className="q-reciptpage-main-page">
        <div className="q-reciptpage-top-detail-section">
          <div className="">
            <div className="q-reciptpage-bottom-section">
              <div className="q_setting_main_Section mb-12">Receipt</div>
              <div className="text-black mt-12 q_receipt_size_page">
                Receipt Size
              </div>
              <div className="q_resigter flex-wrap mt-8">
                <ul className="custom-checkbox-list flex space-x-5">
                  <label className="q_receipt_page_main">
                    Receipt
                    <input type="radio" name="receiptSize" className="radio-custom" checked />
                    <span className="checkmark_section"></span>
                  </label>

                  <label className="q_receipt_page_main">
                    Short Receipt
                    <input type="radio" name="receiptSize" />
                    <span className="checkmark_section"></span>
                  </label>
                  {/* Add 'name' attribute with unique values for each set of radio buttons */}
                  <label className="q_receipt_page_main">
                    Full
                    <input type="radio" name="receiptSize" />
                    <span className="checkmark_section"></span>
                  </label>
                  <label className="q_receipt_page_main">
                    Professional
                    <input type="radio" name="receiptSize" />
                    <span className="checkmark_section"></span>
                  </label>
                </ul>
              </div>

              {/* Print Invoices */}
              <div className="text-black mt-12 q_receipt_size_page">
                Print Invoices
              </div>
              <div className="q_resigter flex-wrap mt-8">
                <ul className="custom-checkbox-list flex space-x-5">
                  <label className="q_receipt_page_main">
                    No
                    <input type="radio" name="printInvoices" checked />
                    <span className="checkmark_section"></span>
                  </label>

                  <label className="q_receipt_page_main">
                    Yes
                    <input type="radio" name="printInvoices" />
                    <span className="checkmark_section"></span>
                  </label>
                  <label className="q_receipt_page_main">
                    Prompt
                    <input type="radio" name="printInvoices" />
                    <span className="checkmark_section"></span>
                  </label>
                </ul>
              </div>

              {/* Professional Logo */}
              <div className="text-black mt-12 q_receipt_size_page">
                Professional Logo
              </div>
              <div className="q_resigter flex-wrap mt-8">
                <ul className="custom-checkbox-list flex space-x-5">
                  <label className="q_receipt_page_main">
                    None
                    <input type="radio" name="professionalLogo" checked />
                    <span className="checkmark_section"></span>
                  </label>

                  <label className="q_receipt_page_main">
                    Logo
                    <input type="radio" name="professionalLogo" />
                    <span className="checkmark_section"></span>
                  </label>
                  <label className="q_receipt_page_main">
                    Company Info
                    <input type="radio" name="professionalLogo" />
                    <span className="checkmark_section"></span>
                  </label>
                  <label className="q_receipt_page_main">
                    Logo & Company Info
                    <input type="radio" name="professionalLogo" />
                    <span className="checkmark_section"></span>
                  </label>
                </ul>
              </div>

              {/* Print Amount Saved */}
              <div className="text-black mt-12 q_receipt_size_page">
                Print Amount Saved
              </div>
              <div className="q_resigter flex-wrap mt-8">
                <ul className="custom-checkbox-list flex space-x-5">
                  <label className="q_receipt_page_main">
                    Receipt
                    <input type="radio" name="amountSaved" checked />
                    <span className="checkmark_section"></span>
                  </label>

                  <label className="q_receipt_page_main">
                    Short Receipt
                    <input type="radio" name="amountSaved" />
                    <span className="checkmark_section"></span>
                  </label>
                  <label className="q_receipt_page_main">
                    Full
                    <input type="radio" name="amountSaved" />
                    <span className="checkmark_section"></span>
                  </label>
                  <label className="q_receipt_page_main">
                    Professional
                    <input type="radio" name="amountSaved" />
                    <span className="checkmark_section"></span>
                  </label>
                </ul>
              </div>

              {/* Print Customer Info */}
              <div className="text-black mt-12 q_receipt_size_page">
                Print Customer Info
              </div>
              <div className="q_resigter flex-wrap mt-8">
                <ul className="custom-checkbox-list flex space-x-5">
                  <label className="q_receipt_page_main">
                    Name
                    <input type="radio" name="customerInfo" checked />
                    <span className="checkmark_section"></span>
                  </label>

                  <label className="q_receipt_page_main">
                    Customer ID
                    <input type="radio" name="customerInfo" />
                    <span className="checkmark_section"></span>
                  </label>
                  <label className="q_receipt_page_main">
                    Name & Customer ID
                    <input type="radio" name="customerInfo" />
                    <span className="checkmark_section"></span>
                  </label>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Receipt Copies */}
      <div className="q-resigtersetting-main-page">
        <div className="q-resigtersetting-top-detail-section">
          <div>
            <div className="q-resigtersetting-bottom-section">
              <div className="q_setting_main_Section mb-7">Receipt Copies</div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="q_resigter_label">
                  <label className="text-[#6A6A6A] ml-2" htmlFor="numcoppies">
                    Number of Copies
                  </label>
                  <div className="">
                    <Input className="q_input_resigter" placeholder=" 0" />
                  </div>
                </div>
                <div className="q_resigter_label">
                  <label
                    className="text-[#6A6A6A] ml-2"
                    htmlFor="numcreditcard"
                  >
                    Number of Credit Card Copies
                  </label>
                  <div className="">
                    <Input className="q_input_resigter" placeholder="0" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="q-add-categories-section-middle-footer">
        <button className="quic-btn quic-btn-save">Update</button>
        <button className="quic-btn quic-btn-cancle">Cancel</button>
      </div>
    </>
  );
};

export default ReceiptMainpage;
