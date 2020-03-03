import selectExpenses from "../../selectors/expenses";
import moment from "moment";
import expenses from "../fixtures/expenses";
import { JanFirst2020 } from "../fixtures/dates";

//1. test with filter text
test("Should filter by text value", () => {
  const filters = {
    text: "e",
    startDate: undefined,
    endDate: undefined,
    sortBy: undefined
  };
  const result = selectExpenses(expenses, filters);
  //default is sort amount decreasing
  expect(result).toEqual([expenses[0], expenses[2], expenses[1]]);
});
//2. test without filter text
test("Should filter by text value", () => {
  const filters = {
    text: "",
    startDate: undefined,
    endDate: undefined,
    sortBy: undefined
  };
  const result = selectExpenses(expenses, filters);
  //default is sort amount decreasing
  expect(result).toEqual([expenses[3], expenses[0], expenses[2], expenses[1]]);
});
//3. test with filter text no results
test("Should filter by text value", () => {
  const filters = {
    text: "rumplestiltsken",
    startDate: undefined,
    endDate: undefined,
    sortBy: undefined
  };
  const result = selectExpenses(expenses, filters);
  //default is sort amount decreasing
  expect(result).toEqual([]);
});
//4. test sort by amount
test("Should sort by decreasing amount", () => {
  const filters = {
    text: "",
    startDate: undefined,
    endDate: undefined,
    sortBy: "amount"
  };
  const result = selectExpenses(expenses, filters);
  //amount decreasing
  expect(result).toEqual([expenses[3], expenses[0], expenses[2], expenses[1]]);
});
//4. test sort by date
test("Should sort by decreasing date", () => {
  const filters = {
    text: "",
    startDate: undefined,
    endDate: undefined,
    sortBy: "date"
  };
  const result = selectExpenses(expenses, filters);
  //date decreasing
  expect(result).toEqual([expenses[1], expenses[3], expenses[0], expenses[2]]);
});
// 5. test filter by start date
test("Should filter by start date", () => {
  const filters = {
    text: "",
    startDate: moment(JanFirst2020).valueOf(),
    endDate: undefined,
    sortBy: "date"
  };
  const result = selectExpenses(expenses, filters);
  //amount decreasing
  expect(result).toEqual([expenses[1], expenses[3], expenses[0]]);
});
// 6. filter by end date
test("Should filter by inner start and end date", () => {
  const filters = {
    text: "",
    startDate: moment(JanFirst2020).valueOf(),
    endDate: moment(JanFirst2020).valueOf(),
    sortBy: "date"
  };
  const result = selectExpenses(expenses, filters);
  //amount decreasing
  expect(result).toEqual([expenses[0]]);
});
// 7. filter by end and start date set date
test("Should filter by outer start and end date", () => {
  const filters = {
    text: "",
    startDate: moment(JanFirst2020)
      .subtract(4, "days")
      .valueOf(),
    endDate: moment(JanFirst2020)
      .add(4, "days")
      .valueOf(),
    sortBy: "amount"
  };
  const result = selectExpenses(expenses, filters);
  //amount decreasing
  expect(result).toEqual([expenses[3], expenses[0], expenses[2]]);
});
