import React, { useState, useEffect } from "react";

import Usuario from "../Usuario/Usuario";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((resposta) => resposta.json())
      .then((dados) => {
        const usuariosApi = dados.map((u) => ({
          id: u.id,
          nome: u.name.split(" ")[0],
          sobrenome: u.name.split(" ")[1] || "",
          email: u.email,
        }));

        setUsuarios(usuariosApi);
      });
  }, []);

  const adicionarUsuario = (usuario) => {
    setUsuarios([...usuarios, usuario]);
  };

  const removerUsuario = (usuario) => {
    if (
      window.confirm(
        `Tem certeza que deseja remover "${usuario.nome} ${usuario.sobrenome}"?`,
      )
    ) {
      fetch(`https://jsonplaceholder.typicode.com/users/${usuario.id}`, {
        method: "DELETE",
      }).then((resposta) => {
        if (resposta.ok) {
          setUsuarios(usuarios.filter((x) => x.id !== usuario.id));
        }
      });
    }
  };

  return (
    <>
      {usuarios.map((usuario) => (
        <Usuario
          key={usuario.id}
          usuario={usuario}
          removerUsuario={() => removerUsuario(usuario)}
        />
      ))}
    </>
  );
};

export default Usuarios;
