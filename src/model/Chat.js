import { Model } from "./Model";
import { User } from "./User";
import { Firebase } from "../util/Firebase";

export class Chat extends Model{

    constructor() {

        super();

    }


    // ********* Criando o "getters" and "setteres" *********** //

    get users() {return this._data.users}
    set users(value) {this._data.users = value}

    get timeStamp(){return this._data.timeStamp}
    set timeStamp(value){this._data.timeStamp = value}

    // ********* Fim o "getters" and "setteres" *********** //

    // Criar um método que me dá a referencia da coleção de chats
    static getRef(){

        return Firebase.db().collection('/chats')

    }

    static create(myEmail, contactEmail){

        return new Promise((resolve, reject) => {

            let users = {};
            users[btoa(myEmail)] = true;
            users[btoa(contactEmail)] = true;

            // Esse add no firebase gera o "id" de forma automática 
            // na nossa coleção
            Chat.getRef().add({

                users,
                timeStamp: new Date()

            }).then(doc => {

                Chat.getRef().doc(doc.id).get().then(chat => {

                    resolve(chat)

                }).catch(err => {

                    reject(err)
    
                });
    
            }).catch(err => {
    
                reject(err)
    
            })

        })

    }

    static find(myEmail, contactEmail){

        // O método where recebe 3 parâmetros
           // 1 - Quem/Qual é a chave que estamos procurando
           // 2 - Comparação do que estamos procurando
           // 3 - Resultado esperado (true ou false)
        return Chat.getRef()
            .where(btoa(myEmail),'==', true)
            .where(btoa(contactEmail),'==', true)
            .get();

    }

    static createIfNotExists(myEmail, contactEmail){

        return new Promise((resolve, reject) => {

            Chat.find(myEmail, contactEmail).then(chats => {

                if(chats.empty) {

                    // Create
                    Chat.create(myEmail, contactEmail).then(chat => {

                        resolve(chat)

                    })

                } else {

                    // Como é um lista, temos que fazer um forEach
                    // Mesmo que nessa lista só tenha um elemento
                    chats.forEach(chat => {
                        
                        resolve(chat)

                    });


                }

            }).catch(err => {

                reject(err)

            })

        })

    }

    

}