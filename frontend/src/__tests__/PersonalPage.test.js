import { render, screen, waitForElementToBeRemoved } from "utils/testUtils";
import userEvent from "@testing-library/user-event";
import App from "App";

test("should show user info and saved books", async () => {
  render(<App />);

  //? await for Landing to be rendered
  expect(await screen.findByTestId(/book-item-0/i)).toBeDefined();

  userEvent.click(screen.getByTestId("menu-button"));

  userEvent.click(screen.getByText(/login/i));

  userEvent.type(screen.getByTestId("signin_email_field"), "email@gmail.com");
  userEvent.type(screen.getByTestId("signin_password_field"), "password123");

  userEvent.click(screen.getByTestId("signin_submit_button"));

  //? if login successful, the user will be redirected to / (Landing)
  expect(await screen.findByTestId(/book-item-0/i)).toBeDefined();

  userEvent.click(screen.getByTestId("menu-button"));

  userEvent.click(screen.getByTestId("profile-link"));

  expect(await screen.findAllByText("MockUsername")).toBeDefined();
  expect(await screen.findByText("MockEmail")).toBeDefined();
  expect(await screen.findAllByText(/MockSavedBook/i)).toBeDefined();
});

test("should open groups page", async () => {
  render(<App />);

  await waitForElementToBeRemoved(screen.getByRole("progressbar"));

  userEvent.click(screen.getByTestId("groups-link-icon"));

  expect(await screen.findAllByTestId(/group-created-item/i)).toBeDefined();
  expect(await screen.findAllByTestId(/group-joined-item/i)).toBeDefined();
});
