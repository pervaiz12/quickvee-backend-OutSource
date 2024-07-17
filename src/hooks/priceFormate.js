export function priceFormate(input) {
  if (!input) return;
  let string = input?.toString();
  let parts = string?.split(".");
  let integerPart = parts[0];
  integerPart = integerPart?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  if (parts?.length > 1) {
    return integerPart + "." + parts[1];
  } else {
    return integerPart;
  }
}