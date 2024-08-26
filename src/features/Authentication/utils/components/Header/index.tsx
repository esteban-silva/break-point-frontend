import { Box, Typography } from "@mui/joy";

import "./index.css";
import ColorSchemeToggle from "../../../../../utils/ColorSchemeToggle";

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
          <img src="logo.png" alt="logo" width={20} height={20}/>
        <Typography level="title-lg">Break Point</Typography>
      </Box>
      <ColorSchemeToggle />
    </Box>
  );
};
