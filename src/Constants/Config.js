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


    LIST_ALL_IN_STORE_ORDER:"api/orderoffline",
    LIST_ALL_ONLINE_STORE_ORDER:'api/newOrder',


    //Storesettings API Calls
<<<<<<< HEAD
    EMPLOYEE_LIST:"Store_setting_api/employee_list",
    ADDEDIT_EMPLOYEE:"Store_setting_api/addEdit_employee",
    DELETE_EMPLOYEE:"Store_setting_api/delete_employee",
=======
    EMPLOYEE_LIST:"App/employee_list",

>>>>>>> ab66306ce13f61734df968fe57560e10a38c4d64
  
  });