/* User table */
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(30) NOT NULL,
    balance DECIMAL(10, 2) DEFAULT 0.00,
);

/* Transaction table */
CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    payer_id INTEGER NOT NULL,
    payee_id INTEGER NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (payer_id) REFERENCES users(id),
    FOREIGN KEY (payee_id) REFERENCES users(id)
);

/* Sample data */
INSERT INTO users (name, email, password, balance) VALUES
('User1', 'user1@gmail.com', 'user1', 1000.00);
INSERT INTO users (name, email, password, balance) VALUES
('User2', 'user1@gmail.com', 'user1', 1000.00);
INSERT INTO users (name, email, password, balance) VALUES
('User3', 'user1@gmail.com', 'user1', 1000.00);
INSERT INTO transactions (payer_id, payee_id, amount) VALUES
(1, 2, 100.00);
INSERT INTO transactions (payer_id, payee_id, amount) VALUES
(2, 3, 200.00);
INSERT INTO transactions (payer_id, payee_id, amount) VALUES
(3, 1, 300.00);

/* Test cases */
/* Test case 1: Add a new user */
INSERT INTO users (name, email, password, balance) VALUES
('User4', 'user4@gmail.com', 'user4', 1000.00);
/* Test case 2: Get user1's balance */
SELECT balance
FROM users
WHERE name = 'User1';
/* Test case 3: Get all transactions involving user2 */
SELECT * 
FROM transactions 
WHERE 
    payer_id = 2 OR 
    payee_id = 2;
/* Test case 4: Change password for user3 */
UPDATE users
SET password = 'newpassword'
WHERE name = 'User3';
/* Test case 5: Delete user4 */
DELETE FROM users
WHERE name = 'User4';
/* Test case 6: Decrease user1's balance by 100 */
UPDATE users
SET balance = balance - 100
WHERE name = 'User1';

