const express = require("express");

//import dbconnectioin file
const DbConnection = require("./databaseConnection");
const app = express();
const PORT = 8081;
//import db
const dotenv = require("dotenv");
const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");
dotenv.config();
app.use(express.json());

DbConnection();

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello World!",
  });
});

app.use("/users", usersRouter);
app.use("/books", booksRouter);

app.get("*", (req, res) => {
  res.status(404).json({
    message: "This root does not exist!",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
