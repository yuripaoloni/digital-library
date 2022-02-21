import { render, screen } from "utils/testUtils";
import userEvent from "@testing-library/user-event";
import App from "App";

test("should perform sign up", async () => {
  render(<App />);

  //? await for Landing to be rendered
  expect(await screen.findByTestId(/book-item-0/i)).toBeDefined();

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
  expect(await screen.findByTestId("signin_email_field")).toBeDefined();
});
