import { MongoClient } from "mongodb";

const cliente = new MongoClient(
  "mongodb://root:google123@ac-bmnjlho-shard-00-00.5lw8dtr.mongodb.net:27017,ac-bmnjlho-shard-00-01.5lw8dtr.mongodb.net:27017,ac-bmnjlho-shard-00-02.5lw8dtr.mongodb.net:27017/?ssl=true&replicaSet=atlas-2lqqwv-shard-0&authSource=admin&retryWrites=true&w=majority"
);

let documentosColecao, usuariosColecao;

try {
  await cliente.connect();

  const db = cliente.db("learning-websockets");
  documentosColecao = db.collection("documentos");
  usuariosColecao = db.collection('usuarios')

  console.log("Conectado ao banco de dados com sucesso!");
} catch (erro) {
  console.log(erro);
}

export { documentosColecao, usuariosColecao };
