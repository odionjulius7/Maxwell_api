const express = require("express");
const dbConnect = require("./config/dbConnect");
const { notFound, handleError } = require("./middlewares/errorhandle");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const dotenv = require("dotenv").config(); // to use .env call it here
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 4000;
const blogCatRouter = require("./routes/blogCatRoutes");
const rateLimitter = require("./utils/reqLimit");

dbConnect();

// Enable CORS for all routes
app.use(cors());

app.use(bodyParser.json()); // bodyParser middleware specifically for handling JSON data.
app.use(bodyParser.urlencoded({ extended: false })); //bodyParser middleware for handling URL-encoded form data.formdata

/* Starts Using Rate Limiter dynamically, "./utils/reqLimit" */
app.set("trust proxy", 1);
app.use(
  "/api",
  rateLimitter(60 * 60 * 1000, "Secs", 50, "Only 50 Requests Allowed")
);
// note: you can use for a particular endpoint(in ur controller)
/* Ends Using Rate Limiter dynamically, "./utils/reqLimit" */

app.use("/api/testimony", blogCatRouter);

app.use(notFound);
app.use(handleError);

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
