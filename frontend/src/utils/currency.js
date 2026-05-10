const INR_FORMATTER = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

export function formatINR(value = 0) {
  return INR_FORMATTER.format(Number(value) || 0);
}

export function formatCompactINR(value = 0) {
  const amount = Number(value) || 0;
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
  if (amount >= 1000) return `₹${Math.round(amount / 1000)}K`;
  return formatINR(amount);
}

export function dollarToINR(value = 0, rate = 83) {
  return Math.round((Number(value) || 0) * rate);
}
