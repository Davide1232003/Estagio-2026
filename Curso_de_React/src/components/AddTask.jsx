import { useState } from "react";
import Input from "./Input";

function AddTask({ onAddTaskSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");

  return (
    <div className="space-y-4 p-6 bg-slate-200 rounded-md shadow flex flex-col mb-5">
      <Input
        type="text"
        placeholder="Escreva o título da tarefa"
        value={title}
        className="!text-red-400"
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Escreva a descrição da tarefa"
        value={description}
        onChange={(e) => setdescription(e.target.value)}
      />
      <button
        onClick={() => {
          // verificar se o TITLE e a description estão preenchidos
          if (!title.trim() || !description.trim()) {
            return alert("Prencha os campos!");
          }
          onAddTaskSubmit(title, description);
          setTitle("");
          setdescription("");
        }}
        className="bg-slate-500 text-white px-4 py-2 rounded-md font-medium"
      >
        Adicionar
      </button>
    </div>
  );
}

export default AddTask;
