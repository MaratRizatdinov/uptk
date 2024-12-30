import express from "express";
import dotenv from "dotenv";
import pool from "./config/db.js";
import supplierRouter from "./routes/supplier.routes.js";
import customerRouter from "./routes/customer.routes.js";
import productRouter from "./routes/product.routes.js";
import warehouseRouter from "./routes/warehouse.routes.js";
import initDocRouter from "./routes/initDoc.routes.js";
import cors from "cors";

dotenv.config();
const { PORT = 3005 } = process.env;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", supplierRouter);
app.use("/api", customerRouter);
app.use("/api", productRouter);
app.use("/api", warehouseRouter);
app.use("/api", initDocRouter);

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error connecting to the database", err.stack);
  } else {
    console.log("Connected to the database:", res.rows);
  }
});

// const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
