import { scryptSync, timingSafeEqual } from 'crypto'

function autenticarUsuario(pass, userDb){
    const hashTest = scryptSync(pass, userDb.saltSenha, 64)

    const hashReal = Buffer.from(userDb.hashSenha, 'hex')

    const autenticado = timingSafeEqual(hashReal, hashTest)

    return autenticado
}

export default autenticarUsuario