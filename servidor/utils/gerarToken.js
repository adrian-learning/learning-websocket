import jwt from 'jsonwebtoken'

function gerarToken(payload){
    const token = jwt.sign(payload, process.env.SECRET_JWT,{
        expiresIn: '1h'
    })

    return token
}

export default gerarToken