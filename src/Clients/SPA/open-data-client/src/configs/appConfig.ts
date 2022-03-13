const appConfig = () => {
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const corsOrigin = process.env.REACT_APP_CORS_ORIGIN || "http://localhost:3000";

  return { apiUrl, corsOrigin };
};

export { appConfig };
