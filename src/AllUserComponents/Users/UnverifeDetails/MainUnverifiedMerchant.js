import { useState } from "react";
import Unverified from "./unverified";
import EditMerchant from "../merchantUpdate/editMerchant";

const MainUnverifiedMerchant = () => {
    const [visible, setVisible] = useState("UnverifinedMerchant");
    const [merchantId, setMerchantId] = useState();
    return ( <>
        {visible ===  "UnverifinedMerchant" && <Unverified setVisible={setVisible}  setMerchantId={setMerchantId}/>}
        {visible === "editVerirmedMerchant" && (
        <EditMerchant currentMerchant="UnverifinedMerchant" setVisible={setVisible} merchantId={merchantId} />
      )}
    </> );
}
 
export default MainUnverifiedMerchant;