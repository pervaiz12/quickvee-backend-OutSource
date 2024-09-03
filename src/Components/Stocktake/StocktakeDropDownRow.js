import {
  styled,
  Table,
  TableCell,
  tableCellClasses,
  TableRow,
} from "@mui/material";
import React from "react";
import AsyncSelect from "react-select/async";
import BasicTextFields from "../../reuseableComponents/TextInputField";
const StyledTable = styled(Table)(({ theme }) => ({
  padding: 2, // Adjust padding as needed
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#253338",
    color: theme.palette.common.white,
    fontFamily: "CircularSTDMedium !important",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontFamily: "CircularSTDBook !important",
  },
  [`&.${tableCellClasses.table}`]: {
    fontSize: 14,
    fontFamily: "CircularSTDBook !important",
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    // backgroundColor: "#F5F5F5",
  },
  "& td, & th": {
    border: "none",
  },
}));
export default function StocktakeDropDownRow({
  index,
  singleStocktakeState,
  product,
  stocktake_items,
  loadOptions,
  customStyles,
  handleOnChangeSelectDropDown,
  handleClearDropdown,
  lastDropdownKey,
  errorMessages,
  handleNewQtyChange,
  handleKeyPress,
  DeleteIcon,
  handleDeleteProduct
}) {
  return (
    <StyledTableRow key={index}>
      <StyledTableCell sx={{ width: "40%", verticalAlign: "top" }}>
        <div style={{ position: "relative", zIndex: 100 }}> 
          {singleStocktakeState?.stocktake_item[index]?.product_id &&
          singleStocktakeState?.stocktake_item[index]?.product_id ===
            product.product_id ? (
            product?.product_name
          ) : (
            <>
              <AsyncSelect
                isDisabled={stocktake_items.some(
                  (item) =>
                    item.product_name !== "" &&
                    index !== stocktake_items.length - 1
                )}
                loadOptions={loadOptions}
                defaultOptions
                styles={customStyles}
                menuPortalTarget={document.body}
                onChange={(option) => {
                  handleOnChangeSelectDropDown(
                    option.prodId,
                    option.variantId,
                    index
                  );
                //   if (index === stocktake_items.length - 1) {
                //     handleClearDropdown(); // Call this only for the last one
                //   }
                }}
                value={{
                  label: product && product?.product_name,
                  value: (product && product?.var_id) || product?.id,
                }}
                // key={
                //   index === stocktake_items.length - 1 ? lastDropdownKey : index
                // }
              />
            </>
          )}
          {errorMessages[index]?.product_name && (
            <div className="error-message-stocktake">
              {errorMessages[index].product_name}
            </div>
          )}
        </div>
      </StyledTableCell>
      <StyledTableCell sx={{ verticalAlign: "top" }}>
        {product.current_qty}
      </StyledTableCell>
      <StyledTableCell sx={{ width: "20%", verticalAlign: "top" }}>
        <BasicTextFields
          value={product.new_qty}
          maxLength={6}
          onChangeFun={(e) => {
            handleNewQtyChange(e, index);
          }}
          onKeyPressFun={handleKeyPress}
          autoComplete={false}
        />
        {errorMessages[index]?.new_qty && (
          <div className="error-message-stocktake">
            {errorMessages[index].new_qty}
          </div>
        )}
      </StyledTableCell>
      <StyledTableCell sx={{ verticalAlign: "top" }}>
        {product.discrepancy}
      </StyledTableCell>
      <StyledTableCell sx={{ verticalAlign: "top" }}>
        {product.upc}
      </StyledTableCell>

      <StyledTableCell sx={{ verticalAlign: "top" }}>
        {stocktake_items.length === 1 ? null : (
          <img
            src={DeleteIcon}
            onClick={() => handleDeleteProduct(index)}
            alt="Delete Icon"
            className="cursor-pointer"
          />
        )}
      </StyledTableCell>
    </StyledTableRow>
  );
}
