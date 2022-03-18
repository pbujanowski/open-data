const exchangeRatesTableType = () => {
  const tableA = "A";
  const tableB = "B";
  const tableC = "C";

  const all = () => [tableA, tableB, tableC];

  return { tableA, tableB, tableC, all };
};

export { exchangeRatesTableType };
