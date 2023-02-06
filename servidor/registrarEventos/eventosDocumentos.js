import {
    atualizaDocumento,
    encontrarDocumento,
    excluirDocumento,
  } from "../db/documentosDb.js";
import { addUser, getUsersByDoc, removeUser, encontrarConexao } from "../utils/conexoesDoc.js";


function registrarEventosDocumentos(socket, io){
    socket.on("selecionar_documento", async ({nomeDocumento, nomeUsuario}, devolverTexto) => {


      const documento = await encontrarDocumento(nomeDocumento);
      
      if (documento) {
          socket.join(nomeDocumento);

          if(!encontrarConexao(nomeUsuario,nomeDocumento)){

            socket.data = {
              connected: true
            }
            
            addUser(nomeDocumento, nomeUsuario)
  
            const usersDoc = getUsersByDoc(nomeDocumento)
  
            io.to(nomeDocumento).emit('atualizar_users', {usuarios: usersDoc})
  
            devolverTexto(documento.texto);
            
          }else{
            socket.emit('conexao_duplicada')
          }

        }

      socket.on("texto_editor", async ({ texto, nomeDocumento }) => {
        const atualizacao = await atualizaDocumento(nomeDocumento, texto);
    
        if (atualizacao.modifiedCount) {
          socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
        }
      });
    
      socket.on("excluir_documento", async (nome) => {
        const resultado = await excluirDocumento(nome);
    
        if (resultado.deletedCount) {
          io.emit("excluir_documento_sucesso", nome);
        }
      });

      socket.on('disconnect', () => {
        if(socket.data.connected){
          removeUser(nomeUsuario, nomeDocumento)
  
          const usersDoc = getUsersByDoc(nomeDocumento)
  
          io.to(nomeDocumento).emit('atualizar_users', {usuarios: usersDoc})

        }
      })
    });
    

      // io.adapter.on('join-room', (room,id) => {
      //   console.log(io.adapter.sids)
      // })

      // io.adapter.on('leave-room', (room, id) => {
        
      //   removeUserById(id)

      //   const usersDoc = getUsersByDoc(room)

      //   io.to(room).emit('atualizar_users', {usuarios: usersDoc})
      // })

}

export default registrarEventosDocumentos