import { useState } from "react";
import Verified from "./verified";
import EditMerchant from "../merchantUpdate/editMerchant";

const MainVerifiedMerchantPage = () => {
  const [visible, setVisible] = useState("verifiedMerchant");
  const [merchantId, setMerchantId] = useState();

  return (
    <>
      {visible === "verifiedMerchant" && (
        <Verified
          setVisible={setVisible}
          setMerchantId={setMerchantId}
        />
      )}
      {visible === "editVerirmedMerchant" && (
        <EditMerchant currentMerchant="verifiedMerchant" setVisible={setVisible} merchantId={merchantId} />
      )}
    </>
  );
};

export default MainVerifiedMerchantPage;
