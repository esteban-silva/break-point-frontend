import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  FormHelperText,
  ColorPaletteProp,
  IconButton,
} from "@mui/joy";
import "./index.css";
import { useHistory } from "react-router-dom";
import ApiManager from "../../../../../../api/ApiManager/apiManager";
import AlertComponent from "../../../../../../utils/AlertsComponent";
import LoadingComponent from "../../../../../../utils/LoadingComponent";
import { useForm } from "react-hook-form";
import IApiResponse from "../../../../../../api/ApiManager/IApiResponse";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "../../../../../../context/Auth/useAuth";
import { IUser } from "../../../../../../types/IUser";

export const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [alert, setAlert] = useState<{
    message: string;
    type: string;
    open: boolean;
  }>({ message: "", type: "", open: false });

  const { setUser, setIsAuthenticated } = useAuth();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<{ email: string; password: string }>({
    mode: "all",
  });

  const onSubmit = (data: { email: string; password: string }) => {
    ApiManager.login(data).then((res: IApiResponse) => {
      if (res.status === 200) {
        setLoading(true);
        setUser(res.data as IUser);
        setIsAuthenticated(true);
        setTimeout(() => {
          history.push("/");
        }, 2500);
      } else {
        setAlert({ message: "Try again later.", type: "danger", open: true });
      }
    });
  };

  return (
    <>
      {loading && <LoadingComponent handleClose={() => setLoading(false)} />}
      {alert.open && (
        <AlertComponent
          type={alert.type as ColorPaletteProp}
          title={alert.message}
          handleClose={() => setAlert({ message: "", type: "", open: false })}
        />
      )}
      <Box
        className="loginFormContainer"
        sx={{
          borderRadius: "sm",
          "& form": {
            display: "flex",
            flexDirection: "column",
            gap: 3,
          },
          [`& .MuiFormLabel-asterisk`]: {
            visibility: "hidden",
          },
        }}
      >
        <Stack gap={5} sx={{ mt: 0 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl error={!!errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                {...register("email", {
                  required: { value: true, message: "Email is required" },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                placeholder="Enter your email"
              />
              {errors.email && (
                <FormHelperText>{errors.email.message}</FormHelperText>
              )}
            </FormControl>

            <FormControl error={!!errors.password}>
              <FormLabel>Password</FormLabel>
              <Input
                {...register("password", {
                  required: { value: true, message: "Must enter a password" },
                })}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                endDecorator={
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                }
              />

              {errors.password && (
                <FormHelperText>{errors.password.message}</FormHelperText>
              )}
            </FormControl>

            <Stack gap={4} sx={{ mt: 2 }}>
              <Button type="submit" fullWidth loading={loading}>
                Login
              </Button>
              <Button fullWidth variant="outlined" onClick={() => history.push("/signup")}>
                Create Account
              </Button>
            </Stack>
          </form>
        </Stack>
      </Box>
    </>
  );
};
