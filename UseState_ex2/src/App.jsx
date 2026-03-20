import { useState } from 'react';

function App() {
  const [contador, setContador] = useState(10);

  function count(){
    setContador(contador + 1)
  }

  return (
    <div>
      <button onClick={count}>O contador é: {contador}</button>
    </div>
  )
}

export default App