const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const missoes = [];
const missoesConcluidas = []; 

function exibirMenu() {
  console.log("======= GERENCIADOR DE MISSÕES ESPACIAIS =======\n");
  console.log("1 - Adicionar missão");
  console.log("2 - Listar missões em andamento");
  console.log("3 - Listar missões concluídas"); 
  console.log("4 - Editar missão existente");
  console.log("5 - Marcar como concluída");
  console.log("6 - Filtrar por prioridade");
  console.log("7 - Ranking de destinos");
  console.log("8 - Listar por tripulante");
  console.log("9 - Sair do Sistema");

  rl.question("Escolha uma das opções: ", (opcao) => {
    const opcaoFormatada = parseInt(opcao);

    switch (opcaoFormatada) {
      case 1:
        adicionarMissao();
        break;
      case 2:
        listarMissoesEmAndamento();
        break;
      case 3:
        listarMissoesConcluidas();
        break;
      case 4:
        editarMissao();
        break;
      case 5:
        atualizarStatus();
        break;
      case 6:
        filtrarPorPrioridade();
        break;
      case 7:
        rankingDestinos();
        break;
      case 8:
        listarPorTripulante();
        break;
      case 9:
        console.log("Saindo do sistema...");
        rl.close();
        break;
      default:
        console.log("Opção inválida, tente novamente.");
        exibirMenu();
        break;
    }
  });
}

function adicionarMissao() {
  console.log("\n======= CADASTRO DE MISSÃO =======\n");

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

function listarMissoesEmAndamento() {
  console.log("\n======= LISTAR MISSÕES EM ANDAMENTO =======\n");

  if (missoes.length === 0) {
    console.log("Não existem missões cadastradas.");
  } else {
    missoes.forEach((missao, index) => {
      console.log(
        `\nÍndice: ${index + 1}\nNome da missão: ${
          missao.nome
        }\nDestino da missão: ${missao.destino}` +
          `\nPrioridade da missão: ${missao.prioridade}\nTripulantes: ${missao.tripulantes}` +
          `\nConcluída: ${missao.status}\n`
      );
    });
  }

  exibirMenu();
}

function listarMissoesConcluidas() {
  console.log("\n======= LISTAR MISSÕES CONCLUÍDAS =======\n");

  if (missoesConcluidas.length === 0) {
    console.log("Não existem missões concluídas cadastradas.");
  } else {
    missoesConcluidas.forEach((missao, index) => {
      console.log(
        `\nÍndice: ${index + 1}\nNome da missão: ${
          missao.nome
        }\nDestino da missão: ${missao.destino}` +
          `\nPrioridade da missão: ${missao.prioridade}\nTripulantes: ${missao.tripulantes}` +
          `\nConcluída: ${missao.status}\n`
      );
    });
  }

  exibirMenu();
}

function editarMissao() {
  console.log("\n======= EDITAR MISSÃO =======\n");

  if (missoes.length === 0) {
    console.log("Não há nenhuma missão cadastrada para editar.");
    return exibirMenu();
  }

  console.log("Missões cadastradas:");
  missoes.forEach((missao, index) => {
    console.log(
      `\nÍndice: ${index + 1}\nNome da missão: ${
        missao.nome
      }\nDestino da missão: ${missao.destino}` +
        `\nPrioridade da missão: ${missao.prioridade}\nTripulantes: ${missao.tripulantes}` +
        `\nConcluída: ${missao.status}\n`
    );
  });

  rl.question("\nDigite o número da missão que deseja editar: ", (indice) => {
    const i = parseInt(indice) - 1;

    if (isNaN(i) || i < 0 || i >= missoes.length) {
      console.log("Índice inválido.");
      return editarMissao();
    }

    console.log("\n======= OPÇÕES DE EDIÇÃO DA MISSÃO =======\n");
    console.log("1 - Alterar nome da missão");
    console.log("2 - Alterar o destino da missão");
    console.log("3 - Alterar a prioridade da missão");
    console.log("4 - Alterar os integrantes da missão");

    menuEditar();

    function menuEditar() {
      rl.question("Informe o número da opção que deseja editar: ", (opcao) => {
        const opcaoFormatada = parseInt(opcao);

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
        perguntarMaisEdicoes();
      });
    }

    function alterarDestino() {
      rl.question("Informe o novo destino: ", (novoDestino) => {
        missoes[i].destino = novoDestino;
        console.log("Destino alterado com sucesso.");
        perguntarMaisEdicoes();
      });
    }

    function alterarPrioridade() {
      rl.question("Informe a nova prioridade: ", (novaPrioridade) => {
        missoes[i].prioridade = parseInt(novaPrioridade);
        console.log("Prioridade alterada com sucesso.");
        perguntarMaisEdicoes();
      });
    }

    function alterarTripulantes() {
      rl.question("Informe os novos tripulantes: ", (novosTripulantes) => {
        missoes[i].tripulantes = novosTripulantes;
        console.log("Tripulantes alterados com sucesso.");
        perguntarMaisEdicoes();
      });
    }

    function perguntarMaisEdicoes() {
      rl.question("Deseja alterar mais alguma coisa? (S/N): ", (opcao) => {
        const opcaoFormatada = opcao.toLowerCase();
        if (opcaoFormatada === "s") {
          menuEditar();
        } else if (opcaoFormatada === "n") {
          exibirMenu();
        } else {
          console.log("Informe uma resposta válida.");
          perguntarMaisEdicoes();
        }
      });
    }
  });
}

function atualizarStatus() {
  console.log("\n======= ATUALIZAR STATUS =======\n");

  if (missoes.length === 0) {
    console.log("Não há nenhuma missão cadastrada para atualizar o status.");
    return exibirMenu();
  }

  console.log("Missões cadastradas:");
  missoes.forEach((missao, index) => {
    console.log(
      `\nÍndice: ${index + 1}\nNome da missão: ${
        missao.nome
      }\nDestino da missão: ${missao.destino}` +
        `\nPrioridade da missão: ${missao.prioridade}\nTripulantes: ${missao.tripulantes}` +
        `\nConcluída: ${missao.status}\n`
    );
  });

  rl.question(
    "\nDigite o número da missão que deseja marcar como concluída: ",
    (indice) => {
      const i = parseInt(indice) - 1;

      if (isNaN(i) || i < 0 || i >= missoes.length) {
        console.log("Índice inválido.");
        return atualizarStatus();
      }

      rl.question(
        "Tem certeza que deseja marcar essa missão como concluída? (S/N): ",
        (opcao) => {
          const opcaoFormatada = opcao.toLowerCase();

          if (opcaoFormatada === "s") {
            const missaoConcluida = missoes.splice(i, 1)[0];
            missaoConcluida.status = true;
            missoesConcluidas.push(missaoConcluida);
            console.log(
              `Missão "${missaoConcluida.nome}" marcada como concluída com sucesso.`
            );
            exibirMenu();
          } else if (opcaoFormatada === "n") {
            exibirMenu();
          } else {
            console.log("Informe uma opção válida.");
            atualizarStatus();
          }
        }
      );
    }
  );
}

function filtrarPorPrioridade() {
  console.log("\n======= FILTRAR POR PRIORIDADE =======\n");

  if (missoes.length === 0) {
    console.log("Não há nenhuma missão cadastrada para filtrar.");
    return exibirMenu();
  }

  rl.question("Informe o nível de prioridade (1-5): ", (prioridade) => {
    const prioridadeFormatada = parseInt(prioridade);

    if (
      isNaN(prioridadeFormatada) ||
      prioridadeFormatada < 1 ||
      prioridadeFormatada > 5
    ) {
      console.log("Por favor, informe um número válido.");
      return filtrarPorPrioridade();
    }

    const missoesFiltradas = missoes.filter(
      (missao) => missao.prioridade === prioridadeFormatada
    );

    if (missoesFiltradas.length === 0) {
      console.log(
        `Nenhuma missão com prioridade ${prioridadeFormatada} foi encontrada.`
      );
    } else {
      console.log(`\nMissões com prioridade ${prioridadeFormatada}:\n`);
      missoesFiltradas.forEach((missao) => {
        console.log(`Nome da missão: ${missao.nome}`);
        console.log(`Prioridade: ${missao.prioridade}\n`);
      });
    }

    exibirMenu();
  });
}

function rankingDestinos() {
  console.log("\n======= RANKING DE DESTINOS =======\n");

  if (missoes.length === 0) {
    console.log("Não há nenhuma missão cadastrada.");
    return exibirMenu();
  }

  const destinoContagem = {};

  missoes.forEach((missao) => {
    const destino = missao.destino;

    if (!destinoContagem[destino]) {
      destinoContagem[destino] = {
        quantidade: 0,
        missoes: [],
      };
    }

    destinoContagem[destino].quantidade += 1;
    destinoContagem[destino].missoes.push(missao.nome);
  });

  const ranking = Object.entries(destinoContagem).sort(
    (a, b) => b[1].quantidade - a[1].quantidade
  );

  ranking.forEach(([destino, info], index) => {
    console.log(`Rank ${index + 1}: ${destino}`);
    console.log(`Total de missões: ${info.quantidade}`);
    console.log("Missões:");
    info.missoes.forEach((nome) => {
      console.log(`- ${nome}`);
    });
    console.log("");
  });

  exibirMenu();
}

function listarPorTripulante() {
  console.log("\n======= LISTAR MISSÕES POR TRIPULANTE =======\n");

  if (missoes.length === 0) {
    console.log("Não há nenhuma missão cadastrada.");
    return exibirMenu();
  }

  rl.question("Informe o nome do tripulante: ", (nome) => {
    const nomeFormatado = nome.trim().toLowerCase();

    const missoesComTripulante = missoes.filter((missao) => {
      const tripulantes = missao.tripulantes
        .split(",")
        .map((t) => t.trim().toLowerCase());

      return tripulantes.includes(nomeFormatado);
    });

    if (missoesComTripulante.length === 0) {
      console.log(`Nenhuma missão encontrada para o tripulante "${nome}".`);
    } else {
      console.log(`\nMissões do tripulante "${nome}":\n`);
      missoesComTripulante.forEach((missao) => {
        console.log(
          `- ${missao.nome} (Destino: ${missao.destino}, Prioridade: ${missao.prioridade})`
        );
      });
    }

    exibirMenu();
  });
}

exibirMenu();
