import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import DashboardIcon from "../../Assests/Dashboard/dashboard.svg";
import LabelIcon from "../../Assests/MultipleUserIcon/label.svg";
import LabelActive from "../../Assests/MultipleUserIcon/labelactive.svg";
import UsersICcon from "../../Assests/MultipleUserIcon/user.svg";
import UserActive from "../../Assests/MultipleUserIcon/useractive.svg";
import NewsletterIcon from "../../Assests/MultipleUserIcon/newsletter.svg";
import NewsletterActive from "../../Assests/MultipleUserIcon/newsletteractive.svg";
import StoreIcon from "../../Assests/MultipleUserIcon/store.svg";
import StoreActive from "../../Assests/MultipleUserIcon/storeactive.svg";
import OrderIcon from "../../Assests/MultipleUserIcon/orderCount.svg";
import OrderActive from "../../Assests/MultipleUserIcon/ordercountactive.svg";
import DefaultIcon from "../../Assests/MultipleUserIcon/defaults.svg";
import DefaultActive from "../../Assests/MultipleUserIcon/defaultactive.svg";
import ApkIcon from "../../Assests/MultipleUserIcon/apk.svg";
import ApkActive from "../../Assests/MultipleUserIcon/apkactive.svg";
import DuplicatesIcon from "../../Assests/MultipleUserIcon/duplicates.svg";
import DuplicatesActive from "../../Assests/MultipleUserIcon/duplicatesactive.svg";
import PermissionIcon from "../../Assests/MultipleUserIcon/permission.svg";
import PermissionActive from "../../Assests/MultipleUserIcon/permissionactive.svg";
import InverntoryIcon from "../../Assests/MultipleUserIcon/inventory.svg";
import InvertoryActive from "../../Assests/MultipleUserIcon/inventoryactive.svg";
import MerchantIcon from "../../Assests/MultipleUserIcon/merchant.svg";
import MerchantActive from "../../Assests/MultipleUserIcon/merchantactive.svg";

import CouponIcon from "../../Assests/Dashboard/coupanb.svg";

import CouIcon from "../../Assests/Dashboard/coupony.svg";

import { useLocation } from "react-router-dom";

const AllUserMenu = ({ isMenuOpen, setIsMenuToggle }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const currentUrl = location.pathname;

  const [activeItem, setActiveItem] = useState(currentUrl);
  const navigate = useNavigate();

  const handleItemClick = (item) => {
    console.log(item);
    setActiveItem(item.link);
    navigate(item.link);
  };

  return (
    <>
    <div
      className="sidebar-menu"
      style={isMenuOpen ? { width: "16rem" } : { width: "6rem" }}
    >
      {/* Left Side Menu */}
      <div className="flex-1 bg-[#253338] text-[#9E9E9E]">
        {isMenuOpen
          ? menuItems.map((item) => (
              <div
                key={item.id}
                className={`mb-4 text-base ${
                  activeItem === item.link ? "active" : ""
                }`}
              >
                {item.dropdownItems ? (
                  <DropdownMenuItem item={item} isMenuOpen={isMenuOpen} />
                ) : (
                  <div
                    className={`flex items-center ${
                      activeItem === item.link
                        ? "bg-[#414F54] text-[#FFC400]"
                        : ""
                          ? "text-[#FFC400] active:bg-[#414F54] hover:bg-[#414F54] px-0"
                          : ""
                    }`}
                  >
                    {activeItem === item.link ? item.activeIcon : item.icon}
                    <Link
                      onClick={() => handleItemClick(item)}
                      className={`ml-2 menu-item text-[18px] Admin_std ${
                        activeItem === item.link ? "bg-[#414F54]" : ""

      <div
        className="sidebar-menu"
        style={isMenuOpen ? { width: "16rem" } : { width: "6rem" }}
      >
        {/* Left Side Menu */}
        <div className="flex-1 bg-[#253338] text-[#9E9E9E]">
          {isMenuOpen
            ? menuItems.map((item) => (
                <div
                  key={item.id}
                  className={`mb-4 text-base ${
                    activeItem === item.link ? "active" : ""
                  }`}
                >
                  {item.dropdownItems ? (
                    <DropdownMenuItem item={item} isMenuOpen={isMenuOpen} />
                  ) : (
                    <div
                      className={`flex items-center ${
                        activeItem === item.link
                          ? "bg-[#414F54] text-[#FFC400]"
                          : ""
                            ? "text-[#FFC400] active:bg-[#414F54] hover:bg-[#414F54] px-0"
                            : ""
                      }`}
                    >
                      {activeItem === item.link ? item.activeIcon : item.icon}
                      <Link
                        onClick={() => handleItemClick(item)}
                        className={`ml-2 menu-item text-[18px] Admin_std ${
                          activeItem === item.link ? "bg-[#414F54]" : ""
                        }`}
                        to={item.link}
                      >
                        {item.text}
                      </Link>
                    </div>
                  )}
                </div>
              ))
            : menuItems.map((item) => (
                <div
                  key={item.id}
                  className={`mb-4 text-base cursor-pointer ${
                    activeItem === item.link ? "active" : ""
                  }`}
                >
                  {item.dropdownItems ? (
                    <DropdownMenuItem item={item} isMenuOpen={isMenuOpen} />
                  ) : (
                    <div
                      className={`flex flex-col items-center ${
                        activeItem === item.link
                          ? "text-[#FFC400] active"
                          : "text-gray-400 hover-text-yellow"

                      }`}
                      to={item.link}
                    >
                      {item.text}
                    </Link>
                  </div>
                )}
              </div>
            ))
          : menuItems.map((item) => (
              <div
                key={item.id}
                className={`mb-4 text-base cursor-pointer ${
                  activeItem === item.link ? "active" : ""
                }`}
              >
                {item.dropdownItems ? (
                  <DropdownMenuItem item={item} isMenuOpen={isMenuOpen} />
                ) : (
                  <div
                    className={`flex flex-col items-center ${
                      activeItem === item.link
                        ? "text-[#FFC400] active"
                        : "text-gray-400 hover-text-yellow"
                    }`}
                    onClick={() => {
                      handleItemClick(item);
                    }}
                  >
                    {activeItem === item.id ? item.activeIcon : item.icon}
                  </div>
                )}
              </div>
            ))}
      </div>
    </div>
  </>
);
};

const DropdownMenuItem = ({ item, isMenuOpen }) => {

const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


const handleToggleDropdown = () => {
  setIsDropdownOpen(!isDropdownOpen);
};

return (
  <div className="relative" style={isMenuOpen ? { width: "16rem" } : { width: "6rem", marginLeft: "24px" }} >

  <div className="flex items-center">
  {item.icon}
    {isMenuOpen && (
      <p
        className="cursor-pointer menu-item text-gray-400"
        onClick={handleToggleDropdown}
      >
      
      </p>
    )}

    {isMenuOpen && (
      <p
        className="ml-2 cursor-pointer menu-item text-gray-400"
        onClick={handleToggleDropdown}
      >
        {item.text}
        <FaChevronDown className="quickarrow_icon" />
      </p>
    )}
  </div>

  {isDropdownOpen && (
    <div className="mt-0 bg-[#334247] p-4 shadow w-full text-center z-10">
      {item.dropdownItems.map((dropdownItem) => (
        <Link
          key={dropdownItem.id}
          to={dropdownItem.link}
          className="flex text-center submenu-item text-gray-400 py-4"
        >
          {dropdownItem.text}
        </Link>
      ))}
    </div>
  )}

</div>

);
=======
  return (
    <div className="relative" style={isMenuOpen ? { width: "16rem" } : { width: "6rem", marginLeft: "24px" }} >

    <div className="flex items-center">
    {item.icon}
      {isMenuOpen && (
        <p
          className="cursor-pointer menu-item text-gray-400"
          onClick={handleToggleDropdown}
        >
        
        </p>
      )}
  
      {isMenuOpen && (
        <p
          className="ml-2 cursor-pointer menu-item text-gray-400"
          onClick={handleToggleDropdown}
        >
          {item.text}
          <FaChevronDown className="quickarrow_icon" />
        </p>
      )}
    </div>
  
    {isDropdownOpen && (
      <div className="mt-0 bg-[#334247] p-4 shadow w-full text-center z-10">
        {item.dropdownItems.map((dropdownItem) => (
          <Link
            key={dropdownItem.id}
            to={dropdownItem.link}
            className="flex text-center submenu-item text-gray-400 py-4"
          >
            {dropdownItem.text}
          </Link>
        ))}
      </div>
    )}
  
  </div>
  
  );
};

// Define menu items with icons and text
const menuItems = [
  {
    id: 1,
    icon: (
      <img
        src={LabelIcon}
        alt="labal"
        className="h-6 w-10 mt-4 mb-4 hoverable-image"
      />
    ),
    activeIcon: (
      <img src={LabelActive} alt="Label" className="h-6 w-10 mt-4 mb-4" />
    ),
    text: "Label",
    link: "/users/view/unapprove/label",
  },
  {
    id: 2,
    icon: (
      <img
        src={UsersICcon}
        alt="store"
        className="h-6 w-10 mt-4 mb-4 hoverable-image"
      />
    ),
    activeIcon: (
      <img src={UserActive} alt="active store" className="h-6 w-10 mt-4 mb-4" />
    ),
    text: "Users",
    link: "/users",
    className: "flex items-center gap-2",
    dropdownItems: [
      { id: 21, text: " Add ", link: "/users/addMerchant" },
      { id: 22, text: " Verified Merchant ", link: "/users/verified" },
      {
        id: 23,
        icon: (
          <img src={CouponIcon} alt="option" className="h-6 w-10 mt-4 mb-4" />
        ),
        activeIcon: (
          <img src={CouIcon} alt="option" className="h-6 w-10 mt-4 mb-4 " />
        ),
        text: " Unverified Merchant ",
        link: "/users/unapprove",
      },

      { id: 26, text: " Customer ", link: "/users/customer" },
      { id: 27, text: "  Admin  ", link: "/users/admin" },
      { id: 28, text: "  Manager  ", link: "/users/manager_view" },
    ],
  },

  {
    id: 3,
    icon: (
      <img
        src={NewsletterIcon}
        alt="labal"
        className="h-6 w-10 mt-4 mb-4 hoverable-image"
      />
    ),
    activeIcon: (
      <img
        src={NewsletterActive}
        alt="Newsletter"
        className="h-6 w-10 mt-4 mb-4"
      />
    ),
    text: "Newsletter ",
    link: "/users/view/unapprove/newsletter",
  },
  {
    id: 4,
    icon: (
      <img
        src={StoreIcon}
        alt="Store Order "
        className="h-6 w-10 mt-4 mb-4 hoverable-image"
      />
    ),
    activeIcon: (
      <img
        src={StoreActive}
        alt="Store Order "
        className="h-6 w-10 mt-4 mb-4"
      />
    ),
    text: "Store Order ",
    link: "/users/view/unapprove/store-order ",
  },
  {
    id: 5,
    icon: (
      <img
        src={OrderIcon}
        alt="labal"
        className="h-6 w-10 mt-4 mb-4 hoverable-image"
      />
    ),
    activeIcon: (
      <img
        src={OrderActive}
        alt="Order Count "
        className="h-6 w-10 mt-4 mb-4"
      />
    ),
    text: "Order Count ",
    link: "/users/view/unapprove/order-count ",
  },

  {
    id: 6,
    icon: (
      <img
        src={DefaultIcon}
        alt="labal"
        className="h-6 w-10 mt-4 mb-4 hoverable-image"
      />
    ),
    activeIcon: (
      <img
        src={DefaultActive}
        alt="menu-defaults"
        className="h-6 w-10 mt-4 mb-4"
      />
    ),
    text: "Defaults  ",
    link: "/users/view/unapprove/menu/defaults ",
  },

  {
    id: 7,
    icon: (
      <img
        src={ApkIcon}
        alt="release_apk"
        className="h-6 w-10 mt-4 mb-4 hoverable-image"
      />
    ),
    activeIcon: (
      <img src={ApkActive} alt="release_apk" className="h-6 w-10 mt-4 mb-4" />
    ),
    text: "Release APK   ",
    link: "/users/view/unapprove/release_apk",
  },
  {
    id: 8,
    icon: (
      <img
        src={DuplicatesIcon}
        alt="labal"
        className="h-6 w-10 mt-4 mb-4 hoverable-image"
      />
    ),
    activeIcon: (
      <img
        src={DuplicatesActive}
        alt="menu-defaults"
        className="h-6 w-10 mt-4 mb-4"
      />
    ),
    text: "Inventory Duplicate   ",
    link: "/users/view/unapprove/inverntory-duplicate ",
  },

  {
    id: 9,
    icon: (
      <img
        src={DuplicatesIcon}
        alt="labal"
        className="h-6 w-10 mt-4 mb-4 hoverable-image"
      />
    ),
    activeIcon: (
      <img
        src={DuplicatesActive}
        alt="menu-defaults"
        className="h-6 w-10 mt-4 mb-4"
      />
    ),
    text: " Category Duplicate ",
    link: "/users/view/unapprove/category-duplicate ",
  },

  {
    id: 10,
    icon: (
      <img
        src={DuplicatesIcon}
        alt="duplicates"
        className="h-6 w-10 mt-4 mb-4 hoverable-image"
      />
    ),
    activeIcon: (
      <img
        src={DuplicatesActive}
        alt="menu-defaults"
        className="h-6 w-10 mt-4 mb-4"
      />
    ),
    text: "Product Duplicate ",
    link: "/users/view/unapprove/product-duplicate ",
  },

  {
    id: 11,
    icon: (
      <img
        src={PermissionIcon}
        alt="labal"
        className="h-6 w-10 mt-4 mb-4 hoverable-image"
      />
    ),
    activeIcon: (
      <img
        src={PermissionActive}
        alt="menu-defaults"
        className="h-6 w-10 mt-4 mb-4"
      />
    ),
    text: "Permission",
    link: "/users/view/unapprove/create_permission ",
  },

  {
    id: 12,
    icon: (
      <img
        src={InverntoryIcon}
        alt="labal"
        className="h-6 w-10 mt-4 mb-4 hoverable-image"
      />
    ),
    activeIcon: (
      <img
        src={InvertoryActive}
        alt="menu-defaults"
        className="h-6 w-10 mt-4 mb-4"
      />
    ),
    text: "Inventory Export ",
    link: "/users/view/unapprove/invertory-export ",
  },

  {
    id: 12,
    icon: (
      <img
        src={MerchantIcon}
        alt="labal"
        className="h-6 w-10 mt-4 mb-4 hoverable-image"
      />
    ),
    activeIcon: (
      <img
        src={MerchantActive}
        alt="menu-defaults"
        className="h-6 w-10 mt-4 mb-4"
      />
    ),
    text: "Merchant Details ",
    link: "/users/view/unapprove/merchant-details",
  },
  // {
  //   id: 12,
  //   icon: (
  //     <img
  //       src={MerchantIcon}
  //       alt="labal"
  //       className="h-6 w-10 mt-4 mb-4 hoverable-image"
  //     />
  //   ),
  //   activeIcon: (
  //     <img
  //       src={MerchantActive}
  //       alt="menu-defaults"
  //       className="h-6 w-10 mt-4 mb-4"
  //     />
  //   ),
  //   text: "Need Help ",
  //   link: "/users/view/unapprove/need-help",
  // },
];

export default AllUserMenu;
