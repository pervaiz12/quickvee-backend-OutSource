import React from 'react'
import  Layout  from './Components/Layout/Index'
import IndexAllUsers from './AllUserComponents/MainAllUserMenu/IndexAllUsers'


const Main = ({visible}) => {
  return (
   <>
   {/* signle user layout */}
   {visible === "dashboard" && <Layout visible={visible} />}
   {visible === "order" && <Layout visible={visible} />}
   {visible === "category" && <Layout visible={visible} />}
   {visible === "products" && <Layout visible={visible} />}
   {visible === "purchase-data" && <Layout visible={visible} />}
   {visible === "attributes" && <Layout visible={visible} />}
   {visible === "import-data" && <Layout visible={visible} />}
   {visible === "coupons" && <Layout visible={visible} />}
   {visible === "vendors" && <Layout visible={visible} />}
   {visible === "timesheet" && <Layout visible={visible} />}
   {visible === "category-edit-cat" && <Layout visible={visible} />}
   {visible === "toptraders" && <Layout visible={visible} />}
   {visible === "productedit" && <Layout visible={visible} />}
   {visible === "info" && <Layout visible={visible} />}
   {visible === "setup" && <Layout visible={visible} />}
   {visible === "Alters" && <Layout visible={visible} />}
   {visible === "options" && <Layout visible={visible} />}
   {visible === "taxes" && <Layout visible={visible} />}
   {visible === "taxes-report" && <Layout visible={visible} />}
   {visible === "system-access" && <Layout visible={visible} />}
   {visible === "inventory" && <Layout visible={visible} />}
   {visible === "register" && <Layout visible={visible} />}
 
   {visible === "daily-total-report" && <Layout visible={visible} />}
   {visible === "Details-category" && <Layout visible={visible} />}
   {visible === "report-sales-person" && <Layout visible={visible} />}
   {visible === "id-verification" && <Layout visible={visible} />}
   {visible === "vendors-sales-reports" && <Layout visible ={visible} />}
   {visible === "credit-debit-sales" && <Layout visible={visible} />}
   {visible === "instant-activity" && <Layout visible={visible} />}
   {visible === "overall-top" && <Layout visible={visible} />}
   {visible === "flash-resigter" && <Layout visible={visible} />}
   {visible === "vendors-list" && <Layout visible={visible} />}
   {visible === "employee-list" && <Layout visible={visible} />}
   {visible === "item-create-between" && <Layout visible={visible} />}
   {visible === "recorder-inventory" && <Layout visible={visible} />}
   {visible === "employee-working-hours" && <Layout visible={visible} />}
   {visible === "shift-summary" && <Layout visible={visible} />}
   {visible === "payment-method-details" && <Layout visible={visible} />}
   {visible === "order-type" && <Layout visible={visible} />}
   {visible === "addemployee" && <Layout visible={visible} /> }
   {visible === "receipt" && <Layout visible={visible} />}
   {visible === "item-sales" && <Layout visible={visible} />}

  


 

{/* multip user layout */}
    {visible === "multimerchant" && <IndexAllUsers />}
    {visible === "label" && <IndexAllUsers visible={visible} />}
    {visible === "newsletter" && <IndexAllUsers visible={visible} />}
    {visible === "store-order" && <IndexAllUsers visible={visible} />}
    {visible === "order-count" && <IndexAllUsers visible ={visible} />}
    {visible === "defaults" && <IndexAllUsers visible ={visible} />}
    {visible === "release_apk" && <IndexAllUsers visible ={visible} />}
    {visible === "inverntory-duplicate" && <IndexAllUsers visible ={visible} />}
    {visible === "product-duplicate" && <IndexAllUsers visible ={visible} />}
    {visible === "category-duplicate" && <IndexAllUsers visible ={visible} />}

    {visible === "permission" && <IndexAllUsers visible ={visible} />}
    {visible === "invertory-export" && <IndexAllUsers visible ={visible} />}
    {visible === "merchant-details" && <IndexAllUsers visible ={visible} />}
    {visible === "need-help" && <IndexAllUsers visible ={visible} />}




   
   </>
  )
}

export default Main