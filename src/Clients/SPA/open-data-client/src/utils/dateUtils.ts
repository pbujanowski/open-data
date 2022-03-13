import { addDays, format } from "date-fns";
import { appConstants } from "./appConstants";

const dateUtils = () => {
  const toDateString = (date: string | number | Date | undefined): string => {
    if (!date) {
      return "";
    }
    const dateObject = new Date(date);
    return format(dateObject, appConstants().getDateFormat());
  };

  const addDaysFromNow = (days: number): Date => addDays(Date.now(), days);

  return { toDateString, addDaysFromNow };
};

export { dateUtils };
