const appConfig = () => {
  const port = process.env.PORT || 5000;
  const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:3000";

  return { port, corsOrigin };
};

export { appConfig };
