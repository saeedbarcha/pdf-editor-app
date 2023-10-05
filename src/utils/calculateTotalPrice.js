export default function calculateTotalPrice(products) {
  return products.reduce((total, item) => total + item.price, 0);
}
