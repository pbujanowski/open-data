import { SerializedError } from "@reduxjs/toolkit";

export interface InitialState {
  isLoading?: boolean;
  isError?: boolean;
  error?: SerializedError;
}
