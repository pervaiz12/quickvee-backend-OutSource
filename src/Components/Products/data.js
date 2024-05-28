import React from "react";

export const optionList = [
  { value: "size", label: "Size" },
  { value: "color", label: "Color" },
  { value: "flavoure", label: "Flavoure" },
];

export const colourOptions = [
  { value: "red", label: "Red", color: "#FF5630" },
  { value: "orange", label: "Orange", color: "#FF8B00" },
  { value: "yellow", label: "Yellow", color: "#FFC400" },
  { value: "green", label: "Green", color: "#36B37E" },
  { value: "forest", label: "Forest", color: "#00875A" },
  { value: "slate", label: "Slate", color: "#253858" },
  { value: "silver", label: "Silver", color: "#666666" },
];

export const formData = [
  {
    name: "price",
    placeholder: "",
    type: "text",
    label: "Price",
  },
  {
    name: "compareAtPrice",
    placeholder: "",
    type: "text",
    label: "Compare At Price",
  },
  {
    name: "costPerItem",
    placeholder: "",
    type: "text",
    label: "Cost per item",
  },

  {
    name: "margin",
    placeholder: "",
    type: "text",
    label: "Margin (%)",
  },
  {
    name: "Profit",
    placeholder: "",
    type: "text",
    label: "Profit ($)",
  },
  {
    name: "qty",
    placeholder: "",
    type: "text",
    label: "QTY",
  },
  {
    name: "upcCode",
    placeholder: "",
    type: "text",
    label: "UPC Code",
  },
  {
    name: "customCode",
    placeholder: "",
    type: "text",
    label: "Custom Code",
  },
  {
    name: "reorderLevel",
    placeholder: "",
    type: "text",
    label: "Reorder Level",
  },
  {
    name: "reorderQty",
    placeholder: "",
    type: "text",
    label: "Reorder Qty",
  },
];

export const bulkVarientEdit = [
  {
    name: "costPerItem",
    placeholder: "",
    type: "text",
    label: "Cost per item",
  },
  {
    name: "compareAtPrice",
    placeholder: "",
    type: "text",
    label: "Compare At Price",
  },
  {
    name: "price",
    placeholder: "",
    type: "text",
    label: "Price",
  },
  {
    name: "reorderQty",
    placeholder: "",
    type: "text",
    label: "Reorder Qty",
  },
  {
    name: "reorderLevel",
    placeholder: "",
    type: "text",
    label: "Reorder Level",
  },
];

export const bulkInstantPo = [
  {
    name: "qty",
    placeholder: "",
    type: "text",
    label: "Quantity",
  },
  {
    name: "cost",
    placeholder: "",
    type: "text",
    label: "Cost",
  },
];

const data = () => {
  return <div>data</div>;
};

export default data;
