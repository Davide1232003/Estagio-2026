import { Field, Formik, useFormik } from "formik";

import NovoInput from "./NovoInput";
import Validacoes from "./Validacoes";

function AdicionaCliente() {
  return (
    <>
      <h1>Registo de Clientes</h1>

      <Formik
        initialValues={{ nome: "", email: "", nascimento: "" }}
        validationSchema={Validacoes}
        // Função de submeter os dados do formulário
        onSubmit={(values) => {
          alert(JSON.stringify(values));
        }}
      >
        {/* Executar uma função que recebe as propriedades do Formik pararenderizar o formulário */}
        {(props) => (
          <form onSubmit={props.handleSubmit} noValidate>
            <NovoInput label="Nome" type="text" id="nome" name="nome" />

            <NovoInput label="E-mail" type="email" id="email" name="email" />

            <NovoInput
              label="Data de Nascimento"
              type="date"
              id="nascimento"
              name="nascimento"
            />

            <button type="submit">Adicionar Cliente</button>
          </form>
        )}
      </Formik>
    </>
  );
}

export default AdicionaCliente;
