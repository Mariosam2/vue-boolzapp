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
        }, 
        sendMessage(){
            setTimeout(this.receiveMessage, 1000);
            if(this.newMessage.length !== 0){
                const newMessage = {
                    date: '10/01/2020 15:30:55',
                    message: this.newMessage,
                    status: 'sent'
                }
                this.contacts[this.activeContact].messages.push(newMessage);
                //console.log( this.contacts[this.activeContact].messages);
                this.newMessage = '';
            }
            
        },
        receiveMessage(){
            const newMessage = {
                date: '10/01/2020 15:30:55',
                message: 'ok',
                status: 'received'
            }
            this.contacts[this.activeContact].messages.push(newMessage);
        }
    }
}).mount('#app')