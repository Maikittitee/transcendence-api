-- -- Create Users
-- -- CREATE USER user1 WITH PASSWORD 'password1' CREATEDB;
-- -- CREATE USER user2 WITH PASSWORD 'password2' CREATEDB;

-- -- Create Databases
-- -- CREATE DATABASE db1 OWNER user1;
-- -- CREATE DATABASE db2 OWNER user2;

-- Ensure the database does not already exist before creating it
DO $$ 
BEGIN
   IF NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'db1') THEN
      CREATE DATABASE db1;
   END IF;
END $$;

-- Connect to db1
\connect db1;

-- Ensure the table does not already exist before creating it
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(128) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS matches (
    id SERIAL PRIMARY KEY,
    player1_id INT NOT NULL,
    player2_id INT NOT NULL,
    player1_score INT DEFAULT 0,
    player2_score INT DEFAULT 0,
    status VARCHAR(20) DEFAULT 'PENDING',
    winner_id INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (player1_id) REFERENCES users(id),
    FOREIGN KEY (player2_id) REFERENCES users(id),
    FOREIGN KEY (winner_id) REFERENCES users(id)
);
