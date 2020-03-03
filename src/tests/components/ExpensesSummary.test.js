import React from "react";
import { shallow } from "enzyme";
import { ExpensesSummary } from "../../components/ExpensesSummary";

test("Should work fine with one value", () => {
  const wrapper = shallow(
    <ExpensesSummary expensesCount={1} expensesTotal={55} />
  );
  expect(wrapper).toMatchSnapshot();
});
test("Should work fine with no value", () => {
  const wrapper = shallow(
    <ExpensesSummary expensesCount={0} expensesTotal={0} />
  );
  expect(wrapper).toMatchSnapshot();
});
test("Should work fine with many value", () => {
  const wrapper = shallow(
    <ExpensesSummary expensesCount={27} expensesTotal={1273521753} />
  );
  expect(wrapper).toMatchSnapshot();
});
