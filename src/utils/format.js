export const formatDateTime = (isoString) => {
  const date = new Date(isoString);
  const datePart = date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const timePart = date.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return `${datePart} at ${timePart}`;
};

export const formattedDate = new Date("2024-11-10T09:00:00").toLocaleDateString("en-IN", {
  day: "numeric",
  month: "long",
  year: "numeric"
});
