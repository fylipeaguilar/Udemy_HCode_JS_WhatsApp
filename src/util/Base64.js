export class Base64 {

    static getMimeType (urlBase64) {

            // O "//" é uma expressão regular
            // O "^" indica o começo da expressão regular
            // O "$" indica o final da expressão regular
            //let regex = /^data:image/png;base64,(.*)$/;
            let regex = /^data:(.+);base64,(.*)$/;

            let result = urlBase64.match(regex);
            //console.log(result)

            return result[1];

    }

    static toFile(urlBase64) {

        let mimeType = Base64.getMimeType(urlBase64);
        let ext = mimeType.split('/')[1]

        // Montar o nome do arquivo
        let filename = `file${Date.now()}.${ext}`

        // Fetch retorna uma promessa
        return fetch(urlBase64)
            .then(res => {return res.arrayBuffer()})
            .then(buffer => {return new File([buffer], filename, { type: mimeType}); })

    }

}