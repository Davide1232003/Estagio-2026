import { useEffect, useState } from "react";
import { v4 } from "uuid";

import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import DecryptedText from "./components/DecryptedText";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || [],
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    async function fetchTasks() {
      // chamar API
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10",
        {
          method: "GET",
        },
      );

      // pegar nos dados que ela retorna
      const data = await response.json();

      // armazenar esses dados no STATE
      setTasks(data);
    }

    //se eu quiser, posso chamar uma API para pegar as tarefas
    // fetchTasks();
  }, []);

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      // PRECISO ATUALIZAR ESTA TAREFA
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }

      // NÃO PRECISO ATUALIZAR ESSA TAREFA
      return task;
    });
    setTasks(newTasks);
  }

  // APAGAR UMA TASK
  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }

  // ADICIONAR UMA NOVA TAREFA
  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: v4(),
      title, // é igual ao parâmetro por isso pode ir assim
      description, // é igual ao parâmetro por isso pode ir assim
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
  }

  return (
    <div className="w-full min-h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px]">
        <DecryptedText
          text="Gestor de Tarefas"
          speed={110}
          maxIterations={10}
          characters="ABCD1234!?"
          className="text-3xl text-slate-100 font-bold mb-12"
          parentClassName="w-full flex justify-center mb-12"
          encryptedClassName="encrypted text-slate-400"
        />
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}

export default App;
