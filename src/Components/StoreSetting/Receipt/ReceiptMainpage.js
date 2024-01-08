import React, { useEffect, useState } from "react";
import axios from "axios";
import '../../../Styles/ReceiptMainpage.css';
import { Input } from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL, UPDATE_RECEIPT_INFO_DATA } from "../../../Constants/Config";
import { fetchSettingReceiptData } from "../../../Redux/features/StoreSettings/SettingsReceipt/SettingsReceiptSlice";

const ReceiptMainpage = () => {

  const dispatch = useDispatch();
    useEffect(() => {
      let data = {
      merchant_id: "MAL0100CA",
    };
    if (data) {
      dispatch(fetchSettingReceiptData(data));
    }
  }, []);

  const [allSettingReceiptData, setallSettingReceiptData] = useState();
  const AllSettingReceiptDataState = useSelector((state) => state.SettingReceiptList);
  
  useEffect(() => {
    if (!AllSettingReceiptDataState.loading && AllSettingReceiptDataState.StoreReceiptData)
    {
      // console.log(AllSettingReceiptDataState.StoreReceiptData.receipt_list)
      setallSettingReceiptData(AllSettingReceiptDataState.StoreReceiptData );
    }
  }, [
    AllSettingReceiptDataState,
    AllSettingReceiptDataState.loading,
    AllSettingReceiptDataState.StoreReceiptData,
  ]);

  const [isReceiptSize, setIsReceiptSize] = useState("");
  const [isPrintInvoices, setIsPrintInvoices] = useState("");
  const [isProfessionalLogo, setIsProfessionalLogo] = useState("");
  const [isPrintAmtSave, setIsPrintAmtSave] = useState("");
  const [isPrintCustomerInfo, setIsPrintCustomerInfo] = useState("");
  const [isNumCopy, setIsNumCopy] = useState("");
  const [isNumCreditCopy, setIsNumCreditCopy] = useState("");

  useEffect(() => {
    // console.log(allSettingReceiptData);
    if (allSettingReceiptData && allSettingReceiptData.receipt_size) {
      setIsReceiptSize(allSettingReceiptData.receipt_size);
    }
    if (allSettingReceiptData && allSettingReceiptData.print_invoices) {
      setIsPrintInvoices(allSettingReceiptData.print_invoices);
    }
    if (allSettingReceiptData && allSettingReceiptData.professional_logo) {
      setIsProfessionalLogo(allSettingReceiptData.professional_logo);
    }
    if (allSettingReceiptData && allSettingReceiptData.print_amt_save) {
      setIsPrintAmtSave(allSettingReceiptData.print_amt_save);
    }
    if (allSettingReceiptData && allSettingReceiptData.print_customer_info) {
      setIsPrintCustomerInfo(allSettingReceiptData.print_customer_info);
    }
    if (allSettingReceiptData && allSettingReceiptData.num_copy) {
      setIsNumCopy(allSettingReceiptData.num_copy);
    }
    if (allSettingReceiptData && allSettingReceiptData.num_credit_copy) {
      setIsNumCreditCopy(allSettingReceiptData.num_credit_copy);
    }
  }, [allSettingReceiptData]);

  const handleRadioReceiptSize = (event) => {
    setIsReceiptSize(event.target.value);
  };
  const handleRadioPrintInvoices = (event) => {
    setIsPrintInvoices(event.target.value);
  };
  const handleRadioProfessionalLogo = (event) => {
    setIsProfessionalLogo(event.target.value);
  };
  const handleRadioPrintAmtSave = (event) => {
    setIsPrintAmtSave(event.target.value);
  };
  const handleRadioPrintCustomerInfo = (event) => {
    setIsPrintCustomerInfo(event.target.value);
  };
  const handleNumCopy = (event) => {
    setIsNumCopy(event.target.value);
  };
  const handleNumCreditCopy = (event) => {
    setIsNumCreditCopy(event.target.value);
  };

  const handleUpdateSettingReceipt = async (e) => {
    e.preventDefault();

    const FormData = {
      id:"100",
      merchant_id:"MAL0100CA",
      receipt_size:isReceiptSize,
      print_invoices:isPrintInvoices,
      professional_logo:isProfessionalLogo,
      print_amt_save:isPrintAmtSave,
      print_customer_info:isPrintCustomerInfo,
      num_copy:isNumCopy,
      num_credit_copy:isNumCreditCopy,
    };
    console.log(FormData);

    const response = await axios.post(BASE_URL + UPDATE_RECEIPT_INFO_DATA, FormData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response) {
      let merchantdata = {
        merchant_id: "MAL0100CA",
      };
      if (merchantdata) {
        dispatch(fetchSettingReceiptData(merchantdata));
      }
    } else {
      // setsubmitmessage(response.data.msg);
    }
};

  return (
   <>
   
    <div className="q-reciptpage-main-page">
        <div className="q-reciptpage-top-detail-section">
        <div className=''>
        <div className="q-reciptpage-bottom-section">

          <div className='q_setting_main_Section mb-12'>Receipt</div>
          <div className='text-black mt-12 q_receipt_size_page'>Receipt Size</div>
          <div className="q_resigter flex-wrap mt-8">
            <ul className="custom-checkbox-list flex space-x-5">
              <label className="q_receipt_page_main">
                Receipt
                <input 
                  type="radio" 
                  name="ReceiptSize" 
                  value="1" 
                  checked = {isReceiptSize === "1"} 
                  onChange={handleRadioReceiptSize} 
                />
                <span className="checkmark_section"></span>
              </label>

              <label className="q_receipt_page_main">
                Short Receipt
                <input 
                  type="radio" 
                  name="ReceiptSize" 
                  value="2" 
                  checked = {isReceiptSize === "2"} 
                  onChange={handleRadioReceiptSize} 
                />
                <span className="checkmark_section"></span>
              </label>
              <label className="q_receipt_page_main">
                Full
                <input 
                  type="radio" 
                  name="ReceiptSize" 
                  value="3" 
                  checked = {isReceiptSize === "3"} 
                  onChange={handleRadioReceiptSize} 
                />
                <span className="checkmark_section"></span>
              </label>
              <label className="q_receipt_page_main">
                Professional
                <input 
                  type="radio" 
                  name="ReceiptSize" 
                  value="4" 
                  checked = {isReceiptSize === "4"} 
                  onChange={handleRadioReceiptSize} 
                />
                <span className="checkmark_section"></span>
              </label>
            </ul>
          </div>
          {/* Print Invoices */}
          <div className='text-black mt-12 q_receipt_size_page'>Print Invoices</div>
          <div className="q_resigter flex-wrap mt-8">
            <ul className="custom-checkbox-list flex space-x-5">
              <label className="q_receipt_page_main">
                No
                <input 
                  type="radio" 
                  name="PrintInvoices" 
                  value="1" 
                  checked = {isPrintInvoices === "1"} 
                  onChange={handleRadioPrintInvoices} 
                />
                <span className="checkmark_section"></span>
              </label>

              <label className="q_receipt_page_main">
                Yes
                <input 
                  type="radio" 
                  name="PrintInvoices" 
                  value="2" 
                  checked = {isPrintInvoices === "2"} 
                  onChange={handleRadioPrintInvoices} 
                />
                <span className="checkmark_section"></span>
              </label>
              <label className="q_receipt_page_main">
                Prompt
                <input 
                  type="radio" 
                  name="PrintInvoices" 
                  value="3" 
                  checked = {isPrintInvoices === "3"} 
                  onChange={handleRadioPrintInvoices} 
                />
                <span className="checkmark_section"></span>
              </label>
              
            </ul>
          </div>
          {/* Professional Logo */}

          <div className='text-black mt-12 q_receipt_size_page'>Professional Logo</div>
          <div className="q_resigter flex-wrap mt-8">
            <ul className="custom-checkbox-list flex space-x-5">
              <label className="q_receipt_page_main">
                None
                <input 
                  type="radio" 
                  name="ProfessionalLogo" 
                  value="1" 
                  checked = {isProfessionalLogo === "1"} 
                  onChange={handleRadioProfessionalLogo} 
                />
                <span className="checkmark_section"></span>
              </label>

              <label className="q_receipt_page_main">
                Logo
                <input 
                  type="radio" 
                  name="ProfessionalLogo" 
                  value="2" 
                  checked = {isProfessionalLogo === "2"} 
                  onChange={handleRadioProfessionalLogo} 
                />
                <span className="checkmark_section"></span>
              </label>
              <label className="q_receipt_page_main">
                Company Info
                <input 
                  type="radio" 
                  name="ProfessionalLogo" 
                  value="3" 
                  checked = {isProfessionalLogo === "3"} 
                  onChange={handleRadioProfessionalLogo} 
                />
                <span className="checkmark_section"></span>
              </label>
              <label className="q_receipt_page_main">
                Logo & Company Info
                <input 
                  type="radio" 
                  name="ProfessionalLogo" 
                  value="4" 
                  checked = {isProfessionalLogo === "4"} 
                  onChange={handleRadioProfessionalLogo} 
                />
                <span className="checkmark_section"></span>
              </label>
            </ul>
          </div>
          {/*Print Amount Saved  */}
          <div className='text-black mt-12 q_receipt_size_page'>Print Amount Saved</div>
          <div className="q_resigter flex-wrap mt-8">
            <ul className="custom-checkbox-list flex space-x-5">
              <label className="q_receipt_page_main">
                Yes
                <input 
                  type="radio" 
                  name="PrintAmountSaved" 
                  value="1" 
                  checked = {isPrintAmtSave === "1"} 
                  onChange={handleRadioPrintAmtSave} 
                />
                <span className="checkmark_section"></span>
              </label>

              <label className="q_receipt_page_main">
                No
                <input 
                  type="radio" 
                  name="PrintAmountSaved" 
                  value="2" 
                  checked = {isPrintAmtSave === "2"} 
                  onChange={handleRadioPrintAmtSave} 
                />
                <span className="checkmark_section"></span>
              </label>
            </ul>
          </div>
          {/* Print Customer Info */}
          <div className='text-black mt-12 q_receipt_size_page'>Print Customer Info</div>
          <div className="q_resigter flex-wrap mt-8">
            <ul className="custom-checkbox-list flex space-x-5">
              <label className="q_receipt_page_main">
                None
                <input 
                  type="radio" 
                  name="PrintCustomerInfo" 
                  value="1" 
                  checked = {isPrintCustomerInfo === "1"} 
                  onChange={handleRadioPrintCustomerInfo} 
                />
                <span className="checkmark_section"></span>
              </label>

              <label className="q_receipt_page_main">
                Name
                <input 
                  type="radio" 
                  name="PrintCustomerInfo" 
                  value="2" 
                  checked = {isPrintCustomerInfo === "2"} 
                  onChange={handleRadioPrintCustomerInfo} 
                />
                <span className="checkmark_section"></span>
              </label>
              <label className="q_receipt_page_main">
                Customer ID
                <input 
                  type="radio" 
                  name="PrintCustomerInfo" 
                  value="3" 
                  checked = {isPrintCustomerInfo === "3"} 
                  onChange={handleRadioPrintCustomerInfo} 
                />
                <span className="checkmark_section"></span>
              </label>
              <label className="q_receipt_page_main">
                Name & Customer ID
                <input 
                  type="radio" 
                  name="PrintCustomerInfo" 
                  value="4" 
                  checked = {isPrintCustomerInfo === "4"} 
                  onChange={handleRadioPrintCustomerInfo} 
                />
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
      <div className='q_setting_main_Section mb-7'>Receipt Copies</div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="q_resigter_label">
            <label className="text-[#6A6A6A] ml-2" htmlFor="numcoppies">
              Number of Copies
            </label>
            <div className="">
              <Input 
                className="q_input_resigter" 
                placeholder=" 0" 
                name="num_copy" 
                value={isNumCopy} 
                onChange={handleNumCopy} 
              />
            </div>
          </div>
          <div className="q_resigter_label">
            <label className="text-[#6A6A6A] ml-2" htmlFor="numcreditcard">
              Number of Credit Card Copies
            </label>
            <div className="">
              <Input 
                className="q_input_resigter" 
                placeholder="0" 
                name="num_credit_copy" 
                value={isNumCreditCopy} 
                onChange={handleNumCreditCopy} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
        </div>
      </div>

      <div className='q-add-categories-section-middle-footer'>
        <button 
          className='quic-btn quic-btn-save' 
          onClick={handleUpdateSettingReceipt}
        >Update
        </button>
      </div>

   
   
   
   </>
  )
}

export default ReceiptMainpage