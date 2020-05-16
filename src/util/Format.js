// Criando a classe format
export class Format {

    // Obs.: Nessa classe não teremos o método construtor,
    // pois criaremos métodos estáticos
    
    // Pelo método estático não precisamos ficar instanciando a classe
    static getCamelCase(text){

        let div = document.createElement('div')

        div.innerHTML =  `<div data-${text}="id"></div>`

        // Object.keys: nativo do JS. Traz um array com todas as chaves
        return Object.keys(div.firstChild.dataset)[0];
    }

    static toTime(duration) {

        let seconds = parseInt((duration /1000) % 60)
        let minutes = parseInt((duration / (1000 * 60)) % 60)
        let hours = parseInt((duration / (1000 * 60 * 60)) % 60)

        // Caso o audio seja de 1h ou mais 00:00:00
        if ( hours > 0) {

            // Para audios menos que dez segundos (2 casas), completando com 0 a esquerda
            return `${hours}:${minutes.toString().padStart(2 ,'0')}:${seconds.toString().padStart(2 ,'0')}`

        } // Caso o audio seja de minutos 00:00
         
        else {

            return `${minutes}:${seconds.toString().padStart(2 ,'0')}`

        }

    }
    
    static dateToTime(date, locale = 'pt-BR') {

        return date.toLocaleTimeString(locale, {

            hour: '2-digit',
            minute: '2-digit'

        })

    }

    static timeStampToTime(timeStamp) {

        return (timeStamp && typeof timeStamp.toDate === 'function') ? Format.dateToTime(timeStamp.toDate()) : '';

    }

}