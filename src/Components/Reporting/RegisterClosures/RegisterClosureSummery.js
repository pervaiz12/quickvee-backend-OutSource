import { Grid } from "@mui/material";
import React from "react";
import leftArrow from "../../../Assests/Dashboard/Left.svg";
import { Link } from "react-router-dom";
import { useAuthDetails } from "../../../Common/cookiesHelper";

export default function RegisterClosureSummery() {
  const { LoginGetDashBoardRecordJson } = useAuthDetails();
  const merchant_id = LoginGetDashBoardRecordJson?.data?.merchant_id;
  const storeData = JSON.parse(localStorage.getItem("AllStore") || "[]");

  const storeName = storeData.find(store => store.merchant_id === merchant_id)?.name;

  return (
    <Grid container sx={{ padding: 2.5, mt: 1.5 }}>
      <Grid item xs={12}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Link to={-1} className="flex items-center gap-1">
              <img src={leftArrow} alt="leftArrow" style={{ height: 30, width: 30 }} />
              <p className="heading" style={{ marginBottom: 0 }}>Register Closures Summary</p>
            </Link>
          </Grid>
          <Grid item>
            <p className="CircularSTDMedium-16px underline text-[#0A64F9]" style={{ marginBottom: 0 }}>
              View full details
            </p>
          </Grid>
        </Grid>
      </Grid>
      
      <Grid container sx={{ padding: 2.5, mt: 2.5 }} className="box_shadow_div">
        <Grid item xs={12}>
          <Grid container>
            {[
              { label: 'Register', value: 'Main Register' },
              { label: 'Opened', value: 'Aug 27,2024-3:28PM' },
              { label: 'Closed', value: 'Aug 27,2024-3:55PM' }
            ].map(({ label, value }) => (
              <Grid item xs={3} key={label} sx={{ display: "flex", gap: 1 }}>
                <p className="text-[#7E7E7E] CircularSTDBook-15px">{label}:</p>
                <p className="text-[#000000] CircularSTDBook-15px">{value}</p>
              </Grid>
            ))}
          </Grid>
        </Grid>
        
        <Grid item xs={12} sx={{ mt: 2.5 }}>
          <Grid item xs={3} sx={{ display: "flex", gap: 1 }}>
            <p className="text-[#7E7E7E] CircularSTDBook-15px">Outlet:</p>
            <p className="text-[#000000] CircularSTDBook-15px">{storeName}</p>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
