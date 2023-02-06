import { obterCookie } from "../utils/cookies.js";
import { alertarERedirecionar, atualizaTextoEditor, tratarAutorizacaoSucesso, atualizaUsuarios } from "./documento.js";

const socket = io('/usuarios',{
  auth: {
    token: obterCookie('jwt')
  }
});

socket.on('connect_error', (error) => {
  alert(error)
  document.location.href = '/login'
})

socket.on('autorizacao_sucesso', tratarAutorizacaoSucesso)

socket.on(`atualizar_users`, atualizaUsuarios)

socket.on('conexao_duplicada', () => {
  alert('Documento já aberto pelo usuário!')
  window.location.href = '/'
})

socket.on("texto_editor_clientes", (texto) => {
  atualizaTextoEditor(texto);
});

socket.on("excluir_documento_sucesso", (nome) => {
  alertarERedirecionar(nome);
});

function selecionarDocumento(dados) {
  socket.emit("selecionar_documento", dados, (texto) => {
    atualizaTextoEditor(texto);
  });
}

function emitirTextoEditor(dados) {
  socket.emit("texto_editor", dados);
}


function emitirExcluirDocumento(nome) {
  socket.emit("excluir_documento", nome);
}


export { emitirTextoEditor, selecionarDocumento, emitirExcluirDocumento };
