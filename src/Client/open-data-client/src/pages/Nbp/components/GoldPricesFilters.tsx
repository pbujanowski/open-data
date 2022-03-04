import React from "react";

import GoldPricesDates from "./GoldPricesDates";

type GoldPricesFiltersProps = {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
};

const GoldPricesFilters: React.FC<GoldPricesFiltersProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) => {
  return (
    <GoldPricesDates
      startDate={startDate}
      endDate={endDate}
      onStartDateChange={onStartDateChange}
      onEndDateChange={onEndDateChange}
    />
  );
};

export default GoldPricesFilters;
