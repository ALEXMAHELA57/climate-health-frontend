const isLocal =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

export const API_BASE = isLocal
  ? "http://127.0.0.1:8000/api/"
  : "https://climate-health-backend-fexw.onrender.com/api/";
