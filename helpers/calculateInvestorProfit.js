export const calculateInvestorProfit = (investorPlans) => {
  let totalProfit = 0;
  const today = new Date();
  investorPlans.forEach((planItem) => {
    const { amount, startDate, plan } = planItem;
    const parsedAmount = parseFloat(amount);
    if (!parsedAmount || !plan?.roi) return;
    // Extract ROI range (e.g., "20-30%")
    const [minRoi, maxRoi] = plan.roi.replace("%", "").split("-").map(Number);
    const averageRoi = (minRoi + maxRoi) / 2;
    // Days since investment start
    const start = new Date(startDate);
    const diffTime = Math.max(today - start, 0);
    const daysElapsed = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    // Daily profit (simple interest)
    const annualProfit = (parsedAmount * averageRoi) / 100;
    const dailyProfit = annualProfit / 365;
    totalProfit += dailyProfit * daysElapsed;
  });
  return totalProfit.toFixed(2);
};
