const appConfig = () => {
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

  return { apiUrl };
};

export { appConfig };
