import React, { useState } from "react";
import "./AdicionarUsuario.css";

const AdicionarUsuario = (props) => {
  const [usuario, setUsuario] = useState({
    nome: "",
    sobrenome: "",
    email: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const usuario = { nome, sobrenome, email };

    fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    }).then((resposta) => {
      if (resposta.ok) {
        setNome("");
        setSobrenome("");
        setEmail("");
        alert("Utilizador adicionado com sucesso!");
      }
    });
  };

  return (
    <div className="AdicionarUsuario">
      <h2>Adicionar Usuário</h2>
      <form onSubmit={onSubmitHandler}>
        <div className="Linha">
          <div className="Coluna">
            <label>Nome</label>
            <input
              type="text"
              name="nome"
              value={usuario.nome}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="Coluna">
            <label>Sobrenome</label>
            <input
              type="text"
              name="sobrenome"
              value={usuario.sobrenome}
              onChange={onChangeHandler}
              required
            />
          </div>
        </div>
        <div className="Linha">
          <div className="Coluna">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={usuario.email}
              onChange={onChangeHandler}
              required
            />
          </div>
        </div>
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
};

export default AdicionarUsuario;
