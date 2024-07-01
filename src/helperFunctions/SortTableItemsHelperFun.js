export const SortTableItemsHelperFun = (items, type, name, sortOrder) => {
  const newOrder = sortOrder === "asc" ? "desc" : "asc";

  const sortedItems = [...items].sort((a, b) => {
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
