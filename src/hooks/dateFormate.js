export function dateFormate(dateString) {
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
      const [year, month, day] = dateString.split("-");
      const date = new Date(year, month - 1, day);
      const formattedDate = `${months[date.getMonth()]} ${String(
        date.getDate()
      ).padStart(2, "0")}, ${date.getFullYear()}`;
      
      return formattedDate;
  }
  