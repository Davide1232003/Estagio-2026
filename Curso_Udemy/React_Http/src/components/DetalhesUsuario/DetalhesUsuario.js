import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function DetalhesUsuario() {
  const { id } = useParams();

  const [usuario, setusuario] = useState({});

  // Fazer o pedido para a API para obter os detalhes do usuário com o id fornecido
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then((resposta) =>
      resposta.json().then((dados) => {
        if (dados.id) {
          setusuario({
            id: dados.id,
            nome: dados.name.split(" ")[0],
            sobrenome: dados.name.split(" ")[1] || "",
            email: dados.email,
            foto: `https://robohash.org/${dados.id}?set=set4`,
          });
        }
      }),
    );
  }, [id]);

  // Verificar se o usuário foi encontrado se sim montamo-lho
  if (usuario.nome !== undefined) {
    return (
      <>
        <p>ID: {usuario.id}</p>
        <h1>
          {usuario.nome} {usuario.sobrenome}
        </h1>
        <img src={usuario.foto} alt={usuario.nome} />
        <p>{usuario.email}</p>
        <Link to="/usuarios">Voltar</Link>
      </>
    );
  }

  // Caso contrário, mostramos uma mensagem de erro
  return (
    <div>
      <h1>Utilizador não encontrado</h1>
      <Link to="/usuarios">Voltar</Link>
    </div>
  );
}

export default DetalhesUsuario;
