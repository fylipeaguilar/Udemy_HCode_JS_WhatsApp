// Como usamos o firebare, temos que importar o firebase pra cá
import { Firebase } from './../util/Firebase'
import { Model } from './Model';

// Estamos utilizando o "extends" para a classe "ClassEvent"
// Pois ela sabe 
export class User extends Model {

    constructor(id){

        // O super porque extendemos de ClassEvent
        super();

        if(id) this.getByid(id);

    }

    // ********* Criando o "getters" and "setteres" *********** //

    get name() { return this._data.name; }
    set name(value) { this._data.name = value; }

    get email() { return this._data.email; }
    set email(value) { this._data.email = value; }

    get photo() { return this._data.photo; }
    set photo(value) { this._data.photo = value; }

    get chatId() { return this._data.chatId; }
    set chatId(value) { this._data.chatId = value; }

    // ********* Final do "getters" and "setteres" *********** //

    getByid(id) {

        return new Promise((resolve, reject) => {

            User.findByEmail(id).onSnapshot(doc => {

                this.fromJSON(doc.data());

                resolve(doc);

            });

        });

    }

    save() {

        return User.findByEmail(this.email).set(this.toJSON())

    }

    static getRef() {

        return Firebase.db().collection('/users');

    }

    static getContactsRef(id){

        return User.getRef()
                .doc(id)
                .collection('contacts')

    }


    static findByEmail(email){

        // Procura dentro da referencia da colecao/um documento/com id "email"
        return User.getRef().doc(email);

    }

    addConctat(contact){

        // btoa = converter para b64
        // btoa = Base64 para ASCII / inverso (atob)
        return User.getContactsRef(this.email)
            .doc(btoa(contact.email))
            .set(contact.toJSON());

    }

    getContacts(filter = '') {

        return new Promise((resolve, reject) => {

            User.getContactsRef(this.email).where('name', '>=', filter).onSnapshot(docs =>{

                let conctats = [];
                docs.forEach(doc => {

                    let data = doc.data();

                    data.id = doc.id;

                    conctats.push(data);

                });

                this.trigger('contactschange', docs)

                resolve(conctats)

            });

        }); 

    }

}