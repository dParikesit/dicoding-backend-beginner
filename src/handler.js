const { nanoid } = require("nanoid");
const books = require("./books");

const addBooksHandler = (request, h) => {
  const { year, author, summary, publisher, pageCount, readPage, reading } =
    request.payload;

  const name = request.payload.hasOwnProperty("name")
    ? request.payload.name
    : null;

  if (!name) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }

  const id = nanoid(16);
  const finished = readPage === pageCount ? true : false;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBooks = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBooks);
  const success = books[books.length - 1].id === id ? true : false;

  if (success) {
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: "error",
    message: "Buku gagal ditambahkan",
  });
  response.code(500);
  return response;
};

const getAllBooks = (request, h) => {
  let { name, reading, finished } = request.query;
  let bookList = books.map((book) => {
    const { id, name, publisher, reading, finished } = book;

    return { id, name, publisher, reading, finished };
  });

  if (name) {
    name = name.toLowerCase();
    bookList = bookList.filter((book) =>
      book.name.toLowerCase().includes(name)
    );
  }

  if (reading == 0 || reading == 1) {
    if (reading == 0) {
      reading = false;
    } else {
      reading = true;
    }
    bookList = bookList.filter((book) => book.reading === reading);
  }

  if (finished == 0 || finished == 1) {
    if (finished == 0) {
      finished = false;
    } else {
      finished = true;
    }
    bookList = bookList.filter((book) => book.finished === finished);
  }

  bookList = bookList.map((book) => {
    const { id, name, publisher } = book;

    return { id, name, publisher };
  });

  const response = h.response({
    status: "success",
    data: {
      books: bookList,
    },
  });
  response.code(200);
  return response;
};

const getBookDetail = (request, h) => {
  const { bookId } = request.params;

  const bookList = books.find((book) => book.id === bookId);

  if (bookList) {
    const response = h.response({
      status: "success",
      data: {
        book: bookList,
      },
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });
  response.code(404);
  return response;
};

const editBookDetail = (request, h) => {
  const { bookId } = request.params;
  const { year, author, summary, publisher, pageCount, readPage, reading } =
    request.payload;

  const name = request.payload.hasOwnProperty("name")
    ? request.payload.name
    : null;

  if (!name) {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }

  const bookList = books.find((book) => book.id === bookId);

  if (!bookList) {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Id tidak ditemukan",
    });
    response.code(404);
    return response;
  }

  bookList.name = name;
  bookList.year = year;
  bookList.author = author;
  bookList.summary = summary;
  bookList.publisher = publisher;
  bookList.pageCount = pageCount;
  bookList.readPage = readPage;
  bookList.reading = reading;
  bookList.updatedAt = new Date().toISOString();

  const response = h.response({
    status: "success",
    message: "Buku berhasil diperbarui",
  });
  response.code(200);
  return response;
};

const deleteBook = (request, h) => {
  const { bookId } = request.params;

  const bookIndex = books.findIndex((book) => book.id === bookId);
  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    const response = h.response({
      status: "success",
      message: "Buku berhasil dihapus",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Buku gagal dihapus. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

module.exports = {
  addBooksHandler,
  getAllBooks,
  getBookDetail,
  editBookDetail,
  deleteBook,
};
