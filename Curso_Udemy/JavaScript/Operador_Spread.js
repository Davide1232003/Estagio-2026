const rex = {
  nome: "Rex",
};

const max = { ...rex, idade: 2, familia: "Carnívoro" };
max.nome = "Max";

console.log(rex);
console.log(max);

// ----------------

const numeros = [1, 2, 3, 4];
const numeros2 = [...numeros, 5, 6];

console.log(numeros);
console.log(numeros2);
