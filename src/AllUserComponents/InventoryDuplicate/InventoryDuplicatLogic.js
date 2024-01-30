import { useState } from "react";

const InventoryExportLogic = () => {
    const [submitmessage,setsubmitmessage] = useState();

    const handleStoreInput = async (event) => {
        const fieldValue = event.target.type === "checkbox" ? event.target.checked : event.target.value;
        console.log('fieldValue'+fieldValue)
        // setStorename(fieldValue);
      };
    
    const dupplicateInventory = async (e) => {
        console.log('invduplicate');
    }
    const dupplicateSettings = async (e) => {
        console.log('setting duplicate');
        // e.preventDefault();
        // if (storename != "") {
        //     const data = {
        //     "merchant_id": storename,
        //     }

        //     try {
        //     const response = await axios.post(BASE_URL + INVENTORY_EXPORT, data, { headers: { "Content-Type": "multipart/form-data" } })
        //     // console.log(response.data)
        //     if (response.data) {
        //         const csvData = response.data;
        //         // Convert the data to a Blob
        //         const blob = new Blob([csvData], { type: 'text/csv' });

        //         // Create a URL for the Blob
        //         const fileUrl = URL.createObjectURL(blob);

        //         // Create a temporary anchor element and trigger a download
        //         const a = document.createElement("a");
        //         a.href = fileUrl;
        //         a.download = "Inventory_"+storename+".csv"; // Name of the downloaded file
        //         document.body.appendChild(a);
        //         a.click();

        //         // Cleanup: remove the anchor element and revoke the Blob URL
        //         document.body.removeChild(a);
        //         URL.revokeObjectURL(fileUrl);
        //         setsubmitmessage("Inventory Exported Successfully");
        //     }
        //     else {
        //         setsubmitmessage("Something Went Wrong");
        //     }
        //     } catch (error) {
        //     // console.log('33 catch err');
        //     return new Error(error)
        //     }
        // }
    };
        return {handleStoreInput, dupplicateInventory, dupplicateSettings, submitmessage, setsubmitmessage};
   
}

export default InventoryExportLogic;