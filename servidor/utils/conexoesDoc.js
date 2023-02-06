const connections = []

function addUser(nomeDoc, nomeUser){
    connections.push({documento: nomeDoc, usuario: nomeUser})
    console.log(connections)
}

function getUsersByDoc(nomeDoc){
    return connections.filter(connection => connection.documento === nomeDoc)
                     .map(connection => connection.usuario)
}

function removeUser(nomeUser, nomeDoc){
    const index = connections.findIndex(connection => connection.usuario == nomeUser && connection.documento == nomeDoc)

    if(index > -1){
        connections.splice(index, 1)
    }
}

function encontrarConexao(nomeUser, nomeDoc){
    return connections.find(connection => connection.usuario == nomeUser && connection.documento == nomeDoc)
}


export { addUser, getUsersByDoc, removeUser, encontrarConexao }