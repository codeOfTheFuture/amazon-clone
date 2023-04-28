export const formatCurrency = (number: number): string => {
  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return format.format(number);
};
