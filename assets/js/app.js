import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import data from './config.js';
//console.log(data);
createApp({
    data() {
        return {
            contacts: data,
            activeContact: 0,
            // newMessage dovrà essere un'oggetto messagge, per il momento lo lascio così
            newMessage: '',
        }
    },
    methods: {
        setActiveContact(index){
            this.activeContact = index;
        }
    }
}).mount('#app')