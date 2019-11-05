'use strict';
import bookPreview from './book-preview.cmp.js';

export default {
    name: 'bookList',
    props: ['books'],
    template: `
    <section v-if="!selectedBook">
        <ul class="book-list clean-list">
            <router-link :to="'/book/details/' + currBook.id" v-for="currBook in books" 
                    :key="currBook.id" 
                    :book="currBook">
                <book-preview :book="currBook"></book-preview>
            </router-link>
        </ul>
    </section>
    `,
    data() {
        return {
            selectedBook: null
        }
    },
    components: {
        bookPreview
    },
}