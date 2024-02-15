// import { useState } from "react";
import { useState ,useEffect} from "react";
import { useDispatch } from "react-redux";
import {fetchMerchantsList} from "../../Redux/features/ExportInventory/ExportInventorySlice";
import { useSelector } from "react-redux";
import { BASE_URL, INVENTORY_EXPORT } from "../../Constants/Config";
import axios from "axios";

const InventoryExportLogic = () => {

    const [submitmessage, setsubmitmessage] = useState("");
    const [storename,setStorename] = useState();
    const handleStoreInput = async (event) => {
        const fieldValue = event.target.type === "checkbox" ? event.target.checked : event.target.value;
        // console.log(values.ebt_type)
        setStorename(fieldValue);
      };
    
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        if (storename != "") {
          const data = {
            "merchant_id": storename,
          }
    
          try {
            const response = await axios.post(BASE_URL + INVENTORY_EXPORT, data, { headers: { "Content-Type": "multipart/form-data" } })
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

    return {handleStoreInput, handleSubmit, submitmessage, setsubmitmessage};
}

export default InventoryExportLogic;