'use strict';

export default {
    props: ['book'],
    template: `
    <li class="book-card">
        <img :src="book.thumbnail" />
        <h4>{{ book.title }}</h4>
        <h4>{{ book.listPrice.amount }} <span>{{ currency }}</span></h4>
    </li>
    `,
    computed: {
        currency() {
            let currencyCode = this.book.listPrice.currencyCode;
            if (currencyCode === 'USD') return '$';
            else if (currencyCode === 'ILS') return '₪';
            else if (currencyCode === 'EUR') return '€';
        }
    }
}