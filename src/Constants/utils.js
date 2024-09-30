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

export function formatDateTime(dateTimeStr) {
  // Split the input string into date and time parts
  const [datePart, timePart] = dateTimeStr.split(" ");

  // Further split the date part into year, month, and day
  const [year, month, day] = datePart.split("-");

  // Further split the time part into hours, minutes, and seconds
  const [hours, minutes] = timePart.split(":").map(Number);

  // Convert 24-hour time to 12-hour format
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;

  // Create a new Date object using the extracted values
  const date = new Date(
    `${year}-${month}-${day}T${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:00`
  );

  // Define formatting options
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  // Format the date using Intl.DateTimeFormat
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  // Format the time
  const formattedTime = `${formattedHours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}${period}`;

  return `${formattedDate} ${formattedTime}`;
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

// yyyy-mm-dd
const dateInYYYYMMDD = (date) => {
  // Format date in yyyy-mm-dd using local time zone
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based, so we add 1
  const day = String(date.getDate()).padStart(2, "0"); // Pad single digits with leading zero
  return `${year}-${month}-${day}`;
};

// converting Number into K.. for eg: 1,20,000 => 120K
export function formatToThousands(number) {
  if (number >= 1000) {
    // Divide by 1000 and round to 1 decimal place if needed
    const formatted = (number / 1000).toFixed(1);
    // Remove the trailing .0 if it exists
    return `$${formatted.endsWith(".0") ? formatted.slice(0, -2) : formatted}K`;
  }
  // If the number is less than 1000, return as is with dollar sign
  return `$${number}`;
}

// getting short date - 26 Sept or Sept 24
function getFormattedDate(dateString, format) {
  const date = new Date(dateString);
  if (format === "day-month") {
    return date.toLocaleDateString("default", {
      day: "numeric",
      month: "short",
    }); // e.g., "26 Sept"
  }
  if (format === "month-year") {
    return date.toLocaleDateString("default", {
      month: "short",
      year: "2-digit",
    }); // e.g., "Sept 24"
  }
}

// for charts - x axis dataset => [Sept 24, Aug 24, July 24..]
export function getXAxisData(option, dates) {
  const dateRanges = dates.split(",");
  if (option === "Month") {
    // For month option, return the month and year from the first date of each range
    return dateRanges.map((range) => {
      const [startDate] = range.split("_"); // Get the start date
      return getFormattedDate(startDate, "month-year"); // e.g., "Sept 24"
    });
  }

  if (option === "Day") {
    // For day option, return the day and month from the single date in the range
    return dateRanges.map((range) => {
      const [startDate] = range.split("_"); // Get the single date
      return getFormattedDate(startDate, "day-month"); // e.g., "26 Sept"
    });
  }

  if (option === "Week") {
    // For week option, return the starting Monday of each week in the range
    return dateRanges.map((range) => {
      const [startDate] = range.split("_"); // Get the Monday date (first date of the range)
      return getFormattedDate(startDate, "day-month"); // e.g., "16 Sept"
    });
  }

  return [];
}

// Y axis ticks dataset
export const getYAxisTicks = (maxValue) => {
  // console.log("start function........................");
  // console.log("maxValue: ", maxValue);
  // Add a buffer to the max value (e.g., 10% more or round up)
  const buffer = Math.ceil(maxValue * 1.1); // Add 10% buffer
  // console.log("buffer: ", buffer);
  // Find the nearest rounded number (for example, nearest 1000 or 500)
  const roundingFactor = Math.pow(10, Math.floor(Math.log10(buffer))); // Get the magnitude (like 1000, 10000)
  // console.log("roundingFactor: ", roundingFactor);
  const roundedMax = Math.ceil(buffer / roundingFactor) * roundingFactor; // Round up to nearest factor
  // console.log("roundedMax: ", roundedMax);
  // Calculate the step for 5 evenly spaced points
  const step = roundedMax / 4; // We need 5 points, so divide by 4 to get intervals
  // console.log("step: ", step);
  // Generate the 5 ticks (0 to roundedMax)
  const temp = Array.from({ length: 5 }, (_, i) => (step * i).toFixed(0));
  // console.log("temp: ", temp);
  // console.log("---------------------------------------");
  return temp; // Generate ticks 0, step, 2*step, ..., roundedMax
};

// -------------------------------
// Get default date ranges based on the selected type
export function getDefaultDateRange(type, currentDate) {
  // const currentDate = new Date();
  const result = [];
  const newDate = new Date(currentDate); // Use the current date for calculations

  if (type === "Day") {
    // Generate last 7 days
    for (let i = 0; i < 7; i++) {
      const startDate = new Date(newDate);
      result.push(`${dateInYYYYMMDD(startDate)}_${dateInYYYYMMDD(startDate)}`);
      newDate.setDate(newDate.getDate() - 1);
    }
  } else if (type === "Week") {
    // Generate last 7 weeks
    newDate.setDate(newDate.getDate() - newDate.getDay() + 1); // Go to the Monday of the current week
    for (let i = 0; i < 7; i++) {
      const startDate = new Date(newDate);
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6); // End on Sunday
      result.push(`${dateInYYYYMMDD(startDate)}_${dateInYYYYMMDD(endDate)}`);
      newDate.setDate(newDate.getDate() - 7); // Go to the previous week
    }
  } else if (type === "Month") {
    // Generate last 7 months
    for (let i = 0; i < 7; i++) {
      const startDate = new Date(
        newDate.getFullYear(),
        newDate.getMonth() - i,
        1
      );
      const endDate = new Date(
        newDate.getFullYear(),
        newDate.getMonth() - i + 1,
        0
      );
      result.push(`${dateInYYYYMMDD(startDate)}_${dateInYYYYMMDD(endDate)}`);
    }
  }

  return {
    date_range: result.reverse().join(","), // Reverse to maintain the order
    present_date: newDate,
  };
}

// Function for Previous button
export function onPrevious(type, currentDate) {
  console.log("onPrevious: ", type, currentDate);
  if (type === "Day") {
    currentDate.setDate(currentDate.getDate() - 1); // Go back 1 day
  } else if (type === "Week") {
    currentDate.setDate(currentDate.getDate() - 7); // Go back to previous week
  } else if (type === "Month") {
    currentDate.setMonth(currentDate.getMonth() - 1); // Go back 1 month
  }

  console.log("current date from OnPrevious: ", currentDate);
  return currentDate;
  // return getDefaultDateRange(type, currentDate); // Get the updated date range
}

// Function for Next button
export function onNext(type, currentDate) {
  console.log("onNext: ", type, currentDate);
  const today = new Date();
  if (currentDate.toDateString() === today.toDateString()) {
    return currentDate;
    // return getDefaultDateRange(type); // Don't move forward if it's today
  }

  if (type === "Day") {
    currentDate.setDate(currentDate.getDate() + 1); // Go forward 1 day
  } else if (type === "Week") {
    currentDate.setDate(currentDate.getDate() + 7); // Go forward to next week
  } else if (type === "Month") {
    currentDate.setMonth(currentDate.getMonth() + 1); // Go forward 1 month
  }

  return currentDate;
  // return getDefaultDateRange(type, currentDate); // Get the updated date range
}

export const removeCurrencySign = (tickItem) =>
  formatToThousands(tickItem).slice(1);

export const getStartDateAndEndDate = (dateRange) => {
  const allDates = dateRange?.split(",");
  const firstDate = allDates && allDates[0];
  const lastDate = allDates && allDates[allDates.length - 1];

  const startDate = firstDate && firstDate?.split("_")[0];
  const endDate = lastDate && lastDate?.split("_")[1];

  return {
    startDate,
    endDate,
  };
};
