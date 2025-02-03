# React Nest-js project

A full-stack application featuring a React/Vite client and a NestJS/MongoDB server. This project uses JWT authentication with httpOnly cookies, Docker for local MongoDB, and a variety of modern libraries for state management and forms.
# Overview

  

This repository is split into two main parts:

  

- **Client**: A React application using Vite.

- **Server**: A NestJS backend that provides authentication (login, registration, logout, and session checking) using Mongodb.

## Prerequisites
1. Node and npm
2. docker
## Client Setup
1. **Navigate to the Client Folder:** ```cd client```
2. **Install Dependencies**: ```npm install```
3. **Development Server**: ```npm run dev```


## Server Setup
1. **Navigate to the Server Folder:** ```cd server```
2. **Install Dependencies**: ```npm install```
3. **Start Databse**: ```npm run:db```
4. **Development Server**: ```npm start:dev``` (Do this in a seperate terminal)


## Environment variables
You can setup your own environment variables by adding a .env file in the root directory and adding the following:
1.  ```NODE_ENV```: Specifies the environment in which the application is running (valid values: TEST, DEVELOPMENT, STAGING, PRODUCTION). Default = DEVELOPMENT.

2.  ```DATABASE_CONNECTION_STRING```: The MongoDB connection string used to connect to the database. Default = mongodb://root:password@localhost:27017/mydatabase?authSource=admin. // This is the connection string of the local db running in docker

3.  ```DATABASE_NAME```: Specifies the name of the database to use. Default = mydatabase

4.  ```JWT_SECRET```: The secret key used to sign JSON Web Tokens. Default = my-secret-jwt-token.

5.  ```JWT_TOKEN_AUDIENCE```: Specifies the intended recipient of the JWT. Default = localhost.

6.  ```JWT_TOKEN_ISSUER```: Identifies the issuer of the JWT. Default = localhost.

7.  ```JWT_ACCESS_TOKEN_TTL```: The time-to-live (TTL) for the JWT access token, expressed in seconds. Default = 3600.

8.  ```LOG_LEVEL```: Specifies the logging level for the application (valid values: INFO, WARN, ERROR). Default = INFO.
