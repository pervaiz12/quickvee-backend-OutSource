export function createdAt(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const padZero = (input) => (input >= 10 ? input : `0${input}`);

export function formatDate(inputDate) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const [year, month, day] = inputDate.split("-");
  const monthName = months[parseInt(month, 10) - 1];
  const date = padZero(parseInt(day, 10));

  const formattedDate = `${monthName} ${date}, ${year}`;
  return formattedDate;
}

export const CurrencyInputHelperFun = (value) => {
  let val = value.replace(/[^\d]/g, "");

  if (val === "") {
    return "0.00";
  }

  val = val.replace(/^0+/, "");

  while (val.length < 3) {
    val = "0" + val;
  }

  const integerPart = val.slice(0, val.length - 2);
  const decimalPart = val.slice(val.length - 2);
  return `${integerPart}.${decimalPart}`;
};

export const disableZeroOnFirstIndex = (value) => {
  const charAtZero = value.charAt(0);
  const startByZero = charAtZero == 0;
  const isBlank = value === "";
  const bool = startByZero && !isBlank;

  return bool;
};

export const handleInputNumber = (e, setDealInfo, dealInfo) => {
  const { value, name } = e.target;

  if (name === "minQty") {
    const qty = parseFloat(value) ? parseFloat(value) : 0;
    setDealInfo((prev) => ({ ...prev, minQty: qty }));
  }

  if (name === "discount") {
    const formattedValue = CurrencyInputHelperFun(value);

    if (parseFloat(formattedValue) > 99.99 && dealInfo.isPercent === "1") {
      return;
    }

    setDealInfo((prev) => ({ ...prev, [name]: formattedValue }));
  }
};

export function isValidNumber(input) {
  // Check if the input is a number and is finite
  if (typeof input === "number" && isFinite(input)) {
    // Check if the number is a non-negative integer (not decimal and not negative)
    return input >= 0 && Number.isInteger(input);
  }
  // Return false if input is not a number
  return false;
}
