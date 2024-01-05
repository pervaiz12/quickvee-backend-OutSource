// All api calls are initialized in this component for this application
//remove unwanted and credentials of other app

module.exports = Object.freeze({
    BASE_URL: 'https://sandbox.quickvee.com/',
  
  


    // Categories API calls
    LIST_ALL_CATEGORIES:"Categoryapi/category_list",
    DELETE_SINGLE_CATEGORIE:"Categoryapi/delete_category",


    //Attributes API Calls
    LIST_ALL_ATTRIBUTES:"Varientsapi/varients_list",
    ADD_ATTRIBUTE:"Varientsapi/add_varient",

    //Importdata API Calls
    IMPORT_DATA:"Import_data_api/import",

    // Order API Calls (Offline and Online)
    LIST_ALL_IN_STORE_ORDER:"api/orderoffline",
    LIST_ALL_ONLINE_STORE_ORDER:'api/newOrder',


    //Storesettings API Calls

    EMPLOYEE_LIST:"Store_setting_api/employee_list",
    ADDEDIT_EMPLOYEE:"Store_setting_api/addEdit_employee",
    DELETE_EMPLOYEE:"Store_setting_api/delete_employee",

    EMPLOYEE_LIST:"App/employee_list",


  
    // Store Setting options api
    GET_STORE_OPTIONS_DATA:"Store_setting_api/get_store_options_data",

    // Update Store Setting options api
    UPDATE_STORE_OPTIONS_DATA:"Store_setting_api/update_store_options_data",


    //Coupon API Calls
    COUPON_LIST:"Couponapi/get_coupon_details",
    COUPON_STATUS_UPDATE:"Couponapi/show_online",
    COUPON_DELETE:"Couponapi/delete_coupon",
    COUPON_TITLE_CHECK:"Couponapi/check_coupon_title",

    // System Access API Calls Listing and Update
    LIST_ALL_SYSTEM_ACCESS : "api/Settings_api/system_access",
    UPDATE_SYSTEM_ACCESS : "api/Settings_api/update_system_access",
    END_DAY_ACTUAL_AMT:"api/Settings_api/day_end_actual_amt",

    // get Store Setting alerts list api
    GET_STORE_ALERTS_DATA:"Store_setting_api/store_alerts_list",

    // get Store Setting alerts list api
    UPDATE_STORE_ALERTS_DATA:"Store_setting_api/store_alerts_update",

  });
