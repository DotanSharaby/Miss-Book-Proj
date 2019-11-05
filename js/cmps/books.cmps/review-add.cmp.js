'use strict';

import { bookService } from '../../services/book.service.js';
import { eventBus } from '../../services/event.bus.service.js'

// • Save the review: bookService.addReview(bookId, review)
// • Show the list of reviews for the book
// • Allow deleting a review (small x link for each review in the list)

export default {
    name: 'reviewAdd',
    template: `
    <section class="review-add-container">
        <h3>Add A Review !</h3>
        <form @submit.prevent="onAddReview" ref="form" class="flex column form-container">
            <label>Name: </label>
            <input type="text" v-model="review.readerName" placeholder="Your Name" ref="inputReaderName"/>
            <label>Rate: </label>
            <div class="rating">
                <span @click="addRating(5)">☆</span>
                <span @click="addRating(4)">☆</span>
                <span @click="addRating(3)">☆</span>
                <span @click="addRating(2)">☆</span>
                <span @click="addRating(1)">☆</span>
            </div>
            <div>
                <label>Read At:</label>
                <input v-model="review.readAt" type="date"/>
            </div>
            <textarea v-model="review.txt" type="text" rows="5" placeholder="\n Write your review.."></textarea>
            <button type="submit" class="square_btn">Add</button>
            <button @click="backToDetails" class="square_btn">Back</button>
        </form>
        <div v-if="!!reviews">
            {{reviews}}
        </div>
    </section>
    `,
    data() {
        return {
            review: {
                readerName: 'Books Reader',
                rating: null,
                readAt: new Date().toJSON().slice(0, 10),
                txt: ''
            },
            bookToReview: null,
            reviews: []
        }
    },
    created() {
        const bookId = this.$route.params.id;
        if (bookId) {
            bookService.getBookById(bookId)
                .then(book => {
                    this.bookToReview = book;
                    this.reviews = book.reviews;
                    // console.log(book.reviews);
                })
        }
    },
    methods: {
        onAddReview() {
            const bookId = this.$route.params.id;
            this.bookToReview.reviews.unshift(this.review);
            bookService.addReview(bookId, this.bookToReview)
                .then(review => {
                    const msg = {
                        txt: `${review.title} Review Saved Succefully`,
                        type: 'success'
                    }
                    eventBus.$emit('show-msg', msg);
                    this.backToDetails();
                })
                .catch(err => {
                    const msg = {
                        txt: `NOT Saved (${err})`,
                        type: 'error'
                    }
                    eventBus.$emit('show-msg', msg);
                })
        },
        backToDetails() {
            this.$router.push(`/book/details/${this.$route.params.id}`);
        },
        addRating(num) {
            this.review.rating = +num;
        }
    },
    mounted() {
        this.$refs.inputReaderName.focus();
    }
}