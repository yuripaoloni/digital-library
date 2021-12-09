import { render, fireEvent, screen } from "utils/testUtils";
import App from "App";

test("books showed when SearchBooks page is rendered", async () => {
  render(<App />);

  let button = await screen.findByTestId("trova_button");

  fireEvent.click(button);

  expect(await screen.findByTestId(/book-item-0/i)).toBeDefined();
});

test("select a library and search books", async () => {
  render(<App />);

  expect(await screen.findByTestId(/book-item-0/i)).toBeDefined();

  fireEvent.mouseDown(screen.getByLabelText("Seleziona biblioteca"));

  fireEvent.click(await screen.findByText("MockA"));

  fireEvent.change(screen.getByLabelText("Titolo"), {
    target: { value: "TitleA" },
  });

  fireEvent.click(screen.getByTestId("search-button"));

  expect(await screen.findByTestId(/book-item-0/i)).toBeDefined();
});
