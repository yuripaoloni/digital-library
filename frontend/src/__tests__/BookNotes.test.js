import {
  render,
  screen,
  waitForElementToBeRemoved,
  getByText,
  getAllByTestId,
  getByRole,
  within,
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

  const prevLength = screen.getAllByTestId(/note-item/i).length;

  userEvent.click(await screen.findByText(/Crea nuova nota/i));

  userEvent.click(screen.getByTestId("SaveIcon"));

  const titleDialog = await screen.findByTestId("title-dialog");

  userEvent.type(getByRole(titleDialog, "textbox"), "MockTitle");

  userEvent.click(getByText(titleDialog, "Ok"));

  await waitForElementToBeRemoved(screen.getByRole("progressbar"));

  userEvent.click(await screen.findByTestId("select-note"));

  expect((await screen.findAllByTestId(/note-item/i)).length).toBeGreaterThan(
    prevLength
  );
});

test("should delete an existing note", async () => {
  render(<App />);

  userEvent.click(await screen.findByTestId("select-note"));

  const prevLength = screen.getAllByTestId(/note-item/i).length;

  //? the last note is selected because it's the one created in the test above and, so, it is for sure not shared
  userEvent.click(await screen.findByTestId(`note-item-${prevLength - 1}`));

  userEvent.click(screen.getByTestId("remove-icon"));

  const confirmDialog = await screen.findByTestId("confirm-dialog");

  userEvent.click(getByText(confirmDialog, "Ok"));

  await waitForElementToBeRemoved(screen.getByRole("progressbar"));

  userEvent.click(await screen.findByTestId("select-note"));

  expect((await screen.findAllByTestId(/note-item/i)).length).toBeLessThan(
    prevLength
  );
});

test("should edit an existing note", async () => {
  render(<App />);

  userEvent.click(await screen.findByTestId("select-note"));

  userEvent.click(screen.getAllByTestId(/note-item/i)[0]);

  userEvent.click(screen.getByTestId("SaveIcon"));

  const titleDialog = await screen.findByTestId("title-dialog");

  userEvent.clear(getByRole(titleDialog, "textbox"));

  userEvent.type(getByRole(titleDialog, "textbox"), "Note-Title-Edited-0");

  userEvent.click(getByText(titleDialog, "Ok"));

  await waitForElementToBeRemoved(screen.getByRole("progressbar"));

  userEvent.click(await screen.findByTestId("select-note"));

  expect(await screen.findAllByText("Note-Title-Edited-0")).toBeDefined();
});

test("should share an existing note", async () => {
  render(<App />);

  userEvent.click(await screen.findByTestId("select-note"));

  const prevLength = screen.getAllByTestId(/note-item/i).length;

  userEvent.click(await screen.findByText(/Crea nuova nota/i));

  userEvent.click(screen.getByTestId("SaveIcon"));

  const titleDialog = await screen.findByTestId("title-dialog");

  userEvent.type(getByRole(titleDialog, "textbox"), "MockTitle");

  userEvent.click(getByText(titleDialog, "Ok"));

  await waitForElementToBeRemoved(screen.getByRole("progressbar"));

  userEvent.click(await screen.findByTestId("select-note"));

  expect((await screen.findAllByTestId(/note-item/i)).length).toBeGreaterThan(
    prevLength
  );

  const newLength = screen.getAllByTestId(/note-item/i).length;

  //? the last note is selected because it's the one created in the test above and, so, it is for sure not shared
  userEvent.click(await screen.findByTestId(`note-item-${newLength - 1}`));

  userEvent.click(screen.getByTestId("share-note"));

  const groupSharingIcon = await screen.findByTestId(
    "select-group-sharing-dialog"
  );

  userEvent.click(getAllByTestId(groupSharingIcon, /group-share-item/i)[0]);

  await waitForElementToBeRemoved(screen.getByRole("progressbar"));

  userEvent.click(await screen.findByTestId("select-note"));

  // //? the shared note will be the first one of the list since on in SharedNote.js we do not take into account the id
  // //? id is 0 so the first one will be considered the shared note
  const sharedNote = screen.getByTestId("note-item-0");

  expect(within(sharedNote).getByTestId("GroupIcon")).toBeDefined();
});

test("should unshare a shared note", async () => {
  render(<App />);

  userEvent.click(await screen.findByTestId("select-note"));

  //? the first note is selected because it's the one considerede in the sharing note test above and, so, it is for sure shared
  userEvent.click(await screen.findByTestId(`note-item-0`));

  // //? it is the shared note in the last test case
  userEvent.click(screen.getByTestId("unshare-note"));

  const confirmDialog = await screen.findByTestId("confirm-dialog");

  userEvent.click(getByText(confirmDialog, "Ok"));

  await waitForElementToBeRemoved(screen.getByRole("progressbar"));

  expect(await screen.findByTestId("share-note")).toBeDefined();
});
