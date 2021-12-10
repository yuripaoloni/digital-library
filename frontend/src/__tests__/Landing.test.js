import Landing from "pages/Landing";
import { render, screen } from "utils/testUtils";
import App from "App";

test("Testing Landing Page", () => {
  const { getByTestId } = render(<Landing />);
  const mainHeader = getByTestId("main_header");
  const subHeader = getByTestId("sub_header");
  const trovaButton = getByTestId("trova_button");
  //testing header text
  expect(mainHeader.textContent).toBe("Biblioteca digitale");
  //testing subheader text
  expect(subHeader.textContent).toBe(
    "Portale online per la consultazione dei libri digitalizzati con il sistema BooKeeper. Scegli da un catalogo sempre a tua disposizione."
  );
  //testing button existance
  expect(trovaButton).toBeInTheDocument();
  //testing button style
  expect(trovaButton).toHaveStyle("background-color : #222C4A");
});

test("should display books on landing page", async () => {
  render(<App />);

  expect(await screen.findByTestId(/book-item-0/i)).toBeDefined();
});
