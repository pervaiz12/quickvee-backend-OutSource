// import { useState } from "react";
import { useState ,useEffect} from "react";
import { useDispatch } from "react-redux";
import {fetchMerchantsList} from "../../Redux/features/ExportInventory/ExportInventorySlice";
import { useSelector } from "react-redux";
import { BASE_URL, INVENTORY_EXPORT } from "../../Constants/Config";
import axios from "axios";
import { useAuthDetails } from "../../Common/cookiesHelper";

const InventoryExportLogic = () => {

    const [submitmessage, setsubmitmessage] = useState("");
    const { userTypeData } = useAuthDetails();
    const [storename,setStorename] = useState("");
    const [storeFromError, setStoreFromError] = useState("");
    const handleStoreInput = async (event) => {
        const fieldValue = event.target.type === "checkbox" ? event.target.checked : event.target.value;
        // console.log(values.ebt_type)
        setStorename(fieldValue);
      };
    
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        if (storename != "" && storeFromError === "") {
          const data = {
            "merchant_id": storename,
            token_id:userTypeData.token_id,
            login_type:userTypeData.login_type
          }
    
          try {
            const response = await axios.post(BASE_URL + INVENTORY_EXPORT, data, 
              { headers: { "Content-Type": "multipart/form-data" , 'Authorization': `Bearer ${userTypeData.token}` } })
            // console.log(response.data)
            if (response.data) {
              const csvData = response.data;
              // Convert the data to a Blob
              const blob = new Blob([csvData], { type: 'text/csv' });

              // Create a URL for the Blob
              const fileUrl = URL.createObjectURL(blob);

              // Create a temporary anchor element and trigger a download
              const a = document.createElement("a");
              a.href = fileUrl;
              a.download = "Inventory_"+storename+".csv"; // Name of the downloaded file
              document.body.appendChild(a);
              a.click();

              // Cleanup: remove the anchor element and revoke the Blob URL
              document.body.removeChild(a);
              URL.revokeObjectURL(fileUrl);
              setsubmitmessage("Inventory Exported Successfully");
            }
            else {
              setsubmitmessage("Something Went Wrong");
            }
          } catch (error) {
            // console.log('33 catch err');
            return new Error(error)
          }
        }
      };

    return {handleStoreInput, handleSubmit, submitmessage, setsubmitmessage,storeFromError,setStoreFromError};
}

export default InventoryExportLogic;