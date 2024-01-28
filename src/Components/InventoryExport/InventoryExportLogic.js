// import { useState } from "react";
import { useState ,useEffect} from "react";
import { useDispatch } from "react-redux";
import {fetchMerchantsList} from "../../Redux/features/ExportInventory/ExportInventorySlice";
import { useSelector } from "react-redux";
import { BASE_URL, INVENTORY_EXPORT } from "../../Constants/Config";
import axios from "axios";

const InventoryExportLogic = () => {

    const [submitmessage, setsubmitmessage] = useState("");
    const [MerchantList, setMerchantList] = useState();
    const [storename,setStorename] = useState();
    const MerchantListData = useSelector((state) => state.ExportInventoryData);
    // console.log(MerchantListData);
    useEffect(() => {
      if (!MerchantListData.loading && MerchantListData.MerchantListData) {
          setMerchantList(MerchantListData.MerchantListData)
          console.log(MerchantList)
      }
    }, [MerchantListData, MerchantListData.loading])
  
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(fetchMerchantsList())
    }, [])

    const handleStoreInput = async (event) => {
        console.log('ddd')
        const fieldValue = event.target.type === "checkbox" ? event.target.checked : event.target.value;
        // console.log(values.ebt_type)
        setStorename(fieldValue);
        console.log(fieldValue)
       
      };
    
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(storename);
        // await isNumber(values.idel_logout, 'idel_logout', errors);
        
        if (storename != "") {
          const data = {
            "merchant_id": storename,
          }
          console.log(data);
    
          try {
            const response = await axios.post(BASE_URL + INVENTORY_EXPORT, data, { headers: { "Content-Type": "multipart/form-data" } })
            // console.log(response.data)
            const csvData = response.data;
            // Convert the data to a Blob
            const blob = new Blob([csvData], { type: 'text/csv' });

            // Create a URL for the Blob
            const fileUrl = URL.createObjectURL(blob);

            // Create a temporary anchor element and trigger a download
            const a = document.createElement("a");
            a.href = fileUrl;
            a.download = storename+".csv"; // Name of the downloaded file
            document.body.appendChild(a);
            a.click();

            // Cleanup: remove the anchor element and revoke the Blob URL
            document.body.removeChild(a);
            URL.revokeObjectURL(fileUrl);

            if (response.data.status === true) {

              setsubmitmessage(response.data.message);
            }
            else {
              setsubmitmessage(response.data.message);
            }
          } catch (error) {
            // console.log('33 catch err');
            return new Error(error)
          }
        }
    
        // setValues((prevState) => ({
        //   ...prevState,
        //   errors,
        // }));
      };

    return {handleStoreInput, handleSubmit, submitmessage, setsubmitmessage};
}

export default InventoryExportLogic;