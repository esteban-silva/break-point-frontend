import { Box, Typography } from "@mui/joy";
import ApiManager from "../../../../api/ApiManager/apiManager";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../context/Auth/useAuth";
import LoadingComponent from "../../../../utils/LoadingComponent";
import { IUserBookings } from "../../../../types/Bookings";
import GridComponent from "../../../../utils/GridComponent";
import { HomeGridData, HomeGridHeader } from "./HomeGridData";

const Home = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<IUserBookings[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    ApiManager.getBookingsByUserId({
      userId: user.id,
    })
      .then((data) => {
        setBookings(data.data as IUserBookings[]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user.id]);

  return isLoading ? (
    <LoadingComponent />
  ) : bookings ? (
    <Box
      component="main"
      className="MainContent"
      sx={{
        px: { xs: 2, md: 16 },
        pt: {
          xs: "calc(12px + var(--Header-height))",
          sm: "calc(12px + var(--Header-height))",
          md: 3,
        },
        pb: { xs: 2, sm: 2, md: 3 },
        flex: 1,
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
        height: "100dvh",
        gap: 1,
      }}
    >
      <Typography level="h1" sx={{ mb: 2 }}>
        My bookings
      </Typography>
      <GridComponent
        headers={HomeGridHeader()}
        gridData={HomeGridData(bookings)}
      />
    </Box>
  ) : (
    <></>
  );
};

export default Home;
