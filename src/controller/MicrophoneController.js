import { ClassEvent } from "../util/ClassEvent";

export class MicrophoneController extends ClassEvent {

    constructor() {

        // this._audioEl = audioEl;

        // Chama o construtor do pai da classe ClassEvent
        // Para não sobre escrever esse construtor 
        super();

        this._mimeType = 'audio/webm'

        this._available = false;

        navigator.mediaDevices.getUserMedia({

            audio: true

        }).then(stream => {

            this._available = true;

            this._stream = stream;
 
            this.trigger('ready', this._stream)
            
        }).catch(err => {

            console.error(err);

        });
    }

    isAvailable() {

        return this._available;

    }

    // Método para parar a captura de audio do microphone
    // No arquivo "WhatsAppControler"
    stop() {

        // console.log(stream.getTracks())
        this._stream.getTracks().forEach( track => {

            // Parando cada uma das faixas
            track.stop();
        })

    }

    // Metodos para gravação de audio
    startRecorder() {

        if (this.isAvailable()) {

            // Classe nativa do JS
            // Precisamos passar o que ele tem que gravar
            // E também o tipo de arquivo que ele vai gravar
            this._mediaRecorder = new MediaRecorder(this._stream, {

                mimeType: this._mimeType

            });

            // A gravação é por "pedaços" de eventos
            this._recordedChunks = [];

            // Criando um evento para ouvir os "pedaços dos dados"
            this._mediaRecorder.addEventListener('dataavailable', e=> {

                if(e.data.size > 0) this._recordedChunks.push(e.data);

            })

            this._mediaRecorder.addEventListener('stop', e => {

                let blob = new Blob(this._recordedChunks, {

                    type: this._mimeType

                });

                // Agora precisamos transformar o "this._recordedChunks" num arquivo
                // Criando de fato o arquivo
                let filename = `rec${Date.now()}.webm`

                let audioContext = new AudioContext();

                // Transformando num array buffer
                let reader = new FileReader();

                reader.onload = e => {

                    audioContext.decodeAudioData(reader.result).then(decode => {

                        // O File() esperar receber um array de blob e o nome do arquivo
                        // E demais propriedade podemos passar
                        let file = new File([blob], filename, {

                            type: this._mimeType,
                            lastModified: Date.now()

                        });

                        this.trigger('recorded', file, decode);

                    })

                }

                reader.readAsArrayBuffer(blob);
                
                

            // ************ APENAS TESTANDO O ARQUIVO *********** //
            //     let reader = new FileReader();
            //     reader.onload = e => {
            //         console.log('reader file', file)
            //         let audio = new Audio(reader.result)
            //         audio.play()
            //     }
            //     reader.readAsDataURL(file);
            // ************ TOCOU PERFEITAMENTE *********** //

            })
            this._mediaRecorder.start();
            this.starTimer();

        }

    }

    stopRecorder() {

        if (this.isAvailable()) {

            // Para de gravar
            this._mediaRecorder.stop()

            // Para de ouvir o microfone
            this.stop();
            
            this.stopTimer();

        }

    }

    starTimer() {

        let start = Date.now();

        this._recordMicrofoneInterval = setInterval(() => {

            this.trigger('recordtimer', (Date.now() - start))

        }, 100) // Atualiza 10x por segundo

    }

    stopTimer(){

        // Temos que parar o timer
        clearInterval(this._recordMicrofoneInterval)

    }
}