import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "../features/Categories/categoriesSlice";
import attributesReducer from "../features/Attributes/attributesSlice";
import addEmployeeReducer from "../features/StoreSettings/AddEmployee/AddEmployeeSlice";
import inStoreOrderReducer from "../features/Orders/inStoreOrderSlice";
import onlineStoreOrderReducer from "../features/Orders/onlineStoreOrderSlice";
import settingstoreoptionReducer from "../features/StoreSettingOption/StoreSettingOptionSlice";
import systemAccessListingReducer from "../features/SystemAccess/systemAccessSlice";
import couponListReducer from "../features/Coupon/couponSlice";
import inventoryListingReducer from "../features/Inventory/InventorySlice";
import taxesReducer from "../features/Taxes/taxesSlice"
import CurrentInventoryReducer from  "../features/CurrentInventoryValue/currentInventoryValueSlice"
import settingstorealtersReducer from "../features/SettingStoreAlters/SettingStoreAltersSlice"
import SettingReceiptReducer from "../features/StoreSettings/SettingsReceipt/SettingsReceiptSlice";
import PurchaseOrderReducer from "../features/PurchaseOrder/purchaseOrderSlice"
import CheckIDVerifyListReducer from "../features/Reports/CheckIDVerify/CheckIDVerifySlice";
import DailyReportList from "../features/DailyReport/dailyreportSlice";
import EmployeeListReducer from "../features/EmployeeList/EmployeeListSlice";

import PaymentMethodDetailReducer from "../features/PaymentMethodReport/PaymentMethodSlice";

import TopsallerReducer from "../features/TopSaller/topsallerSlice";
import instantactivitySlice from "../features/InstantActivity/instantactivitySlice";

import RegisterSettingReducer from "../features/StoreSettings/RegisterSettings/RegisterSettingsSlice";

import NewItemCreatedBtnListReducer from "../features/Reports/NewItemCreatedBetweenSlice/NewItemCreatedBetweenSlice";
import ExportInventoryReducer from "../features/ExportInventory/ExportInventorySlice";
import StoreOrderSliceReducer from "../features/StoreOrder/StoreOrderSlice";
import ItemSalesReportListReducer from "../features/Reports/ItemSales/ItemSalesSlice";
import OrderTypeReducer from "../features/OrderType/OrderTypeSlice";
import TaxesreportSliceReducer from "../features/TaxesReport/taxesreportSlice";
import PermissionListReducer from "../features/Permission/PermissionSlice";
import ReorderInventoryListReducer from "../features/Reports/ReorderInventory/ReorderInventorySlice";
import DefaultsSliceReducer from "../features/Defaults/defaultsSlice"
import SalesByPersonSliceReducer from "../features/SalesByPerson/SalesByPersonSlice";
import CustomerSliceReducer from '../features/user/customerSlice';
import ManagerSliceReducer from '../features/user/managerSlice';
import AdminSliceReducer from '../features/user/adminSlice';
import VerifiedMerchantSliceReducer from '../features/user/verifiedMerchantSlice';
import UnVerifiedMerchantSliceReducer from '../features/user/unverifiedMerchantSlice';
import VendorListReducer from "../features/Reports/VendorList/VendorListSlice";
import VendorSalesListReducer from "../features/Reports/VendorSales/VendorSalesSlice";
import OrderRefundListReducer from "../features/Reports/OrderRefundReport/OrderRefundReportSlice";
import NewsLetterListReducer from "../../Redux/features/NewsLetter/NewsLetterSlice";
import vendorReducer from "../features/VendorList/vListSlice";
import orderSummerySlice from "../features/OrderSummary/OrderSummarySlice";
import loyaltyprogramSlice from "../features/LoyaltyProgram/loyaltyprogramSlice";
import SettingSetupSlice from "../features/SettingSetup/SettingSetupSlice";
import ShiftSummarySlice from "../features/Reports/ShiftSummary/ShiftSummarySlice";
import DetailCategorySaleSliceReducer from "../features/DetailCategorySale/detailCategorySaleSlice";

const store = configureStore({
  reducer: {

    VendorList:VendorListReducer,
    vendors:vendorReducer,
    categories: categoriesReducer,
    attributes: attributesReducer,
    purchase:PurchaseOrderReducer,
    inStoreOrder: inStoreOrderReducer,
    onlineStoreOrder: onlineStoreOrderReducer,
    employeelistData:addEmployeeReducer,
    couponList:couponListReducer,
    settingStoreOption:settingstoreoptionReducer,
    taxes: taxesReducer,
    systemAccessList:systemAccessListingReducer,
    inventoryDataList:inventoryListingReducer,
    settingstoreoption: settingstoreoptionReducer,
    settingstorealters: settingstorealtersReducer,
    SettingReceiptList: SettingReceiptReducer,
    CheckIDVerifyList:CheckIDVerifyListReducer,
    dailyreport:DailyReportList,
    detailCategorySale:DetailCategorySaleSliceReducer,


   //reducer for payment method  report
   paymentDetailReport:PaymentMethodDetailReducer,


    NewItemCreatedBtnList:NewItemCreatedBtnListReducer,
    ReorderInventoryList:ReorderInventoryListReducer,


    topsaller:TopsallerReducer,
    instantactivity:instantactivitySlice,

    RegisterSettingsData: RegisterSettingReducer,
   

    NewsLetterList:NewsLetterListReducer,

   //Employee List Data
    employeeDataList :EmployeeListReducer,
    ExportInventoryData:ExportInventoryReducer,

    ItemSalesReportList:ItemSalesReportListReducer,

    //Order Type
    orderTypeList:OrderTypeReducer,

    taxesreport:TaxesreportSliceReducer,
    currentInventoryreport:CurrentInventoryReducer,
    VendorSalesList:VendorSalesListReducer,


    //Permission

    permissionRed:PermissionListReducer,


    StoreOrderList:StoreOrderSliceReducer,

    defaults: DefaultsSliceReducer,

    SalesByPersonList:SalesByPersonSliceReducer,

    orderSummeryList:orderSummerySlice,
    customerRecord:CustomerSliceReducer,
    managerRecord:ManagerSliceReducer,
    adminRecord:AdminSliceReducer,
    verifiedMerchantRecord:VerifiedMerchantSliceReducer,
    unverifiedMerchantRecord:UnVerifiedMerchantSliceReducer,
    OrderRefundList:OrderRefundListReducer,

    loyaltyprogram: loyaltyprogramSlice,
    ShiftSummarylist: ShiftSummarySlice,
    StoreSetupList: SettingSetupSlice,

  },

      //setting setup 

   //ShiftSummarySlice


  // middleware:(getDefaultMiddleware)=> getDefaultMiddleware().concat(logger),
});

export default store;