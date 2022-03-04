import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import GoldPricesChart, { GoldPricesChartProps } from "./GoldPricesChart";
import GoldPricesTable, { GoldPricesTableProps } from "./GoldPricesTable";

type GoldPricesTabsProps = {
  chartProps: GoldPricesChartProps;
  tableProps: GoldPricesTableProps;
};

const GoldPricesTabs: React.FC<GoldPricesTabsProps> = ({ chartProps, tableProps }) => {
  const [t] = useTranslation();
  const [selectedTab, setSelectedTab] = useState<string>("1");

  const handleTabChange = (tab: string) => setSelectedTab(tab);

  return (
    <Box>
      <TabContext value={selectedTab}>
        <TabList onChange={(_event, tab) => handleTabChange(tab)}>
          <Tab label={t("common.table")} value="1" />
          <Tab label={t("common.chart")} value="2" />
        </TabList>
        <TabPanel value="1">
          <GoldPricesTable {...tableProps} />
        </TabPanel>
        <TabPanel value="2">
          <GoldPricesChart {...chartProps} />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default GoldPricesTabs;
