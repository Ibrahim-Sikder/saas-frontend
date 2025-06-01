export const formatCurrency = (
    amount,
    currency = "USD",
    locale = "en-US"
  ) => {
    const numericAmount = typeof amount === "string" ? parseFloat(amount) : amount;
  
    if (isNaN(numericAmount)) return "$0.00";
  
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
    }).format(numericAmount);
  };
  