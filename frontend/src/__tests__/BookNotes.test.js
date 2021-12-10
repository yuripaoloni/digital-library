import { render, screen, waitForElementToBeRemoved } from "utils/testUtils";
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

  await waitForElementToBeRemoved(screen.getByRole("progressbar"));

  userEvent.click(await screen.findByTestId("select-note"));

  expect(await screen.findAllByTestId(/note-item/i)).toHaveLength(2);
});

test("should delete an existing note", async () => {
  render(<App />);

  userEvent.click(await screen.findByTestId("select-note"));

  userEvent.click(await screen.findByTestId(/note-item-0/i));

  userEvent.click(screen.getByTestId("remove-icon"));

  await waitForElementToBeRemoved(screen.getByRole("progressbar"));

  userEvent.click(await screen.findByTestId("select-note"));

  expect(await screen.findAllByTestId(/note-item/i)).toHaveLength(1);
});

//TODO
xtest("should edit an existing note", async () => {
  render(<App />);

  userEvent.click(await screen.findByTestId("select-note"));

  userEvent.click(await screen.findByTestId(/note-item/i));

  userEvent.type(
    screen.getByText(/test note 1/i),
    `{"blocks":[{"key":"brhle","text":"test note 2","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`
  );

  userEvent.click(screen.getByTestId("SaveIcon"));

  await waitForElementToBeRemoved(screen.getByRole("progressbar"));

  userEvent.click(await screen.findByTestId("select-note"));

  // userEvent.click(await screen.findByText(/note-item/i));

  screen.debug(null, Infinity);
  // expect(await screen.findByText(/Nota 2/i)).toHaveLength(2);

  //TODO find the editor by testid

  //TODO check presence of the existing note content in the editor

  //TODO modify content with userEvent

  //TODO click on the save icon to execute the onEdit method

  //TODO check presence of the updated note in the dialog
});
