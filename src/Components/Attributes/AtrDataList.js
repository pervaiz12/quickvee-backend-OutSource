import React, { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
 import CrossIcon from "../../Assests/Dashboard/cross.svg";
 import SortIcon from "../../Assests/Dashboard/sort-arrows-icon.svg"

const AtrDataList = () => {
  const [items, setItems] = useState([
    { id: "1",sort: {SortIcon}, title: "Color", action: <FaPencilAlt /> },
    { id: "2", sort: {SortIcon}, title: "Size", action: <FaPencilAlt /> },
    { id: "3", sort: {SortIcon}, title: "Flavor", action: <FaPencilAlt /> },
    { id: "4", sort: {SortIcon}, title: "Material", action: <FaPencilAlt /> },
    { id: "5", sort: {SortIcon}, title: "Size", action: <FaPencilAlt /> },
    { id: "6", sort: {SortIcon}, title: "Flavor", action: <FaPencilAlt /> },
    // Add more data as needed
  ]);
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
      <div className="mx-2 my-4">
        <div className="box-content h-[450px] w-70 p-2 border-4 border-white bg-white rounded-xl opacity-100 mt-9 mx-8" style={{ boxShadow: "0px 3px 6px #0000001F" }}>
          <div>
            <div className="flex justify-between gap-2 mx-6 my-6">
              <div className="text-[18px] Admin_std leading-0 text-black admin_medium font-semibold opacity-100">
                Attributes
              </div>
              <div>
                <div className="text-[18px] Admin_std leading-0 text-blue-500 admin_medium font-semibold opacity-100">
                  Add New Attributes
                  <button className="text-[18px] text-blue-500 ml-1 focus:outline-none" onClick={() => setShowModal(true)}>+</button>
                </div>
              </div>
            </div>
          </div>

          <table className="w-full">
            <thead>
              <tr className="bg-[#253338] text-white">
                <th className="p-3 text-left cursor-pointer" onClick={() => sortBy("sort")}>Sort</th>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="text-black text-[18px] admin_medium border-b">
                  <td className="p-3 h-14"><img src={SortIcon}  className="h-6 w-6"/></td>
                  <td className="p-3">{item.title}</td>
                  <td className="p-3 text-right flex justify-end mt-2">{item.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for adding new attribute */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="absolute top-60 left-1/6 w-5/6 h-[262px] bg-white rounded-lg shadow-md p-6">
            <div className="flex">
            <h2 className="text-[18px] text-black opacity-100 Admin_std mb-4">Add New Attribute</h2>
              <img src={CrossIcon} alt="icon"  className="ml-auto mb-4"  onClick={() => setShowModal(false)}/>
        </div>
            <div className="mt-2 bg-[#000] border-b-2 w-full mb-4"></div>

            <div className="mb-4 text-[14px] text-[#6A6A6A]">Title</div>
            <input
              type="text"
              placeholder="Enter attribute title"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
              value={newAttribute}
              onChange={(e) => setNewAttribute(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={handleAddAttribute}
              >
                Add Attribute
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
      {/* Button to trigger modal */}
      {/* <div className="text-[18px] Admin_std leading-0 text-blue-500 admin_medium font-semibold opacity-100">
        Add New Attributes
        <button
          className="text-[18px] text-blue-500 ml-1 focus:outline-none"
          onClick={() => setShowModal(true)}
        >
          +
          
        </button>
      </div> */}
    </>
  );
};

export default AtrDataList;