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
import taxesReducer from "../features/Taxes/taxesSlice";
import CurrentInventoryReducer from "../features/CurrentInventoryValue/currentInventoryValueSlice";
import settingstorealtersReducer from "../features/SettingStoreAlters/SettingStoreAltersSlice";
import SettingReceiptReducer from "../features/StoreSettings/SettingsReceipt/SettingsReceiptSlice";
import PurchaseOrderReducer from "../features/PurchaseOrder/purchaseOrderSlice";
import PurchaseOrderByIdReducer from "../features/PurchaseOrder/purchaseOrderByIdSlice";
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
import NewItemSalesReportListReducer from "../features/Reports/NewItemSales/NewItemSalesSlice";
import OrderTypeReducer from "../features/OrderType/OrderTypeSlice";
import TaxesreportSliceReducer from "../features/TaxesReport/taxesreportSlice";
import PermissionListReducer from "../features/Permission/PermissionSlice";
import ReorderInventoryListReducer from "../features/Reports/ReorderInventory/ReorderInventorySlice";
import DefaultsSliceReducer from "../features/Defaults/defaultsSlice";
import SalesByPersonSliceReducer from "../features/SalesByPerson/SalesByPersonSlice";
import CustomerSliceReducer from "../features/user/customerSlice";
import ManagerSliceReducer from "../features/user/managerSlice";
import AdminSliceReducer from "../features/user/adminSlice";
import VerifiedMerchantSliceReducer from "../features/user/verifiedMerchantSlice";
import UnVerifiedMerchantSliceReducer from "../features/user/unverifiedMerchantSlice";
import VendorListReducer from "../features/Reports/VendorList/VendorListSlice";
import VendorSalesListReducer from "../features/Reports/VendorSales/VendorSalesSlice";
import OrderRefundListReducer from "../features/Reports/OrderRefundReport/OrderRefundReportSlice";
import NewsLetterListReducer from "../../Redux/features/NewsLetter/NewsLetterSlice";
import vendorReducer from "../features/VendorList/vListSlice";
import orderSummerySlice from "../features/OrderSummary/OrderSummarySlice";

import productsReducer from "../features/Product/ProductSlice";

import loyaltyprogramSlice from "../features/LoyaltyProgram/loyaltyprogramSlice";
import SettingSetupSlice from "../features/SettingSetup/SettingSetupSlice";
import ShiftSummarySlice from "../features/Reports/ShiftSummary/ShiftSummarySlice";
import DetailCategorySaleSliceReducer from "../features/DetailCategorySale/detailCategorySaleSlice";
import EmployeeWorkinghrsSlice from "../features/Reports/EmployeeWorkinghrs/EmployeeWorkinghrsSlice";
// import AddpurchaseOrderSliceReducer from "../features/PurchaseOrder/AddpurchaseOrderSlice";
import MenuSlice from "../features/NavBar/MenuSlice";
import LoginSliceReducer from "../features/Authentication/loginSlice";
import orderSummeryReducer from "../features/orderSummeryHistory/orderSummerySlice";
import SalesReportSlice from "../features/Reports/SalesReport/SalesReportSlice";
import TipReportSlice from "../features/Reports/TipReport/TipReportSlice";
import CouponReportSlice from "../features/Reports/CouponReport/CouponReportSlice";
import TimesheetSlice from "../features/Timesheet/timesheetSlice";
import RefundReportSlice from "../features/Reports/RefundReport/RefundReportSlice";
import StocktakeListSlice from "../features/Stocktake/StocktakeListSlice";
import SupportDetailsSlice from "../features/SupportDetails/supportDetailsSlice";
import DigitalMarketingSlice from "../features/DigitalMarketing/digitalMarketingSlice";
import BrandsSlice from "../features/Brand/brandsSlice";
import PayInReportSlice from "../features/Reports/PayInReport/PayInReportSlice";
import DropCashReportSlice from "../features/Reports/DropCashReport/DropCashReportSlice";
import CategorySalesReportSlice from "../features/CategorySalesSummeryReport/categorySalesSummeryReportSlice";
import SalesByHoursReportSlice from "../features/Reports/SalesByHours/SalesByHoursSlice";
import StoreCreditReportSlice from "../features/Reports/StoreCreditReport/StoreCreditReportSlice";
import EmployeeSalesPerCategorySlice from "../features/Reports/EmployeeSalesPerCategory/EmployeeSalesPerCategorySlice";
import DetailedLoyaltyPointsReportSlice from "../features/Reports/DatailedLoyaltyPointsReport/DetailedLoyaltyPointsReportSlice";
import GiftCardReportSlice from "../features/Reports/GiftCard/GiftCardReportSlice";
import RefundRequestSlice from "../features/RefundRequest/RefundRequestSlice";
import NewCustomersAddedReportSlice from "../features/Reports/NewCustomersAddedReport/NewCustomersAddedReportSlice";
import MixAndMatchSliceReducer from "../features/MixAndMatch/mixAndMatchSlice";
import RegisterClosuresSlice from "../features/Reports/RegisterClosures/RegisterClosuresSlice";
const store = configureStore({
  reducer: {
    VendorList: VendorListReducer,
    vendors: vendorReducer,
    categories: categoriesReducer,
    attributes: attributesReducer,
    purchase: PurchaseOrderReducer,
    stocktakeList: StocktakeListSlice,
    purchaseOrderById: PurchaseOrderByIdReducer,
    inStoreOrder: inStoreOrderReducer,
    onlineStoreOrder: onlineStoreOrderReducer,
    employeelistData: addEmployeeReducer,
    couponList: couponListReducer,
    settingStoreOption: settingstoreoptionReducer,
    taxes: taxesReducer,
    systemAccessList: systemAccessListingReducer,
    inventoryDataList: inventoryListingReducer,
    settingstoreoption: settingstoreoptionReducer,
    settingstorealters: settingstorealtersReducer,
    SettingReceiptList: SettingReceiptReducer,
    CheckIDVerifyList: CheckIDVerifyListReducer,
    dailyreport: DailyReportList,
    detailCategorySale: DetailCategorySaleSliceReducer,

    //reducer for payment method  report
    paymentDetailReport: PaymentMethodDetailReducer,

    NewItemCreatedBtnList: NewItemCreatedBtnListReducer,
    ReorderInventoryList: ReorderInventoryListReducer,

    topsaller: TopsallerReducer,
    instantactivity: instantactivitySlice,

    RegisterSettingsData: RegisterSettingReducer,

    NewsLetterList: NewsLetterListReducer,

    //Employee List Data
    employeeDataList: EmployeeListReducer,
    ExportInventoryData: ExportInventoryReducer,

    ItemSalesReportList: ItemSalesReportListReducer,
    NewItemSalesReportList: NewItemSalesReportListReducer,

    //Order Type
    orderTypeList: OrderTypeReducer,

    taxesreport: TaxesreportSliceReducer,
    currentInventoryreport: CurrentInventoryReducer,
    VendorSalesList: VendorSalesListReducer,

    //Permission

    permissionRed: PermissionListReducer,

    StoreOrderList: StoreOrderSliceReducer,

    defaults: DefaultsSliceReducer,

    SalesByPersonList: SalesByPersonSliceReducer,

    orderSummeryList: orderSummerySlice,
    customerRecord: CustomerSliceReducer,
    managerRecord: ManagerSliceReducer,
    adminRecord: AdminSliceReducer,
    verifiedMerchantRecord: VerifiedMerchantSliceReducer,
    unverifiedMerchantRecord: UnVerifiedMerchantSliceReducer,
    OrderRefundList: OrderRefundListReducer,
    productsListData: productsReducer,
    mixAndMatchList: MixAndMatchSliceReducer,
    loyaltyprogram: loyaltyprogramSlice,
    ShiftSummarylist: ShiftSummarySlice,
    StoreSetupList: SettingSetupSlice,
    EmpWorkinghrsList: EmployeeWorkinghrsSlice,
    // Addpolist: AddpurchaseOrderSliceReducer,
    loginAuthentication: LoginSliceReducer,
    orderSummeryList: orderSummeryReducer,

    NavBarToggle: MenuSlice,
    timeSheet: TimesheetSlice,
    SalesReportList: SalesReportSlice,
    TipReportList: TipReportSlice,
    CouponReportList: CouponReportSlice,
    RefundDataList: RefundReportSlice,
    PayinReportList: PayInReportSlice,
    DropCashReportList: DropCashReportSlice,
    GiftCardReportList: GiftCardReportSlice,
    EmployeeSalesPerCategoryList: EmployeeSalesPerCategorySlice,
    supportDetail: SupportDetailsSlice,
    digitalmarketing: DigitalMarketingSlice,
    brandData: BrandsSlice,
    categorySalesReportData: CategorySalesReportSlice,
    SalesByHoursData: SalesByHoursReportSlice,
    storeCreditReportList: StoreCreditReportSlice,
    DetailedLoyaltyPointsReport: DetailedLoyaltyPointsReportSlice,
    RefundRequestList: RefundRequestSlice,
    NewCustomersAddedReport: NewCustomersAddedReportSlice,
    RegisterClosuresReport: RegisterClosuresSlice,
  },

  //setting setup

  //ShiftSummarySlice

  // middleware:(getDefaultMiddleware)=> getDefaultMiddleware().concat(logger),
});

export default store;
