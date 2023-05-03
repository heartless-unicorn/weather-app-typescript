import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import FavoritePage from "./components/FavoritePage/FavoritePage.module";
import HomePage from "./components/HomePage/HomePage.module";
import Navigation from "./components/Navigation/Navigation.module";
import SearchPage from "./components/SearchPage/SearchPage.module";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/favorite" element={<FavoritePage />} />
      </Routes>
      <Navigation />
    </div>
  );
}

export default App;
