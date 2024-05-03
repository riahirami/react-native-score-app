import type UserResponse from './UserResponse';

/**
 * Defines the User model properties to use in the app
 */
export default interface User {
  email: string;
  firstName: string;
  lastName: string;
}

/**
 * Build User object from ws response. (This will creates a separation between ws response and app code)
 * @param response represents the returned data model from WS
 * @returns - Returns decoded user from response with attributes to use in app code
 */
export const decodeUser = (response: UserResponse): User => {
  return {
    email: response.email,
    firstName: response.first_name,
    lastName: response.last_name,
  };
};

export interface RefreshTokenData {
  data: {
    access_token: string;
    refresh_token: string;
  };
}
