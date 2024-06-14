import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import ReportIcon from "@mui/icons-material/Report";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Box from "@mui/joy/Box";
import Alert from "@mui/joy/Alert";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import { ColorPaletteProp } from "@mui/joy/styles";

const AlertComponent = ({
  type,
  title,
  handleClose,
}: {
  type: ColorPaletteProp;
  title: string;
  handleClose: () => void;
}) => {
  const getIcon = () => {
    if (type === "success") {
      return <CheckCircleIcon />;
    } else if (title === "warning") {
      return <WarningIcon />;
    } else if (title === "danger") {
      return <ReportIcon />;
    } else if (title === "neutral") {
      return <InfoIcon />;
    }
  };

  return (
    <Box
      sx={{ display: "flex", gap: 2, width: "100%", flexDirection: "column" }}
    >
      <Alert
        key={title}
        sx={{ alignItems: "flex-start" }}
        startDecorator={getIcon()}
        variant="soft"
        color={type}
        endDecorator={
          <IconButton variant="soft" color={type} onClick={handleClose}>
            <CloseRoundedIcon />
          </IconButton>
        }
      >
        <div>
          <div>{type === "success" ? "Success" : "Error"}</div>
          <Typography level="body-sm" color={type}>
            {title}
          </Typography>
        </div>
      </Alert>
    </Box>
  );
};

export default AlertComponent;
