import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import GoldPrices from "./GoldPrices";
import ExchangeRates from "./ExchangeRates";

const NationalBank: React.FC = () => {
  const [t] = useTranslation();
  const [selectedTab, setSelectedTab] = useState<string>("1");

  const handleTabChange = (tab: string) => setSelectedTab(tab);

  return (
    <TabContext value={selectedTab}>
      <TabList onChange={(_event, tab) => handleTabChange(tab)}>
        <Tab label={t("nationalBank.tabs.goldPrices")} value="1" />
        <Tab label={t("nationalBank.tabs.exchangeRates")} value="2" />
      </TabList>
      <TabPanel value="1">
        <GoldPrices />
      </TabPanel>
      <TabPanel value="2">
        <ExchangeRates />
      </TabPanel>
    </TabContext>
  );
};
export default NationalBank;
