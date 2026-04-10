import { useState } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../actions/frutas.action";

function AdicionarFruta() {
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState(0);

  const dispatch = useDispatch();

  const adicionarFruta = (event) => {
    event.preventDefault();

    // Lógica para adicionar a fruta
    const fruta = {
      id: Date.now(),
      nome,
      quantidade,
    };

    dispatch(actions.adicionar(fruta));
  };

  return (
    <form onSubmit={adicionarFruta}>
      <input
        type="text"
        name={nome}
        placeholder="fruta..."
        required
        onChange={(event) => setNome(event.target.value)}
      />
      <input
        type="number"
        name={quantidade}
        placeholder="..."
        onChange={(event) => setQuantidade(parseInt(event.target.value) || 0)}
        min="1"
        max="10"
        step="1"
        required
      />
      <button type="submit">Adicionar</button>
    </form>
  );
}

export default AdicionarFruta;
