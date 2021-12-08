import { render, waitFor, screen } from "utils/testUtils";
import userEvent from "@testing-library/user-event";
import App from "App";

test("should display the reading page", async () => {
  render(<App />);

  await waitFor(() => expect(screen.getByTestId(/book-item-0/i)).toBeDefined());

  userEvent.click(screen.getByTestId(/read-button-0/i));

  //? after the read button click, should redirect to login page
  userEvent.type(screen.getByTestId("signin_email_field"), "email@gmail.com");
  userEvent.type(screen.getByTestId("signin_password_field"), "password123");

  userEvent.click(screen.getByTestId("signin_submit_button"));

  //? after login should redirect to read page
  await waitFor(() =>
    expect(screen.getByTestId(/book-read-item/i)).toBeDefined()
  );
});
