import {
  Box,
  IconButton,
  IconButtonProps,
  Typography,
  useColorScheme,
} from "@mui/joy";
import {
  DarkModeRounded,
  BadgeRounded,
  LightModeRounded,
} from "@mui/icons-material";
import "./index.css";

function ColorSchemeToggle(props: IconButtonProps) {
  const { onClick, ...rest } = props;
  const { mode, setMode } = useColorScheme();
  return (
    <IconButton
      aria-label="toggle light/dark mode"
      size="sm"
      variant="outlined"
      //   disabled={!mounted}
      onClick={(event) => {
        setMode(mode === "light" ? "dark" : "light");
        onClick?.(event);
      }}
      {...rest}
    >
      {mode === "light" ? <DarkModeRounded /> : <LightModeRounded />}
    </IconButton>
  );
}

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
