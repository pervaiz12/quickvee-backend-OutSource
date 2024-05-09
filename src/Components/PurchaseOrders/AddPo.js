import React, { useState  ,useEffect} from "react";
import { Grid, TextField, MenuItem } from "@mui/material";
import AutoPo from "./AutoPo";
import { FormControl } from "@mui/material";  
import "react-datepicker/dist/react-datepicker.css";
import SelectDropDown from "../../reuseableComponents/SelectDropDown";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import BasicTextFields from "../../reuseableComponents/TextInputField";
import AddNewCategory from '../../Assests/Dashboard/Left.svg'
import { fetchaddpopurchaseData } from '../../Redux/features/PurchaseOrder/AddpurchaseOrderSlice'
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { event } from "jquery";

const AddPo = (listItem) => {
  // const [isHide, setIsHide] = useState(false);
  const [visible, seVisible] = useState("MainPurchase");
  const [issueDate, setIssueDate] = useState(null);
  
  const [addpostock , setAddpostock] = useState('')
  const [purchaseInfo, setPurchaseInfo] = useState({
    issuedDate: "",
    stockDate: "",
    email: "",
    reference: ""
  });

  

  const dispatch = useDispatch();
  const addpoData = useSelector((state) => state.Addpolist);
  const adpoDataList = addpoData?.addpoData?.result;

 // console.log(adpoDataList);
  // const dispatch = useDispatch();
  // const addpoData = useSelector((state) => state.Addpolist);
  // console.log(addpoData?.addpoData?.result);

  // const adpoDataList = addpoData?.addpoData?.result

  useEffect(() => {
    const data = { merchant_id: 'MAL0100CA', admin_id: 'MAL0100CA' }
    dispatch(fetchaddpopurchaseData(data)); 
    //console.log('purchaseData', data)
  }, [dispatch]); 
 

useEffect(() => {
  // console.log("hello");
  // console.log('addpoData',addpoData)


  
}, [addpoData.lenght])


  const handleVendorClick = (data) => {
    const { email, reference, issued_date, stock_date } = data;

    // Update state with the extracted data
    setPurchaseInfo(prevState => ({
      ...prevState,
      issuedDate: issued_date,
      stockDate: stock_date,
      email: email,
      reference: reference
    }));
  };

  const { issuedDate, stockDate, email, reference } = purchaseInfo;

  console.log('purchaseInfo', issuedDate);

  useEffect(() => {
    if (adpoDataList) {
      const { issued_date, stock_date, email, reference  } = adpoDataList;
      setPurchaseInfo({
        issuedDate: issued_date,
        stockDate: stock_date,
        email: email,
        reference: reference,
      });
    }
  }, [adpoDataList]);





  return (
    <>
     
        <div className="box">
      <div className="box_shadow_div" style={{ height: "300px" }}>
        <div className="q-add-categories-section-header">
          <span>
            <span onClick={() => seVisible("MainPurchase")}>
              <img src={AddNewCategory} alt="Add New Category" className="w-6 h-6" />
            </span>
            <span>Create Purchase Order</span>
          </span>
        </div>
      
         <div>
           
              
              <div className="px-6" >
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <label>vendor</label>
                  
                    <SelectDropDown
                      heading={"All"}
                      selectedOption={"lll"}
                      listItem={adpoDataList}
                      onClickHandler={handleVendorClick}
                      title={'vendor_name'}
                    />
                  </Grid>
                <Grid item xs={4}>
                  <label>Issued Date</label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker title={issuedDate} /> 
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={4}>
                  <label>Stock Due</label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker title={stockDate} /> 
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={6}>
                  <label>Reference</label>
                  <BasicTextFields
                  
                    value={reference} 
                    onClickHandler={handleVendorClick}
                    type={"text"}
                  />
                </Grid>
                <Grid item xs={6}>
                  <label>Vendor Email</label>
                  <BasicTextFields
                    value={email} 
                    onClickHandler={handleVendorClick}
                    type={"email"}
                  />
                </Grid>
                </Grid>
              </div>
            
          </div>    
      </div>
    </div>
     
     
       <div className="second-component">
          <AutoPo />
      </div> 
       
      
   
    </>
  );
};

export default AddPo;
