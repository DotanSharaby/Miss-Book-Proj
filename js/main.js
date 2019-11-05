'use strict';

import theRouter from './routes.js';
import appHeader from './cmps/app-header.cmp.js';
import userMsg from './cmps/user.msg.cmp.js';


var options = {
    router: theRouter,
    el: '.main-app',
    template: `
    <main class="container">
        <user-msg></user-msg>
        <app-header></app-header>
        <router-view></router-view>  
    </main>`,
    components:{
        appHeader,
        userMsg
    }
}

new Vue(options);