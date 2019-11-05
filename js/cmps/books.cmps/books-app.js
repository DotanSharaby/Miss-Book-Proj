'use strict';

import { bookService } from '../../services/book.service.js';

import bookList from './book-list.cmp.js';
import bookFilter from './book-filter.cmp.js';


export default {
    name:'bookApp',
    template: `
    <main>
        <section class="app-books-main">
            <book-filter @filtered="setFilter"></book-filter>
            <book-list :books="booksToShow"></book-list>
        </section> 
    </main>`,
    data() {
        return {
            books: [],
            filterBy: null,
        }
    },
    computed: {
        booksToShow() {
            if (!this.filterBy || this.filterBy.byName === '') return this.books;
            var regex = new RegExp(`${this.filterBy.byName}`, 'i');
            return this.books.filter(book => {
                let bookPrice = book.listPrice.amount;
                return regex.test(book.title) && bookPrice > this.filterBy.fromPrice && bookPrice < this.filterBy.toPrice
            })
        }
    },
    methods: {
        setFilter(filterBy) {
            this.filterBy = filterBy;
        }
    },
    created() {
        bookService.getBooks()
            .then(books => this.books = books)
    },
    components: {
        bookList,
        bookFilter
    }
}