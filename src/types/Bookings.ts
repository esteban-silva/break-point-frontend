export enum BookingStatus {
  PENDING = "pending",
  APPROVED = "approved",
  CANCELLED = "canceled",
}

export enum CourtSurface {
  HARD = "hard",
  CLAY = "clay",
}
export interface IUserBookings {
  id: number;
  date: string;
  status: BookingStatus;
  userId: number;
  courtId: number;
  court: {
    id: number;
    name: string;
    surface: CourtSurface;
  };
}

export interface CourtProps {
  id: number;
  name: string;
  surface: string;
}
