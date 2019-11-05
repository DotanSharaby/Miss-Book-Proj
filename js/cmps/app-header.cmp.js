'use strict';

export default {
    template: `
    <header>
        <h1>Miss Books</h1>
        <nav class="header-nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/Book" exact>Books</router-link> |
            <router-link to="/about">About</router-link>
        </nav>
    </header>
    `
}