import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import data from './config.js';
//console.log(data);
createApp({
    data() {
        return {
            contacts: data,
            activeContact: 0,
            newMessageText: '',
            contactName: '',
        }
    },
    methods: {
        setActiveContact(index) {
            this.activeContact = index;
        },
        sendMessage() {
            setTimeout(this.receiveMessage, 1000);
            if (this.newMessageText.length !== 0) {
                const newMessage = {
                    date: '10/01/2020 15:30:55',
                    message: this.newMessageText,
                    status: 'sent'
                }
                this.contacts[this.activeContact].messages.push(newMessage);
                //console.log( this.contacts[this.activeContact].messages);
                this.newMessageText = '';
            }

        },
        receiveMessage() {
            const newMessage = {
                date: '10/01/2020 15:30:55',
                message: 'ok',
                status: 'received'
            }
            this.contacts[this.activeContact].messages.push(newMessage);
        },
        getContacts() {
            this.contacts.forEach(contact => {
                if (!contact.name.toLowerCase().includes(this.contactName.toLowerCase())) {
                    contact.visible = false;
                } else {
                    contact.visible = true;
                }
            });
        },
        onClick(index){
            // reset the clicked statuses
            let message = this.contacts[this.activeContact].messages[index];
            this.contacts[this.activeContact].messages.forEach(msg => {
                if(msg !== message)
                msg.clicked = false;
            });
            //console.log(message);
            // change the clicked status on the targeted message
            message.clicked = !message.clicked;
            console.log(message);
        },
        removeMessage(index){
            this.contacts[this.activeContact].messages.splice(index, 1);
            console.log(this.contacts[this.activeContact].messages);
        }
    }
}).mount('#app')