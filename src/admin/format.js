// Dates for the dashboard.
// News dates are whole days stored at midnight UTC, so they are shown in UTC to never shift by a day.
export const formatDate = (date) =>
  date ? new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "";
export const formatDay = (date) =>
  date ? new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }) : "";
export const time = (date) => (date ? new Date(date).getTime() : 0);
export const toInput = (date) => (date ? new Date(date).toISOString().slice(0, 10) : "");   // for <input type="date">
export const addDays = (day, days) => toInput(new Date(new Date(day).getTime() + days * 24 * 60 * 60 * 1000));
