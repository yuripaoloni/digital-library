import Navbar from "../components/Navbar";
import { render } from "utils/testUtils";
import { fireEvent } from "@testing-library/react";

test("Testing Global Navbar", () => {
  const { getByTestId } = render(<Navbar />);
  const navbar = getByTestId("navbar");
  const header = getByTestId("main-text");
  const sideMenu = getByTestId("side-menu");
  expect(navbar).toBeInTheDocument();
  expect(header).toBeInTheDocument();
  expect(sideMenu).toBeInTheDocument();
});

test("Testing Side Navbar", () => {
  const { getByTestId } = render(<Navbar />);
  const logo = getByTestId("logo");
  const menu = getByTestId("menu-button");
  const sideMenu = getByTestId("side-menu");
  fireEvent(menu, new MouseEvent("click"));
  expect(logo).toBeInTheDocument();
  expect(sideMenu).toBeInTheDocument();
});
