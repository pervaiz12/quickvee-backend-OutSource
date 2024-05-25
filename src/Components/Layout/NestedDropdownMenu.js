import { FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { setNestedDropdown } from "../../Redux/features/NavBar/MenuSlice";
const NestedDropdownMenu = ({
  item,
  isMenuOpenRedux,
  activeItem,
  dropDownItem,
  hoveredItem,
  handleToggleDropdownItems,
  activeNestedItem,
  setActiveNestedItem
}) => {
  const dispatch = useDispatch();
  const isNestedDropdown = useSelector(
    (state) => state.NavBarToggle.isNestedDropdown
  );
 
  const handleNestedClick = (id) => {
    setActiveNestedItem((prevId) => (prevId === id ? null : id))
  };
  const handleActiveCurrentNestedTab=(id)=>{
    console.log("handleActiveCurrentNestedTab: ",id)
    setActiveNestedItem((prevId) => (prevId === id ? null : id))

  }
  return (
    <div className="w-full  items-center cursor-pointer hover:text-[#F5F9FF] hover:bg-[#526167]  text-[#9E9E9E] ">
      {isMenuOpenRedux ? (
        <>
          <div>
            <div
              onClick={(e) => {
                handleNestedClick(item.id);
                e.stopPropagation();
              }}
            
              className={`w-full flex items-center hover:bg-[#526167]  justify-between cursor-pointer
              ${activeNestedItem === item.id ? "bg-[#526167] " : ""}
              `}
            >
                {console.log("activeNestedItem",activeNestedItem," ===" ,"item.id",item.id, activeNestedItem === item.id)}
              <p
                className={` text-[14px] p-4  Admin_std ${
                    activeNestedItem === item.id ? "text-[#F5F9FF] " : ""
                }`}
              >
                {item?.text}
              </p>

              <FaChevronDown
                className={`quickarrow_icon me-4 text-${
                  (activeItem === dropDownItem || hoveredItem === item?.id) &&
                  "[#F5F9FF]"
                }`}
              />
            </div>
          </div>
        </>
      ) : (
        <>{/* for icons */}</>
      )}

      {activeNestedItem === item.id &&
        item?.dropDownItems?.length &&
        item?.dropDownItems?.map((NestedItem) => (
          <div className="">
            <Link
              key={NestedItem.id}
              to={NestedItem.link}
              className={`flex nested-submenu-item ps-6  hover:text-[#FFC400] text-center text-[#9E9E9E]  py-3 text-[14px]
              ${activeItem === NestedItem.link ? "text-[#FFC400]" : ""}`
            }
              onClick={(e) => {
                handleToggleDropdownItems(NestedItem.link);
                handleActiveCurrentNestedTab(item.id)
                e.stopPropagation();
              }}
            >
              {NestedItem.text}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default NestedDropdownMenu;
