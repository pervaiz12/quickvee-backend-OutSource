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
  
    // Store Setting options api
    GET_STORE_OPTIONS_DATA:"Store_setting_api/get_store_options_data",

    // Update Store Setting options api
    UPDATE_STORE_OPTIONS_DATA:"Store_setting_api/update_store_options_data",
  });