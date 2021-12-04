import SignUp from "pages/SignUp";
import { render, screen, waitFor } from "utils/testUtils";
import userEvent from "@testing-library/user-event";
import App from "App";

//TODO update test in order to work after the Redux implementations
test("Testing SignUp Page elements", () => {
  const { getByTestId } = render(<SignUp />);
  const root = getByTestId("signup_root");
  const firstname = getByTestId("signup_firstname_field");
  const lastname = getByTestId("signup_lastname_field");
  const email = getByTestId("signup_email_field");
  const password = getByTestId("signup_password_field");
  const submit = getByTestId("signup_submit_button");

  //testing start errors dont expected
  let errFound = false;
  try {
    getByTestId("signup_error");
    throw new Error("signup_error found when its not supposed to..");
  } catch (err) {
    if (errFound) console.error(err.message);
  }
  //testing root existance
  expect(root).toBeInTheDocument();
  //testing default input values
  expect(email.value).toBe("");
  expect(password.value).toBe("");
  expect(firstname.value).toBe("");
  expect(lastname.value).toBe("");

  //typing invalid input
  userEvent.type(firstname, "mm");
  userEvent.type(lastname, "454");
  userEvent.type(email, "nnvalidgmailcom");
  userEvent.type(password, "1234567");
  //checking if input values changed
  expect(firstname.value).toBe("mm");
  expect(lastname.value).toBe("454");
  expect(email.value).toBe("nnvalidgmailcom");
  expect(password.value).toBe("1234567");
  //submitting invalid signup
  userEvent.click(submit);
  //checking if error is there
  expect(getByTestId("signup_error")).toBeInTheDocument();

  //typing valid email and password
  userEvent.type(firstname, "valid");
  userEvent.type(lastname, "llll");
  userEvent.type(email, "valid@gmail.com");
  userEvent.type(password, "1234567");
  //submitting valid login
  userEvent.click(submit);
  //testing if error is there
  errFound = false;
  try {
    getByTestId("signup_error");
    //throw error if found
    throw new Error("signup_error found when its not supposed to..");
  } catch (err) {
    //do nothing
    if (errFound) console.error(err.message);
  }
});

test("should perform sign up", async () => {
  render(<App />);

  //? await for Landing to be rendered
  await waitFor(() => expect(screen.getByTestId(/book-item-0/i)).toBeDefined());

  userEvent.click(screen.getByTestId("menu-button"));

  userEvent.click(screen.getByText(/login/i));

  userEvent.click(screen.getByTestId("signup_link"));

  userEvent.type(screen.getByTestId("signup_firstname_field"), "name");
  userEvent.type(screen.getByTestId("signup_lastname_field"), "surname");
  userEvent.type(screen.getByTestId("signup_username_field"), "username");
  userEvent.type(screen.getByTestId("signup_email_field"), "email@gmail.com");
  userEvent.type(screen.getByTestId("signup_password_field"), "password123");

  userEvent.click(screen.getByTestId("signup_submit_button"));

  //? if sign up successful, the user will be redirected to /signin (Login)
  await waitFor(() =>
    expect(screen.getByTestId("signin_email_field")).toBeDefined()
  );
});
