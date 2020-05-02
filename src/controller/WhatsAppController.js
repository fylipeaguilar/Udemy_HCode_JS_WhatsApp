// ****** Utilizando o sitema de import do Webpack **********//
import { Format } from './../util/Format';
import { CameraController } from './CameraController';
import { MicrophoneController } from './MicrophoneController';
import { DocumentPreviewController } from './DocumentPreviewController'
import { Firebase } from './../util/Firebase'
import { User } from '../model/User';
import { Chat } from '../model/Chat';
import { Message } from '../model/Message'

// Criando a classe "WhatsAppController" para
// ter as funções das nossas regras de negócio
export class WhatsAppController {

    // Criando o métodos construtor
    constructor() {

        // ********** ATRIBUTOS ************
        // console.log('WhatsAppController OK')

        // Criando a instancia da base do fire base
        this._firebase = new Firebase();
        
        // ********** METODOS **************

        this.initAuth();

        // Criando o método para uso do prototype
        this.elementsPrototype();
        // loadElements servirá para criarmos "75" atributos
        this.loadElements();
        // Criando o método para tratar os eventos iniciais
        this.initEvents();

    }

    // Autenticação com a base de dados
    initAuth() {

        this._firebase.initAuth()
            .then( response => {

                // console.log(response);

                this._user = new User(response.user.email);

                // Ouvindo mudanca de evento do banco
                // Para atualizar demais telas
                // O evento "datachange" não é nativo, iremos criá-lo
                this._user.on('datachange', data => {

                    // Itens que a aplicacao irá atualizar
                    // Atualizando o titulo
                    document.querySelector('title').innerHTML = data.name + ' - WhatsApp';

                    // Atualizando o nome
                    this.el.inputNamePanelEditProfile.innerHTML = data.name;

                    // Atualizando a foto
                    if(data.photo){

                        let photo = this.el.imgPanelEditProfile;
                        photo.src = data.photo;
                        photo.show();
                        this.el.imgDefaultPanelEditProfile.hide();

                        let photo_superior = this.el.myPhoto.querySelector('img');
                        photo_superior.src = data.photo;
                        photo_superior.show();

                    }

                    this.initContacts()

                })

                this._user.name = response.user.displayName;
                this._user.email = response.user.email;
                this._user.photo = response.user.photoURL;

                this._user.save().then(() => {

                    this.el.appContent.css({

                        display: 'flex'
    
                    });

                });

            })
            .catch( err => {

                console.error(err);
    
            });

    }

    // Buscando e listando os contatos
    initContacts(){

        this._user.on('contactschange', docs => {

            // Limpar a nossa lista atual
            this.el.contactsMessagesList.innerHTML = '';

            docs.forEach(doc => {

                let contact = doc.data();
                
                let div = document.createElement('div')

                div.className = 'contact-item'

                div.innerHTML = `<div class="dIyEr">
                            <div class="_1WliW" style="height: 49px; width: 49px;">
                                <img src="#" class="Qgzj8 gqwaM photo" style="display:none;">
                                <div class="_3ZW2E">
                                    <span data-icon="default-user" class="">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212 212" width="212" height="212">
                                            <path fill="#DFE5E7" d="M106.251.5C164.653.5 212 47.846 212 106.25S164.653 212 106.25 212C47.846 212 .5 164.654.5 106.25S47.846.5 106.251.5z"></path>
                                            <g fill="#FFF">
                                                <path d="M173.561 171.615a62.767 62.767 0 0 0-2.065-2.955 67.7 67.7 0 0 0-2.608-3.299 70.112 70.112 0 0 0-3.184-3.527 71.097 71.097 0 0 0-5.924-5.47 72.458 72.458 0 0 0-10.204-7.026 75.2 75.2 0 0 0-5.98-3.055c-.062-.028-.118-.059-.18-.087-9.792-4.44-22.106-7.529-37.416-7.529s-27.624 3.089-37.416 7.529c-.338.153-.653.318-.985.474a75.37 75.37 0 0 0-6.229 3.298 72.589 72.589 0 0 0-9.15 6.395 71.243 71.243 0 0 0-5.924 5.47 70.064 70.064 0 0 0-3.184 3.527 67.142 67.142 0 0 0-2.609 3.299 63.292 63.292 0 0 0-2.065 2.955 56.33 56.33 0 0 0-1.447 2.324c-.033.056-.073.119-.104.174a47.92 47.92 0 0 0-1.07 1.926c-.559 1.068-.818 1.678-.818 1.678v.398c18.285 17.927 43.322 28.985 70.945 28.985 27.678 0 52.761-11.103 71.055-29.095v-.289s-.619-1.45-1.992-3.778a58.346 58.346 0 0 0-1.446-2.322zM106.002 125.5c2.645 0 5.212-.253 7.68-.737a38.272 38.272 0 0 0 3.624-.896 37.124 37.124 0 0 0 5.12-1.958 36.307 36.307 0 0 0 6.15-3.67 35.923 35.923 0 0 0 9.489-10.48 36.558 36.558 0 0 0 2.422-4.84 37.051 37.051 0 0 0 1.716-5.25c.299-1.208.542-2.443.725-3.701.275-1.887.417-3.827.417-5.811s-.142-3.925-.417-5.811a38.734 38.734 0 0 0-1.215-5.494 36.68 36.68 0 0 0-3.648-8.298 35.923 35.923 0 0 0-9.489-10.48 36.347 36.347 0 0 0-6.15-3.67 37.124 37.124 0 0 0-5.12-1.958 37.67 37.67 0 0 0-3.624-.896 39.875 39.875 0 0 0-7.68-.737c-21.162 0-37.345 16.183-37.345 37.345 0 21.159 16.183 37.342 37.345 37.342z"></path>
                                            </g>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="_3j7s9">
                            <div class="_2FBdJ">
                                <div class="_25Ooe">
                                    <span dir="auto" title="${contact.name}" class="_1wjpf">${contact.name}</span>
                                </div>
                                <div class="_3Bxar">
                                    <span class="_3T2VG">${contact.lastMessageTime}</span>
                                </div>
                            </div>
                            <div class="_1AwDx">
                                <div class="_itDl">
                                    <span title="digitando…" class="vdXUe _1wjpf typing" style="display:none">digitando…</span>

                                    <span class="_2_LEW last-message">
                                        <div class="_1VfKB">
                                            <span data-icon="status-dblcheck" class="">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18">
                                                    <path fill="#263238" fill-opacity=".4" d="M17.394 5.035l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-.427-.388a.381.381 0 0 0-.578.038l-.451.576a.497.497 0 0 0 .043.645l1.575 1.51a.38.38 0 0 0 .577-.039l7.483-9.602a.436.436 0 0 0-.076-.609zm-4.892 0l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-2.614-2.556a.435.435 0 0 0-.614.007l-.505.516a.435.435 0 0 0 .007.614l3.887 3.8a.38.38 0 0 0 .577-.039l7.483-9.602a.435.435 0 0 0-.075-.609z"></path>
                                                </svg>
                                            </span>
                                        </div>
                                        <span dir="ltr" class="_1wjpf _3NFp9">${contact.lastMessage}</span>
                                        <div class="_3Bxar">
                                            <span>
                                                <div class="_15G96">
                                                    <span class="OUeyt messages-count-new" style="display:none;">1</span>
                                                </div>
                                        </span></div>
                                        </span>
                                </div>
                            </div>
                        </div> `;

                if(contact.photo) {

                    let img = div.querySelector('.photo');
                    img.src = contact.photo;
                    img.show();

                }

                // Selecionando o contato
                // criando um evento de click, após criar a div do usuario
                div.on('click', e => {

                    this.setActiveChat(contact)

                })
                
                this.el.contactsMessagesList.appendChild(div);
            })

        });
        
        this._user.getContacts();

    }

    // Selecionar o chat 
    setActiveChat(contact) {

        // Verificando se existe um contato ativo
        if(this._contactActive) {

            // Recebe um "vazio" para já existe um ativo 
            // É para zerar o Listener anterior
            Message.getRef(this._contactActive.chatId).onSnapshot(()=>{})

        }

        // Guardar o contato ativo
        this._contactActive = contact;

        //console.log('chatId', contact.chatId)

        // Atualizar os dados do nome do contato
        this.el.activeName.innerHTML = contact.name;

        // Atualizar os dados do status
        this.el.activeStatus.innerHTML = contact.status;

        // Antes de atualizar os dados da photo, verificar se existe photo
        if(contact.photo) {

            let img = this.el.activePhoto;
            img.src = contact.photo;
            img.show();

        }

        // Escondendo o painel "home" para mostrar as mensagens
        this.el.home.hide();

        // Mostrar o painel "main"
        this.el.main.css({

            display: 'flex'

        });

        // Limpando o conteudo do container
        this.el.panelMessagesContainer.innerHTML = '';

        // Primeiro vamos carregar a referencia da mensagem
        Message.getRef(this._contactActive.chatId).orderBy('timeStamp').onSnapshot(docs => {

             // Verificando as configurações do Scroll
             let scrollTop = this.el.panelMessagesContainer.scrollTop;

             // Calculo é o limite que conseguiremos descer
             let scrollTopMax = (this.el.panelMessagesContainer.scrollHeight - this.el.panelMessagesContainer.offsetHeight)

             let autoScroll = (scrollTop >= scrollTopMax)

            docs.forEach( doc => {

                let data = doc.data();
                data.id = doc.id;

                let message = new Message();

                // Carregando o JSON
                message.fromJSON(data);

                let me = (data.from === this._user.email);

                // Verificando se a mensagem já existe
                // para não incluir novamente
                if (!this.el.panelMessagesContainer.querySelector('#_' + data.id)) {

                    // Verificando se a mensagem é do meu contato
                    // (para fazer o "double check blue")
                    if (!me) {

                        doc.ref.set({

                            status: 'read'

                        }, 
                            // Fazer o merge para não perder o conteúdo
                            {

                                merge: true

                        });

                    }

                    let view = message.getViewElement(me);

                    // Agora vamos adicionar as mensagens dentro do panel
                    this.el.panelMessagesContainer.appendChild(view);

                } else if (me) {

                    let msgEl = this.el.panelMessagesContainer.querySelector('#_' + data.id)

                    // A propriedade outerHTML é para pegar  o conteúdo com
                    // o seu próprio elemento
                    msgEl.querySelector('.message-status').innerHTML = message.getStatusViewElement().outerHTML;
                }

            });

            if(autoScroll) {

                this.el.panelMessagesContainer.scrollTop = this.el.panelMessagesContainer.scrollHeight - this.el.panelMessagesContainer.offsetHeight

            } else {

                this.el.panelMessagesContainer.scrollTop = scrollTop;

            }

        });

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

        // Busca no grampo profile
        this.el.inputSearchContacts.on('keyup', e => {

            // Verificando se o conteudo do campo é maior que 0
            if(this.el.inputSearchContacts.value.length > 0) {

                this.el.inputSearchContactsPlaceholder.hide();

            } else {

                this.el.inputSearchContactsPlaceholder.show();

            }

            // console.log(this.el.inputSearchContacts.value)
            this._user.getContacts(this.el.inputSearchContacts.value);
            
        })

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

            // Para não deixar ficar apertando o botão várias vezes
            this.el.btnSavePanelEditProfile.disabled = true

            //this._user.name 
            // this._user variável criada para manipular os dados do usuário
            // name = propriedade criada nos getteres e setteres
            this._user.name = this.el.inputNamePanelEditProfile.innerHTML

            // Enviar para o firebase
            // Aplicando o DAO
            this._user.save().then(() => {

                // Habilitando novamente o botão
                this.el.btnSavePanelEditProfile.disabled = false

            })

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

            let contact = new User(formData.get('email'));

            contact.on('datachange', data => {

                if(data.name) {

                    // Antes de adiocionar o contato, já podemos criar o "chat"
                    // Se já existir, só traz a referencia do id, senão cria o chat
                    Chat.createIfNotExists(this._user.email, contact.email).then(chat => {
 
                        // Colocamos o id do chat no contato que estamos criando
                        contact.chatId = chat.id;

                        // Adicionando o id no meu próprio usuário
                        this._user.chatId = chat.id; 

                        contact.addConctat(this._user);

                        this._user.addConctat(contact).then(()=>{

                            // Fechar os paineis
                            this.el.btnClosePanelAddContact.click();
                            // Debug
                            console.info('Contato foi adicionado');
    
                        });

                    })

                } else {

                    console.error('Usuário não foi encontrado ');

                }

            })

            

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

                    });
                    
                });

            });

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

            // console.log(this.el.inputPhoto.files);

            // É uma coleção, temos que usar o spread
            [...this.el.inputPhoto.files].forEach( file => {

                // console.log(file);
                Message.sendImage(
                    this._contactActive.chatId,
                    this._user.email,
                    file
                );

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

            // console.log(this.el.pictureCamera.src)

        })

        // ************** FIM CAMERA ***************************** //


        // ************** DOCUMENTOS ***************************** //
        this.el.btnAttachDocument.on('click', e => {

            // Esconder todos os paineis principais
            this.closeAllMainPanel();

            // Exibindo o painel de documentos
            this.el.panelDocumentPreview.addClass('open')

            this.el.panelDocumentPreview.css({

                'height': '1%'

            });

            // Para abrir uma nova janela do windows para selecionar
            // o arquivo que queremos enviar
            this.el.inputDocument.click();

        })

        // Verificar se houve mudanca, selecao dos arquivos
        this.el.inputDocument.on('change', e => {

            // Antes de tudo, vamos verificar se está retornando alguma coisa
            if(this.el.inputDocument.files.length) {

                this.el.panelDocumentPreview.css({

                    'height': 'calc(100% - 120px)',
                    'aligin': 'center'
    
                });

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

                    this.el.panelDocumentPreview.css({

                        'height': 'calc(100% - 120px)'
        
                    });
                    

                }).catch(err => {

                    this.el.panelDocumentPreview.css({

                        'height': 'calc(100% - 120px)'
        
                    });

                    console.log("Entrei aqui");
                    console.log(file.type);

                    switch (file.type) {
                        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                        case 'application/msword':
                            this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-doc';
                            break;

                        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                        case 'application/vnd.ms-excel':
                            this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-xls';
                            break;

                        case 'application/vnd.ms-powerpoint':
                        case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
                            this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-ppt';
                            break;

                        default:
                            this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-generic';
                    }

                    this.el.filenamePanelDocumentPreview.innerHTML = file.name;

                    this.el.filePanelDocumentPreview.show();
                    this.el.imagePanelDocumentPreview.hide();

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
            this.el.btnSendMicrophone.hide();

            // Vamos exibir o painel de gravacao de audio
            this.el.recordMicrophone.show();

            this._microphoneController = new MicrophoneController();

            // Esse método "on" não é nativo do JS
            // Ele está vindo da classe ClassEvents
            this._microphoneController.on('ready', audio => {

                // console.log('Ready event')

                // Comecando a gravar o audio
                this._microphoneController.startRecorder();

            })

            this._microphoneController.on('recordtimer', timer => {

                this.el.recordMicrophoneTimer.innerHTML = Format.toTime(timer);

            })

        })

        this.el.btnCancelMicrophone.on('click', e => {

            this._microphoneController.stopRecorder();
            this.closeRecordMicrofone();

        })

        this.el.btnFinishMicrophone.on('click', e => {

            this._microphoneController.stopRecorder();
            this.closeRecordMicrofone();

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

            //console.log(this.el.inputText.innerHTML);

            Message.send(
                this._contactActive.chatId,
                this._user.email,
                'text',
                this.el.inputText.innerHTML);

            // Após enviar a mensagem, vamos limpar o campo
            this.el.inputText.innerHTML = '';

            // Casso a mensagem tenha sido um emoji, vamos fechar o painel
            this.el.panelEmojis.removeClass('open');



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

    }

    
}