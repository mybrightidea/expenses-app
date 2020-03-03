import React from "react";
import { shallow } from "enzyme";
import { EditExpensePage } from "../../components/EditExpensePage";
import expenses from "../fixtures/expenses";

let startEditExpense, startRemoveExpense, history, wrapper;
beforeEach(() => {
  startEditExpense = jest.fn();
  startRemoveExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <EditExpensePage
      expense={expenses[1]}
      startRemoveExpense={startRemoveExpense}
      startEditExpense={startEditExpense}
      history={history}
    />
  );
});

test("should render Add expense page correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should handle on submit", () => {
  const { id, ...expense } = expenses[1];

  wrapper.find("ExpenseForm").prop("onSubmit")(expense);
  expect(history.push).toHaveBeenLastCalledWith("/");
  expect(startEditExpense).toHaveBeenLastCalledWith(id, expense);
});
test("should remove expense", () => {
  const { id } = expenses[1];
  wrapper.find("button").simulate("click");
  expect(history.push).toHaveBeenLastCalledWith("/");
  expect(startRemoveExpense).toHaveBeenLastCalledWith(id);
});
