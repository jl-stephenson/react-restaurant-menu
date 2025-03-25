export function formatPrice(price: number): string {
    return new Intl.NumberFormat("en-UK", {
      style: "currency",
      currency: "GBP",
    }).format(price);
  }