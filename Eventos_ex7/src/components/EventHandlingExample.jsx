import { useState } from "react";

function EventHandlingExample() {
  const handleClick = () => {
    alert("Testar")
  };

  const handleGreet = (name) => {
    alert(`Olá, ${name}!`)
  };

  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault()

    alert(`enviado! ${name}`)
  };

  return (
    <div>
      <button onClick={() => alert("Alerta")}>Clica Aqui</button>
      <button onClick={handleClick}>Incrementar</button>

      <br />
      <br />

      <button onClick={() => handleGreet("Ana")}>Dizer Olá Ana!</button>
      <button onClick={() => handleGreet("Carlos")}>Dizer Olá Carlos!</button>

      <br />

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Digite seu nome"
        />

        <input type="submit" value="Enviar" />
      </form>
    </div>
  );
}

export default EventHandlingExample;
