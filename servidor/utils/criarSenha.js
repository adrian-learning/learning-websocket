import { randomBytes, scryptSync } from 'crypto'

function criarHashSalt(pass){
    const saltSenha = randomBytes(16).toString('hex')

    const hashSenha = scryptSync(pass, saltSenha, 64).toString('hex')

    return { saltSenha, hashSenha }
}

export default criarHashSalt