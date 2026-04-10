import "./Comentario.css";
import user from "../src/assets/user.png";

const Comentario = (props) => {
  return (
    <div className="p-6 m-6 bg-gray-200 rounded-lg max-w-7xl mx-auto">
      <div className="flex items-center gap-4">
        <img
          src={user}
          alt={props.nome}
          className="my-2 w-12 h-12 rounded-full"
        />
        <h3>{props.nome}</h3>
      </div>
      <p className="text-blue-400 my-2">{props.email}</p>
      <p>{props.children}</p>
      <div className="flex justify-between items-center mt-4">
        <button
          className="bg-red-500 text-white text-xs font-bold py-2 px-4 rounded-xl cursor-pointer hover:bg-red-700 scale-105 transition-all duration-300"
          onClick={props.onRemover}
        >
          Apagar
        </button>
        <p className="text-right">{props.data.toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default Comentario;
