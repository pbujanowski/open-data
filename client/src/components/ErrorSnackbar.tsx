import React from "react";
import { Alert, Snackbar } from "@mui/material";

type ErrorSnackbarProps = {
  isOpen: boolean;
  errorMessage: string | null;
  onClose: () => void;
};

const ErrorSnackbar: React.FC<ErrorSnackbarProps> = ({ isOpen, errorMessage, onClose }) => {
  return (
    <Snackbar open={isOpen} autoHideDuration={5000} onClose={onClose}>
      <Alert onClose={onClose} severity="error" sx={{ width: "100%" }}>
        {errorMessage}
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;
