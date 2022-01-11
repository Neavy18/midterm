-- Drop and recreate Users table (Example)
DROP TABLE IF EXISTS to_do_lists CASCADE;

CREATE TABLE to_do_lists (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE
);
