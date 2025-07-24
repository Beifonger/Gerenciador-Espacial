const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let missoes = [];

function exibirMenu() {
  console.log("=======GERENCIADOR DE MISSÕES ESPACIAIS=======\n");
  console.log("1 - Adicionar missão");
  console.log("2 - Listar missões em andamento");
  console.log("3 - Editar missão existente");
  console.log("4 - Marcar como concluída");
  console.log("5 - Filtrar por prioridade");
  console.log("6 - Ranking de destinos");
  console.log("7 - Listar por tripulante");
  console.log("8 - SAIR");

  rl.question("Escolha uma das opções: ", (opcao) => {
    opcaoFormatada = parseInt(opcao);

    switch (opcaoFormatada) {
      case 1:
        adicionarMissao();
        break;
      case 2:
        listarMissoes();
        break;
      case 3:
        editarMissao();
        break;
      case 4:
        atualizarStatus();
        break;
      case 5:
        filtrarPorPrioridade();
        break;
      case 6:
        rankingDestinos();
        break;
      case 7:
        listarPorTripulante();
        break;
      case 8:
        console.log("Saindo do sistema...");
        rl.close;
      default:
        console.log("Opção inválida, tente novamente.");
        exibirMenu();
        break;
    }
  });
}

function adicionarMissao() {
  console.log("=======CADASTRO DE MISSÃO=======");
  rl.question("Informe o nome da missão: ", (nome) => {
    rl.question("Informe o destino (ex: Marte): ", (destino) => {
      function perguntarPrioridade() {
        rl.question(
          "Informe o nível de prioridade da missão (1-5): ",
          (prioridade) => {
            const prioridadeFormatada = parseInt(prioridade);

            if (
              isNaN(prioridadeFormatada) ||
              prioridadeFormatada < 1 ||
              prioridadeFormatada > 5
            ) {
              console.log("Informe um valor entre 1 e 5.");
              perguntarPrioridade();
            } else {
              rl.question("Informe o nome dos tripulantes: ", (tripulantes) => {
                missoes.push({
                  nome: nome,
                  destino: destino,
                  prioridade: prioridadeFormatada,
                  tripulantes: tripulantes,
                });
                console.log("Missão cadastrada com sucesso.\n");
                exibirMenu();
              });
            }
          }
        );
      }
      perguntarPrioridade();
    });
  });
}
exibirMenu();

