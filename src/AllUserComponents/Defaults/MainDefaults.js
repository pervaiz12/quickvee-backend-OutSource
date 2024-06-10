import React, { useState } from "react";

import DefaultsDetail from "./DefaultsDetail";
import AddDefaults from "./AddDefaults";
import EditDefaults from "./EditDefaults";

const MainDefaults = () => {
  const [visible, setVisible] = useState("DefaultsDetail");
  const [defaultEditId, setDefaultEditId] = useState();
  return (
    <>
      <div className="q-category-main-page">
        {visible === "DefaultsDetail" && (
          <DefaultsDetail
            setDefaultEditId={setDefaultEditId}
            setVisible={setVisible}
          />
        )}
        {visible === "DefaultsAlert" && <AddDefaults setVisible={setVisible} />}
        {visible === "EditDefaults" && (
          <EditDefaults defaultEditId={defaultEditId} setVisible={setVisible} />
        )}
      </div>
    </>
  );
};

export default MainDefaults;
