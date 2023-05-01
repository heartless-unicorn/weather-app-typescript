import React from "react";
import { fireEvent, getByTestId, render, screen } from "@testing-library/react";
import Navigation from "./Navigation.module";
import { BrowserRouter } from "react-router-dom";
// import createMemoryHistory from "history";

it("should render all buttons", () => {
  render(
    <BrowserRouter>
      <Navigation />
    </BrowserRouter>
  );
  const homeButton = screen.getByText("Home");
  const searchButton = screen.getByText("Search");
  const favoriteButton = screen.getByText("Favorite");
  expect(homeButton).toBeInTheDocument();
  expect(searchButton).toBeInTheDocument();
  expect(favoriteButton).toBeInTheDocument();
});
it("should navigate to search route", () => {
  // const history = createMemoryHistory();
});
