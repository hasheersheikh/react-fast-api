/**
 * generate query string
 * @param {object} obj
 * @returns {string}
 */
export const buildURLQuery = (obj) => {
  if (!obj) return null;
  return Object.entries(obj)
    .filter((el) => el[1] != null)
    .map((pair) => pair.map(encodeURIComponent).join("="))
    .join("&");
};

/**
 * URL generator
 * @param {string} baseUrl
 * @param {object} data
 * @param {object} config={}
 * @returns {string} returns generated URL string
 */

export const generateDataUrl = (baseUrl, data = {}) => {
  const queryString = buildURLQuery({ ...data });
  const url: string = `${baseUrl}?${queryString}`;

  return url;
};
