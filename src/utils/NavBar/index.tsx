import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import ColorSchemeToggle from "../ColorSchemeToggle";
import { useHistory } from "react-router";
import { IconButton } from "@mui/joy";
import { Logout, People } from "@mui/icons-material";

const logoStyle = {
  width: "28px",
  height: "28px",
  cursor: "pointer",
};

export interface MenuItems {
  title: string;
  handleClick: () => void;
}

function AppAppBar() {
  const history = useHistory();

  const menuItems: MenuItems[] = [
    {
      title: "Home",
      handleClick: () => history.push("/home"),
    },
    {
      title: "Booking",
      handleClick: () => history.push("/bookings/create-booking"),
    },
  ];

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              borderRadius: "999px",
              bgcolor:
                theme.palette.mode === "light"
                  ? "rgba(255, 255, 255, 0.4)"
                  : "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(5px)",
              maxHeight: 40,
              border: "1px solid",
              borderColor: "divider",
              boxShadow:
                theme.palette.mode === "light"
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                // ml: "-18px",
                px: 0,
                gap: "30px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => history.push("/home")}
              >
                <img
                  src={`${import.meta.env.BASE_URL}/logo.png`}
                  style={logoStyle}
                  alt="logo of sitemark"
                />
                <Typography
                  variant="h6"
                  sx={{ ml: 1, display: { xs: "none", md: "block" } }}
                  color="text.primary"
                  fontWeight="lg"
                  fontFamily="monospace"
                  noWrap
                >
                  Break Point
                </Typography>
              </Box>
              <Box sx={{ display: "flex" }}>
                {menuItems.map((item) => (
                  <MenuItem
                    onClick={item.handleClick}
                    sx={{ py: "6px", px: "12px" }}
                    key={item.title}
                  >
                    <Typography variant="body2" color="text.primary">
                      {item.title}
                    </Typography>
                  </MenuItem>
                ))}
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 0.5,
                alignItems: "center",
              }}
            >
              <ColorSchemeToggle />
              <IconButton>
                <Logout />
              </IconButton>
              <IconButton>
                <People />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default AppAppBar;
