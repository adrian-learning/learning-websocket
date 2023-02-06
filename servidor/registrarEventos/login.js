import { encontrarUsuario } from '../db/cadastroDb.js'
import autenticarUsuario from '../utils/autenticarUsuario.js'
import gerarToken from '../utils/gerarToken.js'

function registrarLoginUsuario(socket, io){
    socket.on('autenticar_usuario',async ({user, pass}) => {
        const usuario = await encontrarUsuario(user)

        if(usuario){
            const autenticado = autenticarUsuario(pass, usuario)
    
            if(autenticado){
                const token = gerarToken({user})
                socket.emit('autenticacao_sucesso', token)
            }else{
                socket.emit('autenticacao_error')
            }
        }else{
            socket.emit('autenticacao_error')
        }

    })
}

export default registrarLoginUsuario