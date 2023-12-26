// All api calls are initialized in this component for this application
//remove unwanted and credentials of other app

module.exports = Object.freeze({
    BASE_URL: 'https://sandbox.quickvee.com/',
  
  


    // Categories API calls
    LIST_ALL_CATEGORIES:"Categoryapi/category_list",
    DELETE_SINGLE_CATEGORIE:"Categoryapi/delete_category",
    LIST_ALL_IN_STORE_ORDER:"api/orderoffline",
    LIST_ALL_ONLINE_STORE_ORDER:'api/newOrder',

  
  });