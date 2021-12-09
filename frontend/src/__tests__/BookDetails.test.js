import { render, fireEvent, screen } from "utils/testUtils";
import App from "App";

test("should display book details", async () => {
  render(<App />);

  let button = await screen.findByTestId("trova_button");

  fireEvent.click(button);

  let detailsButton = await screen.findByTestId("details-button-0");

  fireEvent.click(detailsButton);

  expect(await screen.findByTestId("book-details-item")).toBeDefined();
});
