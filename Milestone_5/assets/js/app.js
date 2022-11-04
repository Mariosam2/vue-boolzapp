import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import data from './config.js';
const DateTime = luxon.DateTime;

/* const dt = DateTime.now();
console.log(dt); */
//console.log(data);
createApp({
    data() {
        return {
            contacts: data,
            activeContact: 0,
            newMessageText: '',
            contactName: '',
            emptyMsg: 'No messages here yet...'
        }
    },
    methods: {
        setActiveContact(index) {
            this.activeContact = index;
        },
        sendMessage() {
            let contact = this.contacts[this.activeContact];
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
            this.isEmpty(contact)

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
            //console.log(message);
        },
        removeMessage(index){
            /* this.contacts[this.activeContact].messages.message[index].clicked = false; */
            let contact = this.contacts[this.activeContact];
            this.contacts[this.activeContact].messages.splice(index, 1);
            this.isEmpty(contact);
            //console.log(this.contacts[this.activeContact].messages);
        },
        isEmpty(contact){
            let messages = this.contacts[this.activeContact].messages;
            if(messages.length != 0){
                contact.empty =  false;
            } else {
                contact.empty = true;
            }
            
            //console.log(contact.empty)
        },
        tryDate(){
            let obj = DateTime.fromFormat(this.contacts[0].messages[0].date, 'dd MMMM yyyy');
            console.log(obj)
        }

    },
    mounted(){
        this.tryDate();
    }
}).mount('#app')