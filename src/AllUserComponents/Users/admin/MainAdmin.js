import { useState } from "react";
import AdminView from "./adminview";
import Add_Admin from "./addAdmin/add_admin";
import EditAdmin from "./editAdmin/edit_admin";

const MainAdmin = () => {
  const [visible, setVisible] = useState("AdminView");
  const [EditAdminId, setEditAdminId] = useState();

  return (
    <>
      {visible === "AdminView" && (
        <AdminView setVisible={setVisible} setEditAdminId={setEditAdminId} />
      )}
      {visible === "AddAmin" && <Add_Admin setVisible={setVisible} />}
      {visible === "EditAdmin" && (
        <EditAdmin EditAdminId={EditAdminId} setVisible={setVisible} />
      )}
    </>
  );
};

export default MainAdmin;
