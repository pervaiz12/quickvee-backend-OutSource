import { useState } from 'react';

const ReservationBox = () => {
  const [isSmall, setIsSmall] = useState(false);

  const toggleBoxSize = () => {
    setIsSmall(!isSmall);
  };

  return (<>
    <div className={`reservation-box ${isSmall ? 'small' : ''}`}>
      <div className="top">
        <div className="static">
          <div className="input-container" id="date-picker-container">
            <label htmlFor="date-checkin">check-in</label>
            <input type="date" id="date-checkin" className="date-field" name="date-from" />
          </div>
        </div>
        <div className="flex">
          <div className="input-container" id="date-picker-container">
            <label htmlFor="date-checkout">check-out</label>
            <input type="date" id="date-checkout" className="date-field" name="" />
          </div>
          <div className="button-container">
            <span className="button ok">availability</span>
          </div>
        </div>
      </div>
      <div className="bottom">
        <a href="#" className="info" title="" target="new">
          Click here for a full overview.
        </a>
      </div>
    </div>
    <div className={`test ${isSmall ? 'small' : ''}`} title="Toggle reservation box size small/normal" onClick={toggleBoxSize}>
      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="16" viewBox="0 0 36 14">
        <rect id="switch" data-name="switch" width="36" height="14" rx="7"/>
      </svg>
    </div>

    </>
  );
};

export default ReservationBox;
