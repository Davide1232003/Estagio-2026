import "./UseCard.css";

function UseCard({ user, onDelete }) {
  // recebe aqui os usuarios para apresentar na tela e a função onDelete para o botão funcionar
  return (
    <div className="user-card">
      <img
        className="user-card-avatar"
        src={`https://robohash.org/${user._id}`}
      />
      <div className="«user-card-info">
        <p>Nome: {user.name}</p>
        <p>Idade: {user.age}</p>
        <p>Email: {user.email}</p>
      </div>

      {/* Quando clicar, chama a função passando o ID deste usuário específico */}
      <button className="button" onClick={() => onDelete(user._id)}>
        Remover
      </button>
    </div>
  );
}

export default UseCard;
