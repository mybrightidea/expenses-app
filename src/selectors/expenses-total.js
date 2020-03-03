//Get Visible expenses
export default expenses =>
  expenses.reduce((total, currentValue) => total + currentValue.amount, 0);
