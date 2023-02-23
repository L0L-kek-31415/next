import axios from "axios";

let instance: any = null;
const baseURL = "http://localhost:3000";
if (typeof window == "undefined") {
  instance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
  });
} else {
  const getToken = () =>
    localStorage.getItem("access") ? localStorage.getItem("access") : null;

  const getAuthorizationHeader = () => `Bearer ${getToken()}`;

  instance = axios.create({
    baseURL,
    headers: {
      Authorization: getAuthorizationHeader(),
      "Content-Type": "application/json",
      accept: "application/json",
    },
  });
}
instance.interceptors.response.use(
  // @ts-ignore
  (response) => {
    return response;
  },
  // @ts-ignore
  async function (error) {
    if (typeof error.response == "undefined") {
      alert("Server error");
      return Promise.reject(error);
    }
  }
);

export default instance;
