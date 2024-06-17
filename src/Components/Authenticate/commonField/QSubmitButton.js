import React from "react";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export default function QSubmitButton(props) {
  return (
    <Button
      variant="contained"
      className="customer-btn"
      onClick={props.handleSubmitForm}
    >
      {props?.loading ? (
        <CircularProgress color={"inherit"} size={25} />
      ) : (
        props.name
      )}
    </Button>
  );
}
