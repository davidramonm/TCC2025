CREATE TABLE users (
    user_id UUID PRIMARY KEY,
    f_name VARCHAR(45) NOT NULL,
    l_name VARCHAR(45) NOT NULL,
    email  VARCHAR(45) NOT NULL,
    password  VARCHAR(120) NOT NULL,
    role VARCHAR(15) NOT NULL
);



