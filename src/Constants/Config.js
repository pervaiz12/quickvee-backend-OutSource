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
    EMPLOYEE_LIST:"App/employee_list",

  
    // Store Setting options api
    GET_STORE_OPTIONS_DATA:"Store_setting_api/get_store_options_data",

    // Update Store Setting options api
    UPDATE_STORE_OPTIONS_DATA:"Store_setting_api/update_store_options_data",

    // System Access API Calls Listing and Update
    LIST_ALL_SYSTEM_ACCESS : "api/Settings_api/system_access",
    UPDATE_SYSTEM_ACCESS : "api/Settings_api/update_system_access",
    END_DAY_ACTUAL_AMT:"api/Settings_api/day_end_actual_amt",
  });