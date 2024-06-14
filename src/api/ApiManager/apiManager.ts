import IUser from "../../features/Authentication/interface/IUser";
import ApiMethods from "./apiMethods";
import ENDPOINTS from "./endpoints";
import IApiResponse from "./IApiResponse";

export default class ApiManager {
  static async signup(user: IUser): Promise<IApiResponse> {
    return ApiMethods.post(ENDPOINTS.SIGNUP, user);
  }
}
