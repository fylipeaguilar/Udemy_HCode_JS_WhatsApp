export class ClassEvent {

    constructor() {

        this._events = {};

    }

    on(eventName, fn){

        if(!this._events[eventName]) this._events[eventName] = new Array();

        this._events[eventName].push(fn);

    }
    
    // gatilho
    trigger(){

        // arguments não é uma variável e sim um comando nativo do JS
        // para pegar os argumentos que passamos no parametro
        let args = [...arguments];

        // O primeiro parametro será sempre o nome do nosso evento
        // O shift remove o primeiro parametro do array e retorna o novo array
        // No nosso caso, será o resto dos argumentos
        let eventName = args.shift();

        args.push(new Event(eventName))

        if(this._events[eventName] instanceof Array) {

            this._events[eventName].forEach(fn => {

                // apply é um método nativo para executar a função
                fn.apply(null, args);

            })

        }

    }
}