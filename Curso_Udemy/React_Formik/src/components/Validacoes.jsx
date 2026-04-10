import * as yup from "yup";

const Validacoes = yup.object({
  nome: yup
    .string()
    .required("Nome obrigatório")
    .min(10, "O nome deve conter pelo menos 10 caracteres")
    .max(20, "O nome deve conter no máximo 20 caracteres"),
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  nascimento: yup
    .date()
    .required("Data de nascimento obrigatória")
    .max(new Date(), "A data de nascimento deve ser no passado"),
});

export default Validacoes;
