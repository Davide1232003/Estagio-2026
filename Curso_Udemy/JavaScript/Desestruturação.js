const frutas = ["Banana", "Maçã", "Laranja"];

const [fruta1, , fruta3] = frutas;

console.log(fruta1); // Banana
console.log(fruta3); // Laranja

const pessoa = {
  nome: "Davide",
  idade: 22,
  pais: "Portugal",
  idioma: "Português",
};

const localidade = ({ pais, idioma }) =>
  `Tu moras em ${pais} e falas ${idioma}!`;
console.log(localidade(pessoa));
