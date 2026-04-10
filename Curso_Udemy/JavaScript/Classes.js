class Animal {
  constructor(f) {
    this.familia = f;
  }

  andar = () => {
    return "andando...";
  };
}

class Cachorro extends Animal {
  constructor(n, i) {
    super("Carnívoro");
    this.nome = n;
    this.idade = i;
  }

  latir = () => {
    return `${this.nome}: au! au!`;
  };
}

let rex = new Cachorro("Rex", 5);
console.log(rex);
console.log(rex.familia);
console.log(rex.andar());
console.log(rex.latir());
