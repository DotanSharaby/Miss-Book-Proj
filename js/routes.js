'use strict';

import homePage from './cmps/homepage.cmp.js';
import about from './cmps/about.cmp.js';
import bookApp from './cmps/books.cmps/books-app.js';
import bookDetails from './cmps/books.cmps/book-details.cmp.js';
import addReview from './cmps/books.cmps/review-add.cmp.js';


const myRoutes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/about',
        component: about
    },
    {
        path: '/book',
        component: bookApp
    },
    {
        path: '/book/details/:id',
        component: bookDetails
    },
    {
        path: '/book/details/:id/addReview',
        component: addReview
    }
]
const myRouter = new VueRouter({ routes: myRoutes })

export default myRouter;