export class CameraController {

    constructor(videoEl) {

        this._videoEl = videoEl;

        // Ativando a permissao de uso da camera pelo browser
        navigator.mediaDevices.getUserMedia({

            video: true

        }).then(stream => {

            this._stream = stream;            

            let mediaStream = new MediaStream(stream);
            // O stream não é uma URL, entao criamos um objeto
            this._videoEl.srcObject = mediaStream;

            //Mostrar na tela o que está vindo
            this._videoEl.play();

        }).catch(err => {

            console.error(err);

        });

    }

    // Método para desligar a câmera
    // Vai ser usada no botão de fechar a div da imagem da camerea
    // No arquivo "WhatsAppControler"
    stop() {

        // console.log(stream.getTracks())
        this._stream.getTracks().forEach( track => {

            // Parando cada uma das faixas
            track.stop();
        })

    }

    tackPicture(mineType = 'image/png') {

        // Precisamos criar uma variável canvas
        let canvas = document.createElement('canvas');

        // Definir a largura e a altura da "paleta" que vamos usar
        canvas.setAttribute('height', this._videoEl.videoHeight);
        canvas.setAttribute('width', this._videoEl.videoWidth);

        // Temos que falar para o canvas o contexto (2d ou 3d)
        let context = canvas.getContext('2d');

        // Queremos desenhar o que está aparecendo no nosso video
        // Comeca em 0x e 0y e vai até a altura e largura do nosso canvas
        context.drawImage(this._videoEl, 0, 0, canvas.width, canvas.height);

        // Retornaremos um base64
        return canvas.toDataURL(mineType);

    }

}