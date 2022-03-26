const authConfig = () => {
  const authority = import.meta.env.VITE_AUTHORITY?.toString() || "https://localhost:5001";

  const clientId = import.meta.env.VITE_CLIENT_ID?.toString() || "open-data-client";

  const responseType = import.meta.env.VITE_RESPONSE_TYPE?.toString() || "code";

  const scope = import.meta.env.VITE_SCOPE?.toString() || "openid profile email open-data-api";

  return { authority, clientId, responseType, scope };
};

export { authConfig };
