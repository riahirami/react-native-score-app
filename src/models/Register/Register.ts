import type RegisterResponse from './RegisterResponse';
import type User from '_models/User/User';

import {decodeUser} from '_models/User/User';

/**
 * Defines the Register model properties to use in the app
 */
export default interface Register {
  user: User;
  token: string;
}

/**
 * Build Register object from ws response. (This will creates a separation between ws response and app code)
 * @param response represents the returned data model from WS
 * @returns - Returns decoded register from response with attributes to use in app code
 */
export const decodeRegister = (response: RegisterResponse): Register => {
  return {
    user: decodeUser(response.user),
    token: response.token,
  };
};

export type AccountInfoPayloadType = {
  last_name: string;
  first_name: string;
  email: string;
  provider: number;
  phone: string;
  token: string;
};
