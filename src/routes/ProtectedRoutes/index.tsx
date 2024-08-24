import { useAuth } from "../../context/Auth/useAuth";
import LoadingComponent from "../../utils/LoadingComponent";

export const ProtectedRouteComponent = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const { user, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    if (user) {
      return <>{children}</>;
    } else {
      return <LoadingComponent />;
    }
  }
};
