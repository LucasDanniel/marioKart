const player1 = {
  NOME: "Mario",
  VELOCIDADE: 4,
  MANOBRABILIDADE: 3,
  PODER: 3,
  PONTOS: 0,
};

const player2 = {
  NOME: "Luigi",
  VELOCIDADE: 3,
  MANOBRABILIDADE: 4,
  PODER: 4,
  PONTOS: 0,
};

//Async Functions
async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
      result = "RETA";
      break;
    case random < 0.66:
      result = "CURVA";
      break;
    default:
      result = "CONFRONTO";
  }

  return result;
}

async function logRollResult(characterName, block, diceResult, attribute) {
  console.log(
    `${characterName}🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${
      diceResult + attribute
    }`
  );
}

async function playRaceEngine(charecter1, charecter2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 Rodada ${round}`);

    // sortear bloco
    let block = await getRandomBlock();
    console.log(`Bloco: ${block}`);
    //Rolar os dados
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    //Teste de habilidade
    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    if (block === "RETA") {
      totalTestSkill1 = diceResult1 + charecter1.VELOCIDADE;
      totalTestSkill2 = diceResult2 + charecter2.VELOCIDADE;

      await logRollResult(
        charecter1.NOME,
        "velocidade",
        diceResult1,
        charecter1.VELOCIDADE
      );

      await logRollResult(
        charecter2.NOME,
        "velocidade",
        diceResult2,
        charecter2.VELOCIDADE
      );
    }

    if (block === "CURVA") {
      totalTestSkill1 = diceResult1 + charecter1.MANOBRABILIDADE;
      totalTestSkill2 = diceResult2 + charecter2.MANOBRABILIDADE;

      await logRollResult(
        charecter1.NOME,
        "manobrabilidade",
        diceResult1,
        charecter1.MANOBRABILIDADE
      );

      await logRollResult(
        charecter2.NOME,
        "manobrabilidade",
        diceResult2,
        charecter2.MANOBRABILIDADE
      );
    }

    if (block === "CONFRONTO") {
      let powerResult1 = diceResult1 + charecter1.PODER;
      let powerResult2 = diceResult2 + charecter2.PODER;

      console.log(`${charecter1.NOME} Confrontou com ${charecter2.NOME}🥊`);

      await logRollResult(
        charecter1.NOME,
        "Poder",
        diceResult1,
        charecter1.PODER
      );

      await logRollResult(
        charecter2.NOME,
        "Poder",
        diceResult2,
        charecter2.PODER
      );

      if (powerResult1 > powerResult2 && charecter2.PONTOS > 0) {
        console.log(
          `${charecter1.NOME} venceu o confronto! ${charecter2.NOME} perdeu um ponto `
        );
        charecter2.PONTOS--;
      }

      if (powerResult2 > powerResult1 && charecter1.PONTOS > 0) {
        console.log(
          `${charecter2.NOME} venceu o confronto! ${charecter1.NOME} perdeu um ponto `
        );
        charecter1.PONTOS--;
      }

      console.log(
        powerResult2 === powerResult1
          ? "Confront empatado Nenhum ponto foi perdido"
          : ""
      );
    }

    //verifica o vencendor
    if (totalTestSkill1 > totalTestSkill2) {
      console.log(`${charecter1.NOME} marcou um ponto!`);
      charecter1.PONTOS++;
    } else if (totalTestSkill2 > totalTestSkill1) {
      console.log(`${charecter2.NOME} marcou um ponto`);
      charecter2.PONTOS++;
    }

    console.log("-----------------------------------");
  }
}

async function declareWinner(charecter1, charecter2) {
  console.log("Resultado final:");
  console.log(`${charecter1.NOME}: ${charecter1.PONTOS} ponto(s)`);
  console.log(`${charecter2.NOME}: ${charecter2.PONTOS} ponto(s)`);

  if (charecter1.PONTOS > charecter2.PONTOS) {
    console.log(`\n${charecter1.NOME} venceu a corrida! Parabens🏆`);
  } else if (charecter2.PONTOS > charecter1.PONTOS) {
    console.log(`\n${charecter2.NOME} venceu a corrida! Parabens🏆`);
  } else {
    console.log("A corrida terminou em empate.");
  }
}

//auto invoke
(async function main() {
  console.log(
    `🏁🚨 corrida entre o ${player1.NOME} e ${player2.NOME} Começando...\n`
  );

  await playRaceEngine(player1, player2);
  await declareWinner(player1, player2);
})();
