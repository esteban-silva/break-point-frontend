import { Button, Typography } from "@mui/joy";
import { CourtProps } from "../../types/Bookings";

export const BookingGridHeader = () => {
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

export const BookingGridData = (
  data: CourtProps[],
  handleBooking: (item: CourtProps) => void
) => {
  return (
    <>
      {data.map((item) => (
        <tr
          key={item.id}
          style={{ textAlign: "center", alignContent: "center" }}
        >
          <td style={{ padding: "12px 6px" }}>
            <Typography level="body-xs">{item.name}</Typography>
          </td>
          <td style={{ padding: "12px 6px" }}>
            <img
              src={`${item.surface}_surface.png`}
              alt="clay court"
              width="120px"
              height="60px"
            />
          </td>
          <td style={{ padding: "12px 6px" }}>
            <Button
              variant="soft"
              color="primary"
              key={item.name}
              onClick={() => handleBooking(item)}
            >
              Book
            </Button>
          </td>
        </tr>
      ))}
    </>
  );
};
