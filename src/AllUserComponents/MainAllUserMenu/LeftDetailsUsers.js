import React from "react";


import MainLabel from "../Label/MainLabel";
import MainNewsletter from "../Newsletter/MainNewsletter";
import MainStoreOrder from "../StoreOrder/MainStoreOrder";
import OrderCount from "../OrderCount/OrderCount";
import MainDefaults from "../Defaults/MainDefaults";
import MainReleaseApk from "../ReleaseApk/MainReleaseApk";
import MainInvDuplicates from "../InventoryDuplicate/MainInventoryDuplicate";
import MainCateDuplicate from "../CategoryDuplicate/MainCateDuplicate";
import MainProduct  from "../ProductDuplicate/MainProduct";
import MainPermission from "../Permission/MainPermission";
import MainMerchantDetails from "../MerchantDetails/MainMerchantDetails";
import  MainInventoryExport from "../InventoryExport/MainInventoryExport";
import MainNeedHelp from "../NeedHelp/MainNeedHelp";




const LeftDetailsUsers = ({ visible }) => {
  return (
    <>
      {visible === "label" && <MainLabel />}
      {visible === "newsletter" && <MainNewsletter />}
      {visible === "store-order" && <MainStoreOrder />}
      {visible === "order-count" && <OrderCount />}
      {visible === "defaults" && <MainDefaults />}
      {visible === "release_apk" && <MainReleaseApk />}
      {visible === "inverntory-duplicate" && <MainInvDuplicates/>}
      {visible === "category-duplicate" && <MainCateDuplicate/>}
    
      {visible === "product-duplicate" && <MainProduct />}
      {visible === "permission" && <MainPermission />}
      {visible === "invertory-export" && <MainInventoryExport />}
      {visible === "merchant-details" && <MainMerchantDetails />}
      {visible === "need-help" && <MainNeedHelp />}

      




      


    </>
  );
};

export default LeftDetailsUsers;
