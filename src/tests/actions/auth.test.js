import { login, logout } from "../../actions/auth";
import { TestScheduler } from "jest";

test("Should generate login action object", () => {
  const uid = "abc123";
  const action = login(uid);
  expect(action).toEqual({
    type: "LOGIN",
    uid
  });
});
test("Should generate logout action", () => {
  const action = logout();
  expect(action).toEqual({
    type: "LOGOUT"
  });
});
