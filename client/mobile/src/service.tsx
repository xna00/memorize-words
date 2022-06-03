import ax, { Axios } from "axios";
export function fetchJSON(...args: Parameters<typeof fetch>) {
  return fetch(args[0], {
    ...args[1],
    headers: {
      ...args[1]?.headers,
      authorization: "A " + localStorage.token,
    },
  }).then((res) => res.json());
}
export const axios = ax.create();
axios.interceptors.request.use((config) => {
  config.headers = {
    authorization: "A " + localStorage.token,
    ...config.headers,
  };

  return config;
});
