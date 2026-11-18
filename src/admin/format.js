// Dates shown as "18 Nov 2026", and as numbers for sorting.
export const formatDate = (date) =>
  date ? new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "";
export const time = (date) => (date ? new Date(date).getTime() : 0);
