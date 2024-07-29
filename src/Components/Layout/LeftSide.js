import React, { useEffect, lazy, Suspense } from "react";
import DropCashMain from "../Reporting/DropCash/DropCashMain";
import PayInMain from "../Reporting/PayIn/PayInMain";

const DashboardMain = lazy(() => import("../Dashboard/DashboardMain"));
const MainOrder = lazy(() => import("./../Orders/MainOrder"));
const MainPurchase = lazy(() => import("../PurchaseOrders/MainPurchase"));
const MainAttributes = lazy(() => import("../Attributes/MainAttributes"));
const MainCategory = lazy(() => import("../Category/MainCategory"));
const MainCoupon = lazy(() => import("../Coupons/MainCoupon"));
const ProductEdit = lazy(() => import("../Products/ProductEdit"));
const MainVendors = lazy(() => import("../Vendors/MainVendors"));
const MainTimesheet = lazy(() => import("../Timesheet/MainTimesheet"));
const MainImportData = lazy(() => import("../ImportData/MainImportData"));
const MainProducts = lazy(() => import("../Products/MainProducts"));
const MainStoreOption = lazy(
  () => import("../StoreSetting/StoreOption/MainStoreOption")
);
const EditCategory = lazy(() => import("../Category/EditCategory"));
const TopTenders = lazy(() => import("../Dashboard/TopTenders"));
const Info = lazy(() => import("../StoreSetting/Info"));
const Setup = lazy(() => import("../StoreSetting/MainSetup/Setup"));
const MainStoreAlters = lazy(
  () => import("../StoreSetting/StoreAlters/MainStoreAlters")
);
const MainTaxes = lazy(() => import("../StoreSetting/Taxes/MainTaxes"));
const MainInventory = lazy(
  () => import("../StoreSetting/Inventory/MainInventory")
);
const MainResigtersetting = lazy(
  () => import("../StoreSetting/ResigterSetting/MainResigtersetting")
);
const MainSyastemAccess = lazy(
  () => import("../StoreSetting/SystemAccess/MainSystemAccess")
);
const DailyTtlReport = lazy(
  () => import("../Reporting/DailyReport/DailyTtlReport")
);
const MainCatedetails = lazy(
  () => import("../Reporting/CategoryDetails/MainCatedetails")
);
const MainSalesPerson = lazy(
  () => import("../Reporting/SalesByPerson/MainSalesPerson")
);
const CheckIDVerifyMain = lazy(
  () => import("../Reporting/CheckIDVerify/CheckIDVerifyMain")
);
const InstantActvity = lazy(
  () => import("../Reporting/InstantPo/InstantActvity")
);
const TopSallerReport = lazy(
  () => import("../Reporting/TopSaller/TopSallerReport")
);
const EmployeeWorking = lazy(
  () => import("../Reporting/EmployeeWorkingHours/EmployeeWorking")
);
const MainSiftSummary = lazy(
  () => import("../Reporting/SiftSummary/MainSiftSummary")
);
const PaymentMethodReport = lazy(
  () => import("../Reporting/PaymentMehodDetail/PaymentMethodReport")
);
const MainItem = lazy(() => import("../Reporting/ItemType/MainItem"));
const MainTaxesReport = lazy(
  () => import("../Reporting/Taxes/MainTaxesReport")
);
const CurrentInventoryValue = lazy(
  () => import("../Reporting/CurrentInventoryValue/CurrentInventoryValue")
);
const MainAddEmployee = lazy(
  () => import("../StoreSetting/AddEmployee/MainAddEmployee")
);
const ReceiptMainpage = lazy(
  () => import("../StoreSetting/Receipt/ReceiptMainpage")
);
const MainItemSales = lazy(
  () => import("../Reporting/ItemSales/MainItemSales")
);
const NewItemCreatedBetweenMain = lazy(
  () => import("../Reporting/NewItemCreatedBetween/NewItemCreatedBetweenMain")
);
const Permission = lazy(() => import("../StoreSetting/AddEmployee/Permission"));
const OrderSummaryDetails = lazy(
  () =>
    import(
      "../Reporting/SalesByPerson/MainOrderSumaaryDetails/OrderSummaryDetails"
    )
);
const VendorListMain = lazy(
  () => import("../Reporting/VendorList/VendorListMain")
);
const VendorSalesReportMain = lazy(
  () => import("../Reporting/VendorSalesReport/VendorSalesReportMain")
);
const OrderRefundReportMain = lazy(
  () => import("../Reporting/OrderRefundReport/OrderRefundReportMain")
);
const ReorderInventoryMain = lazy(
  () => import("../Reporting/ReorderInventory/ReorderInventoryMain")
);
const EditVendors = lazy(() => import("../Vendors/EditVendors"));
const SingleVendorsDetail = lazy(
  () => import("../Vendors/SingleVendorsDetail")
);
const AddProducts = lazy(() => import("../Products/AddProducts"));
const MainLoayalty = lazy(() => import("../LoyaltyProgram/MainLoayalty"));
const MainEmployeelist = lazy(
  () => import("../Reporting/Employelist/MainEmployeelist")
);
const AddPo = lazy(() => import("../PurchaseOrders/AddPo"));
const EditCoupon = lazy(() => import("../Coupons/EditCoupon"));
const StorePage = lazy(() => import("../Store/MerchantStore"));
const ManagerStore = lazy(() => import("../Store/ManagerStore"));
const ProductSalesReport = lazy(() => import("../Products/ProductSalesReport"));
const TipReportMain = lazy(
  () => import("../Reporting/TipReport/TipReportMain")
);
const CouponReportMain = lazy(
  () => import("../Reporting/CouponReport/CouponReportMain")
);
const SalesReportMain = lazy(
  () => import("../Reporting/SalesReport/SalesReportMain")
);
const Discount_Per_Sales = lazy(
  () => import("../Reporting/Discount_Per_Sales/discount_per_sales")
);
const Items_sales_profit_record = lazy(
  () => import("../Reporting/itemSalesProfitRecord/items_sales_profit_record")
);
const RefundSummary = lazy(
  () => import("../Reporting/RefundSummary/RefundSummary")
);
const ReceivePurchaseOrderItems = lazy(
  () => import("../PurchaseOrders/ReceivePurchaseOrderItems")
);
const ModifyPurchaseOrder = lazy(
  () => import("../PurchaseOrders/ModifyPurchaseOrder")
);
const InventoryList = lazy(
  () => import("../Reporting/inventoryList/inventoryList")
);
const ProfitMarginReport = lazy(
  () => import("../Reporting/ProfitMarginReport/profitMarginReport")
);
const MainStocktake = lazy(() => import("../Stocktake/MainStocktake"));
const AddNewStocktake = lazy(() => import("../Stocktake/AddNewStocktake"));
const StocktakeList = lazy(() => import("../Stocktake/StocktakeList"));
const StocktakeReport = lazy(() => import("../Stocktake/StocktakeReport"));
const AddCategory = lazy(() => import("../Category/AddCategory"));
const AddCoupon = lazy(() => import("../Coupons/AddCoupon"));
const AddVendors = lazy(() => import("../Vendors/AddVendors"));
const NeedHelp = lazy(() => import("../NeedHelp/NeedHelp"));
const Brands = lazy(() => import("../Brands/MainBrand"));
const Tags = lazy(() => import("../Tags/MainTags"));

const MainDigitalMarketing = lazy(
  () => import("../StoreSetting/DigitalMarketing/MainDigitalMarketing")
);
const StoreCreditReportMain = lazy(
  () => import("../Reporting/StoreCreditReport/StoreCreditReportMain")
);

const LeftSide = ({ visible }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [visible]);

  const renderComponent = () => {
    switch (visible) {
      case "dashboard":
        return <DashboardMain />;
      case "order":
        return <MainOrder />;
      case "category":
        return <MainCategory />;
      case "add-category":
        return <AddCategory />;
      case "purchase-data":
        return <MainPurchase />;
      case "stocktake":
        return <StocktakeList />;
      case "stocktake-updateStocktake":
      case "stocktake-AddStocktake":
        return <AddNewStocktake />;
      case "stocktake-void":
      case "stocktake-completed":
        return <StocktakeReport />;
      case "add-purchase-data":
        return <AddPo />;
      case "edit-purchase-data":
        return <ReceivePurchaseOrderItems />;
      case "modify-purchase-order":
        return <ModifyPurchaseOrder />;
      case "attributes":
        return <MainAttributes />;
      case "products":
        return <MainProducts />;
      case "store":
        return <StorePage />;
      case "manager":
        return <ManagerStore />;
      case "coupons":
        return <MainCoupon />;
      case "add-coupons":
        return <AddCoupon />;
      case "coupons-edit-cop":
        return <EditCoupon />;
      case "vendors":
        return <MainVendors />;
      case "add-vendors":
        return <AddVendors />;
      case "timesheet":
        return <MainTimesheet />;
      case "import-data":
        return <MainImportData />;
      case "Digital-marketing-tags":
        return <MainDigitalMarketing />;
      case "store-setting":
        return <MainStoreOption />;
      case "category-edit-cat":
        return <EditCategory />;
      case "toptraders":
        return <TopTenders />;
      case "productedit":
      case "product-edit":
      case "edit-varient":
        return <AddProducts />;
      case "product-add":
        return <AddProducts />;
      case "product-sales":
        return <ProductSalesReport />;
      case "info":
        return <Info />;
      case "need_help":
        return <NeedHelp />;
      case "setup":
        return <Setup />;
      case "Alters":
        return <MainStoreAlters />;
      case "options":
        return <MainStoreOption />;
      case "taxes":
        return <MainTaxes />;
      case "inventory":
        return <MainInventory />;
      case "register":
        return <MainResigtersetting />;
      case "system-access":
        return <MainSyastemAccess />;
      case "daily-total-report":
        return <DailyTtlReport />;
      case "Details-category":
        return <MainCatedetails />;
      case "report-sales-person":
        return <MainSalesPerson />;
      case "id-verification":
        return <CheckIDVerifyMain />;
      case "inventory-list":
        return <InventoryList />;
      case "profit-Margin":
        return <ProfitMarginReport />;
      case "instant-activity":
        return <InstantActvity />;
      case "overall-top":
        return <TopSallerReport />;
      case "employee-working-hours":
        return <EmployeeWorking />;
      case "shift-summary":
        return <MainSiftSummary />;
      case "payment-method-details":
        return <PaymentMethodReport />;
      case "order-type":
        return <MainItem />;
      case "taxes-report":
        return <MainTaxesReport />;
      case "current-inventory-value":
        return <CurrentInventoryValue />;
      case "discount-per-sales-person":
        return <Discount_Per_Sales />;
      case "item-sales-profit-report":
        return <Items_sales_profit_record />;
      case "addemployee":
        return <MainAddEmployee />;
      case "employee-list":
        return <MainEmployeelist />;
      case "receipt":
        return <ReceiptMainpage />;
      case "item-sales":
        return <MainItemSales />;
      case "item-create-between":
        return <NewItemCreatedBetweenMain />;
      case "permission":
        return <Permission />;
      case "order-summary":
        return <OrderSummaryDetails />;
      case "vendors-list":
        return <VendorListMain />;
      case "edit-vendor":
        return <EditVendors />;
      case "vendor-details":
        return <SingleVendorsDetail />;
      case "loyalty-program":
        return <MainLoayalty />;
      case "recorder-inventory":
        return <ReorderInventoryMain />;
      case "vendors-sales-reports":
        return <VendorSalesReportMain />;
      case "order-refund-report":
        return <OrderRefundReportMain />;
      case "refund-report":
        return <RefundSummary />;
      case "tip-report":
        return <TipReportMain />;
      case "coupon-report":
        return <CouponReportMain />;
      case "drop-cash-report":
        return <DropCashMain />;
      case "pay-in-report":
        return <PayInMain />;
      case "sales-report":
        return <SalesReportMain />;
      case "brands":
        return <Brands />;
      case "tags":
        return <Tags />;
      case "store-credit-report":
        return <StoreCreditReportMain />;
      default:
        return <DashboardMain />;
    }
  };

  return <Suspense fallback={<div></div>}>{renderComponent()}</Suspense>;
};

export default LeftSide;
