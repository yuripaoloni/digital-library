import SignIn from "pages/SignIn";
import { render } from "utils/testUtils";
import userEvent from "@testing-library/user-event";

test("Testing SignIn Page", () => {
  const { getByTestId } = render(<SignIn />);
  const root = getByTestId("signin_root");
  const email = getByTestId("signin_email_field");
  const password = getByTestId("signin_password_field");
  const submit = getByTestId("signin_submit_button");

  //dont expect an error at the start
  let errFound = false;
  try {
    getByTestId("signin_error");
    //throw error if found
    throw new Error("signin_error found when its not supposed to..");
  } catch (err) {
    if (errFound) console.error(err.message);
  }

  //testing root existance
  expect(root).toBeInTheDocument();
  //testing default input values
  expect(email.value).toBe("");
  expect(password.value).toBe("");
  //typing invalid email
  userEvent.type(email, "nnvalidgmailcom");
  //typing valid password
  userEvent.type(password, "1234567");
  //checking if input values changed
  expect(email.value).toBe("nnvalidgmailcom");
  expect(password.value).toBe("1234567");
  //submitting invalid login
  userEvent.click(submit);
  //checking if error is there
  expect(getByTestId("signin_error")).toBeInTheDocument();
  //typing valid email and password
  userEvent.type(email, "nnvalid@gmail.com");
  userEvent.type(password, "1234567");
  //submitting valid login
  userEvent.click(submit);

  //dont expect an error after sumbmitted a valid form
  errFound = false;
  try {
    getByTestId("signin_error");
    //throw error if found
    throw new Error("signin_error found when its not supposed to..");
  } catch (err) {
    //do nothing
    if (errFound) console.error(err.message);
  }
});
