import { API_BASE_URL, basePath, HTTP_STATUS } from "@/services/constants";

/**
 * Estandarized interface for requests.
 * When invoked on the client side, it will fetch to API Routes (Next.Js Middlend).
 * When invoked on the server side, it will fetch directly to `API_BASE_URL` (backend).
 * @param {string} url endpoint url.
 * @param {object} params optional params for the fetch request.
 * @param {*} defaultReturn optional default return value in case of unhandled error.
 * @returns an object containing two properties: ok and data.
 * ok is a boolean indicating if the request was successful.
 * data contains the data returned from the request or
 * in case of error it contains the default data or error description.
 */
const request = async (url, params = {}, defaultReturn = null) => {
  try {
    params.headers = {
      "Content-Type": "application/json",
      Authorization: global.localStorage?.getItem("sessionToken"), // localStorage and user session are only available on the client side.
      ...(params.headers || {}),
    };
    const isServerSide = typeof window === "undefined"; // True when server side rendering.

    const res = await fetch(
      isServerSide
        ? `${API_BASE_URL}${url}` // Backend url.
        : `${basePath}/api${url}`, // API Route url.
      params
    );

    const { data } = await res.json();

    if (res.status !== HTTP_STATUS.ok)
      return { ok: false, data, status: res.status };
    return { ok: true, data, status: HTTP_STATUS.ok };
  } catch {
    return {
      ok: false,
      data: defaultReturn,
      status: HTTP_STATUS.internalServerError,
    };
  }
};

export default request;
