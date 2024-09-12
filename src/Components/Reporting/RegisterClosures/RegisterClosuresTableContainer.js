import { Grid } from "@mui/material";
import React from "react";
import RegisterClosuresTable from "./RegisterClosuresTable";

export default function RegisterClosuresTableContainer() {
  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7].map((table) => (
       <RegisterClosuresTable table={table}/>
      ))}
    </>
  );
}
