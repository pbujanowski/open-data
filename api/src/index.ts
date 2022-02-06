import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import cors, { CorsOptions } from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { appConfig } from "./configs";
import { HomeRoutes, NbpRoutes } from "./routes";

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

app.use("/", HomeRoutes);
app.use("/nbp", NbpRoutes);

app.listen(port, () => {
  console.log("Application is running...");
});
