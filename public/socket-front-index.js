import { inserirLinkDocumento, removerLinkDocumento } from "./index.js";
import { obterCookie } from './utils/cookies.js'

const socket = io('/usuarios',{
  auth: {
    token: obterCookie('jwt')
  }
});



socket.emit("obter_documentos", (documentos) => {
  documentos.forEach((documento) => {
    inserirLinkDocumento(documento.nome);
  });
});

function emitirAdicionarDocumento(nome) {
  socket.emit("adicionar_documento", nome);
}

socket.on('connect_error', (error) => {
  alert(error)
  document.location.href = '/login'
})

socket.on("adicionar_documento_interface", (nome) => {
  inserirLinkDocumento(nome);
});

socket.on("documento_existente", (nome) => {
  alert(`O documento ${nome} já existe!`);
});

socket.on("excluir_documento_sucesso", (nome) => {
  removerLinkDocumento(nome);
});

export { emitirAdicionarDocumento };
