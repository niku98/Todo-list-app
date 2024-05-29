import axios from "axios";

// generate js doc
/**
 * @param {Object} config
 * @param {Object} input
 */
export function createApi(config, input) {
  const api = axios.create(config);
  const keys = Object.keys(input);

  return keys.reduce((result, key) => {
    const resourceCreator = input[key];
    result[key] = (...params) => {
      return resourceCreator(api, ...params);
    };

    return result;
  }, {});
}
