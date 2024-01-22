import React from "react";
import { BrowserRouter as Router, Routes, Route, Switch, Link } from 'react-router-dom';
import "./index.css";
import  Layout  from "./Components/Layout/Index";

import DashboardMain from "./Components/Dashboard/DashboardMain";
import MainOrder from "./Components/Orders/MainOrder";
import MainCategory from "./Components/Category/MainCategory";
import EditCategory from "./Components/Category/EditCategory";
import MainPurchase from "./Components/PurchaseOrders/MainPurchase";
import MainAttributes from "./Components/Attributes/MainAttributes";
import MainProducts from "./Components/Products/MainProducts";
import MainCoupon from "./Components/Coupons/MainCoupon";
import MainVendors from "./Components/Vendors/MainVendors";
import MainTimesheet from "./Components/Timesheet/MainTimesheet";
import MainImportData from "./Components/ImportData/MainImportData";
import TopTenders from "./Components/Dashboard/TopTenders";
//import ProductTable from "./Components/Products/ProductTable";
import ProductEdit from "./Components/Products/ProductEdit";
import AddPo from "./Components/PurchaseOrders/AddPo";
import AddCoupon from "./Components/Coupons/AddCoupon";
// import MainStoreSetting from "./Components/StoreSetting/MainStoreSetting";
import MainReport from "./Components/ReportSetting/MainReport";
import MainAddEmployee from "./Components/StoreSetting/AddEmployee/MainAddEmployee";
import Permission from "./Components/StoreSetting/AddEmployee/Permission";
import MainSyastemAccess from "./Components/StoreSetting/SystemAccess/MainSystemAccess";
// import Info from "./Components/StoreSetting/SubSetting/Info";


import MainInventory from "./Components/StoreSetting/Inventory/MainInventory";

import MainTaxes from "./Components/StoreSetting/SubSetting/Taxes/MainTaxes";


// import Info from "./Components/StoreSetting/SubSetting/Info";

// import Info from "./Components/StoreSetting/SubSetting/Info";

import "./Styles/AttributesPage.css"

import MainStoreOption from "./Components/StoreSetting/StoreOption/MainStoreOption";
import MainStoreAlters from "./Components/StoreSetting/StoreAlters/MainStoreAlters";

import "./Styles/CategoryPage.css";
import "./Styles/AttributesPage.css"; 
import "./Styles/PurchasePage.css";
import "./Styles/TableOrderPage.css";
import "./Styles/MainInStore.css";
import "./Styles/MainOrderPage.css";
import "./Styles/CouponDiscount.css";
import "./Styles/ImportData.css";
import "./Styles/DailyDaterange.css";
// import "./Styles/EmployeeWorking.css";

import "./Styles/ReceiptMainpage.css";
import "./Styles/MainCatedetails.css";
import MainResigtersetting from "./Components/StoreSetting/ResigterSetting/MainResigtersetting";
import "./Styles/ResigterSettingdata.css";
import ReceiptMainpage from "./Components/StoreSetting/Receipt/ReceiptMainpage";


import InstantActvity from "./Components/Reporting/InstantPo/InstantActvity";
import EmployeeWorking from "./Components/Reporting/EmployeeWorkingHours/EmployeeWorking";
import MainSiftSummary from "./Components/Reporting/SiftSummary/MainSiftSummary";

import CheckIDVerifyMain from "./Components/Reporting/CheckIDVerify/CheckIDVerifyMain";

import PaymentMethodReport from "./Components/Reporting/PaymentMehodDetail/PaymentMethodReport";

import NewItemCreatedBetweenMain from "./Components/Reporting/NewItemCreatedBetween/NewItemCreatedBetweenMain";
import ReorderInventoryMain from "./Components/Reporting/ReorderInventory/ReorderInventoryMain";



import MainItem from "./Components/Reporting/ItemType/MainItem";
import MainItemSales from "./Components/Reporting/ItemSales/MainItemSales";
import MainEmployeelist from "./Components/Reporting/Employelist/MainEmployeelist";
import MainTaxesReport from "./Components/Reporting/Taxes/MainTaxesReport"
import MainSalesPerson from "./Components/Reporting/SalesByPerson/MainSalesPerson";
// import MainInvDuplicates from "./Components/InventoryDuplicates/MainInvDuplicates";
import Main from "./Main";








function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Main />} />
      {/* <Route exact path="/" element={<Layout />} /> */}
      <Route exact path="/users/view/unapprove" element={<Main  visible={"multimerchant"} />} />
      <Route exact path="/dashboard" element={<Main  visible={"dashboard"} />} />
      <Route exact path="/order" element={<Main  visible={"order"} />} />
      <Route exact path="/category" element={<Main  visible={"category"} />} />
      <Route exact path="/products" element={<Main  visible={"products"} />} />
      <Route exact path="/purchase-data" element={<Main  visible={"purchase-data"} />} />
      <Route exact path="/attributes" element={<Main  visible={"attributes"} />} />
      <Route exact path="/import-data" element={<Main  visible={"import-data"} />} />
      <Route exact path="/coupons" element={<Main  visible={"coupons"} />} />
      <Route exact path="/vendors" element={<Main  visible={"vendors"} />} />
      <Route exact path="/category/edit-category/:categoryCode" element={<Main  visible={"category-edit-cat"} />} />
      <Route exact path="/timesheet" element={<Main  visible={"timesheet"} />} />
      <Route exact path="/toptraders" element={<Main  visible={"toptraders"} />} />
      <Route exact path="/productedit" element={<Main  visible={"productedit"} />} />
      <Route exact path="/productedit" element={<Main  visible={"productedit"} />} />
      <Route exact path="/store-settings/info" element={<Main  visible={"info"} />} />
      <Route exact path="/store-settings/setup" element ={<Main visible={"setup"} />} />
   
      <Route exact path="/store-settings/Alters" element ={<Main visible={"Alters"} />} />
      <Route exact path="/store-settings/options" element ={<Main visible={"options"} />} />
      <Route exact path="/store-settings/taxes" element ={<Main visible={"taxes"} />} />
      <Route exact path="/store-settings/system-access" element ={<Main visible={"system-access"} />} />
      <Route exact path="/store-settings/inventory" element ={<Main visible={"inventory"} />} />
      <Route exact path="/store-reporting/register" element ={<Main visible={"register"} />} />
      <Route exact path="/store-reporting/inventory" element ={<Main visible={"inventory"} />} />
      <Route exact path="/store-reporting/daily-total-report" element ={<Main visible={"daily-total-report"} />} />
     <Route exact path="/store-reporting/Details-category" element ={<Main visible={"Details-category"} />} />
     <Route exact path="/store-reporting/report-sales-person" element ={<Main visible={"report-sales-person"} />} />
     <Route exact path="/store-reporting/id-verification" element ={<Main visible={"id-verification"} />} />
     
     <Route exact path="store-reporting/credit-debit-sales" element ={<Main visible={"credit-debit-sales"} />} />
     <Route exact path="/store-reporting/instant-activity" element ={<Main visible={"instant-activity"} />} />
     <Route exact path="/store-reporting/overall-top" element ={<Main visible={"overall-top"} />} />
     <Route exact path="/store-reporting/flash-resigter" element ={<Main visible={"flash-resigter"} />} />
     <Route exact path="/store-reporting/vendors-list" element ={<Main visible={"vendors-list"} />} />
     <Route exact path="/store-reporting/employee-list" element ={<Main visible={"employee-list"} />} />
     
     <Route exact path="/store-reporting/recorder-inventory" element ={<Main visible={"recorder-inventory"} />} />
     
     <Route exact path="/store-reporting/shift-summary" element ={<Main visible={"shift-summary"} />} />
     <Route exact path="/store-settings/payment-method-detail-report" element={<Main visible={"payment-method-detail-report"} />} />
     <Route exact path ="/store-reporting/order-type" element={<Main visible={"order-type"} />} />
     <Route exact path="/store-reporting/taxes" element={<Main visible={"taxes"} />} />


     {/* multiple users dashbaord */}

     <Route exact path="/users/view/unapprove/label" element={<Main visible={"label"} />} />
     <Route exact path ="/users/view/unapprove/newsletter" element={<Main visible={"newsletter"} />} />
     <Route exact path="/users/view/unapprove/store-order" element={<Main visible={"store-order"} />} />
     <Route exact path="/users/view/unapprove/order-count" element={<Main visible={"order-count"} />} />
     <Route exact path="/users/view/unapprove/menu/defaults" element={<Main visible={"defaults"} />} />
     <Route exact path="/users/view/unapprove/release_apk" element={<Main visible={"release_apk"} />} />
     <Route exact path="/users/view/unapprove/inverntory-duplicate" element={<Main visible={"inverntory-duplicate"} />} />
     <Route exact path="/users/view/unapprove/category-duplicate" element={<Main visible={"category-duplicate"} />} />
     
     <Route exact path="/users/view/unapprove/product-duplicate" element={<Main visible={"product-duplicate"} />} />
     <Route exact path="/users/view/unapprove/permission" element={<Main visible={"permission"} />} />
     <Route exact path="/users/view/unapprove/invertory-export" element={<Main visible={"invertory-export"} />} />
     <Route exact path="/users/view/unapprove/merchant-details" element={<Main visible={"merchant-details"} />} />



    
     




   

     


  
  
 





     



      






     
        {/* <Route exact path="/" element={<DashboardMain />} /> */}
    
        <Route exact path="/toptraders" element={<TopTenders />} />
   
        <Route path="/report" element={<MainReport />} />
        <Route path="/store-settings/taxes" element={<MainTaxes />} />

        {/* <Route path="/store-settings/info"  element={<MainStoreOption />} /> */}
        <Route path="/store-settings/options" element={<MainStoreOption />} />
        <Route
          path="/store-settings/addemployee"
          element={<MainAddEmployee />}
        />

        <Route
          path="/store-settings/system-access"
          element={<MainSyastemAccess />}
        />

        {/* /store-settings/inventory */}
        <Route path="/store-reporting/inventory" element={<MainInventory />} />

        <Route path="/store-reporting/Alters" element={<MainStoreAlters />} />

        <Route
          path="/store-reporting/register"
          element={<MainResigtersetting />}
        />
        <Route path="/store-reporting/receipt" element={<ReceiptMainpage />} />
      
  

        <Route
          path="/store-reporting/instant-activity"
          element={<InstantActvity />}
        />
        <Route
          path="/store-reporting/employee-working-hours"
          element={<EmployeeWorking />}
        />
        <Route
          path="/store-reporting/shift-summary"
          element={<MainSiftSummary />}
        />

        <Route
          path="/store-reporting/employee-list"
          element={<MainEmployeelist />}
        />

        <Route
          path="/store-reporting/permission/:employee_id"
          element={<Permission />}
        />
      
        <Route
          path="/store-reporting/id-verification"
          element={<CheckIDVerifyMain />}
        />
        <Route path="/store-reporting/order-type" element={<MainItem />} />
        <Route path="/store-reporting/item-sales" element={<MainItemSales />} />
        <Route path="/store-reporting/taxes" element={<MainTaxesReport />} />
    

        <Route
          path="/store-settings/payment-method-detail-report"
          element={<PaymentMethodReport />}
        />

        <Route
          path="/store-settings/item-create-between"
          element={<NewItemCreatedBetweenMain />}
        />

        <Route
          path="/store-settings/recorder-inventory"
          element={<ReorderInventoryMain />}
        />
         
     
     
    </Routes>
  );
}
export default App;
