import { CircularProgress, Modal } from "@mui/joy";

const LoadingComponent = ({ handleClose }: { handleClose: () => void }) => {
  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={true}
      onClose={handleClose}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress color="warning" size="lg" value={35} variant="soft" />
    </Modal>
  );
};

export default LoadingComponent;
