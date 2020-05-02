const firebase = require('firebase');
require('firebase/firestore');

export class Firebase {

    constructor() {

        this._config = {
            apiKey: "AIzaSyAHpdoUYOcvUM72LbMBwZimdCHvoI3PBmc",
            authDomain: "whatsapp-clone-fylipeaguilar.firebaseapp.com",
            databaseURL: "https://whatsapp-clone-fylipeaguilar.firebaseio.com",
            projectId: "whatsapp-clone-fylipeaguilar",
            storageBucket: "gs://whatsapp-clone-fylipeaguilar.appspot.com",
            messagingSenderId: "128390060133",
            appId: "1:128390060133:web:33d1c40944573f40fc0e8c"
        };

        this.init();

    }

    init(){
    
        // Esse if é para não tentar inicializar a base mais de uma vez
        // Estamos usando 0 "window" para a variavel ficar global
        // E naão correr o risco de ter 2 instancia solicitaddas ao Firebase
        if(!window._initializedFirebase) {

            // Initialize Firebase
            firebase.initializeApp(this._config);

            // Para trabalhar com o firestore
            // ---- Nova configuração ------//
            firebase.firestore().settings({});

            window._initializedFirebase = true;
        }
    }

    static db() {

        return firebase.firestore();

    }

    static hd() {

        return firebase.storage();

    }

    // Solicitar a autenticação do firebase
    initAuth() {

        return new Promise((resolve, reject) => {

            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider).then(result => {

                let token = result.credential.accessToken;
                let user = result.user;

                resolve({
                    user, token
                });

            }).catch(err => {

                reject(err)

            })

        })

    }
}