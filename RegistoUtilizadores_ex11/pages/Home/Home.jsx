import { useEffect, useState, useRef } from "react";

import api from "../../src/services/api";
import Button from "../../src/components/button";

import "./Styles.css";

function Home() {
  const [users, setUsers] = useState ([])

  const inputName = useRef ()
  const inputAge = useRef ()
  const inputEmail = useRef ()
  const inputProfession = useRef ()

  async function getUsers() {
    const usersFromApi = await api.get("/users")

    setUsers(usersFromApi.data)
  }

  async function deleteUsers(id) {
    await api.delete(`/users/${id}`)

    getUsers()

  }

  async function createUsers() {
    await api.post("/users", {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value,
      profession: inputProfession.current.value
    })

    getUsers()

  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div className="container">
        <form>
          <h1>Registo de Utilizadores</h1>
          <input name="nome" type="text" placeholder="Nome" ref={inputName}/>
          <input name="idade" type="number" placeholder="Idade" ref={inputAge}/>
          <input name="email" type="email" placeholder="E-mail" ref={inputEmail}/>
          <input name="profession" type="text" placeholder="Profissão" ref={inputProfession}/>
          <button onClick={createUsers} type="button">Registar</button>
        </form>

        {users.map((user) => (
          <div key={user.id} className="card">
            <div>
              <p>Nome: <span>{user.name}</span></p>
              <p>
                Idade: <span>{user.age}</span>
              </p>
              <p>
                Email: <span>{user.email}</span>
              </p>
              <p>
                Profissão: <span>{user.profession}</span>
              </p>
            </div>
            <button onClick={() => deleteUsers(user.id)}> 
              <Button />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
