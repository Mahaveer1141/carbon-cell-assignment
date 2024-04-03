import express from "express";
import cors from "cors";
import "dotenv/config";
import databaseConfig from "./config/databaseConfig";
import { errorHandler, notFound } from "./middleware/errorHandler";
import dataRoute from "./routes/dataRoute";
import authRoute from "./routes/authRoute";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

databaseConfig();

app.use("/data", dataRoute);
app.use("/auth", authRoute);

app.get("/", (_, res) => {
  res.json({ message: "hello from server" });
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
