import React from "react";
import { useTheme } from "@mui/material";
import { Bar, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { GoldPriceDto } from "dtos";
import { dateUtils } from "utils";
import { NoData } from "components";

export type GoldPricesChartProps = {
  goldPrices: GoldPriceDto[] | null;
};

const GoldPricesChart: React.FC<GoldPricesChartProps> = ({ goldPrices }) => {
  const theme = useTheme();

  const getNoDataDetails = () => <NoData />;

  const getDataChart = () => (
    <ResponsiveContainer width="100%" height={250}>
      <ComposedChart
        width={500}
        height={300}
        data={goldPrices?.map((goldPrice) => {
          return {
            date: dateUtils().toDateString(goldPrice.date),
            price: goldPrice.price,
          };
        })}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip contentStyle={{ background: theme.palette.background.default }} isAnimationActive={false} />
        <Bar dataKey="price" barSize={40} fill={theme.palette.primary.main} />
        <Line type="monotone" dataKey="price" stroke={theme.palette.secondary.main} />
      </ComposedChart>
    </ResponsiveContainer>
  );

  return goldPrices && goldPrices.length > 0 ? getDataChart() : getNoDataDetails();
};

export default GoldPricesChart;
