import React, { useEffect, useState } from "react";
import DeleteIcon from "../../Assests/Category/deleteIcon.svg";

import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";

const VariantAttributes = ({
  filterOptionList,
  handleFilterDropdownOption,
  varientDropdownList,
  varientError,
  toggleVarientSection,
  isMultipleVarient,
  handleOnBlurAttributes,
  varientLength,
  handleSetVarientLength,
  addMoreVarientItems,
}) => {
  const [showAttributes, setShowAttributes] = useState(false);
  const animatedComponents = makeAnimated();

  const handleDeleteClick = (id) => {
    const deleteSelected = varientLength?.filter((item) => {
      return item?.id !== id;
    });
    handleSetVarientLength(deleteSelected);
  };

  const handlechange = (value, index, name) => {
    let updateVarientLength = [...varientLength];
    if (name == "varientName") {
      updateVarientLength[index] = {
        ...updateVarientLength[index],
        varientName: value,
      };
    } else if (name == "varientAttributeList") {
      updateVarientLength[index] = {
        ...updateVarientLength[index],
        varientAttributeList: value,
      };
    }
    handleSetVarientLength(updateVarientLength);
  };

  useEffect(() => {
    const filterItems = varientDropdownList?.filter(
      (opt) =>
        !varientLength
          ?.map((item) => item?.varientName?.value)
          .includes(opt?.title)
    );
    handleFilterDropdownOption(filterItems);
  }, [varientLength, varientDropdownList]);

  // if varientName is empty set defaultValue dropdown first item. only for the first dropwdown for fill the value.
  useEffect(() => {
    if (varientLength?.length && varientDropdownList?.length) {
      const setDefaultValue = varientLength?.map((sec, index) => {
        return {
          ...sec,
          varientName: !!sec?.varientName
            ? sec?.varientName
            : {
                value: varientDropdownList[0]?.title,
                label: varientDropdownList[0]?.title,
              },
        };
      });
      handleSetVarientLength(setDefaultValue);
    }
  }, [varientDropdownList]);

  const filterDefaultvalue = () => {
    if (filterOptionList?.length > 0) {
      return filterOptionList?.map((option) => ({
        value: option?.title,
        label: option?.title,
      }));
    }
  };

  return (
    <>
      <div
        className="mx-0"
        style={{ display: showAttributes ? "block" : "none" }}
      >
        <div className="q-add-categories-single-input">
          <div className="q_dashbaord_netsales">
            <h1>Variant Attributes</h1>
          </div>
        </div>
      </div>

      <div class="multiple-items">
        <span>Multiple Items?*</span>
        <div class="checkbox-area">
          <input
            type="checkbox"
            name="isMultiple"
            checked={isMultipleVarient}
            onChange={toggleVarientSection}
          />
          <label for="isMultiple">Create Attributes and Options</label>
        </div>
      </div>
      {isMultipleVarient ? (
        <div className="">
          <div className="">
            <div className="flex">
              <h2 className="text-[18px] text-black opacity-100 Admin_std mb-4">
                Variant Attributes
              </h2>
            </div>

            {varientLength.length > 0
              ? varientLength?.map((varient, index) => {
                  return (
                    <div class="qvrow varientAddSection" key={index + 1}>
                      <div class="col-qv-5">
                        <div class="input_area">
                          {/* <input
                    className=""
                    type="text"
                    name="owner_name"
                    value={newAttribute}
                    onChange={(e) => setNewAttribute(e.target.value)}
                  /> */}

                          <Select
                            closeMenuOnSelect={true}
                            components={{ ...animatedComponents }}
                            value={varient?.varientName}
                            onChange={(e) =>
                              handlechange(e, index, "varientName")
                            }
                            options={filterDefaultvalue()}
                            isSearchable
                            isClearable
                            // defaultValue={{
                            //   value: varientDropdownList[0]?.title,
                            //   label: varientDropdownList[0]?.title,
                            // }}
                            isDisabled={index + 1 < varientLength?.length}
                          />
                        </div>
                      </div>
                      <div class="col-qv-5">
                        <div class="input_area">
                          <CreatableSelect
                            closeMenuOnSelect={true}
                            components={{ ...animatedComponents }}
                            value={varientLength?.varientAttributeList}
                            onChange={(e) => {
                              handlechange(e, index, "varientAttributeList");
                            }}
                            onKeyDown={handleOnBlurAttributes}
                            isMulti

                            // options={colourOptions}
                          />
                        </div>
                        {!!varientError?.error &&
                        +varientError?.errorIndex === index
                          ? varientError?.error
                          : ""}
                      </div>
                      <div className="col-qv-2">
                        {varientLength[varientLength?.length - 1]?.id ===
                          varient?.id && varient?.id !== 1 ? (
                          <button
                            onClick={() => handleDeleteClick(varient?.id)}
                            className="ml-auto"
                          >
                            <img
                              src={DeleteIcon}
                              alt=""
                              className=" m-auto d-grid place-content-center"
                              width="50px"
                            />
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  );
                })
              : ""}

            {varientLength.length < 3 ? (
              <div className="flex">
                <button
                  className="px-4 py-2 bg-[#0A64F9] text-white rounded-md"
                  // onClick={handleAddAttribute}
                  onClick={addMoreVarientItems}
                >
                  Add Variant Attributes +
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        ""
      )}
      {/* )} */}
    </>
  );
};

export default VariantAttributes;
