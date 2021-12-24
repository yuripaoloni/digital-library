import { render, screen } from "utils/testUtils";
import userEvent from "@testing-library/user-event";
import App from "App";

xtest("should show user info and saved books", async () => {
  render(<App />);

  expect(await screen.findByTestId(/book-item-0/i)).toBeDefined();

  userEvent.click(screen.getByTestId("menu-button"));

  userEvent.click(screen.getByText(/profilo/i));

  //? after the profile button click, should redirect to login page
  userEvent.type(screen.getByTestId("signin_email_field"), "email@gmail.com");
  userEvent.type(screen.getByTestId("signin_password_field"), "password123");

  userEvent.click(screen.getByTestId("signin_submit_button"));

  //? after login should redirect to profile page
  //TODO expect for user info (name, surname, email, etc...)
  //TODO expect for saved books items
});

xtest("should open groups page", async () => {});
