const CurrencyInputHelperFun = (value) => {
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


  export default CurrencyInputHelperFun;