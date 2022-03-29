import { addDays, format } from "date-fns";
import { appConstants } from "./appConstants";

const dateUtils = () => {
  const toDateString = (date: string | number | Date | null | undefined, throwError = true): string => {
    try {
      if (!date) {
        return "";
      }
      const dateObject = new Date(date);
      return format(dateObject, appConstants().getDateFormat());
    } catch (error) {
      if (throwError) {
        throw error;
      }
      return "";
    }
  };

  const addDaysFromNow = (days: number): Date => addDays(Date.now(), days);

  return { toDateString, addDaysFromNow };
};

export { dateUtils };
