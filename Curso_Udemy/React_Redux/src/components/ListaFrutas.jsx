import Frutass from "./Frutass";
import AdicionarFruta from "./AdicionarFruta";
import { useSelector } from "react-redux";

function ListaFrutas() {
  const Frutas = useSelector((state) => state.frutas.frutas);

  return (
    <div className="lista_frutas">
      <h1>Lista de Frutas</h1>

      <AdicionarFruta />

      {Frutas.map((fruta) => (
        <Frutass key={fruta.id} fruta={fruta} />
      ))}
    </div>
  );
}

export default ListaFrutas;
