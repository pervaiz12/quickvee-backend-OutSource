import React, { useState } from "react";
import DeleteIcon from "../../Assests/Category/deleteIcon.svg";
import DownArrow from "../../Assests/Dashboard/Down.svg";
import { FaPencilAlt } from "react-icons/fa";
import CrossIcon from "../../Assests/Dashboard/cross.svg";
import SortIcon from "../../Assests/Dashboard/sort-arrows-icon.svg";

import Select from "react-select";
import makeAnimated from "react-select/animated";
import { colourOptions } from "../Products/data";

const VariantAttributes = () => {
  const [items, setItems] = useState([]);
  const [variantValue, setVariantValue] = useState("");
  const [showAttributes, setShowAttributes] = useState(false);

  const handleInputChange = (event, itemId) => {
    const updatedItems = items.map((item) =>
      item.id === itemId ? { ...item, title: event.target.value } : item
    );
    setItems(updatedItems);
  };

  const handleDeleteClick = (itemId) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems(updatedItems);
  };

  const [showModal, setShowModal] = useState(false);
  const [newAttribute, setNewAttribute] = useState("");
  const [options, setOptions] = useState([]);

  const sortBy = (key) => {
    const sortedItems = [...items].sort((a, b) => {
      return a[key].localeCompare(b[key], undefined, { numeric: true });
    });
    setItems(sortedItems);
  };

  const handleAddAttribute = () => {
    const newItem = {
      id: (items.length + 1).toString(),
      sort: SortIcon,
      title: newAttribute,
      action: <FaPencilAlt />,
      options: options.map((option) => option.value),
    };
    setItems([...items, newItem]);
    setShowModal(false);
    setNewAttribute("");
    setOptions([]);
    setShowAttributes(true); // Show variant attributes after adding data
  };

  const animatedComponents = makeAnimated();

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

          <div className="my-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center my-2" style={{border:"1px solid #E1E1E1", borderRadius:"4px", padding:"10px"}}>
                <div
                  className="q_product_modal"
                  onChange={(event) => handleInputChange(event, item.id)}
                >
                  {item.title} -
                </div>

                <div className="ml-2 flex">
                  {item.options.map((option, index) => (
                    <React.Fragment key={option}>
                      <div>{option} </div>
                      {index !== item.options.length - 1 && <div>,</div>}
                    </React.Fragment>
                  ))}
                </div>

                <button
                  onClick={() => handleDeleteClick(item.id)}
                  className="ml-auto"
                >
                  <img src={DeleteIcon} alt="" className="w-6 h-6 ml-auto" />
                </button>
              </div>
            ))}
          </div>
          {/* {items.map((item) => (
            <div key={item.id} className="flex items-center my-2">
              <input
                type="text"
                id={`variant-${item.id}`}
                name={`variant-${item.id}`}
                value={item.title}
                onChange={(event) => handleInputChange(event, item.id)}
              />
              <Select
                className="ml-2"
                options={colourOptions}
                defaultValue={colourOptions.filter((option) =>
                  item.options.includes(option.value)
                )}
                isMulti
              />
              <button onClick={() => handleDeleteClick(item.id)}>
                <img
                  src={DeleteIcon}
                  alt=""
                  className="w-6 h-6 ml-auto relative top-[-46px] mr-2"
                />
              </button>
            </div>
          ))} */}
        </div>
      </div>

      <div className="q-add-categories-single-input">
        <div className="q_add_variant_attributes">
          <div
            className="text-[#0A64F9] text-center"
            onClick={() => setShowModal(true)}
          >
            Add Variant Attributes +
          </div>
        </div>
      </div>

      {/* Modal for adding new attribute */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="absolute top-60 left-1/6 w-5/6 h-auto bg-white rounded-lg shadow-md p-6">
            <div className="flex">
              <h2 className="text-[18px] text-black opacity-100 Admin_std mb-4">
                Add Variant Attributes{" "}
              </h2>
              <img
                src={CrossIcon}
                alt="icon"
                className="ml-auto mb-4"
                onClick={() => setShowModal(false)}
              />
            </div>
            <div class="mt-2 bg-[#000] border-b-2 w-full mb-4"></div>

            <div class="qvrow">
              <div class="col-qv-12">
                <div class="input_area">
                  <label>Attribute</label>
                  <input
                    className=""
                    type="text"
                    name="owner_name"
                    value={newAttribute}
                    onChange={(e) => setNewAttribute(e.target.value)}
                  />
                </div>
              </div>
              <div class="col-qv-12">
                <div class="input_area">
                  <label>Options</label>
                  <Select
                    closeMenuOnSelect={false}
                    components={{ ...animatedComponents }}
                    value={options}
                    onChange={(selectedOptions) => setOptions(selectedOptions)}
                    isMulti
                    options={colourOptions}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-[#0A64F9] text-white rounded-md"
                onClick={handleAddAttribute}
              >
                Save
              </button>
              <button
                className="ml-4 px-4 py-2 bg-[#878787] rounded-md"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VariantAttributes;
