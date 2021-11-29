import Footer from "../components/Footer";
import { render } from "utils/testUtils";

test("Testing Footer", () => {
  const { getByTestId } = render(<Footer />);
  const footer = getByTestId("footer");
  const signature = getByTestId("footer-signature");
  expect(footer).toBeInTheDocument();
  expect(signature.textContent).toBe("© 2021 Digital Library");
});
