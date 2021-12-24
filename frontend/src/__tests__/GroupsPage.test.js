import { render, screen } from "utils/testUtils";
import userEvent from "@testing-library/user-event";
import App from "App";

xtest("should load joined and created groups", async () => {
  render(<App />);
  //TODO take code from "should show user info and saved books" and add link button click
});

xtest("should create a new group", async () => {
  render(<App />);
});

xtest("should edit an existing group", async () => {
  render(<App />);

  //TODO change name, add/remove participant
});

xtest("should delete an existing group", async () => {
  render(<App />);
});

xtest("user should leave an existing group", async () => {
  render(<App />);
});
