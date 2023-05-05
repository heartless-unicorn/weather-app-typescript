import WeatherCard from "./WeatherCard.module";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import actionSlice from "../action-slice";

import { render, screen } from "@testing-library/react";

describe("WeatherCard", () => {
  const store = configureStore({
    reducer: actionSlice,
  });
  test("weather data renders correctly from props", () => {
    const testProps = {
      name: "Kyiv",
      country: "UA",
      date: new Date(),
      description: "Lorem lorem",
      icon_id: "icon",
      temp: 14,
    };

    render(
      <Provider store={store}>
        <WeatherCard data={testProps} format="city" update={() => {}} />
      </Provider>
    );
    const location = screen.getByText("Kyiv, UA");
    expect(location).toBeInTheDocument();
    const addButton = screen.getByText("+");
    expect(addButton).toBeInTheDocument();
  });
  test("weather data doesnt have an add button when using location", () => {
    const testProps = {
      name: "Kyiv",
      country: "UA",
      date: new Date(),
      description: "Lorem lorem",
      icon_id: "icon",
      temp: 14,
    };

    render(
      <Provider store={store}>
        <WeatherCard data={testProps} format="not city" update={() => {}} />
      </Provider>
    );
    const location = screen.getByText("Kyiv, UA");
    expect(location).toBeInTheDocument();
    const addButton = screen.queryByText("+");
    expect(addButton).not.toBeInTheDocument();
  });
});
