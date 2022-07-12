export const getUpdatedPrice = (price, offer) => {
  var totalValue = price * (offer / 100);
  return price - totalValue;
};
