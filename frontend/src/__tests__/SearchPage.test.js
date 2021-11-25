import { render, fireEvent, waitFor, screen } from "utils/testUtils";
import App from "App";

test("Books loaded when SearchBooks page is rendered", async () => {
  render(<App />);

  await waitFor(() => expect(screen.getByTestId(/book-item-1/i)).toBeDefined());
});

test("Select a library and search books", async () => {
  render(<App />);

  fireEvent.mouseDown(screen.getByLabelText("Seleziona biblioteca"));

  await waitFor(() => fireEvent.click(screen.getByText("MockA")));

  fireEvent.change(screen.getByLabelText("Titolo"), {
    target: { value: "TitleA" },
  });

  fireEvent.click(screen.getByTestId("search-button"));

  await waitFor(() => expect(screen.getByTestId(/book-item-1/i)).toBeDefined());
});
