/**
 * Takes API route query and builds source endpoint url.
 * @param {object} query - API Route Request Query
 * @returns source API URL
 */
const getEndpointUrl = (apiBase, { endpoint = [], ...params }) => {
  let url = [apiBase, ...endpoint].join('/');

  if (Object.keys(params).length)
    url +=
      '?' +
      Object.keys(params)
        .map((key) => `${key}=${params[key]}`)
        .join('&');

  return url;
};

export default getEndpointUrl;
