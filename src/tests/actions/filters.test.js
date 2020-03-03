import moment from "moment";
import {
  setTextFilter,
  sortByDate,
  sortByAmount,
  setStartDate,
  setEndDate
} from "../../actions/filters";
import { JanFirst2020 } from "../fixtures/dates";

// test cases
// 1. start and end date set
test("should generate set start date action object", () => {
  const expectedResult = {
    type: "SET_START_DATE",
    startDate: moment(JanFirst2020)
  };

  const result = setStartDate(expectedResult.startDate);
  expect(result).toEqual(expectedResult);
});
// 2. end date set
test("should generate end end date action object", () => {
  const expectedResult = {
    type: "SET_END_DATE",
    endDate: moment(JanFirst2020)
  };

  const result = setEndDate(expectedResult.endDate);
  expect(result).toEqual(expectedResult);
});
// 3. set text filter with text value set
test("should generate filter text action object", () => {
  const expectedResult = {
    type: "SET_TEXT_FILTER",
    text: "gefilter text"
  };

  const result = setTextFilter(expectedResult.text);
  expect(result).toEqual(expectedResult);
});
// 4. set text filter with empty text
test("should generate filter empty text action object", () => {
  const expectedResult = {
    type: "SET_TEXT_FILTER",

    text: ""
  };

  const result = setTextFilter();
  expect(result).toEqual(expectedResult);
});
// 5. set sort by day
test("should generate srt by date action object", () => {
  const expectedResult = {
    type: "SORT_BY_DATE"
  };

  const result = sortByDate();
  expect(result).toEqual(expectedResult);
});
// 6. set sort by amount
test("should generate sort by amount action object", () => {
  const expectedResult = {
    type: "SORT_BY_AMOUNT"
  };

  const result = sortByAmount();
  expect(result).toEqual(expectedResult);
});
