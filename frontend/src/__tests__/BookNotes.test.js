import {
  render,
  screen,
  waitForElementToBeRemoved,
  getByText,
  getByRole,
} from "utils/testUtils";
import userEvent from "@testing-library/user-event";
import App from "App";

test("should open notes page", async () => {
  render(<App />);

  expect(await screen.findByTestId(/book-item-0/i)).toBeDefined();

  userEvent.click(screen.getByTestId(/read-button-0/i));

  //? after the read button click, should redirect to login page
  userEvent.type(screen.getByTestId("signin_email_field"), "email@gmail.com");
  userEvent.type(screen.getByTestId("signin_password_field"), "password123");

  userEvent.click(screen.getByTestId("signin_submit_button"));

  //? after login should redirect to read page
  expect(await screen.findByTestId(/reading-page-image/i)).toBeDefined();

  userEvent.click(screen.getByTestId("note-icon-button"));

  expect(await screen.findByTestId("select-note")).toBeDefined();
});

test("should open the notes dialog", async () => {
  render(<App />);

  userEvent.click(await screen.findByTestId("select-note"));

  expect(await screen.findAllByTestId(/note-item/i)).toBeDefined();
});

test("should create a new note", async () => {
  render(<App />);

  userEvent.click(await screen.findByTestId("select-note"));

  userEvent.click(await screen.findByText(/Crea nuova nota/i));

  userEvent.click(screen.getByTestId("SaveIcon"));

  const titleDialog = await screen.findByTestId("title-dialog");

  userEvent.type(getByRole(titleDialog, "textbox"), "MockTitle");

  userEvent.click(getByText(titleDialog, "Ok"));

  await waitForElementToBeRemoved(screen.getByRole("progressbar"));

  userEvent.click(await screen.findByTestId("select-note"));

  expect(await screen.findAllByTestId(/note-item/i)).toHaveLength(2);
});

test("should delete an existing note", async () => {
  render(<App />);

  userEvent.click(await screen.findByTestId("select-note"));

  userEvent.click(await screen.findByTestId(/note-item-0/i));

  userEvent.click(screen.getByTestId("remove-icon"));

  const confirmDialog = await screen.findByTestId("confirm-dialog");

  userEvent.click(getByText(confirmDialog, "Ok"));

  await waitForElementToBeRemoved(screen.getByRole("progressbar"));

  userEvent.click(await screen.findByTestId("select-note"));

  expect(await screen.findAllByTestId(/note-item/i)).toHaveLength(1);
});

test("should edit an existing note", async () => {
  render(<App />);

  userEvent.click(await screen.findByTestId("select-note"));

  userEvent.click(await screen.findByText(/Note-Title-0/i));

  userEvent.click(screen.getByTestId("SaveIcon"));

  const titleDialog = await screen.findByTestId("title-dialog");

  userEvent.clear(getByRole(titleDialog, "textbox"));

  userEvent.type(getByRole(titleDialog, "textbox"), "Note-Title-Edited-0");

  userEvent.click(getByText(titleDialog, "Ok"));

  await waitForElementToBeRemoved(screen.getByRole("progressbar"));

  userEvent.click(await screen.findByTestId("select-note"));

  expect(await screen.findAllByText("Note-Title-Edited-0")).toBeDefined();
});
