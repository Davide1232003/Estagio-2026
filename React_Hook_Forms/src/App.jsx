import FormLogo from "./assets/form-logo.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import "./App.css";
import { use } from "react";

const schema = yup.object({
  name: yup.string().required("O nome é obrigatório!"),
  email: yup
    .string()
    .email("Digite um email válido")
    .required("O email é obrigatório"),
  password: yup
    .string()
    .min(8, "A password deve ter pelo menos 8 letras")
    .required("A password é obrigatória"),
  confirmPassword: yup
    .string()
    .required("Confirmar a password, é obrigatória!")
    .oneOf([yup.ref("password")], "As passwords têm de coincidir"),
});

function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(userData) {
    console.log(userData);
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <img src={FormLogo} alt="form-logo" />
        <label>
          Nome
          <input type="text" {...register("name", { required: true })} />
          <span>{errors.name?.message}</span>
        </label>
        <p>O nome digitado é: {watch("name")}</p>{" "}
        {/* o "WATCH" Monitoria um campo em tempo real*/}
        <label>
          Email
          <input type="text" {...register("email")} />
          <span>{errors.email?.message}</span>
        </label>
        <label>
          Password
          <input
            type="password"
            {...register("password", { required: true })}
          />
          <span>{errors.password?.message}</span>
        </label>
        <label>
          Confirmar Password
          <input
            type="password"
            {...register("confirmPassword", { required: true })}
          />
          <span>{errors.confirmPassword?.message}</span>
        </label>
        <button type="submit">Registar-se</button>
      </form>
    </div>
  );
}

export default App;
