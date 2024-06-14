import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { SignUp } from "../presentation/components/SignUp";
import { LogIn } from "../presentation/components/Login";

export const AuthenticationRoutes = () => {
  const authRoutes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<LogIn />} />
      </>
    )
  );

  return <RouterProvider router={authRoutes} />;
};
