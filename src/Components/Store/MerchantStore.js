import { Grid } from "@mui/material";

import storeDefaultImage from "../../Assests/Vendors/DefaultStore.svg";
const storeList = [
  {
    a_address_line_1: "230 dr suit",
    a_address_line_2: "tracy",
    a_city: "CA",
    a_phone: null,
    a_state: "USA",
    a_zip: "95391",
    id: "76710",
    img: null,
    merchant_id: "TES76710AA",
    name: "vapeNew",
    phone: "7878787878",
    user_type: "merchant",
  },
  {
    a_address_line_1: "230 dr suit",
    a_address_line_2: "tracy",
    a_city: "CA",
    a_phone: null,
    a_state: "USA",
    a_zip: "95391",
    id: "76722",
    img: null,
    merchant_id: "RIN76722AA",
    name: "Vapnew2",
    phone: "7777777777",
    user_type: "merchant",
  },
  {
    a_address_line_1: "230 dr suit",
    a_address_line_2: "tracy",
    a_city: "CA",
    a_phone: null,
    a_state: "USA",
    a_zip: "95391",
    id: "76727",
    img: null,
    merchant_id: "RIN76727AA",
    name: "vapeNew3",
    phone: "7878787878",
    user_type: "merchant",
  },
  {
    a_address_line_1: "230 dr suit",
    a_address_line_2: "tracy",
    a_city: "CA",
    a_phone: null,
    a_state: "USA",
    a_zip: "95391",
    id: "76727",
    img: null,
    merchant_id: "RIN76727AA",
    name: "vapeNew3",
    phone: "7878787878",
    user_type: "merchant",
  },
  {
    a_address_line_1: "230 dr suit",
    a_address_line_2: "tracy",
    a_city: "CA",
    a_phone: null,
    a_state: "USA",
    a_zip: "95391",
    id: "76727",
    img: null,
    merchant_id: "RIN76727AA",
    name: "vapeNew3",
    phone: "7878787878",
    user_type: "merchant",
  },
];
const StorePage = () => {
  return (
    <>
      <Grid container className="store-items-list" spacing={2}>
        {storeList.map((store, Index) => (
          <Grid item className="store-items " xs={12} sm={6}  key={Index}>
            <div className="store-item-card border my-2 p-2">
              <div className="me-5">
                <img src={store.img || storeDefaultImage} alt="store_image" />
              </div>
              <div className="grid content-center store-items-address">
                <p className="store-items-store-name">{store.name}</p>
                <p className="store-items-store-name-address">
                  {[
                    store.a_address_line_1,
                    store.a_address_line_2,
                    store.a_city,
                    store.a_state,
                    store.a_zip,
                  ]
                    .filter((part) => part !== null && part !== "")
                    .join(", ")}
                </p>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default StorePage;
