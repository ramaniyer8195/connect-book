import React, { FC, useContext } from "react";
import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";

import { AuthContext } from "../../../../setup/auth/auth";

const NavigationItems = [
  {
    index: "0",
    text: "Contacts",
    to: "contacts",
  },
  {
    index: "1",
    text: "Events",
    to: "events",
  },
  {
    index: "2",
    text: "Stats",
    to: "stats",
  },
];

const NavItems: FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext.isAuthenticated) {
    return <></>;
  }

  return (
    <Box>
      {NavigationItems.map(({ index, text, to }) => (
        <Link to={to} key={index}>
          <Button color="inherit" size="large">
            {text}
          </Button>
        </Link>
      ))}
    </Box>
  );
};

export default NavItems;
