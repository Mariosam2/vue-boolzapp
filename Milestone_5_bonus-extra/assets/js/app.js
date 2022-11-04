import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { nextTick } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
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
            emptyMsg: 'No messages here yet...',
            quotes: [
                'Se camminassimo solo nelle giornate di sole non raggiungeremmo mai la nostra destinazione',
                'La fiducia in se stessi è il primo segreto del successo.',
                'Ora non è tempo per pensare a ciò che non hai. Pensa a quello che puoi fare con quello che c\'è.',
                'Ti diranno che sei finito… e proprio in quel momento tu allacciati gli scarpini, scendi in campo e zittisci tutti.',
                'Io non riesco a immaginare che una persona possa avere successo se non dà a questo gioco che è la vita tutto quello che ha.'
            ],
            deleteMenuClicked: false,
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
                this.scroll();
                this.newMessageText = '';
            }
            this.isEmpty(contact)

        },
        receiveMessage() {
            let now = DateTime.now();
            const newMessage = {
                date: now.toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS),
                message: this.randomResponse(),
                status: 'received',
                hoursMinutes: now.toLocaleString(DateTime.TIME_SIMPLE),
            }
            //console.log(newMessage.message);
            //console.log(newMessage.date);

            this.contacts[this.activeContact].messages.push(newMessage);
            //console.log(event.target);
            this.scroll();





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
                    //riformatto le date aggiungendo una virgola in modo che tutte le date (anche quelle dei nuovi messaggi, vedi removeMessage e sendMessage) seguano la stessa formattazione DATETIME_SHORT_WITH_SECONDS)
                    message.date = message.date.split(' ').join(', ')
                    let obj = DateTime.fromFormat(message.date, 'dd/MM/yyyy, HH:mm:ss');
                    //console.log(obj, obj.toLocaleString(DateTime.TIME_SIMPLE))
                    //salvo solo l'orario del messaggio in una nuova proprietà hoursMinutes (che poi mostrerò dinamicamente nell'html)
                    message.hoursMinutes = obj.toLocaleString(DateTime.TIME_SIMPLE);
                    //console.log(message);
                })
            })
        },
        getRandomArbitrary(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        },
        randomResponse() {
            //console.log(this.getRandomArbitrary(0, this.quotes.length));
            return this.quotes[this.getRandomArbitrary(0, this.quotes.length)];
        },
        scroll() {
            nextTick(() => {
                let element = this.$refs.message[this.$refs.message.length - 1];
                console.log(element)
                element.scrollIntoView();
            })
        },
        deleteMenu(){
            this.deleteMenuClicked = !this.deleteMenuClicked;
        },
        deleteMessages(){
            let contact = this.contacts[this.activeContact];
            while(contact.messages.length !== 0){
                this.removeMessage(0);
            }
            contact.messages = obj;
            console.log(contact.messages);
        },
        deleteContact(){
            this.contacts.splice(this.activeContact, 1);
            console.log(this.activeContact);
        }

    },
    mounted() {
        this.getHoursMinutes()
    }
}).mount('#app')