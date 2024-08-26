import { BrowserRouter, Route, Router, Switch } from "react-router-dom";
import { AuthProvider } from "./context/Auth/AuthProvider";
import { SignUp } from "./features/Authentication/presentation/components/SignUp";
import { ProtectedRouteComponent } from "./routes/ProtectedRoutes";
import Home from "./features/Home/presentation/Home";
import { createBrowserHistory } from "history";
import { CssBaseline } from "@mui/joy";
import NavBar from "./utils/NavBar";
import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from "@mui/material/styles";
import { CssVarsProvider as JoyCssVarsProvider } from "@mui/joy/styles";
import Booking from "./features/Booking";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { lazy, Suspense } from "react";
import LoadingComponent from "./utils/LoadingComponent/index.tsx";

const materialTheme = materialExtendTheme();
const LoginComponent = lazy(
  () =>
    import("./features/Authentication/presentation/components/Login/index.tsx")
);

const LazyLogin = () => (
  <Suspense fallback={<LoadingComponent />}>
    <LoginComponent />
  </Suspense>
);

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
        <JoyCssVarsProvider>
          <CssBaseline enableColorScheme />
          {children}
        </JoyCssVarsProvider>
      </MaterialCssVarsProvider>
    </LocalizationProvider>
  );
};

const AuthRoutes = () => {
  const marginTop = 64 + 16 + 20; // 64 = navbar height + margin top narbar + margin
  return (
    <AuthProvider>
      <ProtectedRouteComponent>
        <>
          <NavBar />
          <div
            style={{
              marginTop: `${marginTop}px`,
              paddingLeft: "20px",
              paddingRight: "20px",
            }}
          >
            <Switch>
              <Route path="/bookings/create-booking" component={Booking} />
              <Route component={Home} path={"*"} />
            </Switch>
          </div>
        </>
      </ProtectedRouteComponent>
    </AuthProvider>
  );
};

function App() {
  const history = createBrowserHistory();

  return (
    <Layout>
      <Router history={history}>
        <BrowserRouter basename={`${import.meta.env.BASE_URL}`}>
          <Switch>
            <Route path="/login" component={LazyLogin} />
            <Route path="/signup" component={SignUp} />
            <Route component={AuthRoutes} />
          </Switch>
        </BrowserRouter>
      </Router>
    </Layout>
  );
}

export default App;
