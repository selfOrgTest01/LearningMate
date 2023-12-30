-- Active: 1703034513814@@34.64.245.68@3306@learningmate
-- CREATE TABLE users (
--     user_id INT AUTO_INCREMENT PRIMARY KEY,
--     email VARCHAR(255) NOT NULL UNIQUE,
--     email_code VARCHAR(20),
--     phone_number VARCHAR(50) NOT NULL UNIQUE,
--     password_hash VARCHAR(255) NOT NULL,
--     nickname VARCHAR(40) NOT NULL UNIQUE,
--     signup_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--     profile_name VARCHAR(255),
--     profile_link VARCHAR(255),
-- );
-- ALTER TABLE
--     users
-- ADD
--     UNIQUE (email);
-- ;
-- select @@global.time_zone, @@session.time_zone;
--
SELECT
    *
FROM
    users