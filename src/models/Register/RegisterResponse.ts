import type UserResponse from '_models/User/UserResponse';

/**
 * Defines the Register model properties to use in the app
 */
export default interface RegisterResponse {
  user: UserResponse;
  token: string;
}
