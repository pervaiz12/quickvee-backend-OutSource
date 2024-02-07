import React from "react";


import MainLabel from "../Label/MainLabel";
import MainNewsletter from "../Newsletter/MainNewsletter";
import MainStoreOrder from "../StoreOrder/MainStoreOrder";
import OrderCountMain from "../OrderCount/OrderCountMain";
import MainDefaults from "../Defaults/MainDefaults";
import MainReleaseApk from "../ReleaseApk/MainReleaseApk";
import MainInvDuplicates from "../InventoryDuplicate/MainInventoryDuplicate";
import MainCateDuplicate from "../CategoryDuplicate/MainCateDuplicate";
import MainProduct  from "../ProductDuplicate/MainProduct";
import MainPermission from "../Permission/MainPermission";
import MainMerchantDetails from "../MerchantDetails/MainMerchantDetails";
import  MainInventoryExport from "../InventoryExport/MainInventoryExport";

import MainNeedHelp from "../NeedHelp/MainNeedHelp";

import EditDefaults from "../Defaults/EditDefaults";
//import MainUsers from "../Users/MainUsers";
import Manager from "../Users/Manager/manager";
import Unverified from '../Users/UnverifeDetails/unverified'
import Customer from '../Users/customer/customer'
import Adminview from '../Users/admin/adminview'
import Verified from  '../Users/UnverifeDetails/verified'
import EditCustomer from "../Users/customer/EditCustomer/editCustomer";
import EditAdmin from '../Users/admin/editAdmin/edit_admin'
import AddMerchan from '../Users/addMerchant/addMerchantech'
import EditMerchant from '../Users/merchantUpdate/editMerchant'
// verified






const LeftDetailsUsers = ({ visible }) => {
  return (
    <>
      {visible === "label" && <MainLabel />}
      {visible === "newsletter" && <MainNewsletter />}
      {visible === "store-order" && <MainStoreOrder />}
      {visible === "order-count" && <OrderCountMain />}
      {visible === "defaults" && <MainDefaults />}
      {visible === "edit-defaults" && <EditDefaults />}
      
      {visible === "release_apk" && <MainReleaseApk />}
      {visible === "inverntory-duplicate" && <MainInvDuplicates/>}
      {visible === "category-duplicate" && <MainCateDuplicate/>}
    
      {visible === "product-duplicate" && <MainProduct />}
      {visible === "create_permission" && <MainPermission />}
      {visible === "invertory-export" && <MainInventoryExport />}
      {visible === "merchant-details" && <MainMerchantDetails />}
      {visible === "need-help" && <MainNeedHelp />}
      {/* manager view */}
      {visible ==="manager_view" && <Manager /> }
      {visible ==="unverified" && <Unverified /> }
      {visible ==="verified" && <Verified /> }
      {visible ==="customer" && <Customer /> }
      {visible ==="admin" && <Adminview /> }
      {visible ==="editCustomer" && <EditCustomer /> }
      {visible ==="editAdmin" && <EditAdmin /> }
      {visible ==="addMerchant" && <AddMerchan /> }
      {visible ==="editMerchant" && <EditMerchant /> }

      




      


    </>
  );
};

export default LeftDetailsUsers;
