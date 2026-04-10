function ola() {
  return "Olá!!!";
}

console.log(ola());

function olaPessoa(nome) {
  return `Olá ${nome}!!!`;
}

console.log(olaPessoa("Davide"));

// Arrow function

const ola2 = () => {
  return "Olá novamente!";
};

const olaPessoa2 = (nome, idade) => {
  return `Olá ${nome}, você tem ${idade} anos!`;
};
console.log(olaPessoa2("Davide", 25));

const olaPessoa3 = (nome) => `Holla novamente ${nome}!`;
console.log(olaPessoa3("Davide"));
