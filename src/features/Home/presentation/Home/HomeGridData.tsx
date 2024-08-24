import { Chip, Typography } from "@mui/joy";
import { BookingStatus, IUserBookings } from "../../../../types/Bookings";
import {
  AutorenewRounded,
  BlockRounded,
  CheckRounded,
} from "@mui/icons-material";
import moment from "moment";

export const HomeGridHeader = () => {
  return (
    <tr>
      <th
        style={{
          padding: "12px 6px",
          textAlign: "center",
          alignContent: "center",
        }}
      >
        Date
      </th>
      <th
        style={{
          padding: "12px 6px",
          textAlign: "center",
          alignContent: "center",
        }}
      >
        Status
      </th>
      <th
        style={{
          padding: "12px 6px",
          textAlign: "center",
          alignContent: "center",
        }}
      >
        Court
      </th>
      <th
        style={{
          padding: "12px 6px",
          textAlign: "center",
          alignContent: "center",
        }}
      >
        Surface
      </th>
    </tr>
  );
};

export const HomeGridData = (data: IUserBookings[]) => {
  return (
    <>
      {data.map((item) => (
        <tr
          key={item.id}
          style={{ textAlign: "center", alignContent: "center" }}
        >
          <td style={{ padding: "12px 6px" }}>
            <Typography level="body-xs">
              {moment(item.date).format("DD/MM/YYYY HH:mm")}
            </Typography>
          </td>
          <td style={{ padding: "12px 6px" }}>
            <Chip
              variant="soft"
              size="sm"
              startDecorator={
                item.status === BookingStatus.APPROVED ? (
                  <CheckRounded />
                ) : item.status === BookingStatus.CANCELLED ? (
                  <BlockRounded />
                ) : (
                  <AutorenewRounded />
                )
              }
              color={
                item.status === BookingStatus.APPROVED
                  ? "success"
                  : item.status === BookingStatus.CANCELLED
                  ? "danger"
                  : "neutral"
              }
            >
              {item.status}
            </Chip>
          </td>
          <td style={{ padding: "12px 6px" }}>
            <Typography level="body-xs">{item.court.name}</Typography>
          </td>
          <td style={{ padding: "12px 6px" }}>
            <img
              src={`public/${item.court.surface}_surface.png`}
              alt="clay court"
              width="120px"
              height="60px"
            />
          </td>
        </tr>
      ))}
    </>
  );
};
