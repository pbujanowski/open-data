const appConfig = () => {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const corsOrigin = import.meta.env.VITE_CORS_ORIGIN || "http://localhost:3000";

  return { apiUrl, corsOrigin };
};

export { appConfig };
