import React from 'react'

function JSXExample() {

    const userName = "Carlos";

    const user = {
        name: "Ana",
        lastName: "Sousa",
    };

    function getGreeting(name) {
        return `Olá, ${name}!`; 
    }

    const userIsLoggedIn = false;

    const userRole = "admin";

    const users = [
        { id: 1, name: "João"},
        { id: 2, name: "Maria"},
        { id: 3, name: "Pedro"},
    ];

    return (
        <div>
            {/* Basico */}
            <h2>Conteúdo que o utilizador vai ver</h2>
            {/* Listar dados do utilizador */}
            <p>O meu nome é: {userName}</p>

            <p>
                Utilizador {user.name} {user.lastName}
            </p>

            <p>2+2 = {2+2}</p>

            <p>{getGreeting(userName)}</p>
            <p>{getGreeting("Mariana")}</p>

            {/* Diferanças do HTML */}

            <div className = "alguma-coisa">Está sol hoje!</div>

            <button onClick={() => alert("Teste")}>Clica em mim</button>

            <input type="text" placeholder='Escreve algo'/>
 
            {/* Renderização condicional */}
            {userIsLoggedIn ? (
                <div>
                    <p>Caso: Está logado</p>
                </div>
            ) : (
                <p>Caso: NÃO está Logado</p>
            )}

            <p>{userRole === "admin" && "Você é um administrador!"}</p>

            {/* Renderização de listas */}
            <div>
                <ul>
                    {users.map((user) => (
                        <li key={user.id}> 
                            {user.id} - {user.name}
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    )
}

export default JSXExample