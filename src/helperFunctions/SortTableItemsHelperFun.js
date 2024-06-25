export const SortTableItemsHelperFun = (items, type, name, sortOrder) => {
  const newOrder = sortOrder === "asc" ? "desc" : "asc";
  const sortedItems = [...items].sort((a, b) => {
    const aValue = a[name] || "";
    const bValue = b[name] || "";

    if (type === "str") {
      if (newOrder === "asc") {
        return aValue.localeCompare(bValue) || "";
      } else {
        return bValue.localeCompare(aValue) || "";
      }
    }

    if (type === "num") {
      const getNumericValue = (variant) => {
        const numericPart = variant ? variant.match(/\d+/) : 0; // Match one or more digits
        return numericPart ? parseInt(numericPart[0]) : 0; // Parse to integer if numeric part found
      };

      let aNumValue = getNumericValue(a[name]);
      let bNumValue = getNumericValue(b[name]);

      if (newOrder === "asc") {
        return aNumValue - bNumValue;
      } else {
        return bNumValue - aNumValue;
      }
    }
    if (type === "date") {
      console.log("parseDate", aValue);
      const parseDate = (dateString) => new Date(dateString);
     
      let aDate = parseDate(aValue);
      let bDate = parseDate(bValue);
     
      if (newOrder === "asc") {
        return aDate - bDate;
      } else {
        return bDate - aDate;
      }
    }
    if (type === "id") {
      const splitId = (id) => {
        const numericPart = id.match(/\d+/) ? parseInt(id.match(/\d+/)[0]) : 0;
        const alphaPart = id.match(/[A-Z]+$/) ? id.match(/[A-Z]+$/)[0] : "";
        return { numericPart, alphaPart };
      };
      const aId = splitId(aValue);
      const bId = splitId(bValue);
      if (newOrder === "asc") {
        if (aId.numericPart === bId.numericPart) {
          return aId.alphaPart.localeCompare(bId.alphaPart);
        } else {
          return aId.numericPart - bId.numericPart;
        }
      } else {
        if (aId.numericPart === bId.numericPart) {
          return bId.alphaPart.localeCompare(aId.alphaPart);
        } else {
          return bId.numericPart - aId.numericPart;
        }
      }
    }

    return 0; // Default return value if type is not matched
  });

  return { sortedItems, newOrder };
};
