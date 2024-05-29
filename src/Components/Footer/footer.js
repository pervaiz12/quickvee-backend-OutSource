import React from "react";
import { Link } from "react-router-dom";

const Footer = ({ visible }) => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <div className="footer_area">
        <div className="footer_area_inner">
          <div className="footer_areaL">
            <p>© {currentYear} Quickvee. All rights reserved.</p>
          </div>
          <div className="footer_areaR">
            <ul>
              <li>
                <Link to="/about-us" target="_blank">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" target="_blank">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-condition" target="_blank">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
