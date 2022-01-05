import {
  render,
  screen,
  waitForElementToBeRemoved,
  getByText,
  getByTestId,
  getAllByTestId,
} from "utils/testUtils";
import userEvent from "@testing-library/user-event";
import App from "App";

test("should load joined and created groups", async () => {
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

  userEvent.click(screen.getByText(/profilo/i));

  expect(await screen.findByText("MockUsername")).toBeDefined();
  expect(await screen.findByText("MockEmail")).toBeDefined();
  expect(await screen.findAllByText(/MockSavedBook/i)).toBeDefined();

  userEvent.click(screen.getByTestId("groups-link-icon"));

  expect(await screen.findAllByTestId(/group-created-item/i)).toBeDefined();
  expect(await screen.findAllByTestId(/group-joined-item/i)).toBeDefined();
});

test("should create a new group", async () => {
  render(<App />);

  expect(await screen.findAllByTestId(/group-created-item/i)).toBeDefined();
  expect(await screen.findAllByTestId(/group-joined-item/i)).toBeDefined();

  const prevLength = screen.getAllByTestId(/group-created-item/i).length;

  userEvent.click(screen.getByTestId("create-group-button"));

  const groupModal = await screen.findByTestId("group-modal");

  userEvent.type(getByTestId(groupModal, "group-name-textbox"), "NewGroup");

  userEvent.click(getByTestId(groupModal, "group-modal-submit"));

  expect(
    (await screen.findAllByTestId(/group-created-item/i)).length
  ).toBeGreaterThan(prevLength);
});

test("should delete an existing group", async () => {
  render(<App />);

  expect(await screen.findAllByTestId(/group-created-item/i)).toBeDefined();
  expect(await screen.findAllByTestId(/group-joined-item/i)).toBeDefined();

  const prevLength = screen.getAllByTestId(/group-created-item/i).length;

  userEvent.click(screen.getAllByTestId("delete-group-icon")[0]);

  const confirmDialog = await screen.findByTestId("confirm-dialog");

  userEvent.click(getByText(confirmDialog, "Ok"));

  await waitForElementToBeRemoved(screen.getAllByTestId("skeleton"));

  expect(
    (await screen.findAllByTestId(/group-created-item/i)).length
  ).toBeLessThan(prevLength);
});

test("user should leave an existing group", async () => {
  render(<App />);

  expect(await screen.findAllByTestId(/group-created-item/i)).toBeDefined();
  expect(await screen.findAllByTestId(/group-joined-item/i)).toBeDefined();

  const prevLength = screen.getAllByTestId(/group-joined-item/i).length;

  userEvent.click(screen.getAllByTestId("exit-group-icon")[0]);

  const confirmDialog = await screen.findByTestId("confirm-dialog");

  userEvent.click(getByText(confirmDialog, "Ok"));

  await waitForElementToBeRemoved(screen.getAllByTestId("skeleton"));

  expect(
    (await screen.findAllByTestId(/group-joined-item/i)).length
  ).toBeLessThan(prevLength);
});

test("should edit an existing group", async () => {
  render(<App />);

  expect(await screen.findAllByTestId(/group-created-item/i)).toBeDefined();
  expect(await screen.findAllByTestId(/group-joined-item/i)).toBeDefined();

  userEvent.click(screen.getAllByTestId("edit-group-icon")[0]);

  const groupModal = await screen.findByTestId("group-modal");

  userEvent.clear(getByTestId(groupModal, "group-name-textbox"));

  userEvent.type(
    getByTestId(groupModal, "group-name-textbox"),
    "MockEditedGroup"
  );

  userEvent.click(getByTestId(groupModal, "group-modal-submit"));

  await waitForElementToBeRemoved(screen.getAllByTestId("skeleton"));

  expect(await screen.findByText("MockEditedGroup")).toBeDefined();
});

test("should remove a participant from a group", async () => {
  render(<App />);

  expect(await screen.findAllByTestId(/group-created-item/i)).toBeDefined();
  expect(await screen.findAllByTestId(/group-joined-item/i)).toBeDefined();

  userEvent.click(screen.getAllByText("Membri")[0]);

  let memberDialog = screen.getByTestId("group-members-dialog");

  const membersNumber = getAllByTestId(
    memberDialog,
    /group-member-item/i
  ).length;

  userEvent.click(getAllByTestId(memberDialog, "remove-member-icon")[0]);

  const confirmDialog = await screen.findByTestId("confirm-dialog");

  userEvent.click(screen.getByText("Ok"));

  await waitForElementToBeRemoved(confirmDialog);

  userEvent.click(screen.getAllByText("Membri")[0]);

  memberDialog = screen.getByTestId("group-members-dialog");

  expect(
    getAllByTestId(memberDialog, /group-member-item/i).length
  ).toBeLessThan(membersNumber);
});

test("should open a shared note", async () => {
  render(<App />);

  expect(await screen.findAllByTestId(/group-created-item/i)).toBeDefined();
  expect(await screen.findAllByTestId(/group-joined-item/i)).toBeDefined();

  userEvent.click(screen.getAllByText("Leggi note")[0]);

  let notesDialog = screen.getByTestId("group-notes-dialog");

  userEvent.click(getByTestId(notesDialog, "group-note-item-0"));

  expect(await screen.findByTestId("select-note")).toBeDefined();
});
