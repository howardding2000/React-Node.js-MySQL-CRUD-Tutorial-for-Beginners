import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "aVpm2YjooGkM7E",
  database: "test",
});

// ! If there is a auth problem
// ! Solution: ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password' , FLUSH PRIVILEGES

/**
 * Returns middleware that only parses json and only looks at requests
 * where the Content-Type header matches the type option.
 */
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.json("hello this is the server");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  const q = "INSERT INTO books (`title`, `desc`,`price`,`cover`) VALUES (?)";

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been created successfully.");
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;

  const q = "DELETE FROM books WHERE id = ?";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been deleted successfully.");
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  const q =
    "UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE `id` = ? ";

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been updated successfully.");
  });
});

app.listen(8800, () => {
  console.log("Connected to server!");
});
