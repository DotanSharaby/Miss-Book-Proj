'use strict';

import { bookService } from '../../services/book.service.js';
import longTxt from './long-txt.cmp.js';


export default {
    name: 'bookDetails',
    template: `
    <section v-if="book" class="book-detail-container">
        <div class="book-detail-header">
            <h4>{{book.title}}</h4>
            <p>Written by: <span v-for="author in book.authors">{{author}}</span></p>
        </div>
        <div class="book-detail-body">
            <h4>{{ book.subtitle }}</h4>
            <p>{{ publishedDate }}</p>
            <p>Language: <span>{{ book.language }}</span></p>
            <p>{{ pageCount }}</p>
            <span :class="classObj">Price: {{ price }}</span>
            <span v-if="isOnSale"> - On Sale !</span>
            <p>Categories: <span v-for="category in book.categories">{{ category }}</span></p>
            <img :src="book.thumbnail"/>
            <p>Description: <long-txt :txt="book.description"></long-txt></p>
        </div>
        
        <div class="book-detail-footer">
            <button @click="backToList" class="square_btn">Back</button>
            <router-link class="square_btn" :to="'/book/details/' + book.id + '/addReview'">
                Add review</router-link>
        </div>
        
    </section>
    `,
    data() {
        return {
            book: null,
            isReviewing: false,
        }
    },
    created() {
        const bookId = this.$route.params.id;
        bookService.getBookById(bookId)
            .then(book => this.book = book)
    },
    computed: {
        pageCount() {
            const pageCount = this.book.pageCount;
            if (pageCount > 500) return `Long Reading - ${pageCount} Pages`;
            else if (pageCount > 200) return `Decent Reading - ${pageCount} Pages`;
            else return `Light Reading - ${pageCount} Pages`;
        },
        publishedDate() {
            const publishedDate = this.book.publishedDate;
            if (publishedDate > 10) return `Veteran Book - Published: ${publishedDate}`
            else if (publishedDate < 1) return `New Book! - Published: ${publishedDate}`
        },
        price() {
            let currencyCode = this.book.listPrice.currencyCode;
            const price = this.book.listPrice.amount;
            if (currencyCode === 'USD') return `$${price}`;
            else if (currencyCode === 'ILS') return `${price}₪`;
            else if (currencyCode === 'EUR') return `€${price}`;
        },
        classObj() {
            const price = this.book.listPrice.amount;
            return { 'red': price > 150, 'green': price < 20 };
        },
        isOnSale() {
            return this.book.listPrice.isOnSale;
        }
    },
    methods: {
        backToList() {
            this.$router.push('/book');
        }
    },
    components: {
        longTxt
    }
}