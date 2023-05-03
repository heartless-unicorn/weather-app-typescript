import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Navigation from "./Navigation.module";

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
