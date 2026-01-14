const { nanoid } = require('nanoid');
const books = require('./books');


const addBookHandler = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  if (!name) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    }).code(400);
  }

  if (readPage > pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
  }

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;

  const newBook = {
    id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt,
  };

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    return h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: { bookId: id },
    }).code(201);
  }

  return h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  }).code(500);
};

const getAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;

  let filteredBooks = books;

  // 1. Logika Filter Tetap Terjaga
  if (name !== undefined) {
    filteredBooks = filteredBooks.filter((book) =>
      book.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (reading !== undefined) {
    filteredBooks = filteredBooks.filter(
      (book) => book.reading === (reading === '1')
    );
  }

  if (finished !== undefined) {
    filteredBooks = filteredBooks.filter(
      (book) => book.finished === (finished === '1')
    );
  }

  const finalBooks = filteredBooks.map((book) => {
    const percentage = Math.round((book.readPage / book.pageCount) * 100);
    

    let label = 'Belum Dibaca';
    if (book.finished) label = 'Selesai';
    else if (book.reading) label = 'Sedang Dibaca';


    let category = 'Tipis';
    if (book.pageCount > 300) category = 'Sangat Tebal';
    else if (book.pageCount > 150) category = 'Sedang';

    return {
      id: book.id,
      name: book.name,
      publisher: book.publisher,
      pageDetail: `Halaman ${book.readPage} dari ${book.pageCount}`,
      readingProgress: `${percentage}%`,
      isReadingNow: book.reading ? 'Ya' : 'Tidak',
      isFinished: book.finished ? 'Ya' : 'Tidak',
      insertedAt: book.insertedAt,
      updatedAt: book.updatedAt,
      statusLabel: label,
      bookCategory: category,
    };
  });


  const randomBook = finalBooks.length > 0 
    ? finalBooks[Math.floor(Math.random() * finalBooks.length)].name 
    : 'Tidak ada rekomendasi';

  const isEmpty = filteredBooks.length === 0;
  const infoMessage = isEmpty 
    ? 'Maaf, Bro buku tersebut tidak ditemukan.' 
    : `Bro Ditemukan ${filteredBooks.length} buku.`;

  return h.response({
    status: 'success',
    serverStatus: 'Online',
    author: 'Muhammad Raihan', 
    requestTime: new Date().toLocaleString('id-ID'),
    totalData: filteredBooks.length,
    recommendation: randomBook, 
    message: infoMessage, 
    apiVersion: '1.2.0',
    data: {
      books: finalBooks, 
    },
  }).code(200);
};


const quickAddHandler = (request, h) => {
  const { name, page, read } = request.query;
  const { nanoid } = require('nanoid');

  if (!name) {
    return 'Gagal! Kamu harus isi nama buku di URL. Contoh: /quick-add?name=Judul';
  }

  const id = nanoid(16);
  const pageCount = Number(page) || 100;
  const readPage = Number(read) || 0;
  const insertedAt = new Date().toISOString();

  const newBook = {
    id,
    name,
    year: 2026,
    author: 'Admin Quick Add',
    summary: 'Buku ini ditambahkan cepat melalui URL browser.',
    publisher: 'Sistem Raihan',
    pageCount,
    readPage,
    finished: pageCount === readPage,
    reading: true,
    insertedAt,
    updatedAt: insertedAt,
  };

  books.push(newBook);

  return h.response({
    status: 'success',
    message: `Mantap Bro! Buku "${name}" berhasil ditambah lewat URL.`,
    data: { bookId: id }
  }).code(201);
};

const deleteBookQuickHandler = (request, h) => {
  const { bookId } = request.params;
  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    const deletedBookName = books[index].name;
    books.splice(index, 1); 

    return h.response({
      status: 'success',
      message: `Buku "${deletedBookName}" berhasil dihapus, Bro!`,
      serverStatus: 'Online',
      author: 'Muhammad Raihan',
    }).code(200);
  }

  return h.response({
    status: 'fail',
    message: 'Gagal hapus, Bro. Id bukunya nggak ketemu!',
  }).code(404);
};

const getBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const book = books.find((b) => b.id === bookId);

  if (book) {
    return {
      status: 'success',
      data: { book },
    };
  }

  return h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  }).code(404);
};

const editBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
  const updatedAt = new Date().toISOString();

  if (!name) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    }).code(400);
  }

  if (readPage > pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
  }

  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name, year, author, summary, publisher, pageCount, readPage, reading, updatedAt,
      finished: pageCount === readPage,
    };

    return h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    }).code(200);
  }

  return h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  }).code(404);
};


const deleteBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    books.splice(index, 1);
    return h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    }).code(200);
  }

  return h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  }).code(404);
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
  quickAddHandler,
  deleteBookQuickHandler,

};