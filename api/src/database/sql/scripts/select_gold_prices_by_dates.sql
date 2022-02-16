SELECT
    id,
    date,
    price
FROM
    gold_prices
WHERE
    date BETWEEN ?
    AND ?;