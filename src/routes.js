const { addBooksHandler, getAllBooks, getBookDetail, editBookDetail, deleteBook } = require("./handler");

const routes = [
  {
    method: "POST",
    path: "/books",
    handler: addBooksHandler,
    options: {
      cors: {
        origin: ["*"],
      },
    },
  },
  {
    method: "GET",
    path: "/books",
    handler: getAllBooks,
    options: {
      cors: {
        origin: ["*"],
      },
    },
  },
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: getBookDetail,
    options: {
      cors: {
        origin: ["*"],
      },
    },
  },
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: editBookDetail,
    options: {
      cors: {
        origin: ["*"],
      },
    },
  },
  {
    method: "DELETE",
    path: "/books/{bookId}",
    handler: deleteBook,
    options: {
      cors: {
        origin: ["*"],
      },
    },
  },
];

module.exports = routes;
