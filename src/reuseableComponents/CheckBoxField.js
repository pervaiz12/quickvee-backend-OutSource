
export default function CheckBoxField({checked,onChangeFun,categoryType}) {
  return (
    <>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) =>
          onChangeFun && onChangeFun((prevValue) => ({
            ...prevValue,
            [categoryType]: e.target.checked ? 1 : 0,
          }))
        }
      />
      <span className="add-category-checkmark"></span>
    </>
  );
}
