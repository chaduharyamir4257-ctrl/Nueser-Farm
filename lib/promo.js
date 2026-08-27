export function getPromoState(item = {}) {
  const price = Number(item.price || 0);
  const salePrice = Number(item.sale_price || 0);
  const discountPercent = Number(item.discount_percent || 0);
  const start = item.promo_start_at ? new Date(item.promo_start_at) : null;
  const end = item.promo_end_at ? new Date(item.promo_end_at) : null;
  const now = new Date();
  const active = Boolean(
    (salePrice > 0 || discountPercent > 0) &&
      (!start || start <= now) &&
      (!end || end >= now)
  );
  const resolvedSalePrice =
    active && salePrice > 0
      ? salePrice
      : active && discountPercent > 0
        ? Math.max(0, Math.round(price * (1 - discountPercent / 100)))
        : price;

  const badges = [];
  const savedTags = Array.isArray(item.promo_tags) ? item.promo_tags : [];
  if (active && (salePrice > 0 || discountPercent > 0)) badges.push("Sale");
  if (savedTags.includes("New") || item.is_new_arrival) badges.push("New");
  if (savedTags.includes("Featured") || item.is_featured) badges.push("Featured");

  return {
    originalPrice: price,
    salePrice: resolvedSalePrice,
    discountPercent: active && discountPercent > 0
      ? discountPercent
        : active && salePrice > 0 && price > 0
          ? Math.round((1 - salePrice / price) * 100)
          : 0,
    active,
    promoLabel: badges[0] || item.promo_label || "",
    badges,
  };
}

export function formatPrice(value = 0) {
  return `Rs ${Number(value || 0).toLocaleString()}`;
}
