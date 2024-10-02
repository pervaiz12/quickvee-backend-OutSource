import React, { useState, useEffect } from "react";

import { BASE_URL, TAXE_CATEGORY_LIST } from "../../../Constants/Config";
import axios from "axios";
import { useAuthDetails } from "../../../Common/cookiesHelper";
import { Grid, Grid2 } from "@mui/material";
import SelectDropDown from "../../../reuseableComponents/SelectDropDown";
import CustomHeader from "../../../reuseableComponents/CustomHeader";
import PasswordShow from "../../../Common/passwordShow";
import InputTextSearch from "../../../reuseableComponents/InputTextSearch";
import downloadIcon from "../../../Assests/Dashboard/download.svg";
import { CSVLink } from "react-csv";

const InventoryReportDropDown = ({ selectedInventoryDropDown }) => {
  console.log("=-=-=-=-props", JSON.stringify(selectedInventoryDropDown));
};
export default InventoryReportDropDown;
