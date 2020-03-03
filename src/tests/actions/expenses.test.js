import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import moment from "moment";
import JanFirst2020 from "../fixtures/dates";
import database from "../../firebase/firebase";

import {
  addExpense,
  startAddExpense,
  editExpense,
  removeExpense,
  setExpenses,
  startSetExpenses,
  startRemoveExpense,
  startEditExpense
} from "../../actions/expenses";

const createMockStore = configureMockStore([thunk]);
const uid = "jhgjhgjgkhjgjkg";
const defaultAuthState = { auth: { uid } };

import expenses from "../fixtures/expenses";

beforeEach(done => {
  const dbExpenses = [];
  expenses.forEach(({ id, description, amount, note, createdAt }) => {
    dbExpenses[id] = { description, amount, note, createdAt };
  });

  database
    .ref(`users/${uid}/expenses`)
    .set(dbExpenses)
    .then(() => {
      done();
    });
});

// test cases
// 1. removeExpense - with ID
test("should set up remove expense action object with ID passed", () => {
  const id = "123abc";
  const action = removeExpense({ id });
  expect(action).toEqual({
    type: "REMOVE_EXPENSE",

    id
  });
});
// 2. removeExpense - WITHOUT ID
test("should set up remove expense action object with NO ID passed", () => {
  const action = removeExpense();
  expect(action).toEqual({
    type: "REMOVE_EXPENSE",

    id: undefined
  });
});
test("Should remove expense from DB", done => {
  const store = createMockStore(defaultAuthState);
  const id = expenses[2].id;
  store
    .dispatch(startRemoveExpense({ id }))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "REMOVE_EXPENSE",
        id
      });
      return database.ref(`users/${uid}/expenses/${id}`).once("value");
    })
    .then(snapshot => {
      expect(snapshot.val()).toBeFalsy();
      done();
    });
});

// 3. Edit expense
test("should return edit expense action data object with data", () => {
  const id = "abc123";
  const updates = {
    description: "Test Description",
    note: "test notes",
    amount: 9999,
    createdAt: 123456
  };
  const action = editExpense(id, updates);
  expect(action).toEqual({
    type: "EDIT_EXPENSE",
    id,
    updates
  });
});
test("Should Edit expense in DB", done => {
  const store = createMockStore(defaultAuthState);
  const id = expenses[2].id;
  const updates = {
    description: "Test Description",
    note: "test notes",
    amount: 9999,
    createdAt: 123456
  };
  store
    .dispatch(startEditExpense(id, updates))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "EDIT_EXPENSE",
        id,
        updates
      });
      return database.ref(`users/${uid}/expenses/${id}`).once("value");
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual({ ...updates });
      done();
    });
});

//4. Add with data
test("should set up add expense action data object with data provided", () => {
  // const updates = {
  //   description: "Test Description",
  //   note: "test note",
  //   amount: 9999,
  //   createdAt: 123456
  // };
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: expenses[2]
  });
});

// should add expense to database and store
test("should add expense to database and store", done => {
  const store = createMockStore(defaultAuthState);
  const testExpense = {
    description: "Bike",
    amount: "100000",
    note: "Carbon fibre pony",
    createdAt: moment(JanFirst2020).valueOf()
  };
  store
    .dispatch(startAddExpense({ ...testExpense }))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          ...testExpense,
          id: expect.any(String)
        }
      });
      return database
        .ref(`users/${uid}/expenses/${actions[0].expense.id}`)
        .once("value");
    })

    .then(snapshot => {
      expect(snapshot.val()).toEqual(testExpense);
      done();
    });
});
// should add expense with defaults to database and store
test("should add expense with defaults to database and store", done => {
  const store = createMockStore(defaultAuthState);
  // const testExpense = {
  //   description: "Bike",
  //   amount: "100000",
  //   note: "Carbon fibre pony",
  //   createdAt: moment(JanFirst2020).valueOf()
  // };
  const testExpense = { description: "", note: "", amount: 0, createdAt: 0 };
  store
    .dispatch(startAddExpense())
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          ...testExpense,
          id: expect.any(String)
        }
      });
      return database
        .ref(`users/${uid}/expenses/${actions[0].expense.id}`)
        .once("value");
    })

    .then(snapshot => {
      expect(snapshot.val()).toEqual(testExpense);
      done();
    });
});

test("should set up add expenseS action data object with data provided", () => {
  const action = setExpenses(expenses);

  expect(action).toEqual({
    type: "SET_EXPENSES",
    expenses
  });
});
//should fetch expenses from firebase
test("should fetch expenses from firebase", done => {
  const store = createMockStore(defaultAuthState);
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: "SET_EXPENSES",
      expenses
    });
    done();
  });
});
