require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const config = require("./config/config");
const globalErrorHandler = require("./middleware/globalErrorHandler");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = config.port;
const cors = require("cors")
// Connect to DB
connectDB();

//MiddleWares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: ['http://localhost:5173']
}))


// Sample Route
app.get("/", (req, res) => {
    res.json({ message: "Hello from POS Server!" });
});

//other endpoints
app.use("/api/user", require("./routes/userRoute"));
app.use("/api/order", require("./routes/orderRoute"));
app.use("/api/table", require("./routes/tableRoute"));

// Global error handler middleware
app.use(globalErrorHandler);

// Start Server
app.listen(PORT, () => {
    console.log(`POS Server is listening on port ${PORT}`);
});
