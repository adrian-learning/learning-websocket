import { definirCookie } from "../utils/cookies.js"
import { clearForm } from "./login.js"
const socket = io()

function emitirAutenticar(dados){
    socket.emit('autenticar_usuario', dados)
}


socket.on('autenticacao_sucesso', (token) => {
    definirCookie('jwt', token)

    alert('Autenticado com sucesso')
    window.location.href = '/'
})

socket.on('autenticacao_error', () => {
    alert('Falha na Autenticação')
    clearForm()
})


export { emitirAutenticar }