import "./App.css";
import Comentario from "../components/Comentario.jsx";
import { useState } from "react";

function App() {
  const [comentarios, setComentarios] = useState([
    {
      nome: "João",
      email: "joao@gmail.com",
      data: new Date(2020, 3, 19),
      mensagem: "Olá!",
    },
    {
      nome: "Maria",
      email: "maria@gmail.com",
      data: new Date(2020, 3, 20),
      mensagem: "Gostei!",
    },
  ]);

  const [novoComentario, setNovoComentario] = useState({
    nome: "",
    email: "",
    mensagem: "",
  });

  const adicionarComentario = (e) => {
    e.preventDefault();
    const comentarioCompleto = { ...novoComentario, data: new Date() };
    setComentarios([...comentarios, comentarioCompleto]);
    setNovoComentario({
      nome: "",
      email: "",
      mensagem: "",
    });
  };

  const removerComentario = (index) => {
    const listaFiltrada = comentarios.filter((_, i) => i !== index);
    setComentarios(listaFiltrada);
  };

  return (
    <div className="">
      <h1 className="font-bold text-center text-2xl my-4">Meu Projeto</h1>
      {comentarios.map((comentario, index) => (
        <Comentario
          key={index}
          nome={comentario.nome}
          email={comentario.email}
          data={comentario.data}
          onRemover={() => removerComentario(index)}
        >
          {comentario.mensagem}
        </Comentario>
      ))}

      <form
        className="flex flex-col gap-4 ml-24 max-w-lg w-full p-6"
        onSubmit={adicionarComentario}
      >
        <input
          className="w-full bg-slate-100 border border-slate-200 rounded p-3 outline-none focus:border-slate-400"
          placeholder="Nome"
          value={novoComentario.nome}
          onChange={(e) =>
            setNovoComentario({ ...novoComentario, nome: e.target.value })
          }
        />

        <input
          className="w-full bg-slate-100 border border-slate-200 rounded p-3 outline-none focus:border-slate-400"
          placeholder="Email"
          value={novoComentario.email}
          onChange={(e) =>
            setNovoComentario({ ...novoComentario, email: e.target.value })
          }
        />

        <textarea
          className="w-full bg-slate-100 border border-slate-200 rounded p-3 h-32 outline-none focus:border-slate-400 "
          placeholder="Mensagem"
          value={novoComentario.mensagem}
          onChange={(e) =>
            setNovoComentario({ ...novoComentario, mensagem: e.target.value })
          }
        />

        <button
          className="w-full p-3 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-600 transition-colors"
          type="submit"
        >
          Adicionar Comentário
        </button>
      </form>
    </div>
  );
}

export default App;
