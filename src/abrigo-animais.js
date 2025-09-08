// Lista de animais
const animais = {
  Rex: { tipo: "cão", brinquedos: ["RATO", "BOLA"] },
  Mimi: { tipo: "gato", brinquedos: ["BOLA", "LASER"] },
  Fofo: { tipo: "gato", brinquedos: ["BOLA", "RATO", "LASER"] },
  Zero: { tipo: "gato", brinquedos: ["RATO", "BOLA"] },
  Bola: { tipo: "cão", brinquedos: ["CAIXA", "NOVELO"] },
  Bebe: { tipo: "cão", brinquedos: ["LASER", "RATO", "BOLA"] },
  Loco: { tipo: "jabuti", brinquedos: ["SKATE", "RATO"] },
};

// Lista com todos os brinquedos
const brinquedosValidos = ["RATO", "BOLA", "LASER", "CAIXA", "NOVELO", "SKATE"]

// Verifica se os brinquedos estão na ordem que o animal deseja
function contemSequencia(listaPessoa, brinquedosAnimais) {
  let i = 0;
  for (const item of listaPessoa) {
    if (item === brinquedosAnimais[i]) {
      i++;
      if (i === brinquedosAnimais.length) {
        return true;
      }
    }
  }
  return false;
}

// Verifica se existe brinquedos repetidos
function brinquedosDuplicados(array) {
  return new Set(array).size !== array.length
}

class AbrigoAnimais {
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {

    // Transforma as strings em arrays
    const listaPessoa1 = brinquedosPessoa1.split(",");
    const listaPessoa2 = brinquedosPessoa2.split(",");
    const listaAnimais = ordemAnimais.split(",");

    // Se algum animal/brinquedo estiver duplicados lançamos um erro
    if (brinquedosDuplicados(listaAnimais)) return { erro: "Animal inválido" }
    if (brinquedosDuplicados(listaPessoa1) || brinquedosDuplicados(listaPessoa2)) return { erro: "Brinquedo inválido" }

    // Junta os arrays e verifica se os brinquedos existem na lista de brinquedos válidos, se tiver algum brinquedo que não existe é retornando um erro
    for (const brinquedo of listaPessoa1.concat((listaPessoa2))) {
      if (!brinquedosValidos.includes(brinquedo)) return { erro: "Brinquedo inválido" }
    }

    const resultados = [] // Armazena os animais e quem ficou com eles
    let contadorPessoa1 = 0 // Contador para verificar se a pessoa já tem 3 animais
    let contadorPessoa2 = 0 // Contador para verificar se a pessoa já tem 3 animais

    // Verifica se o animal existe, caso não retorna um erro
    for (const nome of listaAnimais) {
      if (!animais[nome]) {
        return { erro: "Animal inválido" };
      }

      // Pega os brinquedos que o animal gosta
      const brinquedosAnimal = animais[nome].brinquedos;

      // Verifica se cada pessoa está seguindo a sequência que o animal quer
      let pessoa1 = contemSequencia(listaPessoa1, brinquedosAnimal);
      let pessoa2 = contemSequencia(listaPessoa2, brinquedosAnimal);

      let dono = 'abrigo' // Inicializa a variavel como 'abrigo'

      // Regra para não se importar com a ordem quando é o animal 'Loco'
      if(nome === 'Loco') {
        pessoa1 = listaPessoa1.some(item => animais['Loco'].brinquedos.includes(item))
        pessoa2 = listaPessoa2.some(item => animais['Loco'].brinquedos.includes(item))
      }

      // Verifica se duas pessoas podem adotar o 'Gato' e verifica se as duas pessoas podem adotar qualquer outro animal (Caso seja true, ambas mantém o animal no abirgo :/)
      if((animais[nome].tipo === 'gato' && pessoa1 && pessoa2) || (pessoa1 && pessoa2)){
        dono = 'abrigo'
      } else if(pessoa1) { // Verifica se a pessoa tem menos de 3 animais, se sim mantém no abrigo, se não adota o animal
        dono = contadorPessoa1 < 3 ? 'pessoa 1' : 'abrigo'
      } else if(pessoa2) { // Verifica se a pessoa tem menos de 3 animais, se sim mantém no abrigo, se não adota o animal
        dono = contadorPessoa2 < 3 ? 'pessoa 2' : 'abrigo'
      } 

      // Se o animal for adotado adiciona ele na lista para contabilizar a quantidade de animais que ela tem adotado.
      if (dono === 'pessoa 1') contadorPessoa1++
      if (dono === 'pessoa 2') contadorPessoa2++

      resultados.push(`${nome} - ${dono}`) // Adiciona o resultado na lista
    }

      resultados.sort() // Ordena a lista em ordem alfabetica
      return { lista: resultados } // Retorna um objeto da lista final

  }
}

const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu')

console.log(resultado)

export { AbrigoAnimais as AbrigoAnimais };
