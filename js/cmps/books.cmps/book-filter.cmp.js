'use strict';

export default {
    template: `
    <section class="book-filter-container">
        <form @submit.prevent="onFilter">
            Name:
            <input type="text" placeholder="Book Name" v-model="filterBy.byName" />
            Price from: 
            <input class="number-input" type="number" v-model.number="filterBy.fromPrice" />
            to: 
            <input class="number-input" type="number" v-model.number="filterBy.toPrice" />
            <button class="square_btn">Filter</button>
        </form>
    </section>
    `,
    data() {
        return {
            filterBy: {
                byName: '',
                fromPrice: 0,
                toPrice: 1000
            }
        }
    },
    methods: {
        onFilter() {
            let filter = { ...this.filterBy };
            this.$emit('filtered', filter);
        }
    }
}