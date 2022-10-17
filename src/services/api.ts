import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000",
});

api.interceptors.request.use(
  async (config) => {
    const at = localStorage.getItem("@KTP:accessToken");
    config.headers = {
      Authorization: `Bearer ${at}`,
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    const rt =
      sessionStorage.getItem("refreshToken") ||
      localStorage.getItem("refreshToken");
    if (
      error.response.data.class === "TokenExpiredError" &&
      !originalRequest._retry &&
      rt
    ) {
      originalRequest._retry = true;
      const { accessToken, refreshToken } = await refreshTokens(rt);
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      localStorage.setItem("accessToken", accessToken);
      return api(originalRequest);
    }
    var apiError = error;
    if (error.response?.data) {
      apiError = {
        status: error.response.status,
        ...error.response.data,
      };
    }
    return Promise.reject(apiError);
  }
);

async function refreshTokens(refreshToken: string) {
  const { data: user } = await axios.post(
    `http://localhost:4000/auth/refresh-tokens`,
    undefined,
    {
      headers: { Authorization: `Bearer ${refreshToken}` },
    }
  );
  return { accessToken: user.accessToken, refreshToken: user.refreshToken };
}

export default api;
