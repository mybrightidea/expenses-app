import expensesTotal from "../../selectors/expenses-total";
import expenses from "../fixtures/expenses";

//should return zero for empty
//should return single
//should return multiple
test("Should return zero for empty array", () => {
  const result = expensesTotal([]);
  expect(result).toBe(0);
});
test("Should return amount for single array", () => {
  const result = expensesTotal([expenses[0]]);
  expect(result).toBe(expenses[0].amount);
});
test("Should return amount for multi array", () => {
  const result = expensesTotal(expenses);
  expect(result).toBe(
    expenses.reduce((total, thisValue) => total + thisValue.amount, 0)
  );
});
