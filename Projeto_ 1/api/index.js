import express, { request } from "express"; // instalar o express
import cors from "cors";
import mongoose from "mongoose"; // importar o mongoose

const app = express(); // colocar o express dentro da variável app

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
); // dá acesso a qualquer font-end
app.use(express.json()); // avisar o express que vou usar o json

mongoose
  .connect(
    "mongodb+srv://davide:LCl1wq52KyEkF0gm@cluster0.jnlmbqo.mongodb.net/Usuarios?appName=Cluster0",
  )
  .then(() => console.log("Conectado com o banco de dados Mongo"))
  .catch((error) => console.log(error));

// fazer a estrutura dos dados que vou mandar para a base de dados Mongo
const usuarioSchema = new mongoose.Schema(
  {
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
  },
  { timestamps: true },
);

const Usuario = mongoose.model("Usuario", usuarioSchema);

// Retorna os usuarios
app.get("/usuarios", async (request, response) => {
  // responder ao front-end com os usuarios
  const usuarioDoBanco = await Usuario.find();

  response.json(usuarioDoBanco);
});

// Cria usuarios
app.post("/usuarios", async (request, response) => {
  const usuarioCriado = await Usuario.create(request.body);

  response.json(usuarioCriado);
});

// Apagar um usuário
app.delete("/usuarios/:id", async (request, response) => {
  await Usuario.findByIdAndDelete(request.params.id);

  response.json({ message: "Usuário deletado!" });
});

app.listen(3002, () => {
  console.log("Servidor Rodando pela Porta 3002");
});

// senha: LCl1wq52KyEkF0gm
// davide

// mongodb+srv://davide:LCl1wq52KyEkF0gm@cluster0.jnlmbqo.mongodb.net/Usuarios?appName=Cluster0
