import {
  emitirExcluirDocumento,
  emitirTextoEditor,
  selecionarDocumento,
} from "./socket-front-documento.js";

const parametros = new URLSearchParams(window.location.search);
const nomeDocumento = parametros.get("nome");

const textoEditor = document.getElementById("editor-texto");
const tituloDocumento = document.getElementById("titulo-documento");
const botaoExcluir = document.getElementById("excluir-documento");
const listaUsuarios = document.getElementById('usuarios-conectados')

tituloDocumento.textContent = nomeDocumento || "Documento sem título";

function tratarAutorizacaoSucesso(payloadToken){
  selecionarDocumento({ nomeDocumento, nomeUsuario: payloadToken.user});
}


textoEditor.addEventListener("keyup", () => {
  emitirTextoEditor({
    texto: textoEditor.value,
    nomeDocumento,
  });
});

function atualizaTextoEditor(texto) {
  textoEditor.value = texto;
}

botaoExcluir.addEventListener("click", () => {
  emitirExcluirDocumento(nomeDocumento);
});

function alertarERedirecionar(nome) {
  if (nome === nomeDocumento) {
    alert(`Documento ${nome} excluído!`);
    window.location.href = "/";
  }
}

function atualizaUsuarios({usuarios}){
    listaUsuarios.innerHTML = ''
    usuarios.forEach(user => {
      listaUsuarios.innerHTML += `
        <li class="list-group-item">${user}</li>
      `
    });
}

export { atualizaTextoEditor, alertarERedirecionar, tratarAutorizacaoSucesso, atualizaUsuarios};
