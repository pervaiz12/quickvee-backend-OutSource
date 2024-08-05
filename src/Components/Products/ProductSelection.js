import React from "react";
import InventoryDropdownList from "../../CommonComponents/InventoryDropdownList";

const ProductSelection = ({
  optionList,
  handleSelectProductOptions,
  handleDeleteSelectedOption,
  selectedOption,
  error,
  placeholder,
  productTitle,
  onSelectUpdateState,
}) => {
  return (
    <>
      <div className="q-add-categories-single-input ">
        <InventoryDropdownList
          title="Select Products"
          keyName="selectProducts"
          name="title"
          optionList={optionList}
          handleSelectProductOptions={handleSelectProductOptions}
          handleDeleteSelectedOption={handleDeleteSelectedOption}
          selectedOption={selectedOption}
          onSelectUpdateState={onSelectUpdateState}
          error={error}
          // handleUpdateError={handleUpdateError}
          placeholder={placeholder}
          productTitle={productTitle}
        />
      </div>
    </>
  );
};

export default ProductSelection;
