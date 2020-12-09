export default function CurrencyFilter(value, currency = "UAH") {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency
  }).format(value);
}
