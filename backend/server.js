const express = require('express');
const mongoose = require('mongoose');
const path = require('path'); // Ensure 'path' module is imported
const app = require("./app");
const connectDatabase = require("./db/Database");

// Handling uncaught exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server for handling uncaught exception`);
});

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path: "./config/.env",
    });
}

// Connect DB
connectDatabase();

// Serve the uploads folder statically
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`);
});

// Unhandled promise rejection
process.on("unhandledRejection", (err) => {
    console.log(`Shutting down the server for ${err.message}`);
    console.log(`Shutting down the server for unhandled promise rejection`);

    server.close(() => {
        process.exit(1);
    });
});
