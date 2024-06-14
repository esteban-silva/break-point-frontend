import { Box } from "@mui/joy";
import { CssBaseline, CssVarsProvider, GlobalStyles } from "@mui/joy";
import "./index.css";

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
        <CssBaseline />
        <GlobalStyles
          styles={{
            ":root": {
              "--Form-maxWidth": "800px",
              "--Transition-duration": "0.4s", // set to `none` to disable transition
            },
          }}
        />
        <Box
          className="container"
          sx={(theme) => ({
            width: { xs: "100%", md: "50vw" },
            [theme.getColorSchemeSelector("dark")]: {
              backgroundColor: "rgba(19 19 24 / 0.4)",
            },
          })}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100dvh",
              width: "100%",
              px: 2,
            }}
          >
            {children}
          </Box>
        </Box>
        <Box
          sx={(theme) => ({
            height: "100%",
            position: "fixed",
            right: 0,
            top: 0,
            bottom: 0,
            left: { xs: 0, md: "50vw" },
            transition:
              "background-image var(--Transition-duration), left var(--Transition-duration) !important",
            transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
            backgroundColor: "background.level1",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundImage: "url(../../../../../../bg-img-light-mode.png)",
            [theme.getColorSchemeSelector("dark")]: {
              backgroundImage: "url(../../../../../../bg-img-dark-mode-2.png)",
            },
          })}
        />
      </CssVarsProvider>
    </>
  );
};
