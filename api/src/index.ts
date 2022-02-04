import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import cors, { CorsOptions } from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { appConfig } from "./configs";
import { homeRoutes } from "./routes";

const app = express();
const port = appConfig.PORT;
const corsOptions: CorsOptions = {
  origin: appConfig.CORS_ORIGIN,
};

app.use(bodyParser.json());
app.use(compression());
app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan("common"));

app.use("/", homeRoutes);

app.listen(port, () => {
  console.log("Application is running...");
});
