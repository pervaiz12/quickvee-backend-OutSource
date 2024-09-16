import { Grid } from "@mui/material";
import React from "react";
import { formatDateTime } from "../../../Constants/utils";

export default function StationStatus({state}) {
  return (
    <>
      <Grid container sx={{ padding: 2.5, mt: 2.5 }} className="box_shadow_div">
        <Grid item xs={12}>
          <Grid container>
            {[
              { label: "Register", value: "Main Register" },
              { label: "Opened", value: formatDateTime(state?.in_time) },
              {
                label: "Closed",
                value:
                  state?.out_time === "Open"
                    ? "Still Open"
                    : formatDateTime(state?.out_time),
              },
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
            <p className="text-[#000000] CircularSTDBook-15px">
              {state.storeName}
            </p>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
