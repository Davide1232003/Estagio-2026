import { useState } from "react";

// useState = hooks

//sempre que vamos alterar o valor de algo => useState
//se é somente leitura => usamos a var, state 

function UseStateComponent() {
    //variável de consulta, e uma de alteração, inicio do hook useState, o valor inicial é 0
    const [count, setCount] =useState(0);

    const increment = () => {
        setCount(count + 1)
        console.log(count)
    };

    const [user, setUser] = useState({
        name: "Ana",
        age: 25,
        hobbies: ["Viajar", "Correr"],
    });

    const updateUserAge = () => {
        setUser((prevUser) => ({
            ...prevUser,
            age: prevUser.age + 1,
        }))
    };

    return (
        <div>
            <h2>Contador</h2>
            <p>Você clicou {count} vezes</p>
            <button onClick={increment}>Incrementar</button>
             
            <p>
                Nome : {user.name} e idade: {user.age}
            </p>

            <button onClick={updateUserAge}>Incermentar Idade</button>
    
        </div>
    )
}
export default UseStateComponent;