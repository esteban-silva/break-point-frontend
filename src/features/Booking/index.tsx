import {
  Box,
  Typography,
  Button,
  FormControl,
  FormLabel,
  Select,
  Option,
} from "@mui/joy";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import ApiManager from "../../api/ApiManager/apiManager";
import { useState } from "react";
import dayjs from "dayjs";
import { useAuth } from "../../context/Auth/useAuth";
import { useHistory } from "react-router";
import GridComponent from "../../utils/GridComponent";
import { BookingGridData } from "./BookingGrid";
import { CourtProps, CourtSurface } from "../../types/Bookings";
import "./index.css";

const Booking = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [availableCourt, setAvailableCourt] = useState<
    CourtProps[] | undefined
  >(undefined);
  const [surface, setSurface] = useState<CourtSurface | "any">("any");
  const auth = useAuth();
  const history = useHistory();
  const handleDate = (value: Date | undefined) => {
    if (value) setDate(value);
  };

  const createDate = (dateToParse: Date) => {
    return dayjs(dateToParse).format("YYYY-MM-DD HH:mm");
  };

  const handleSearch = () => {
    if (date) {
      ApiManager.getAvailableBookingByDate(createDate(date), surface).then(
        (data) => {
          if (data.status === 200) {
            if (data.data as unknown as CourtProps[])
              setAvailableCourt(data.data as unknown as CourtProps[]);
          } else {
            if (data.status === 400) {
              setAvailableCourt(undefined);
            }
          }
        }
      );
    }
  };

  const handleBooking = (item: CourtProps) => {
    ApiManager.createBooking({
      courtId: item.id,
      date: date ? createDate(date) : new Date().toISOString(),
      status: "approved",
      userId: auth.user.id,
    }).then((data) => {
      if (data.status === 200) {
        history.push("/home");
      } else {
        if (data.status === 400) {
          console.log("error booking", data);
        }
      }
    });
  };

  const handleChange = (
    _event: React.SyntheticEvent | null,
    newValue: string | null
  ) => {
    setSurface(newValue as CourtSurface);
  };

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100%",
        padding: 10,
        alignContent: "center",
        gap: 50,
      }}
    >
      <Typography level="h1">Make a Booking!</Typography>
      <Box
        sx={{
          gap: 15,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <FormControl size="md">
          <FormLabel>Status</FormLabel>
          <Select
            size="lg"
            slotProps={{ button: { sx: { whiteSpace: "nowrap" } } }}
            value={surface}
            onChange={handleChange}
            defaultValue="any"
          >
            <Option value="any">Any</Option>
            <Option value="hard">Hard</Option>
            <Option value="clay">Clay</Option>
          </Select>
        </FormControl>
        <FormControl size="md">
          <FormLabel>Date and Time</FormLabel>
          <DateTimePicker
            className="date-time-picker"
            sx={{ height: "100%" }}
            views={["day", "hours"]}
            onChange={(value) => handleDate(value?.toDate())}
            format="DD/MM/YYYY HH:mm"
            ampm={false}
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: null,
              seconds: null,
            }}
            minDateTime={dayjs(new Date())}
          />
        </FormControl>
        <Button
          variant="soft"
          color="neutral"
          onClick={() => handleSearch()}
          sx={{ alignSelf: "end" }}
        >
          Search
        </Button>
      </Box>

      <Box sx={{ paddingTop: "30px" }}>
        {availableCourt && availableCourt?.length > 0 ? (
          <GridComponent
            gridData={BookingGridData(availableCourt, handleBooking)}
            withBorder={false}
          />
        ) : (
          <>Not available courts for date {date?.toLocaleDateString()}</>
        )}
      </Box>
    </Box>
  );
};
export default Booking;
