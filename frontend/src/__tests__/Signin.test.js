import SignIn from "pages/Signin";
import { render, waitFor, screen } from "utils/testUtils";
import userEvent from "@testing-library/user-event";
import App from "App";

test("Testing SignIn Page elements", () => {
  const { getByTestId } = render(<SignIn />);
  const root = getByTestId("signin_root");
  const email = getByTestId("signin_email_field");
  const password = getByTestId("signin_password_field");

  //testing root existance
  expect(root).toBeInTheDocument();
  //testing default input values
  expect(email.value).toBe("");
  expect(password.value).toBe("");
});

test("should perform sign in and logout", async () => {
  render(<App />);

  //? await for Landing to be rendered
  await waitFor(() => expect(screen.getByTestId(/book-item-0/i)).toBeDefined());

  userEvent.click(screen.getByTestId("menu-button"));

  userEvent.click(screen.getByText(/login/i));

  userEvent.type(screen.getByTestId("signin_email_field"), "email@gmail.com");
  userEvent.type(screen.getByTestId("signin_password_field"), "password123");

  userEvent.click(screen.getByTestId("signin_submit_button"));

  //? if login successful, the user will be redirected to / (Landing)
  await waitFor(() => expect(screen.getByTestId(/book-item-0/i)).toBeDefined());

  userEvent.click(screen.getByTestId("menu-button"));

  userEvent.click(screen.getByText(/logout/i));

  expect(screen.getByText(/login/i)).toBeDefined();
});
