import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  FormHelperText,
  ColorPaletteProp,
} from "@mui/joy";
import "./index.css";
import ApiManager from "../../../../../../../api/ApiManager/apiManager";
import IUser from "../../../../../interface/IUser";
import { useState } from "react";
import IApiResponse from "../../../../../../../api/ApiManager/IApiResponse";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AlertComponent from "../../../../../../../utils/AlertsComponent";
import LoadingComponent from "../../../../../../../utils/LoadingComponent";

export const SingUpForm = () => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{
    message: string;
    type: string;
    open: boolean;
  }>({ message: "", type: "", open: false });

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<IUser>({
    mode: "all",
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      ci: "",
      phone: "",
    },
  });

  const history = useNavigate();

  const onSubmit = (data: IUser) => {
    ApiManager.signup(data as IUser).then((res: IApiResponse) => {
      if (res.status === 201) {
        setAlert({ message: res.message, type: "success", open: true });
        setLoading(true);
        setTimeout(() => {
          history("/login");
        }, 2500);
      } else {
        setAlert({ message: res.message, type: "danger", open: true });
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
        className="signUpFormContainer"
        sx={{
          borderRadius: "sm",
          "& form": {
            display: "flex",
            flexDirection: "column",
            gap: 2,
          },
          [`& .MuiFormLabel-asterisk`]: {
            visibility: "hidden",
          },
        }}
      >
        <Stack gap={5} sx={{ mt: 2 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl error={!!errors.name}>
              <FormLabel>Name</FormLabel>
              <Input
                {...register("name", {
                  required: { value: true, message: "Name is required" },
                })}
                placeholder="Enter your name"
              />
              {errors.name && (
                <FormHelperText>{errors.name.message}</FormHelperText>
              )}
            </FormControl>

            <FormControl error={!!errors.lastName}>
              <FormLabel>Last Name</FormLabel>
              <Input
                {...register("lastName", {
                  required: { value: true, message: "Last name is required" },
                })}
                placeholder="Enter your last name"
              />
              {errors.lastName && (
                <FormHelperText>{errors.lastName.message}</FormHelperText>
              )}
            </FormControl>

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

            <FormControl error={!!errors.ci}>
              <FormLabel>CI</FormLabel>
              <Input
                {...register("ci", {
                  required: { value: true, message: "CI is required" },
                  pattern: {
                    value: /^[1-9][.]?\d{3}[.]?\d{3}[.\-/_]?[1-9]$/,
                    message: "Invalid CI",
                  },
                })}
                placeholder="Enter your CI"
              />
              {errors.ci && (
                <FormHelperText>{errors.ci.message}</FormHelperText>
              )}
            </FormControl>

            <FormControl>
              <FormLabel>Phone</FormLabel>
              <Input
                {...register("phone", {
                  required: false,
                })}
                placeholder="Enter your Phone"
              />
            </FormControl>
            <FormControl error={!!errors.password}>
              <FormLabel>Password</FormLabel>
              <Input
                {...register("password", {
                  required: { value: true, message: "Password is required" },
                  minLength: {
                    value: 5,
                    message: "Password must be at least 5 characters",
                  },
                })}
                type="password"
              />
              {errors.password && (
                <FormHelperText>{errors.password.message}</FormHelperText>
              )}
            </FormControl>

            <FormControl error={!!errors.confirmPassword}>
              <FormLabel>Repeat Password</FormLabel>
              <Input
                {...register("confirmPassword", {
                  validate: (value) => {
                    if (watch("password") != value) {
                      return "Your passwords do no match";
                    }
                  },
                })}
                type="password"
              />
              {errors.confirmPassword && (
                <FormHelperText>
                  {errors.confirmPassword.message}
                </FormHelperText>
              )}
            </FormControl>

            <Stack gap={4} sx={{ mt: 2 }}>
              <Button type="submit" fullWidth loading={loading}>
                Sign in
              </Button>
            </Stack>
          </form>
        </Stack>
      </Box>
    </>
  );
};
