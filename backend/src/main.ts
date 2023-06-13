import express from "express";
import {routers} from "./routes/routers";
import cors from "cors";
import {Environment} from "./environment";
import {ApplicationHandlers} from "./controllers/application-handlers";
import cookieParser from "cookie-parser";
import {CorsOrigins} from "./utils/cors-origins";

type Application = express.Express;

// Creates the express application
const app : Application = express();

app.use(cors({
    origin: CorsOrigins([
        `http://${Environment.FRONTEND_HOST}`,
        `https://${Environment.FRONTEND_HOST}`
    ]),
    credentials: true,
    optionsSuccessStatus: 200,
    exposedHeaders: ['set-cookie'],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    methods: ["GET","HEAD","POST","PATCH","PUT","DELETE","OPTIONS"],
}));

app.use(express.json());
app.use(cookieParser("Secret used for hashing cookies..."));
app.use(express.urlencoded({ extended: true }));

// Adds the routes of each router to the express application
routers.forEach((router) => app.use(router));
app.use(ApplicationHandlers.notFound);

// Listens for new connections
app.listen(Environment.BACKEND_PORT, Environment.BACKEND_HOSTNAME, () => {
    console.log(`Server is listening at ${Environment.BACKEND_HOSTNAME}:${Environment.BACKEND_PORT}`);
}).on("error", (err) => console.error(err.message));


