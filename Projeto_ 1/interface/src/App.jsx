import { useState, useEffect } from "react";
import UseCard from "./components/UseCard";
import axios from "axios";

import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [users, setUsers] = useState([]);
  // 1) Variável em si, que eu pego o valor dela
  // 2) (set) uma função para colocar o valor dentro da variável

  // chamada API

  async function buscarUsuarios() {
    const resposta = await axios.get("http://localhost:3002/usuarios");

    setUsers(resposta.data);
  }

  useEffect(() => {
    buscarUsuarios();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    await axios.post("http://localhost:3002/usuarios", {
      id: Date.now(),
      name: name,
      email: email,
      age: age,
    });

    buscarUsuarios();

    setName(""); // limpar os inputs
    setEmail(""); // limpar os inputs
    setAge(""); // limpar os inputs
  }

  async function deleteUser(idDoUsuario) {
    await axios.delete(`http://localhost:3002/usuarios/${idDoUsuario}`);
    const usersFiltrados = users.filter((user) => user._id !== idDoUsuario);

    setUsers(usersFiltrados);
  }

  return (
    <div className="app">
      <h1>Cadastro de Usuarios</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={name}
          type="text"
          placeholder="Nome"
          onChange={(event) => setName(event.target.value)}
        />
        <input
          value={email}
          type="text"
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          value={age}
          type="number"
          placeholder="Idade"
          onChange={(event) => setAge(event.target.value)}
        />

        <button type="submit">Submeter</button>
      </form>

      <div className="user-list">
        {users.map((user) => (
          <UseCard
            key={user._id}
            user={user}
            onDelete={() => deleteUser(user._id)} // Passe-se a função aqui
          />
        ))}
      </div>
    </div>
  );
}

export default App;
