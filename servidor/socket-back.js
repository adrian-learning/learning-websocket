import 'dotenv/config'

import registrarEventoCadastro from "./registrarEventos/cadastro.js";
import registrarEventosDocumentos from "./registrarEventos/eventosDocumentos.js";
import registrarEventosIndex from "./registrarEventos/eventosIndex.js";
import registrarLoginUsuario from "./registrarEventos/login.js";
import io from "./servidor.js";

import autorizarUsuario from './middlewares/autorizarUsuario.js';

const namespaceUsuarios = io.of('/usuarios')

namespaceUsuarios.use(autorizarUsuario)

namespaceUsuarios.on('connection', (socket) => {
    registrarEventosIndex(socket, namespaceUsuarios)
    registrarEventosDocumentos(socket, namespaceUsuarios)
    
})

io.of('/').on("connection", (socket) => {
    registrarEventoCadastro(socket, io)
    registrarLoginUsuario(socket,io)
});
