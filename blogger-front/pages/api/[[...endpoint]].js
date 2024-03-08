import { API_BASE_URL, HTTP_STATUS, isDevelopment } from "@/services/constants";
import getEndpointUrl from "@/utils/url";

const DEBUG_ENABLED = false; // Switch this variable whenever you need to debug API Route locally to see logs.

const log = (...args) => {
  // eslint-disable-next-line no-console
  if (isDevelopment && DEBUG_ENABLED) console.log(...args);
};

const handler = async ({ method, query, body, headers }, resToFront) => {
  const url = getEndpointUrl(API_BASE_URL, query);
  log("URL: ", url);

  try {
    switch (method.toUpperCase()) {
      case "PUT":
      case "POST": {
        log("BODY: ", body);
        log("HEADERS: ", headers);
        const resFromBack = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: headers.authorization,
          },
          method,
          mode: "cors",
          body: JSON.stringify(body),
        });
        log("RES: ", resFromBack);

        if (![HTTP_STATUS.ok, HTTP_STATUS.created].includes(resFromBack.status))
          return resToFront.status(resFromBack.status).json({ data: null });

        const { data } = await resFromBack.json();
        log("DATA: ", data);

        return resToFront.status(HTTP_STATUS.ok).json({ data });
      }
      case "DELETE":
      case "GET": {
        const resFromBack = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: headers.authorization,
          },
          method,
        });
        log("RES: ", resFromBack);

        if (resFromBack.status !== HTTP_STATUS.ok)
          return resToFront.status(resFromBack.status).json({ data: null });

        const { data } = await resFromBack.json();
        log("DATA: ", data);

        return resToFront.status(HTTP_STATUS.ok).json({ data });
      }
      default:
        return resToFront
          .status(HTTP_STATUS.methodNotAllowed)
          .json({ data: null });
    }
  } catch (error) {
    log("ERROR: ", error);
    resToFront.status(HTTP_STATUS.internalServerError).json({ data: null });
  }
};

export default handler;
