import { Grid } from "@mui/material";
import storeDefaultImage from "../../Assests/Vendors/DefaultStore.svg";
import EmailLogo from "../../Assests/Vendors/EmailLogo.svg";
import PhoneLogo from "../../Assests/Vendors/PhoneLogo.svg";
import AddIcon from "../../Assests/Category/addIcon.svg";
import AddManagerFormModel from "./AddManagerFormModel";
const managerStore = [
  {
    name: "Adam Willson",
    email: "adamwillson@gmail.com",
    phone: "555-32342-234324",
    stores: ["Store Name-1", "Store Name-Lorem 2", "Store 3"],
  },
  {
    name: "Adam Willson",
    email: "adamwillson@gmail.com",
    phone: "555-32342-234324",
    stores: ["Store Name-1", "Store Name-Lorem 2", "Store 3"],
  },
  {
    name: "Adam Willson",
    email: "adamwillson@gmail.com",
    phone: "555-32342-234324",
    stores: ["Store Name-1", "Store Name-Lorem 2", "Store 3"],
  },
  {
    name: "Adam Willson",
    email: "adamwillson@gmail.com",
    phone: "555-32342-234324",
    stores: ["Store Name-1", "Store Name-Lorem 2", "Store 3"],
  },
  {
    name: "Adam Willson",
    email: "adamwillson@gmail.com",
    phone: "555-32342-234324",
    stores: ["Store Name-1", "Store Name-Lorem 2", "Store 3"],
  },
];

const stores = [
  { id: 1,value: 'chocolate', title: 'Chocolate' },
  { id: 2,value: 'strawberry', title: 'Strawberry' },
  { id: 3,value: 'vanilla', title: 'Vanilla' },
];
const ManagerStore = () => {
  return (
    <>
      <Grid container-fluid className="managerStore-title-main border">
        <Grid item xs={12}>
          <div className="flex justify-between  m-3">
            <p className="managerStore-title select-none">Manager</p>
            <div className="flex items-center cursor-pointer">
              {/* <p className="me-3 select-none managerStore-btn" style={{whiteSpace:"nowrap"}}>Add Manager</p> <img src={AddIcon} /> */}
              <AddManagerFormModel stores={stores} />
            </div>
          </div>
        </Grid>
      </Grid>
      <Grid container className="store-items-list" spacing={2}>
        {managerStore.map((item, Index) => (
          <Grid item className="store-items " xs={12} sm={6} key={Index}>
            <div className="store-item-card-manager border my-2 p-4">
              <div className="flex">
                <div className="me-5 flex items-start">
                  <img src={item.img || storeDefaultImage} alt="store_image" />
                </div>
                <div className="grid content-center w-full store-items-address">
                  <div className="flex justify-between">
                    <p className="store-items-store-name ">{item.name}</p>
                    <p className="store-items-edit-btn select-none">Edit</p>
                  </div>

                  <div className="store-items-store-name-address w-full">
                    <span className="flex ">
                      <img className="me-2" src={EmailLogo} />
                      <span className="me-4">{`${item.email} `}</span>
                    </span>
                    <span className="flex  ">
                      <img className="" src={PhoneLogo} />
                      <span>{`${item.phone} `}</span>
                    </span>
                  </div>
                  <div className="flex mt-2">
                    {item.stores.map((store) => (
                      <p className="p-1 border me-3 store-items-store-names">
                        {store}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ManagerStore;
