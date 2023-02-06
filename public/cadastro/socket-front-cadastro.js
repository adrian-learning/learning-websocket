import { clearForm } from "./cadastro.js"
const socket = io()

function emitirCadastro(dados){
    socket.emit('cadastrar_usuario', dados)
}

socket.on('cadastro_realizado', () => {
    clearForm()
    alert('Cadastrado com Sucesso!')
})

socket.on('cadastro_error', () => {
    clearForm()
    alert('Erro ao cadastrar!')
})

socket.on('cadastro_existente', () => {
    clearForm()
    alert('Usuario já existe!')
})

export { emitirCadastro }