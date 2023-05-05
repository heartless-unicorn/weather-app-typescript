import { render, screen, waitFor, act } from "@testing-library/react";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import actionSlice from "../action-slice";

import HomePage from "./HomePage.module";
import LocationFetch from "../hooks/LocationFetch";
import { HandleLocation } from "../hooks/Location";

jest.mock("../hooks/LocationFetch");
jest.mock("../hooks/Location");

const mockGeolocation = {
  getCurrentPosition: jest.fn(),
};

beforeAll(() => {
  Object.defineProperty(global.navigator, "geolocation", {
    value: mockGeolocation,
    writable: true,
  });
});

afterAll(() => {
  Object.defineProperty(global.navigator, "geolocation", {
    value: undefined,
    writable: true,
  });
});
describe("HomePage", () => {
  const LocationHandler = HandleLocation as jest.MockedFunction<
    typeof HandleLocation
  >;
  const mockedFetch = LocationFetch as jest.MockedFunction<
    typeof LocationFetch
  >;
  const store = configureStore({
    reducer: actionSlice,
  });
  test("renders loading spinner when weather data is not loaded", () => {
    act(() => {
      mockedFetch.mockImplementation(() =>
        Promise.resolve({
          name: "Lorem",
          country: "lorem",
          date: new Date(),
          description: "Lorem lorem",
          icon_id: "icon",
          temp: 14,
        })
      );
    });
    act(() => {
      LocationHandler.mockImplementation(() => {
        return {
          locationAccess: true,
          isLoaded: true,
          location: {
            lon: 20,
            lat: 20,
          },
        };
      });
    });

    render(<HomePage />);
    const loader = screen.getByLabelText("loader");
    expect(loader).toBeInTheDocument();
  });
  test("renders correct weather data when it is loaded and location access is granted", async () => {
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
    act(() => {
      LocationHandler.mockImplementation(() => {
        return {
          locationAccess: true,
          isLoaded: true,
          location: {
            lon: 20,
            lat: 20,
          },
        };
      });
    });

    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );

    const logo = await waitFor(() => screen.getByTestId("logo"));
    const location = await waitFor(() => screen.getByText("Kyiv, UA"));

    expect(logo).toBeInTheDocument();
    expect(location).toBeInTheDocument();
  });

  test("renders error message when location hasn`t been granted ", async () => {
    act(() => {
      mockedFetch.mockImplementation(() =>
        Promise.resolve({
          name: "Col",
          country: "Bla",
          date: new Date(),
          description: "BlaBla",
          icon_id: "Bla",
          temp: 14,
        })
      );
    });

    act(() => {
      LocationHandler.mockImplementation(() => {
        return {
          locationAccess: false,
          isLoaded: true,
          location: {
            lon: undefined,
            lat: undefined,
          },
        };
      });
    });

    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );

    const errorHandler = await waitFor(() =>
      screen.getByText("Please allow your location")
    );

    expect(errorHandler).toBeInTheDocument();
  });
  test("renders error message when server has an error ", async () => {
    act(() => {
      mockedFetch.mockImplementation(() => Promise.reject());
    });

    act(() => {
      LocationHandler.mockImplementation(() => {
        return {
          locationAccess: false,
          isLoaded: true,
          location: {
            lon: undefined,
            lat: undefined,
          },
        };
      });
    });

    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );

    const errorHandler = await waitFor(() =>
      screen.getByText("Error on server")
    );

    expect(errorHandler).toBeInTheDocument();
  });
});
