/**
 * Defines User response (From WS)
 * This reponse will be decoded to add separation between app and WS responses
 */
export default interface UserResponse {
  first_name: string;
  last_name: string;
  email: string;
}
