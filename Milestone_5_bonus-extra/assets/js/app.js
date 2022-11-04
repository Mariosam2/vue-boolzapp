import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import data from './config.js';
const DateTime = luxon.DateTime;
// prova luxon
/* const now = DateTime.now();
now.setLocale('it');
console.log(now.toLocaleString(DateTime.DATETIME_SHORT));
console.log(now.hour)
console.log(now.minute)
const dt = DateTime.now();
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
            let now = DateTime.now();
            if (this.newMessageText.replace(/ /g, "").length !== 0) {
                setTimeout(this.receiveMessage, 1000);
                const newMessage = {
                    date: now.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS),
                    message: this.newMessageText,
                    status: 'sent',
                    hoursMinutes: now.toLocaleString(DateTime.TIME_SIMPLE),
                }
                this.contacts[this.activeContact].messages.push(newMessage);
                //console.log( this.contacts[this.activeContact].messages);
                this.newMessageText = '';
            }
            this.isEmpty(contact)

        },
        receiveMessage() {
            let now = DateTime.now();
            const newMessage = {
                date: now.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS),
                message: 'ok',
                status: 'received',
                hoursMinutes: now.toLocaleString(DateTime.TIME_SIMPLE),
            }
            console.log(newMessage.date);
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
        onClick(index) {
            // reset the clicked statuses
            let message = this.contacts[this.activeContact].messages[index];
            this.contacts[this.activeContact].messages.forEach(msg => {
                if (msg !== message)
                    msg.clicked = false;
            });
            //console.log(message);
            // change the clicked status on the targeted message
            message.clicked = !message.clicked;
            //console.log(message);
        },
        removeMessage(index) {
            /* this.contacts[this.activeContact].messages.message[index].clicked = false; */
            let contact = this.contacts[this.activeContact];
            this.contacts[this.activeContact].messages.splice(index, 1);
            this.isEmpty(contact);
            //console.log(this.contacts[this.activeContact].messages);
        },
        isEmpty(contact) {
            let messages = this.contacts[this.activeContact].messages;
            if (messages.length != 0) {
                contact.empty = false;
            } else {
                contact.empty = true;
            }

            //console.log(contact.empty)
        },
        getHoursMinutes() {
            this.contacts.forEach(contact => {
                contact.messages.forEach(message => {
                    //riformatto le date aggiungendo una virgola in modo che tutte le date (anche quelle dei nuovi messaggi (vedi removeMessage e sendMessage) seguano la stessa formattazione DATETIME_SHORT)
                    message.date = message.date.split(' ').join(', ')
                    let obj = DateTime.fromFormat(message.date, 'dd/MM/yyyy, HH:mm:ss');
                    //console.log(obj, obj.toLocaleString(DateTime.TIME_SIMPLE))
                    //salvo solo l'orario del messaggio in una nuova proprietà hoursMinutes
                    message.hoursMinutes = obj.toLocaleString(DateTime.TIME_SIMPLE);
                    console.log(message);
                })
            })
        },

    },
    mounted() {
        this.getHoursMinutes()
    }
}).mount('#app')