export default function CheckBoxField({
  checked,
  onChangeFun,
  categoryType,
  isDisabled,
  className,
}) {
  const getUpdateValue = (value, type, e) => {
    if (type === "lottery") {
      return {
        ...value,
        ["earn_point"]: 0,
        ["online"]: 0,
        [type]: e.target.checked ? 1 : 0,
      };
    } else {
      return {
        ...value,
        [type]: e.target.checked ? 1 : 0,
      };
    }
  };
  return (
    <>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) =>
          onChangeFun &&
          onChangeFun((prevValue) => getUpdateValue(prevValue, categoryType, e))
        }
        disabled={isDisabled}
        className={className}
      />
      <span className="add-category-checkmark"></span>
    </>
  );
}
