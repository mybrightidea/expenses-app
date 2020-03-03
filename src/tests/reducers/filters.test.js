import filtersReducer from "../../reducers/filters";
import moment from "moment";

// 1. Initialisation of filter reducer
test("Should set up default filter values", () => {
  const inputAction = {
    type: "@@INIT"
  };

  const expectedResult = {
    text: "",
    sortBy: "date",
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month")
  };

  const state = filtersReducer(undefined, inputAction);
  expect(state).toEqual(expectedResult);
});

// 2. set sort by amount filter
test("Should set sort by to amount", () => {
  const inputAction = {
    type: "SORT_BY_AMOUNT"
  };

  const expectedResult = {
    text: "",
    sortBy: "amount",
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month")
  };

  const state = filtersReducer(
    { ...expectedResult, sortBy: "xxxxx" },
    inputAction
  );
  expect(state).toEqual(expectedResult);
});
// 3. set sort by date filter
test("Should set sort by to date", () => {
  const inputAction = {
    type: "SORT_BY_DATE"
  };

  const expectedResult = {
    text: "",
    sortBy: "date",
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month")
  };

  const state = filtersReducer(
    { ...expectedResult, sortBy: "xxxxx" },
    inputAction
  );
  expect(state).toEqual(expectedResult);
});
// 4. set end date  filter
test("Should set end date filter", () => {
  const testDate = moment();
  const inputAction = {
    type: "SET_END_DATE",
    endDate: testDate
  };

  const expectedResult = {
    text: "",
    sortBy: "date",
    startDate: moment().startOf("month"),
    endDate: testDate
  };

  const state = filtersReducer(undefined, inputAction);
  expect(state).toEqual(expectedResult);
});
// 5. set start date  filter
test("Should set end date filter", () => {
  const testDate = moment();
  const inputAction = {
    type: "SET_START_DATE",
    startDate: testDate
  };

  const expectedResult = {
    text: "",
    sortBy: "date",
    startDate: testDate,
    endDate: moment().endOf("month")
  };

  const state = filtersReducer(undefined, inputAction);
  expect(state).toEqual(expectedResult);
});
// 6. set text filter
test("Should set end date filter", () => {
  const testText = "willow";
  const inputAction = {
    type: "SET_TEXT_FILTER",
    text: testText
  };

  const expectedResult = {
    text: testText,
    sortBy: "date",
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month")
  };

  const state = filtersReducer(undefined, inputAction);
  expect(state).toEqual(expectedResult);
});
