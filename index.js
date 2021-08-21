const express = require("express");
const errorHandler = require("./http/Error/errorHandler");
const app = express();
require("./http/config/conn");
const auth = require("./http/routers/auth");
const posts = require("./http/routers/post");
const path = require("path");
const comment = require("./http/routers/comment");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 8080;

app.use("/image", express.static("images"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user", auth);
app.use("/api/blog", posts);
app.use("/user", comment);



if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Your server is started at " + PORT);
});
