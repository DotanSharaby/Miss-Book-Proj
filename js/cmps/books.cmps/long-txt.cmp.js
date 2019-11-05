'use strict';

export default {
    props: ['txt'],
    template: `
        <section class="long-text-container">
            <p>{{txtToShow}}
                <button v-if="!!isShort" @click="toggleIsShort" class="square_btn">more</button>
            </p> 
            <button v-if="!isShort" @click="toggleIsShort" class="square_btn">less</button>
        </section>
    `,
    data() {
        return {
            isShort: true
        }
    },
    methods: {
        toggleIsShort() {
            this.isShort = !this.isShort;
        }
    },
    computed: {
        txtToShow() {
            if (!!this.isShort) return `${this.txt.substr(0, 100)} ...`;
            return this.txt;
        }
    }
}
