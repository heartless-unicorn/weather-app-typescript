import {
  fireEvent,
  render,
  screen,
  waitFor,
  act,
} from "@testing-library/react";

import SearchPage from "./SearchPage.module";
import LocationFetch from "../hooks/LocationFetch";

import { Provider } from "react-redux";
import actionSlice from "../action-slice";
import { configureStore } from "@reduxjs/toolkit";

jest.mock("../hooks/LocationFetch");

describe("SearchPage", () => {
  const mockedFetch = LocationFetch as jest.MockedFunction<
    typeof LocationFetch
  >;
  const store = configureStore({
    reducer: actionSlice,
  });
  test("renders search input", () => {
    render(<SearchPage />);
    const searchInput = screen.getByRole("searchbox");
    expect(searchInput).toBeInTheDocument();
  });
  test("displays information about searched City", async () => {
    act(() => {
      mockedFetch.mockImplementation(() =>
        Promise.resolve({
          name: "Kyiv",
          country: "UA",
          date: new Date(),
          description: "Lorem lorem",
          icon_id: "icon",
          temp: 14,
        })
      );
    });

    render(
      <Provider store={store}>
        <SearchPage />
      </Provider>
    );
    const searchButton = screen.getByRole("button");
    const searchInput = screen.getByRole("searchbox");
    fireEvent.change(searchInput, { target: { value: "Kyiv" } });
    fireEvent(searchButton, new MouseEvent("click"));
    expect(LocationFetch).toBeCalled();
    const location = await waitFor(() => screen.getByText("Kyiv, UA"));
    expect(location).toBeInTheDocument();
  });
  test("display error if input search is invalid", async () => {
    act(() => {
      mockedFetch.mockImplementation(() => Promise.reject());
    });

    render(
      <Provider store={store}>
        <SearchPage />
      </Provider>
    );
    const searchButton = screen.getByRole("button");
    const searchInput = screen.getByRole("searchbox");
    fireEvent.change(searchInput, { target: { value: "Kyliv" } });
    fireEvent(searchButton, new MouseEvent("click"));
    expect(LocationFetch).toBeCalled();
    const error = await waitFor(() =>
      screen.getByText("Invalid search request")
    );
    expect(error).toBeInTheDocument();
  });
});
