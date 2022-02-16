CREATE TABLE IF NOT EXISTS gold_prices (
    id VARCHAR(36) PRIMARY KEY,
    date DATE,
    price DECIMAL(10, 2)
);