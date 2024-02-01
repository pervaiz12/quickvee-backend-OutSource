import { useState } from "react";
import Validation from "../../Constants/Validation";
import axios from "axios";
import {BASE_URL, INVENTORY_DUPLICATE, SETTINGS_DUPLICATE} from "../../Constants/Config";

const InventoryExportLogic = () => {
    const [submitmessage,setsubmitmessage] = useState();
    const { validateDropdown } = Validation();
    const [values, setValues] = useState({
        store_name_from: "",
        store_name_to: "",
        upc_check: "",
        errors: {
            store_name_from: "",
            store_name_to: "",
            upc_check: "",
        },
      });

    const handleStoreInput = async (event) => {
        let { errors } = values;
        const fieldName = event.target.name;
        const fieldValue = event.target.type === "checkbox" ? event.target.checked : event.target.value;
        // console.log(values.ebt_type)
        console.log(fieldValue)
        switch (fieldName) {
            case "store_name_from":
                await validateDropdown(fieldValue, fieldName, errors);
                break;
            case "store_name_to":
                await validateDropdown(fieldValue, fieldName, errors);
                break;
            case "upc_check":
                let newval = (parseInt(event.target.value) === 1) ? 0 : 1;
                let newval1 = (event.target.checked) ? 1 : 0;
                console.log(newval)
                console.log(newval1)
                setValues((prevValues) => ({
                ...prevValues,
                errors,
                [fieldName]: newval,
                }));
                break;

            default:
                break;
        }
        setValues((prevValues) => ({
            errors,
            ...prevValues,
            [fieldName]: fieldValue,
          }));
    };
    
    const dupplicateInventory = async (e) => {
        e.preventDefault();
        let { errors } = values;
        await validateDropdown(values.store_name_from, 'store_name_from', errors);
        await validateDropdown(values.store_name_to, 'store_name_to', errors);
        
        if (errors.store_name_from === "" && errors.store_name_to === "") {
            if(values.store_name_from == values.store_name_to)
            {
                alert("Both the stores cannot be same.")
                return false;
            }else
            {
              
                const data = {
                    "store_name_from": values.store_name_from,
                    "store_name_to": values.store_name_to,
                    "upc_check": values.upc_check,
                }
                // console.log(data);
        
                try {
                    const response = await axios.post(BASE_URL + INVENTORY_DUPLICATE, data, { headers: { "Content-Type": "multipart/form-data" } })
        
                    if (response.data) {
                    setsubmitmessage(response.data);
                    }
                    else {
                    setsubmitmessage(response.data);
                    }
                } catch (error) {
                    // console.log('33 catch err');
                    return new Error(error)
                }
            }
        
        }

        setValues((prevState) => ({
        ...prevState,
        errors,
        }));
    }
    const dupplicateSettings = async (e) => {
        e.preventDefault();
        let { errors } = values;
        await validateDropdown(values.store_name_from, 'store_name_from', errors);
        await validateDropdown(values.store_name_to, 'store_name_to', errors);
        
        if (errors.store_name_from === "" && errors.store_name_to === "") {
            if(values.store_name_from == values.store_name_to)
            {
                alert("Both the stores cannot be same.")
                return false;
            }else
            {
              
                const data = {
                    "store_name_from": values.store_name_from,
                    "store_name_to": values.store_name_to,
                    // "upc_check": values.upc_check,
                }
                // console.log(data);
        
                try {
                    const response = await axios.post(BASE_URL + SETTINGS_DUPLICATE, data, { headers: { "Content-Type": "multipart/form-data" } })
        
                    if (response.data) {
                    setsubmitmessage(response.data);
                    }
                    else {
                    setsubmitmessage(response.data);
                    }
                } catch (error) {
                    // console.log('33 catch err');
                    return new Error(error)
                }
            }
        
        }

        setValues((prevState) => ({
        ...prevState,
        errors,
        }));
    };
        return {handleStoreInput, dupplicateInventory, dupplicateSettings, values, submitmessage,  setsubmitmessage};
   
}

export default InventoryExportLogic;