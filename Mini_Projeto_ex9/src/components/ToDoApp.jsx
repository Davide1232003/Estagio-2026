import { useState } from "react";
import AnimatedContent from "./Botões/AnimatedContent";
import TrueFocus from "./Textos/TrueFocus";
import TextPressure from "./Textos/TextPressure";
import Magnet from "./Botões/Magnet";

import "./ToDoApp.css";

function ToDoApp() {
  //lista de tarefas
  const [todos, setTodos] = useState([]);

  //estado de texto para tarefa
  const [inputValue, setInputValue] = useState("");

  //adicionar tarefa
  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputValue.trim() !== "") {
      const newToDO = {
        id: Date.now(),
        text: inputValue,
      };

      setTodos((prevTodos) => [...todos, newToDO]);
      setInputValue("");
    }
  };

  //eliminar tarefa
  const deleteToDo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="app-container">
      <TrueFocus
        sentence="Lista de Tarefas"
        manualMode={false}
        blurAmount={5}
        borderColor="#5227FF"
        animationDuration={0.5}
        pauseBetweenAnimations={1}
      />

      {/* Form para adicioanr tarefas */}
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          className="input-field"
          plaeholder="Adicicona uma tarefa"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <AnimatedContent
          distance={100}
          direction="vertical"
          reverse={false}
          duration={0.8}
          ease="power3.out"
          initialOpacity={0}
          animateOpacity
          scale={1}
          threshold={0.1}
          delay={0}
        >
          <button type="submit" className="add-button">
            Adicionar
          </button>
        </AnimatedContent>
      </form>

      {/* Lista de tarefas */}

      {todos.length === 0 && (
        <div className="texto-animado">
          <TextPressure
            text="Não há tarefas"
            flex
            alpha={false}
            stroke={false}
            width
            weight
            italic
            textColor="#a32f2f"
            strokeColor="#5227FF"
            minFontSize={20}
          />
        </div>
      )}

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            {todo.text}
            <Magnet padding={50} disabled={false} magnetStrength={35}>
              <button
                className="delete-button"
                onClick={() => deleteToDo(todo.id)}
              >
                Eliminar
              </button>
            </Magnet>
          </li>
        ))}
      </ul>

      
    </div>
  );
}

export default ToDoApp;
