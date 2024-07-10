export const SortTableItemsHelperFun = (items, type, name, sortOrder) => {
  const newOrder = sortOrder === "asc" ? "desc" : "asc";

  const sortedItems = items.length > 0 && [...items]?.sort((a, b) => {
    const aValue = a[name] || "";
    const bValue = b[name] || "";

    const compareStrings = (a, b, order) => order === "asc" ? a.localeCompare(b) : b.localeCompare(a);

    const getNumericValue = (value) => {
      const match = value.match(/-?\d+(\.\d+)?/);
      return match ? parseFloat(match[0]) : 0;
    };

    const parseDate = (dateString) => new Date(dateString);

    const splitId = (id) => {
      const numericPart = getNumericValue(id);
      const alphaPart = id.match(/[A-Z]+$/) ? id.match(/[A-Z]+$/)[0] : "";
      return { numericPart, alphaPart };
    };

    const parseTime = (timeString) => {
      const [time, modifier] = timeString.split(' ');
      let [hours, minutes, seconds] = time.split(':');
      if (hours === '12') {
        hours = '00';
      }
      if (modifier === 'PM') {
        hours = parseInt(hours, 10) + 12;
      }
      return new Date(`1970-01-01T${hours}:${minutes}:${seconds}`);
    };
    
    switch (type) {
      case "str":
        return compareStrings(aValue, bValue, newOrder);

      case "num":
        const aNum = getNumericValue(aValue);
        const bNum = getNumericValue(bValue);
        return newOrder === "asc" ? aNum - bNum : bNum - aNum;

      case "date":
        const aDate = parseDate(aValue);
        const bDate = parseDate(bValue);
        return newOrder === "asc" ? aDate - bDate : bDate - aDate;
        case "time":
        const aTime = parseTime(aValue);
        const bTime = parseTime(bValue);
        return newOrder === "asc" ? aTime - bTime : bTime - aTime;


      case "id":
        const aId = splitId(aValue);
        const bId = splitId(bValue);
        if (aId.numericPart === bId.numericPart) {
          return compareStrings(aId.alphaPart, bId.alphaPart, newOrder);
        } else {
          return newOrder === "asc" ? aId.numericPart - bId.numericPart : bId.numericPart - aId.numericPart;
        }

      default:
        return 0;
    }
  });

  return { sortedItems, newOrder };
};
