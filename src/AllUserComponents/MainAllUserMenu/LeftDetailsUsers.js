import React, { Suspense, lazy } from "react";

// Dynamically import components
const MainLabel = lazy(() => import("../Label/MainLabel"));
const NewsLetterMain = lazy(() => import("../Newsletter/NewsLetterMain"));
const MainStoreOrder = lazy(() => import("../StoreOrder/MainStoreOrder"));
const OrderCountMain = lazy(() => import("../OrderCount/OrderCountMain"));
const MainDefaults = lazy(() => import("../Defaults/MainDefaults"));
const EditDefaults = lazy(() => import("../Defaults/EditDefaults"));
const AddDefaults = lazy(() => import("../Defaults/AddDefaults"));
const MainReleaseApk = lazy(() => import("../ReleaseApk/MainReleaseApk"));
const MainInvDuplicates = lazy(
  () => import("../InventoryDuplicate/MainInventoryDuplicate")
);
const MainCateDuplicate = lazy(
  () => import("../CategoryDuplicate/MainCateDuplicate")
);
const MainProduct = lazy(() => import("../ProductDuplicate/MainProduct"));
const MainPermission = lazy(() => import("../Permission/MainPermission"));
const MainInventoryExport = lazy(
  () => import("../InventoryExport/MainInventoryExport")
);
const MainMerchantDetails = lazy(
  () => import("../MerchantDetails/MainMerchantDetails")
);
const NeedHelp = lazy(() => import("../../Components/NeedHelp/NeedHelp"));
const MainSupportDetails = lazy(
  () => import("../SupportDetails/MainSupportDetails")
);
const Manager = lazy(() => import("../Users/Manager/manager"));
const MainUnverifiedMerchant = lazy(
  () => import("../Users/UnverifeDetails/MainUnverifiedMerchant")
);
const MainVerifiedMerchantPage = lazy(
  () => import("../Users/VerifiedMerchant/MainVerifiedMerchantPage")
);
const Customer = lazy(() => import("../Users/customer/customer"));
const MainAdmin = lazy(() => import("../Users/admin/MainAdmin"));
const EditCustomer = lazy(
  () => import("../Users/customer/EditCustomer/editCustomer")
);
const EditAdmin = lazy(() => import("../Users/admin/editAdmin/edit_admin"));
const AddMerchan = lazy(() => import("../Users/addMerchant/addMerchantech"));
const EditMerchant = lazy(() => import("../Users/merchantUpdate/editMerchant"));
const Add_Admin = lazy(() => import("../Users/admin/addAdmin/add_admin"));
const MainOrderRetrieve = lazy(
  () => import("../OrderRetrieve/MainOrderRetrieve")
);
const LeftDetailsUsers = ({ visible }) => {
  const renderComponent = () => {
    switch (visible) {
      case "label":
        return <MainLabel />;
      case "newsletter":
        return <NewsLetterMain />;
      case "store-order":
        return <MainStoreOrder />;
      case "order-count":
        return <OrderCountMain />;
      case "need_help":
        return <NeedHelp />;
      case "defaults":
        return <MainDefaults />;
      case "edit-defaults":
        return <EditDefaults />;
      case "add-defaults":
        return <AddDefaults />;
      case "release_apk":
        return <MainReleaseApk />;
      case "inverntory-duplicate":
        return <MainInvDuplicates />;
      case "category-duplicate":
        return <MainCateDuplicate />;
      case "product-duplicate":
        return <MainProduct />;
      case "create_permission":
        return <MainPermission />;
      case "invertory-export":
        return <MainInventoryExport />;
      case "support-details":
        return <MainSupportDetails />;
      case "merchant-details":
        return <MainMerchantDetails />;
      case "manager_view":
        return <Manager />;
      case "unverified":
        return <MainUnverifiedMerchant />;
      case "verified":
        return <MainVerifiedMerchantPage />;
      case "customer":
        return <Customer />;
      case "admin":
        return <MainAdmin />;
      case "editCustomer":
        return <EditCustomer />;
      case "editAdmin":
        return <EditAdmin />;
      case "addMerchant":
        return <AddMerchan />;
      case "editMerchant":
        return <EditMerchant />;
      case "addAdmin":
        return <Add_Admin />;
      case "order-retrieve":
        return <MainOrderRetrieve />;
      default:
        return null;
    }
  };

  return <Suspense fallback={<div></div>}>{renderComponent()}</Suspense>;
};

export default LeftDetailsUsers;
