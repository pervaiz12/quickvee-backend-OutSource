import React, { useState } from 'react';
import DeleteIcon from "../../Assests/Category/deleteIcon.svg";
import DownArrow from "../../Assests/Dashboard/Down.svg"
import { FaPencilAlt } from "react-icons/fa";
 import CrossIcon from "../../Assests/Dashboard/cross.svg";
 import SortIcon from "../../Assests/Dashboard/sort-arrows-icon.svg"



const VariantAttributes = () => {
    const [items, setItems] = useState([
        { id: "1",sort: {SortIcon}, title: "Color", action: <FaPencilAlt /> },
        { id: "2", sort: {SortIcon}, title: "Size", action: <FaPencilAlt /> },
        { id: "3", sort: {SortIcon}, title: "Flavor", action: <FaPencilAlt /> },
        { id: "4", sort: {SortIcon}, title: "Material", action: <FaPencilAlt /> },
        { id: "5", sort: {SortIcon}, title: "Size", action: <FaPencilAlt /> },
        { id: "6", sort: {SortIcon}, title: "Flavor", action: <FaPencilAlt /> },
        // Add more data as needed
      ]);
  const [variantValue, setVariantValue] = useState('');

  const handleInputChange = (event) => {
    setVariantValue(event.target.value);
  };

  const handleDeleteClick = () => {
    setVariantValue('');
  };
  const [showModal, setShowModal] = useState(false);
  const [newAttribute, setNewAttribute] = useState("");

  const sortBy = (key) => {
    const sortedItems = [...items].sort((a, b) => {
      return a[key].localeCompare(b[key], undefined, { numeric: true });
    });
    setItems(sortedItems);
  };

  const handleAddAttribute = () => {
    const newItem = {
      id: (items.length + 1).toString(),
      sort: (items.length + 1).toString(),
      title: newAttribute,
      action: <FaPencilAlt />,
    };
    setItems([...items, newItem]);
    setShowModal(false);
    setNewAttribute("");
  };



  return (
    <>
      <div className='mx-0'>
        <div className="q-add-categories-section-middle-form">
          <div className="q-add-categories-single-input">
            <label htmlFor="variant">Variant Attributes</label>
            <input
              type="text"
              id="variant"
              name="variant"
              value={variantValue}
              onChange={handleInputChange}
            />
            <button onClick={handleDeleteClick}>
              <img src={DeleteIcon} alt='' className='w-6 h-6 ml-auto relative top-[-46px] mr-2' />
            </button>
          </div>
        </div>
      </div>

      <div className="q-add-categories-section-middle-form">
          <div className="q-add-categories-single-input">
            <div className='q_add_variant_attributes'>
            <div className='text-[#0A64F9] text-center' onClick={() => setShowModal(true)}>Add Variant Attributes  +
           </div>
            </div>
            </div>
            </div>


   {/* Modal for adding new attribute */}
   {showModal && (
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="absolute top-60 left-1/6 w-5/6 h-auto bg-white rounded-lg shadow-md p-6">
            <div className="flex">
            <h2 className="text-[18px] text-black opacity-100 Admin_std mb-4">Add Variant Attributes </h2>
              <img src={CrossIcon} alt="icon"  className="ml-auto mb-4"  onClick={() => setShowModal(false)}/>
        </div>
            <div class="mt-2 bg-[#000] border-b-2 w-full mb-4"></div>

            <div className="q-add-categories-section-middle-form">
          <div className="q-add-categories-single-input">
            <label htmlFor="attributes">Attribute</label>
            <input type="text" id="attributes" name="attributes" />
            <img src={DownArrow} alt='' className='w-6 h-6 ml-auto relative top-[-46px] mr-2' />
          
          </div>
          </div>
          <div className="q-add-categories-single-input">
            <label htmlFor="tax">Taxes</label>

          </div>
          
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={handleAddAttribute}
              >
                Save
              </button>
              <button
                className="ml-4 px-4 py-2 bg-gray-300 rounded-md"
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
