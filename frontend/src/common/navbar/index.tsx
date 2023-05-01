import React, { FC, useContext } from "react";
import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import { Link } from "react-router-dom";

import { AuthContext } from "../../setup/auth/auth";
import NavItems from "./components/nav-items";
import ThemeSwitch from "./components/theme-switch";

const Navbar: FC = () => {
  const authContext = useContext(AuthContext);

  return (
    <AppBar sx={{ background: "white" }}>
      <Toolbar>
        <Box flexGrow={1}>
          <Link
            to="dashboard"
            style={{ display: "flex", width: "fit-content" }}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <PhoneIcon fontSize="medium" />
              <Typography variant="h5" sx={{ width: "fit-content" }}>
                ConnectBook
              </Typography>
            </Box>
          </Link>
        </Box>
        <NavItems />
        <ThemeSwitch />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
