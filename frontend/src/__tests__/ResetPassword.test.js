import { render, screen } from "utils/testUtils";
import userEvent from "@testing-library/user-event";
import ResetPassword from "pages/ResetPassword";

test("should type new password", async () => {
  render(<ResetPassword />);

  expect(screen.getByText("Cambio password")).toBeDefined();

  userEvent.type(screen.getByTestId("new_password_field"), "newPassword");

  userEvent.click(screen.getByTestId("reset_pwd_button"));
});
