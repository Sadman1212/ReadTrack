import { useEffect, useState } from "react";
import api from "../api/api";

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await api.get("/books");
        setBooks(res.data);
      } catch (err) {
        console.error("Error fetching books:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading books...</p>;

  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <h2>📚 All Books</h2>
      {books.length === 0 ? (
        <p>No books available yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {books.map((book) => (
            <li key={book._id} style={{ margin: "10px 0" }}>
              <strong>{book.title}</strong> by {book.author}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
