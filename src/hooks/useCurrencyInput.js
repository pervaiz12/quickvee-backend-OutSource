import { useState } from "react";

const useCurrencyInput = (initialValue = "0.00") => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    const { value } = e.target;

    let val = value.replace(/[^\d]/g, "");

    if (val === "") {
      setValue("0.00");
      return;
    }

    val = val.replace(/^0+/, "");

    while (val.length < 3) {
      val = "0" + val;
    }

    const integerPart = val.slice(0, val.length - 2);
    const decimalPart = val.slice(val.length - 2);
    const formattedValue = `${integerPart}.${decimalPart}`;

    setValue(formattedValue);
  };
  return [value, handleChange];
};

export default useCurrencyInput;
