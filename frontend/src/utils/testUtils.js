import { render } from "@testing-library/react";
import Providers from "Providers";

const AllTheProviders = ({ children }) => {
  return <Providers>{children}</Providers>;
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
