import {IUserForm } from "../../types/IUser";
import ApiMethods from "./apiMethods";
import ENDPOINTS from "./endpoints";
import IApiResponse from "./IApiResponse";

export default class ApiManager {
  static async signup(user: IUserForm): Promise<IApiResponse> {
    return ApiMethods.post(ENDPOINTS.SIGNUP, user);
  }

  static async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<IApiResponse> {
    return ApiMethods.post(ENDPOINTS.LOGIN, { email, password });
  }

  static async getCurrentSession(): Promise<IApiResponse> {
    return ApiMethods.get(ENDPOINTS.CURRENT_USER);
  }

  static async getBookingsByUserId({
    userId,
  }: {
    userId: number;
  }): Promise<IApiResponse> {
    return ApiMethods.get(`${ENDPOINTS.ALL_BOOKINGS_BY_USER}/${userId}`);
  }

  static async getAvailableBookingByDate(
    date: string,
    surface: string
  ): Promise<IApiResponse> {
    return ApiMethods.get(
      `${ENDPOINTS.AVAILABLE_BOOKING_BY_DATE}/${date}/${surface}`
    );
  }

  static async createBooking(props: {
    userId: number;
    date: string;
    courtId: number;
    status: string;
  }): Promise<IApiResponse> {
    return ApiMethods.post(ENDPOINTS.CREATE_BOOKING, props);
  }
}
