import { cadastrarUsuario, encontrarUsuario } from "../db/cadastroDb.js"

function registrarEventoCadastro(socket, io){
    socket.on('cadastrar_usuario', async ({user, pass}) => {
        const exist = await encontrarUsuario(user)

        if(!exist){
            const result = await cadastrarUsuario(user, pass)
            
            if(result.acknowledged){
                socket.emit('cadastro_realizado')
            }else{
                socket.emit('cadastro_error')
            }

        }else{
            socket.emit('cadastro_existente')
        }
    })
}

export default registrarEventoCadastro