// Criando constantes de endereço para os módulos não se perderem
const path = require('path'); // vai ser usada no path do output


module.exports = {

    // ****** 2 INFORMAÇÕES IMPORTANTES DE CONFIGURACAO DO WEBPACK ******//

    // (1) Arquivo de entrada
    entry:  './src/app.js',

    // (2) Arquivo de saída
    // Tem algumas informações 
    output: {

        // Esse será o arquivo compilado de js finais
        filename: 'bundle.js',

        // Caminho que o arquivo estará disponivel
        path: path.resolve(__dirname, '/dist'),

        // Pasta "publica" para ser usado no acesso final 
        publicPath: 'dist'

    }

}