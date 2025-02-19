-- Create Users
-- CREATE USER user1 WITH PASSWORD 'password1' CREATEDB;
-- CREATE USER user2 WITH PASSWORD 'password2' CREATEDB;

-- Create Databases
-- CREATE DATABASE db1 OWNER user1;
-- CREATE DATABASE db2 OWNER user2;

CREATE DATABASE db1
-- Connect to db1 and create tables
\connect db1;

-- Create Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(150) UNIQUE,
    password VARCHAR(128),
    mfa_enabled BOOLEAN DEFAULT FALSE,
    mfa_secret VARCHAR(16),
    provider_id VARCHAR(255) UNIQUE,
    access_token TEXT,
    refresh_token TEXT,
    token_expires_at TIMESTAMP,
    email VARCHAR(150) UNIQUE NOT NULL,
    is_oauth_user BOOLEAN DEFAULT FALSE,
    avatar_url VARCHAR(1024),
    display_name VARCHAR(25) UNIQUE,
    avatar TEXT,
    bio VARCHAR(1000) DEFAULT 'Hello Everyone, Nice to meet you guy!',
    win INTEGER DEFAULT 0,
    loss INTEGER DEFAULT 0,
    draw INTEGER DEFAULT 0,
    total_match INTEGER DEFAULT 0,
    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_online BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE matches (
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