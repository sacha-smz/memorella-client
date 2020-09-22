import axios from "axios";

const http = {
  fetch: async (url, options) => {
    options.url = process.env.REACT_APP_API_URL + url;
    options.method = options.method || "GET";

    try {
      const response = await axios(options);
      return response.data;
    } catch (err) {
      if (err.response) throw err.response.data;
      throw err;
    }
  },

  get: (url, options) => {
    return http.fetch(url, options);
  },

  post: (url, options) => {
    options.method = "POST";
    return http.fetch(url, options);
  },

  delete: (url, options) => {
    options.method = "DELETE";
    return http.fetch(url, options);
  }
};

export default http;
