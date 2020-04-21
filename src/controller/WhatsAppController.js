// ****** Utilizando o sitema de import do Webpack **********//
import { Format } from './../util/Format';
import { CameraController } from './CameraController';
import { DocumentPreviewController } from './DocumentPreviewController'

// Criando a classe "WhatsAppController" para
// ter as funções das nossas regras de negócio
export class WhatsAppController {

    // Criando o métodos construtor
    constructor() {

        // ********** ATRIBUTOS ************
        console.log('WhatsAppController OK')

        // ********** METODOS **************

        // Criando o método para uso do prototype
        this.elementsPrototype();
        // loadElements servirá para criarmos "75" atributos
        this.loadElements();
        // Criando o método para tratar os eventos iniciais
        this.initEvents();

    }

    
    // loadElements servirá para criarmos "75" atributos
    loadElements() {

        this.el = {};

        document.querySelectorAll('[id]').forEach(element => {

            this.el[Format.getCamelCase(element.id)] = element;

        })
        
    }

    // Criando o método do ProtoType
    elementsPrototype() {

        // A ideia é falar em qual classe queremos fazer um prototype
        // Estamos usando o function e não uma arrow function
        // Para amarrar a esse escopo
        Element.prototype.hide = function(){

            this.style.display = 'none'
            return this

        }

        Element.prototype.show = function(){

            this.style.display = 'block'
            return this

        }

        Element.prototype.toggle = function(){

            this.style.display = (this.style.display === 'none') ? 'block' : 'none'
            return this

        }

        Element.prototype.on = function(events, fn){

            events.split(' ').forEach(event => {

                this.addEventListener(event, fn)

            })

            return this

        }

        Element.prototype.css = function(styles){

            for (let name in styles) {

                this.style[name] = styles[name]

            }

            return this

        }

        Element.prototype.addClass = function(name) {

            this.classList.add(name)
            return this

        }

        Element.prototype.removeClass = function(name) {

            this.classList.remove(name)
            return this

        }

        Element.prototype.toggleClass = function(name) {

            this.classList.toggle(name)
            return this

        }

        Element.prototype.hasClass = function(name) {

            return this.classList.contains(name)

        }

        HTMLFormElement.prototype.getForm = function () {

            return new FormData(this)

        }

        HTMLFormElement.prototype.toJSON = function () {

            let json = {}
            this.getForm().forEach((value, key) => {

                json[key] = value

            })

            return json;

        }


    } // ******** Fechando o método do prototype *********** //

    // Criando o método para tratar os eventos iniciais
    initEvents() {

        // ******************** PROFILE ****************************
        // ****** Abrir o painel do Profile *********
        // Para "escutar" o evento de botão da imagem
        this.el.myPhoto.on('click', e => {

            // Antes de abrir um painel, fechamos um existente
            this.closeAllLeftPanel();


            // Abrindo o painel de edicao do user
            this.el.panelEditProfile.show();
            // Usamos o timeout nesse caso para fazer o translation
            this.el.panelAddContact.show();

            setTimeout(() => {
                
                this.el.panelEditProfile.addClass('open');

            }, 300)
            

        })

        // ****** Fechar o painel do Profile *********
        // Para "escutar" o evento de botão da imagem
        this.el.btnClosePanelEditProfile.on('click', e => {

            // Fechando o painel de edicao do user
            this.el.panelEditProfile.removeClass('open');

        })

        // Alterar a foto do perfil
        this.el.photoContainerEditProfile.on('click', e=> {

            // Primeiro abrir a janela do sistema operacional
            // para selecionar a foto
            // Neste caso, forcamos um click direto no inputfile
            this.el.inputProfilePhoto.click()

        })

        // Selecionando o campo para alteração do nome
        // Neste caso não é um evento de click, é "precionado o campo"
        this.el.inputNamePanelEditProfile.on('keypress', e=>{

            if(e.key === 'Enter') {

                // Cancela o comportamento padrão
                e.preventDefault();
                this.el.btnSavePanelEditProfile.click();


            }

        })

        // Configurando o click do botão salvar
        this.el.btnSavePanelEditProfile.on('click', e => {

            //sdfsd
            // Como é uma div o valor vem do innerHTML
            console.log(this.el.inputNamePanelEditProfile.innerHTML)


        })

        // ******************** PROFILE ****************************


        // ******************** CONTACT ****************************
        // ****** Abrir o painel de seleção de contact *********
        // Para "escutar" o evento de botão da imagem
        this.el.btnNewContact.on('click', e => {

            // Antes de abrir um painel, fechamos um existente
            this.closeAllLeftPanel();
            
            // Abrindo o painel de contatos
            // Usamos o timeout nesse caso para fazer o translation
            this.el.panelAddContact.show();

            setTimeout(() => {
                
                this.el.panelAddContact.addClass('open');

            }, 300)

        })

        // ****** Fechar o painel de seleção de conversa *********
        this.el.btnClosePanelAddContact.on('click', e => {

            // Fechando o painel de novas conversas
            this.el.panelAddContact.removeClass('open');

        })

        // Adicionar um novo "e-mail" de contato


        // ******************** CONTACT ****************************

        this.el.formPanelAddContact.on('submit', e => {

            e.preventDefault();
            
            // Usando o formData
            // O FormData já trata os campo recuperados de um formulário
            // com base no "name"
            let formData = new FormData(this.el.formPanelAddContact);



        })

        // **************** CONVERSAs ************************************
        // Abrindo a conversa de um determinado contato
        // Cada contato tem uma div, vamos procuprar pela classe
        this.el.contactsMessagesList.querySelectorAll('.contact-item')
            .forEach(item => {

                item.on('click', e=> {
                    // Ocutando a div do home
                    this.el.home.hide();

                    // Mostrando o painel (note que o mesmo é flex)
                    this.el.main.css({

                        display: 'flex'

                    })
                    
                })

            })

        // Implementação do "cplis" função de anexar arquivos a conversa
        this.el.btnAttach.on('click', e => {

            // O "stopPropagation" é para nãõ executar a função para os "ancestrais"
            e.stopPropagation()
            
            // Abre uma janela para selecionar o tipo de arquivo a ser anexado
            this.el.menuAttach.addClass('open')

            // Clicando fora dos botões, o menu tem que fechar
            // O bind aqui é para falar que esse escobo é o nosso this
            document.addEventListener('click', this.closeMenuAttach.bind(this));

        })

        // Criando o evento de click para Foto
        this.el.btnAttachPhoto.on('click', e => {

            // Ativando o input foto
            this.el.inputPhoto.click();

        })

        // ************** CAMERA ***************************************** //

        this.el.inputPhoto.on('change', e => {

            console.log(this.el.inputPhoto.files);

            // É uma coleção, temos que usar o spread
            [...this.el.inputPhoto.files].forEach( file => {

                console.log(file);

            })

        })
        
        this.el.btnAttachCamera.on('click', e => {

            // Esconder todos os paineis principais
            this.closeAllMainPanel();

            // Abrir o painel da camera
            this.el.panelCamera.addClass('open');
            this.el.panelCamera.css({

                'height': 'calc(100% - 120px)'

            })

            // Instaciando o objeto da camera
            // Ja passando para o nosso controle a div que ele vai
            // mostrar a imagem em tempo real pelo id: videoCamera (this.el.videoCamera)
            this._camera = new CameraController(this.el.videoCamera);

        })

        // Fechar o painel da câmera
        this.el.btnClosePanelCamera.on('click', e=> {

            this.el.panelCamera.removeClass('open');

            // Reezibir o painel do container de mensagens
            this.el.panelMessagesContainer.show()

            // Fechar a funcao da camera no PC
            this._camera.stop()

        })

        // Abrir a função de tirar foto
        this.el.btnTakePicture.on('click', e => {

            let dataUrl =this._camera.tackPicture();

            this.el.pictureCamera.src = dataUrl;

            // Mostrando a foto
            this.el.pictureCamera.show();

            // Escondendo o vídeo
            this.el.videoCamera.hide();

            // Exibindo o botão para tirar foto novamente
            this.el.btnReshootPanelCamera.show();

            // Esconder o botão de tirar foto
            this.el.containerTakePicture.hide()
                        
            // Adicionar o botão de enviar a foto
            this.el.containerSendPicture.show()

        })

        this.el.btnReshootPanelCamera.on('click', e => {

            // Esconder a foto
            this.el.pictureCamera.hide();

            // Exibir o vídeo
            this.el.videoCamera.show();

            // Esconder o botão para tirar foto novamente
            this.el.btnReshootPanelCamera.hide();

            // Exibir o botão de tirar foto
            this.el.containerTakePicture.show()
                        
            // Esconder o botão de enviar a foto
            this.el.containerSendPicture.hide()

        })

        // Enviar a foto
        this.el.btnSendPicture.on('click', e => {

            console.log(this.el.pictureCamera.src)

        })

        // ************** FIM CAMERA ***************************** //


        // ************** DOCUMENTOS ***************************** //
        this.el.btnAttachDocument.on('click', e => {

            // Esconder todos os paineis principais
            this.closeAllMainPanel();

            // Exibindo o painel de documentos
            this.el.panelDocumentPreview.addClass('open')

            this.el.panelDocumentPreview.css({

                'height': 'calc(100% - 120px)'

            })

            // Para abrir uma nova janela do windows para selecionar
            // o arquivo que queremos enviar
            this.el.inputDocument.click();

        })

        // Verificar se houve mudanca, selecao dos arquivos
        this.el.inputDocument.on('change', e => {

            // Antes de tudo, vamos verificar se está retornando alguma coisa
            if(this.el.inputDocument.files.length) {

                // Dentro dessa variável, teremos uma lista de files
                // Iremos pegar o primeiro
                let file = this.el.inputDocument.files[0]

                this._documentPreviewController = new DocumentPreviewController(file);

                this._documentPreviewController.getPreviewData().then(result => {

                    // console.log(file.type)

                    this.el.filePanelDocumentPreview.hide();
                    this.el.imagePanelDocumentPreview.show();
                    // Se é uma imagem teremos o src e inserimoso conteudo de data
                    // Nesse caso o result é um objeto
                    this.el.imgPanelDocumentPreview.src = result.src;
                    this.el.infoPanelDocumentPreview.innerHTML = result.info;
                    

                }).catch(err => {

                    console.log("Entrei aqui");
                    console.log(file.type);

                    switch (file.type) {
                        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                        case 'application/msword':
                            // this.el.iconPanelDocumentPreview.classList.value = 'jcxhw icon-doc-doc';
                            break;

                        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                        case 'application/vnd.ms-excel':
                            // this.el.iconPanelDocumentPreview.classList.value = 'jcxhw icon-doc-xls';
                            break;

                        case 'application/vnd.ms-powerpoint':
                        case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
                            // this.el.iconPanelDocumentPreview.classList.value = 'jcxhw icon-doc-ppt';
                            break;

                        default:
                            // this.el.iconPanelDocumentPreview.classList.value = 'jcxhw icon-doc-generic';
                    }


                })

            }           

        })

        // Fechar o painel de documentos

        this.el.btnClosePanelDocumentPreview.on('click', e => {

            // Esconder todos os paineis principais
            this.closeAllMainPanel();

            // Reezibir o painel do container de mensagens
            this.el.panelMessagesContainer.show()

        })

        this.el.btnSendDocument.on('click', e => {

            console.log('Enviar para o Firebse???')

        })
        // ************** FIM - DOCUMENTOS ***************************** //


        // ************** CONTATOS ***************************** //

        this.el.btnAttachContact.on('click', e => {

            this.el.modalContacts.show();

        })

        // Fechar o modal dos contatos

        this.el.btnCloseModalContacts.on('click', e => {

            this.el.modalContacts.hide();

        })

        // ************** CONTATOS ***************************** //

        // ************** MICROFONE ***************************** //

        this.el.btnSendMicrophone.on('click', e => {

            // Esconder o botão do microfone
            this.el.btnSendMicrophone.hide()

            // Vamos exibir o painel de gravacao de audio
            this.el.recordMicrophone.show()

            // Dispara o contador do time da gravacao
            this.recordMicrophoneTime()

        })

        this.el.btnCancelMicrophone.on('click', e => {

            this.closeRecordMicrofone()

        })

        this.el.btnFinishMicrophone.on('click', e => {

            this.closeRecordMicrofone()

        })

        // ************** FIM - MICROFONE ***************************** //


        // ************** INICIO DO CHAT ***************************** //

        this.el.inputText.on('keypress', e => {

            if( e.key === 'Enter' && !e.ctrlKey) {

                e.preventDefault();

                this.el.btnSend.click();
            }

        });


        this.el.inputText.on('keyup', e => {

            // Se tiver alguma coisa no campo, esconderemos o placeholder
            if(this.el.inputText.innerHTML.length){

                this.el.inputPlaceholder.hide();
                this.el.btnSendMicrophone.hide();
                this.el.btnSend.show();

            } else {

                this.el.inputPlaceholder.show();
                this.el.btnSendMicrophone.show();
                this.el.btnSend.hide();

            }

        });

        this.el.btnSend.on('click', e => {

            console.log(this.el.inputText.innerHTML);


        });

        // Abril o panel do emoji
        this.el.btnEmojis.on('click', e => {

            this.el.panelEmojis.toggleClass('open');
            
        });

        //Selecionando o emoji
        this.el.panelEmojis.querySelectorAll('.emojik').forEach( emoji => {

            // Criar um evento para cada um dos emoji
            emoji.on('click', e => {

                // console.log('Cheguei no emoji');
                let img = this.el.imgEmojiDefault.cloneNode();

                img.style.cssText = emoji.style.cssText;
                img.dataset.unicode = emoji.dataset.unicode;
                img.alt = emoji.dataset.unicode;

                // ForEach para listar todsas as classes do emoji
                emoji.classList.forEach(name => {

                    img.classList.add(name);

                })

                // console.log('Sai do click do emoji')
                // this.el.inputText.appendChild(img)

                // getSelection é uma função nativa do JS que pega a posição do teclado
                let cursor = window.getSelection();

                // Verificar se o nosso cursor está focado dentro do nosso campo input (focusNode)
                if (!cursor.focusNode || !cursor.focusNode == 'input-text') {

                    this.el.inputText.focus();
                    cursor = window.getSelection();

                }

                // Método nativo do JS para verificar um range de valores
                let range = document.createRange();

                range = cursor.getRangeAt(0);

                // deleteContents é um metodo nativo do JS que apaga o range selecionado
                range.deleteContents();

                // Adicionar o conteudo (neste caso o emoji), no ponto em questão
                let frag = document.createDocumentFragment();

                frag.appendChild(img);

                range.insertNode(frag);

                // Jogando o cursor para o final do arquivo
                range.setStartAfter(img);

                // Caso o emoji seja a primeira coisa digitada
                // Forcamos o evento de keyup para apagar o placeholder
                this.el.inputText.dispatchEvent(new Event('keyup'));

            });

        }); // ************** FIM DO CHAT ***************************** //

     } // ************** FIM do initEvents() ******************************

    // Criando um método para esconder todos os paineis
    // Isso pq os painel ficam "um sobre o outro"
    closeAllLeftPanel() {

        this.el.panelAddContact.hide();
        this.el.panelEditProfile.hide();

    }

    closeMenuAttach(e) {

        document.removeEventListener('click', this.closeMenuAttach);
        this.el.menuAttach.removeClass('open');
        // console.log('removeu menu')

    }

    // Método para esconder todos os paineis principais
    closeAllMainPanel(){

        // Esconder o painel do container de mensagens
        this.el.panelMessagesContainer.hide();

        // Esconder o painel do container de documentos
        this.el.panelDocumentPreview.removeClass('open');

        // Esconder o painel do container da camera
        this.el.panelCamera.removeClass('open');

    }

    closeRecordMicrofone() {

        this.el.recordMicrophone.hide();
        this.el.btnSendMicrophone.show();

        // Temos que parar o timer
        clearInterval(this._recordMicrofoneInterval)

    }

    recordMicrophoneTime() {

        let start = Date.now();

        this._recordMicrofoneInterval = setInterval(() => {

            this.el.recordMicrophoneTimer.innerHTML = Format.toTime(Date.now() - start);

        }, 100) // Atualiza 10x por segundo

    }

}