const dotenv = require("dotenv");
dotenv.config({ path: './.env' });

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const yaml = require("yamljs");

const sqlize = require("./database.js");

const usersRouter = require("./routes/usersRouter.js");
const requestsRouter = require("./routes/requestsRouter.js");

const checkDatabase = async () => {
    try {
        await sqlize.authenticate();
        console.log(`Connected to database ${process.env.DB_DATABASE}!`);
    } catch (err) {
        console.error('Unable to connect to database: ', err);
    }    
}

const app = express();

// --- Middleware
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.use(
    cors({
        origin: "*",
        credentials: true
    })
);

// --- Routes
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(yaml.load("./swagger.yaml")));
app.use("/api/users", usersRouter);
app.use("/api/requests", requestsRouter);

const server = app.listen(process.env.SERVER_PORT || 3000, () => {
    console.log(`Server running on port ${process.env.SERVER_PORT || 3000}!`);
    console.log(`Documentation available on localhost:${process.env.SERVER_PORT || 3000}/api/docs`)
    checkDatabase();
});