CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE user_favorites (
  user_id SERIAL NOT NULL,
  quote_id VARCHAR(255) NOT NULL,
  PRIMARY KEY (user_id, quote_id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE web_sessions (
  user_id SERIAL NOT NULL,
  token VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, token),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
