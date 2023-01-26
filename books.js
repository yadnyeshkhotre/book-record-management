const express = require("express");
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");
const { route } = require("./users");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: books,
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((each) => each.id === id);
  if (!book) {
    return res.status(404).json({ success: false, message: "Book not found" });
  }
  res.status(200).json({
    success: true,
    data: book,
  });
});

router.get("/issued/issued-by", (req, res) => {
  const usersWithIssuedBook = users.filter((each) => {
    if (each.issuedBook) return each;
  });
  const issuedBooks = [];
  usersWithIssuedBook.forEach((each) => {
    const book = books.find((book) => book.id === each.issuedBook);
    book.issuedBy = each.name;
    book.issuedDate = each.issuedDate;
    book.returnDate = each.returnDate;
    issuedBooks.push(book);
  });
  if (issuedBooks.lenght === 0)
    return res.status(404).json({
      success: false,
      message: "No books have been issued",
    });
  res.status(200).json({
    success: true,
    data: issuedBooks,
  });
});
router.post("/", (req, res) => {
  const { data } = req.body;
  if (!data) {
    return res.status(400).json({
      success: false,
      message: "No data provided",
    });
  }
  const book = books.find((each) => each.id === data.id);
  if (book) {
    return res.status(400).json({
      success: false,
      message: "Book already exists",
    });
  }
  const allBooks = [...books, data];
  return res.status(200).json({
    success: true,
    data: allBooks,
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  const book = books.find((each) => each.id === id);
  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book not found",
    });
  }
  const updatedData = books.map((each) => {
    if (each.id === id) {
      return { ...each, ...data };
    }
    return each;
  });
  return res.status(200).json({
    success: true,
    data: updatedData,
  });
});

module.exports = router;
