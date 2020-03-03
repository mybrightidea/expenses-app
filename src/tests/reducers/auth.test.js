import authReducer from "../../reducers/auth";

test("Should set UID for login", () => {
  const action = { type: "LOGIN", uid: "AGHJAGHJ" };
  const state = authReducer({}, action);
  expect(state.uid).toBe(action.uid);
});
test("Should clear UID for logout", () => {
  const action = { type: "LOGOUT" };
  const state = authReducer({ uid: "jkhjkh" }, action);
  expect(state.uid).toBe(undefined);
});
