import jwt from 'jsonwebtoken'

function autorizarUsuario(socket, next){
    const jwtToken = socket.handshake.auth.token

    try{
        const payload = jwt.verify(jwtToken, process.env.SECRET_JWT)
        
        socket.emit('autorizacao_sucesso', payload)
        next()
    }catch(e){
        next(e)
    }
}

export default autorizarUsuario