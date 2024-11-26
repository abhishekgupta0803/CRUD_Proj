CREATE TABLE class(
    id INT PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    email VARCHAR(30) UNIQUE,
    password VARCHAR(30) NOT NULL
);