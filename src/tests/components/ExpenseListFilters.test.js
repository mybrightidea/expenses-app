import React from "react";
import { shallow } from "enzyme";
import { ExpenseListFilters } from "../../components/ExpenseListFilters";
import filters from "../fixtures/filters";
import moment from "moment";

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;
beforeEach(() => {
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  wrapper = shallow(
    <ExpenseListFilters
      filters={filters[0]}
      setTextFilter={setTextFilter}
      sortByDate={sortByDate}
      sortByAmount={sortByAmount}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />
  );
});

test("Should render filter correctly", () => {
  expect(wrapper).toMatchSnapshot();
});
test("Should render Alt filter correctly", () => {
  wrapper.setProps({ filters: filters[1] });
  expect(wrapper).toMatchSnapshot();
});

//should handle text Change
test("should handle text Change", () => {
  const value = "fred";
  wrapper
    .find("input")
    .simulate("change", { preventDefault: () => {}, target: { value } });
  expect(setTextFilter).toHaveBeenLastCalledWith(value);
});
//should sort by date
test("should handle sort by date set", () => {
  wrapper.setProps({ filters: filters[1] });
  const value = "date";
  wrapper
    .find("select")
    .simulate("change", { preventDefault: () => {}, target: { value } });
  expect(sortByDate).toHaveBeenLastCalledWith();
});
//should sort by amount
test("should handle sort by amount set", () => {
  const value = "amount";
  wrapper
    .find("select")
    .simulate("change", { preventDefault: () => {}, target: { value } });
  expect(sortByAmount).toHaveBeenLastCalledWith();
});
//should handle date change
test("should handle date change", () => {
  const startDate = moment(0).add(18, "years");
  const endDate = moment(0).add(20, "years");
  wrapper.find("withStyles(DateRangePicker)").prop("onDatesChange")({
    startDate,
    endDate
  });
  expect(setStartDate).toHaveBeenLastCalledWith(startDate);
  expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});
//should handle date focus changes
test("should handle date focus changes", () => {
  const focused = "endDate";
  wrapper.find("withStyles(DateRangePicker)").prop("onFocusChange")(focused);
  expect(wrapper.state("calendarFocused")).toBe(focused);
});
test("should handle date focus changes", () => {
  const focused = null;
  wrapper.find("withStyles(DateRangePicker)").prop("onFocusChange")(focused);
  expect(wrapper.state("calendarFocused")).toBe(focused);
});
test("should handle date focus changes", () => {
  const focused = "startDate";
  wrapper.find("withStyles(DateRangePicker)").prop("onFocusChange")(focused);
  expect(wrapper.state("calendarFocused")).toBe(focused);
});
