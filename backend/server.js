const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./controller/config/db");

//rest object
const app = express();

//.env config
dotenv.config();

//Db connection
connectDB();

//middlewares
app.use(express.json());
app.use(
  cors({
    origin: ["https://todo-theta-lac.vercel.app/"],
    credentials: true,
  })
);

//routes
app.use("/api/user", require("./routes/userRoutes"));

//port
const PORT = process.env.PORT || 8000;

//listen
app.listen(PORT, () => {
  console.log(`app running successfully at: http://localhost:${PORT}`);
});
