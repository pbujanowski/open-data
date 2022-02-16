import React from "react";
import { Alert, Snackbar } from "@mui/material";
import { AppSnackbarType } from "./AppSnackbarType";

type AppSnackbarProps = {
  isOpen: boolean;
  message: string | null;
  type: AppSnackbarType;
  onClose: () => void;
};

const AppSnackbar: React.FC<AppSnackbarProps> = ({ isOpen, message, type, onClose }) => {
  return (
    <Snackbar open={isOpen} autoHideDuration={5000} onClose={onClose}>
      <Alert onClose={onClose} severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AppSnackbar;
