'use strict';

import booksJson from './books-json.js';
import { storageService } from './util.service.js';

export const bookService = {
    getBooks,
    getBookById,
    addReview
}
const STORAGE_KEY = 'BooksApp';

var gBooks;
getBooks();

function getBooks() {
    var books = storageService.load(STORAGE_KEY);
    if (!books || books.length === 0) {
        books = booksJson;
        storageService.store(STORAGE_KEY, books);
    }
    books.forEach(book => book.reviews = []);
    gBooks = books;
    window.books = gBooks;
    return Promise.resolve(gBooks);
}

function getBookById(bookId) {
    const book = gBooks.find(book => bookId === book.id);
    return Promise.resolve(book);
}

function addReview(bookId, bookToReview) {
    const idx = gBooks.findIndex(currBook => currBook.id === bookId);
    gBooks.splice(idx, 1, bookToReview);
    

    // doesnt save to local storage like i expect

    // // storageService.store(STORAGE_KEY, gBooks);
    const json = JSON.stringify(gBooks);
    localStorage.setItem(STORAGE_KEY, json);


    return Promise.resolve(bookToReview);
    // return Promise.reject('Oy Vey');
}