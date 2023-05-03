import { useState } from "react";

import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useNavigate } from "react-router-dom";

export default function Navigation() {
  const [value, setValue] = useState("/");
  const navigate = useNavigate();

  const manageNav = function (e: React.SyntheticEvent, newValue: string) {
    if (value === newValue) {
      return;
    }
    console.log("render in navigation");
    setValue(newValue);
    navigate(newValue);
  };
  return (
    <div className="Navigation">
      <BottomNavigation value={value} onChange={manageNav}>
        <BottomNavigationAction
          label="Home"
          icon={<HomeRoundedIcon />}
          value="/"
          data-testid="home-button"
        />
        <BottomNavigationAction
          label="Search"
          icon={<SearchRoundedIcon />}
          value="/search"
          data-testid="search-button"
        />
        <BottomNavigationAction
          label="Favorite"
          icon={<BookmarkRoundedIcon />}
          value="/favorite"
        />
      </BottomNavigation>
    </div>
  );
}
