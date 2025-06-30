const getTotalRevenue = (history) => {
  if (!Array.isArray(history)) return 0;
  return history.reduce((sum, item) => sum + (item.cost || 0), 0);
};

export default getTotalRevenue;
