import expensesReducer from "../../reducers/expenses";
import moment from "moment";
import expenses from "../fixtures/expenses";

// 1. Initialisation of filter reducer
test("Should set up default expenses array", () => {
  const inputAction = {
    type: "@@INIT"
  };

  const expectedResult = [];
  const state = expensesReducer(undefined, inputAction);
  expect(state).toEqual(expectedResult);
});
// 2. Add expense
test("Should add expense to expenses array", () => {
  const updates = {
    id: "-99999",
    description: "NEW Description of test expense",
    amount: 10999,
    note: "NEW Notes for test expense",
    createdAt: moment(99)
  };
  const inputAction = {
    type: "ADD_EXPENSE",
    expense: updates
  };

  const state = expensesReducer(expenses, inputAction);
  expect(state).toEqual([...expenses, updates]);
});
//   3. Update an expense
test("Should edit existing expense in expenses array", () => {
  const id = expenses[0].id;

  const updates = {
    description: "NEW Description of test expense",
    amount: 10999,
    note: "NEW Notes for test expense",
    createdAt: moment(99)
  };

  const inputAction = {
    type: "EDIT_EXPENSE",
    id,
    updates
  };

  const state = expensesReducer(expenses, inputAction);
  expect(state).toEqual([
    { id, ...updates },
    expenses[1],
    expenses[2],
    expenses[3]
  ]);
});
//   3a. NO Update an expense when id doesnt exist
test("Should not edit NON existing expense in expenses array", () => {
  const updates = {
    id: "XXXXXXXXXXXXXXXXXX",
    description: "NEW Description of test expense",
    amount: 10999,
    note: "NEW Notes for test expense",
    createdAt: moment(99)
  };

  const inputAction = {
    type: "EDIT_EXPENSE",
    expense: updates
  };

  const state = expensesReducer(expenses, inputAction);
  expect(state).toEqual(expenses);
});
//   4. Remove an expense exists
test("Should remove existing expense from expenses array", () => {
  const inputAction = {
    type: "REMOVE_EXPENSE",
    id: expenses[0].id
  };

  const state = expensesReducer(expenses, inputAction);
  expect(state).toEqual([expenses[1], expenses[2], expenses[3]]);
});
//   5. Remove an expense doesnt exist
test("Should NOT remove not existing expense from expenses array", () => {
  const inputAction = {
    type: "REMOVE_EXPENSE",
    id: "xxxxxxxxxx"
  };

  const state = expensesReducer(expenses, inputAction);
  expect(state).toEqual(expenses);
});

test("should set expenses", () => {
  const action = {
    type: "SET_EXPENSES",
    expenses: [expenses[1]]
  };

  const state = expensesReducer(
    [expenses[0], expenses[2], expenses[3]],
    action
  );
  expect(state).toEqual([expenses[1]]);
});
