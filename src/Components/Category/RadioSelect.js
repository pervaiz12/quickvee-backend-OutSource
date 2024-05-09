const RadioSelect = ({item,handleOnlineChange,handleRegisterChange}) => {
  return (
    <>
      <div className="category-checkmark-div ">
        <label className="category-checkmark-label">
          Online
          <input
            type="checkbox"
            checked={
                item.cat_show_status === "0" ||
                item.cat_show_status === "1"
            }
            onChange={() =>
              handleOnlineChange(
                item
              )
            }
          />
          <span className="category-checkmark"></span>
        </label>
        <label className="category-checkmark-label">
          Register
          <input
            type="checkbox"
            checked={
                item.cat_show_status === "0" ||
                item.cat_show_status === "2"
            }
            onChange={() =>
              handleRegisterChange(
                item.id,
                item.cat_show_status === "0" ||
                item.cat_show_status === "2"
                  ? "2"
                  : "0",
                  item
              )
            }
          />
          <span className="category-checkmark"></span>
        </label>
      </div>
    </>
  );
};

export default RadioSelect;
