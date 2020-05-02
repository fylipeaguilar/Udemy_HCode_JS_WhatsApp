const pdfjsLib = require('pdfjs-dist')
const path = require('path')

// Apontando o caminho worker
pdfjsLib.GlobalWorkerOptions.workerSrc = path.resolve(__dirname, '../../dist/pdf.worker.bundle.js')


export class DocumentPreviewController {

    constructor(file) {

        this._file = file;

    }

    getPreviewData() {

        return new Promise((resolve , reject) => {

            // Vamos usar a biblioeca do file reader
            let reader = new FileReader();

            switch (this._file.type) {

                case 'image/png':
                case 'image/jpeg':
                case 'image/jpg':
                case 'image/gif':
                    reader.onload = e => {

                        resolve({

                            src: reader.result,
                            info: this._file.name

                        })

                    }
                    reader.onerror = e => {

                        reject(e)

                    }

                    reader.readAsDataURL(this._file);
                    break;

                case 'application/pdf':
                    reader.onload = e => {

                        // Carregar as propriedades do PDFJS
                        // Fazer uma conversao de um array buffer para array de 8bits
                        pdfjsLib.getDocument(new Uint8Array(reader.result))
                            .then(pdf => {

                            // console.log('pdf', pdf)
                            // pegar o numero da página que queremos
                            pdf.getPage(1).then(page => {

                                // console.log("page", page)

                                // Pegar o viewport que é o espaço de 
                                // visualização da nossa página
                                let viewport = page.getViewport(1);

                                let canvas = document.createElement('canvas')
                                let canvasContext = canvas.getContext('2d')

                                canvas.width = viewport.width;
                                canvas.height = viewport.height;

                                // Método dentro o ViewPage
                                page.render({

                                    canvasContext,
                                    viewport

                                }).then(()=>{

                                    let plural_singular = (pdf.numPages > 1) ? 's' : '';

                                    resolve({

                                        // Caminho da imagem
                                        src: canvas.toDataURL('image/png'),
                                        info: `${pdf.numPages} página${plural_singular}`

                                    })

                                }).catch(err => {

                                    reject(err)

                                })


                            }).catch(err => {

                                reject(err)

                            })

                        }).catch(err => {

                            reject(err)

                        })

                    }

                    reader.readAsArrayBuffer(this._file); 
                break;

                default:
                    reject();

            }

        })

    }

}