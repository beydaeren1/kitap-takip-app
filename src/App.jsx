import { useState } from "react";
import "./App.css";

function App() {
  const [bookName, setBookName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [books, setBooks] = useState([]);
  const [editId, setEditId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const addBook = () => {
    if (bookName === "" || authorName === "") {
      alert("Lütfen tüm alanları doldurun");
      return;
    }

    if (isEdit) {
      const updatedBooks = books.map((item) =>
        item.id === editId
          ? { ...item, book: bookName, author: authorName }
          : item
      );

      setBooks(updatedBooks);
      setIsEdit(false);
      setEditId(null);
    } else {
      const newBook = {
        id: Date.now(),
        book: bookName,
        author: authorName,
      };

      setBooks([...books, newBook]);
    }

    setBookName("");
    setAuthorName("");
  };

  const deleteBook = (id) => {
    const filteredBooks = books.filter((item) => item.id !== id);
    setBooks(filteredBooks);
  };

  const editBook = (item) => {
    setBookName(item.book);
    setAuthorName(item.author);
    setEditId(item.id);
    setIsEdit(true);
  };

  return (
    <div className="container">
      <h1>Kitap Takip Uygulaması</h1>
      <p className="description">
         Okuduğunuz kitapları ekleyebilir, düzenleyebilir ve silebilirsiniz.
      </p>
     

      <div className="form-area">
        <input
          type="text"
          placeholder="Kitap adı"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Yazar adı"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
        />

        <button onClick={addBook}>
          {isEdit ? "Kitabı Güncelle" : "Kitap Ekle"}
        </button>
      </div>

      <div className="book-list">
        {books.map((item) => (
          <div className="book-card" key={item.id}>
            <h3>{item.book}</h3>
            <p>{item.author}</p>

            <button onClick={() => editBook(item)}>Düzenle</button>
            <button onClick={() => deleteBook(item.id)}>Sil</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;