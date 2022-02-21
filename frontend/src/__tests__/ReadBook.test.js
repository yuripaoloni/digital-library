import {
  render,
  screen,
  waitForElementToBeRemoved,
  getByRole,
  getByTestId,
  getByText,
  waitFor,
} from "utils/testUtils";
import userEvent from "@testing-library/user-event";
import App from "App";

test("should display the reading page", async () => {
  render(<App />);

  expect(await screen.findByTestId(/book-item-0/i)).toBeDefined();

  userEvent.click(screen.getByTestId(/read-button-0/i));

  //? after the read button click, should redirect to login page
  userEvent.type(screen.getByTestId("signin_email_field"), "email@gmail.com");
  userEvent.type(screen.getByTestId("signin_password_field"), "password123");

  userEvent.click(screen.getByTestId("signin_submit_button"));

  //? after login should redirect to read page
  expect(await screen.findByTestId(/reading-page-image/i)).toBeDefined();
});

test("should add/remove a book from favorites", async () => {
  render(<App />);

  expect(await screen.findByTestId(/reading-page-image/i)).toBeDefined();

  userEvent.click(screen.getByTestId("favorite-icon-button"));

  await waitFor(() =>
    expect(screen.getByTestId("FavoriteIcon")).toHaveStyle("color: red")
  );

  userEvent.click(screen.getByTestId("favorite-icon-button"));

  await waitFor(() =>
    expect(screen.getByTestId("FavoriteIcon")).not.toHaveStyle("color: red")
  );
});

test("should show saved bookmarks", async () => {
  render(<App />);

  expect(await screen.findByTestId(/reading-page-image/i)).toBeDefined();

  userEvent.click(screen.getByTestId("bookmark-icon-button"));

  await screen.findByTestId("bookmark-modal");

  expect(await screen.findAllByText(/MockBookmark/i)).toBeDefined();
});

test("should add a new bookmark", async () => {
  render(<App />);

  expect(await screen.findByTestId(/reading-page-image/i)).toBeDefined();

  userEvent.click(screen.getByTestId("bookmark-icon-button"));

  const bookmarkModal = await screen.findByTestId("bookmark-modal");

  expect(await screen.findAllByText(/MockBookmark/i)).toBeDefined();

  userEvent.type(getByRole(bookmarkModal, "textbox"), "NewBookmark");

  userEvent.click(screen.getByTestId("submit-bookmark-icon"));

  await waitForElementToBeRemoved(screen.getByRole("progressbar"));

  expect(await screen.findByText("NewBookmark")).toBeDefined();
});

test("should edit an existing bookmark", async () => {
  render(<App />);

  expect(await screen.findByTestId(/reading-page-image/i)).toBeDefined();

  userEvent.click(screen.getByTestId("bookmark-icon-button"));

  const bookmarkModal = await screen.findByTestId("bookmark-modal");

  expect(await screen.findAllByText(/MockBookmark/i)).toBeDefined();

  const item = screen.getByTestId("bookmark-item-0");

  userEvent.click(getByTestId(item, "edit-bookmark-icon"));

  userEvent.clear(getByRole(bookmarkModal, "textbox"));

  userEvent.type(getByRole(bookmarkModal, "textbox"), "MockBookmarkAEdited");

  userEvent.click(screen.getByTestId("submit-bookmark-icon"));

  await waitForElementToBeRemoved(screen.getByRole("progressbar"));

  expect(await screen.findByText("MockBookmarkAEdited")).toBeDefined();
});

test("should delete and existing bookmark", async () => {
  render(<App />);

  expect(await screen.findByTestId(/reading-page-image/i)).toBeDefined();

  userEvent.click(screen.getByTestId("bookmark-icon-button"));

  await screen.findByTestId("bookmark-modal");

  expect(await screen.findAllByText(/MockBookmark/i)).toBeDefined();

  const item = screen.getByTestId("bookmark-item-0");

  userEvent.click(getByTestId(item, "delete-bookmark-icon"));

  const confirmDialog = await screen.findByTestId("confirm-dialog");

  userEvent.click(getByText(confirmDialog, "Ok"));

  await waitForElementToBeRemoved(screen.getByRole("progressbar"));

  expect(await screen.findAllByText(/MockBookmark/i)).toHaveLength(2);
});

test("should open the page of a bookmark", async () => {
  render(<App />);

  expect(await screen.findByTestId(/reading-page-image/i)).toBeDefined();

  userEvent.click(screen.getByTestId("bookmark-icon-button"));

  await screen.findByTestId("bookmark-modal");

  expect(await screen.findAllByText(/MockBookmark/i)).toBeDefined();

  //? second element has page = 1
  const item = screen.getByTestId("bookmark-item-1");

  userEvent.click(getByTestId(item, "page-bookmark-icon"));

  expect(await screen.findByTestId(/reading-page-image/i)).toBeDefined();

  expect(await screen.findByRole("button", { name: "page 1" })).toHaveAttribute(
    "aria-current",
    "true"
  );
});
