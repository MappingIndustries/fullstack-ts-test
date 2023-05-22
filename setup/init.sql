CREATE TABLE IF NOT EXISTS user_favorites (
  user_id VARCHAR(255) NOT NULL,
  quote_id VARCHAR(255) NOT NULL,
  PRIMARY KEY (user_id, quote_id)
);
