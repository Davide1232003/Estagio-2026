import { useState, useEffect } from "react";

function UseEffectExample() {
    
  //useState ativa a re-renderização
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);

  //sem dependências, executa toda vez que o componente é renderizado
  useEffect(() => {
    if (count === 10) {
      alert("Parebens!");
    }
  });

  //com dependências vazias ou com um array vazio
  useEffect(() => {
    console.log("Rodou UE2");
  }, []);

  //com dependências
  useEffect(() => {
    console.log("Rodou UE3");
  }, [count, count2]);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Aumentar contagem</button>
      <button onClick={() => setCount2(count2 + 1)}>Aumentar contagem 2</button>
    </div>
  );
}

export default UseEffectExample;
