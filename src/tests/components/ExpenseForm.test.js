import React from "react";
import { shallow } from "enzyme";
import moment from "moment";
import ExpenseForm from "../../components/ExpenseForm";
import expenses from "../fixtures/expenses";

test("Should render Expense Form no expense passed", () => {
  const wrapper = shallow(<ExpenseForm updateLabel={"Add"} />);
  expect(wrapper).toMatchSnapshot();
});
test("Should render Expense Form WITH expense passed", () => {
  const wrapper = shallow(
    <ExpenseForm updateLabel={"Update"} expense={expenses[1]} />
  );
  expect(wrapper).toMatchSnapshot();
});
test("Should render error for invalid form submission", () => {
  const wrapper = shallow(<ExpenseForm updateLabel={"Add"} />);
  expect(wrapper).toMatchSnapshot();
  wrapper.find("form").simulate("submit", { preventDefault: () => {} });
  expect(wrapper.state("error").length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});
test("Should set description state on input change", () => {
  const value = "Test Description";
  const wrapper = shallow(<ExpenseForm updateLabel={"Add"} />);
  expect(wrapper).toMatchSnapshot();
  wrapper
    .find("input")
    .at(0)
    .simulate("change", { target: { value } });
  expect(wrapper.state("description")).toBe(value);
  expect(wrapper).toMatchSnapshot();
});
test("Should set note state on text change", () => {
  const value = "Test Note";
  const wrapper = shallow(<ExpenseForm updateLabel={"Add"} />);
  expect(wrapper).toMatchSnapshot();
  wrapper.find("textarea").simulate("change", { target: { value } });
  expect(wrapper.state("note")).toBe(value);
  expect(wrapper).toMatchSnapshot();
});
test("Should NOT set amount state on invalid input change", () => {
  const value = "12.123";
  const wrapper = shallow(<ExpenseForm updateLabel={"Add"} />);
  expect(wrapper).toMatchSnapshot();
  wrapper
    .find("input")
    .at(1)
    .simulate("change", { target: { value } });
  expect(wrapper.state("amount")).toBe("");
  expect(wrapper).toMatchSnapshot();
});
test("Should set amount state on valid input change", () => {
  const value = "5.55";
  const wrapper = shallow(<ExpenseForm updateLabel={"Add"} />);
  expect(wrapper).toMatchSnapshot();
  wrapper
    .find("input")
    .at(1)
    .simulate("change", { target: { value } });
  expect(wrapper.state("amount")).toBe(value);
  expect(wrapper).toMatchSnapshot();
});
test("Should call on submit prop for valid form submission", () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(
    <ExpenseForm
      updateLabel={"Update"}
      expense={expenses[0]}
      onSubmit={onSubmitSpy}
    />
  );
  wrapper.find("form").simulate("submit", { preventDefault: () => {} });
  expect(wrapper.state("error")).toBe(undefined);
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: expenses[0].description,
    amount: expenses[0].amount,
    note: expenses[0].note,
    createdAt: expenses[0].createdAt
  });
});
test("Should set new date on date change", () => {
  const wrapper = shallow(<ExpenseForm updateLabel={"Update"} />);
  const now = moment();
  wrapper.find("withStyles(SingleDatePicker)").prop("onDateChange")(now);
  expect(wrapper.state("createdAt")).toEqual(now);
});
test("Should set calendar focus on change to true", () => {
  const wrapper = shallow(<ExpenseForm updateLabel={"Update"} />);
  const focused = true;
  wrapper.find("withStyles(SingleDatePicker)").prop("onFocusChange")({
    focused
  });
  expect(wrapper.state("calendarFocused")).toBe(focused);
});
test("Should set calendar focus on change to false", () => {
  const wrapper = shallow(<ExpenseForm updateLabel={"Update"} />);
  const focused = false;
  wrapper.find("withStyles(SingleDatePicker)").prop("onFocusChange")({
    focused
  });
  expect(wrapper.state("calendarFocused")).toBe(focused);
});
