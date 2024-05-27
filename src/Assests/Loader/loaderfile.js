import React from "react";
import ScreenLoader from "../../Assests/screenLoader/Quickvee_loader_.gif";

export default function Loaderfile() {
  return (
    <div className="loaderareadiv">
      <div className="lodarea">
        <img className="lodding-image" src={ScreenLoader} alt="Yumvee" />
      </div>
    </div>
  );
}
