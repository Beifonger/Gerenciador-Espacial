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
    let opcaoFormatada = parseInt(opcao);

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
  console.log("\n=======CADASTRO DE MISSÃO=======\n");
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
                  status: false,
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

function listarMissoes() {
  console.log("\n=======LISTAR MISSÕES=======\n");
  if (missoes.length === 0) {
    console.log("Não existem missões cadastradas.");
  } else {
    missoes.forEach((missao, index) => {
      console.log(
        `\nÍndice: ${index + 1}\nNome da missão: ${
          missao.nome
        }\nDestino da missão: ${missao.destino}\nPrioridade da missão: ${
          missao.prioridade
        }\nTripulantes: ${missao.tripulantes}\nConcluída: ${missao.status}\n`
      );
    });
  }
  exibirMenu();
}

function editarMissao() {
  console.log("\n=======EDITAR MISSÃO=======\n");
  if (missoes.length === 0) {
    console.log("Não há nenhuma missão cadastrada para editar.");
    exibirMenu();
  }
  console.log("Missões cadastradas:");
  missoes.forEach((missao, index) => {
    console.log(
      `\nÍndice: ${index + 1}\nNome da missão: ${
        missao.nome
      }\nDestino da missão: ${missao.destino}\nPrioridade da missão: ${
        missao.prioridade
      }\nTripulantes: ${missao.tripulantes}\nConcluída: ${missao.status}\n`
    );
  });
  rl.question("\nDigite o número da missão que deseja editar: ", (indice) => {
    const i = parseInt(indice) - 1;
    if (isNaN(i) || i < 0 || i >= missoes.length) {
      console.log("Índice inválido.");
      return editarMissao();
    }

    console.log("\n=======OPÇÕES DE EDIÇÃO DA MISSÃO=======\n");
    console.log("1 - Alterar nome da missão");
    console.log("2 - Alterar o destino da missão");
    console.log("3 - Alterar a prioridade da missão");
    console.log("4 - Alterar os integrantes da missão");
    menuEditar();

    function menuEditar() {
      rl.question("Informe o número da opção que deseja editar: ", (opcao) => {
        let opcaoFormatada = parseInt(opcao);

        switch (opcaoFormatada) {
          case 1:
            alterarNome();
            break;
          case 2:
            alterarDestino();
            break;
          case 3:
            alterarPrioridade();
            break;
          case 4:
            alterarTripulantes();
            break;
          default:
            console.log("Digite uma opção válida.");
            menuEditar();
            break;
        }
      });
    }

    function alterarNome() {
      rl.question("Informe o novo nome: ", (novoNome) => {
        missoes[i].nome = novoNome;
        console.log("Nome alterado com sucesso.");
        rl.question("Deseja alterar mais alguma coisa? (S/N): ", (opcao) => {
          let opcaoFormatada = opcao.toLowerCase();

          if (opcaoFormatada === "s") {
            menuEditar();
          } else if (opcaoFormatada === "n") {
            exibirMenu();
          } else {
            console.log("Informe uma resposta válida.");
          }
        });
      });
    }

    function alterarDestino() {
      rl.question("Informe o novo destino: ", (novoDestino) => {
        missoes[i].destino = novoDestino;
        console.log("Destino alterado com sucesso.");
        rl.question("Deseja alterar mais alguma coisa? (S/N): ", (opcao) => {
          let opcaoFormatada = opcao.toLowerCase();

          if (opcaoFormatada === "s") {
            menuEditar();
          } else if (opcaoFormatada === "n") {
            exibirMenu();
          } else {
            console.log("Informe uma resposta válida.");
          }
        });
      });
    }

    function alterarPrioridade() {
      rl.question("Informe a nova prioridade: ", (novaPrioridade) => {
        missoes[i].prioridade = parseInt(novaPrioridade);
        console.log("Prioridade alterada com sucesso.");
        rl.question("Deseja alterar mais alguma coisa? (S/N): ", (opcao) => {
          let opcaoFormatada = opcao.toLowerCase();

          if (opcaoFormatada === "s") {
            menuEditar();
          } else if (opcaoFormatada === "n") {
            exibirMenu();
          } else {
            console.log("Informe uma resposta válida.");
          }
        });
      });
    }

    function alterarTripulantes() {
      rl.question("Informe os novos tripulantes: ", (novosTripulantes) => {
        missoes[i].tripulantes = novosTripulantes;
        console.log("Tripulantes alterados com sucesso.");
        rl.question("Deseja alterar mais alguma coisa? (S/N): ", (opcao) => {
          let opcaoFormatada = opcao.toLowerCase();

          if (opcaoFormatada === "s") {
            menuEditar();
          } else if (opcaoFormatada === "n") {
            exibirMenu();
          } else {
            console.log("Informe uma resposta válida.");
          }
        });
      });
    }
  });
}

function atualizarStatus() {
  console.log("\n=======ATUALIZAR STATUS=======\n");
  if (missoes.length === 0) {
    console.log("Não há nenhuma missão cadastrada para atualizar o status.");
    exibirMenu();
  }
  console.log("Missões cadastradas:");
  missoes.forEach((missao, index) => {
    console.log(
      `\nÍndice: ${index + 1}\nNome da missão: ${
        missao.nome
      }\nDestino da missão: ${missao.destino}\nPrioridade da missão: ${
        missao.prioridade
      }\nTripulantes: ${missao.tripulantes}\nConcluída: ${missao.status}\n`
    );
  });
  rl.question("\nDigite o número da missão que deseja editar: ", (indice) => {
    const i = parseInt(indice) - 1;
    if (isNaN(i) || i < 0 || i >= missoes.length) {
      console.log("Índice inválido.");
      return atualizarStatus();
    }
    rl.question("Marcar missão como concluída? (S/N): ", (opcao) => {
      let opcaoFormatada = opcao.toLowerCase();
      if (opcaoFormatada === "s") {
        missoes[i].status = true;
        console.log("Missão marcada como concluída.");
        return exibirMenu();
      } else if (opcaoFormatada === "n") {
        return exibirMenu();
      } else {
        console.log("Informe uma opção válida.");
        atualizarStatus();
      }
    });
  });
}
exibirMenu();


