import { Box, IconButton, Typography } from "@mui/joy";

import "./index.css";
import ColorSchemeToggle from "../../../../../utils/ColorSchemeToggle";
import { BadgeRounded } from "@mui/icons-material";

export const Header = () => {
  return (
    <Box
      component="header"
      sx={{
        py: 3,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ gap: 2, display: "flex", alignItems: "center" }}>
        <IconButton variant="soft" color="primary" size="sm">
          <BadgeRounded />
        </IconButton>
        <Typography level="title-lg">Break Point</Typography>
      </Box>
      <ColorSchemeToggle />
    </Box>
  );
};
