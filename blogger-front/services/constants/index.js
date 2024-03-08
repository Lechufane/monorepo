export const CLIENT_BASE_ROUTE =
  typeof window !== "undefined" ? window.location.origin : "";

export const ENVIRONMENT = process.env.NODE_ENV;
export const isDevelopment = ENVIRONMENT === "development";
export const isProduction = ENVIRONMENT === "production";

export const basePath = process.env.basePath ?? "";

export const APP_KEYNAME = "blogger";
export const APP_NAME = "Blogger";

// eslint-disable-next-line no-unused-vars
const LOCAL_URL = "http://localhost:8080";

// WARNING: This BASE_PATH variable is only available on the server side.
// All these url values on the client side are not reliable and may differ from the server side.
export const BASE_URL = isProduction
  ? process.env.BASE_PATH ?? "http://localhost:8080" // DON'T CHANGE THIS LINE.
  : LOCAL_URL; // You can change this line during development.

export const API_BASE_URL = BASE_URL + "/api/blogger-middlend";

export const HTTP_STATUS = {
  found: 302,
  ok: 200,
  created: 201,
  badRequest: 400,
  methodNotAllowed: 405,
  conflict: 409,
  internalServerError: 500,
};
