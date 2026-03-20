import "./login.css";
import { FaUser } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import { useState } from "react";
import Button from "../button/button";
import RotatingText from "../texto_rotation/RotatingText";


function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {

    event.preventDefault();

    console.log("Dados enviados:", { email, password });
    alert(`Login feito pelo email: ${email} e a password: ${password}`);

  }    

  return (

    <div className="container">
      <form onSubmit={handleSubmit}>

        <h1>
          Faça o seu <RotatingText
            texts={['Login', 'Acesso']}
            mainClassName="rotating-text"
            staggerFrom={"last"}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-120%", opacity: 0 }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2500}
          />
        </h1>

        <div className ="input-field">
          <FaUser className="icon" />
          <input type="email" placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className ="input-field">
          <IoIosLock className="icon" />
          <input type="password" placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button />

        <div className="recall-forget">
          <label>
            <input type="checkbox" />
            Lembrar-me
          </label>
          <a href="#">Esqueceu a senha?</a>
        </div>

        <div className="signup-link">
          <p>Não tem uma conta? <a href="#">Registe-se</a></p>
        </div>
      </form>
    </div>

  );
}

export default Login;
