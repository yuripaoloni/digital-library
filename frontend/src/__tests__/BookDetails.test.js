import { render, fireEvent, waitFor, screen } from "utils/testUtils";
import App from "App";

test("should display book details", async () => {
  render(<App />);

  let button = await waitFor(() => screen.getByTestId("trova_button"));

  fireEvent.click(button);

  let detailsButton = await waitFor(() =>
    screen.getByTestId("details-button-0")
  );

  fireEvent.click(detailsButton);

  await waitFor(() =>
    expect(screen.getByTestId("book-details-item")).toBeDefined()
  );
});
