import criarHashSalt from '../utils/criarSenha.js'
import { usuariosColecao } from './dbConnect.js'

function cadastrarUsuario(user, pass){
    const { saltSenha, hashSenha } = criarHashSalt(pass)

    return usuariosColecao.insertOne({ user, hashSenha, saltSenha })
}

function encontrarUsuario(user){
    return usuariosColecao.findOne({user})
}

export { cadastrarUsuario, encontrarUsuario }