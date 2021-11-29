import { render, fireEvent, waitFor, screen } from "utils/testUtils";
import App from "App";

test("books showed when SearchBooks page is rendered", async () => {
  render(<App />);

  let button = await waitFor(() => screen.getByTestId("trova_button"));

  fireEvent.click(button);

  await waitFor(() => expect(screen.getByTestId(/book-item-0/i)).toBeDefined());
});

test("select a library and search books", async () => {
  render(<App />);

  await waitFor(() => expect(screen.getByTestId(/book-item-0/i)).toBeDefined());

  fireEvent.mouseDown(screen.getByLabelText("Seleziona biblioteca"));

  await waitFor(() => fireEvent.click(screen.getByText("MockA")));

  fireEvent.change(screen.getByLabelText("Titolo"), {
    target: { value: "TitleA" },
  });

  fireEvent.click(screen.getByTestId("search-button"));

  await waitFor(() => expect(screen.getByTestId(/book-item-0/i)).toBeDefined());
});
