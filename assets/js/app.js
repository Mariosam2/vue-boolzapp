import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import data from './config.js';
//console.log(data);
createApp({
    data() {
        return {
            contacts: data,
            activeContact: 0,
        }
    }
}).mount('#app')