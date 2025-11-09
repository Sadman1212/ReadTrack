const Book = require('../models/Book');

// CREATE A BOOK (ADMIN ONLY)
exports.createBook = async (req, res) => {
  try {
    const { title, author, genres, synopsis, coverUrl } = req.body;

    if (!title || !author) {
      return res.status(400).json({ message: "Title and author are required" });
    }

    const book = await Book.create({
      title,
      author,
      genres: genres || [],
      synopsis: synopsis || "",
      coverUrl: coverUrl || "",
      createdBy: req.user.id
    });

    res.status(201).json({ message: "Book created", book });
  } catch (error) {
    res.status(500).json({ message: "Error creating book", error: error.message });
  }
};

// GET ALL BOOKS (PUBLIC)
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json({ count: books.length, books });
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error: error.message });
  }
};

// GET SINGLE BOOK (PUBLIC)
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Error fetching book", error: error.message });
  }
};

// UPDATE BOOK (ADMIN ONLY)
exports.updateBook = async (req, res) => {
  try {
    const updates = req.body;

    const book = await Book.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    if (!book) return res.status(404).json({ message: "Book not found" });

    res.json({ message: "Book updated", book });
  } catch (error) {
    res.status(500).json({ message: "Error updating book", error: error.message });
  }
};

// DELETE BOOK (ADMIN ONLY)
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) return res.status(404).json({ message: "Book not found" });

    res.json({ message: "Book deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book", error: error.message });
  }
};
