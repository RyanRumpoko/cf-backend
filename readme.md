.env file req :

PORT=
DB_PASSWORD=
SECRET=
OPENAI_API_KEY=
ASSISTANT_ID=

DDL :

CREATE DATABASE cfactory;
CREATE TABLE users (id SERIAL PRIMARY KEY,username VARCHAR(255),password VARCHAR(255));
CREATE TABLE todo (id SERIAL PRIMARY KEY,title VARCHAR(255),description VARCHAR(255));
