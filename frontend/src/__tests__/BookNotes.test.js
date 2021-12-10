import { render, screen } from "utils/testUtils";
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
  expect(await screen.findByTestId(/book-read-item/i)).toBeDefined();

  userEvent.click(screen.getByTestId("ModeIcon"));

  expect(await screen.findByText(/Pagina/i)).toBeDefined();

  userEvent.click(await screen.findByText(/Seleziona nota/i));

  expect(await screen.findAllByText(/MockNote/i)).toBeDefined();
});

test("should open the notes dialog", async () => {
  render(<App />);

  userEvent.click(await screen.findByTestId("delete-icon"));

  expect(await screen.findAllByText(/MockNote/i)).toBeDefined();
  // screen.debug(null, Infinity);
});

test("should create a new note", async () => {
  render(<App />);

  userEvent.click(await screen.findByTestId("delete-icon"));

  userEvent.click(await screen.findByText(/Crea nuova nota/i));

  // screen.debug(null, Infinity);

  //TODO find the editor by testid

  //TODO add content with userEvent

  //TODO click on the save icon to execute the onCreate method

  //TODO check presence of the new note in the dialog
});

test("should edit an existing note", async () => {
  render(<App />);

  userEvent.click(await screen.findByTestId("delete-icon"));

  userEvent.click(await screen.findByText(/MockNote-0/i));

  //TODO find the editor by testid

  //TODO check presence of the existing note content in the editor

  //TODO modify content with userEvent

  //TODO click on the save icon to execute the onEdit method

  //TODO check presence of the updated note in the dialog
});

test("should delete an existing note", async () => {
  render(<App />);

  userEvent.click(await screen.findByTestId("delete-icon"));

  userEvent.click(await screen.findByText(/MockNote-0/i));

  //TODO find the editor by testid

  //TODO check presence of the existing note content in the editor

  //TODO click on the delete icon to execute the onDelete method

  //TODO check absence of the deleted note in the dialog
});
