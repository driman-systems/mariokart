const player1 = {
    nome: "Mario",
    velocidade: 4,
    manobrabilidade: 3,
    poder: 3,
    pontos: 0
}

const player2 = {
    nome: "Luigi",
    velocidade: 3,
    manobrabilidade: 4,
    poder: 4,
    pontos: 0
}

const player3 = {
    nome: "Peach",
    velocidade: 3,
    manobrabilidade: 4,
    poder: 2,
    pontos: 0
}

const player4 = {
    nome: "Yoshi",
    velocidade: 2,
    manobrabilidade: 4,
    poder: 3,
    pontos: 0
}

const player5 = {
    nome: "Bowser",
    velocidade: 5,
    manobrabilidade: 2,
    poder: 5,
    pontos: 0
}

const player6 = {
    nome: "Donkey Kong",
    velocidade: 2,
    manobrabilidade: 2,
    poder: 5,
    pontos: 0
}

function rollDice() {
    return Math.floor(Math.random() * 6) + 1
}

async function logRollResult(cName, block, diceResult, attr) {
    console.log(`${cName} 🎲 rolou um dado de ${block} ${diceResult} + ${attr} = ${diceResult + attr}\n`)
}

async function getRandomBlock() {
    let random = Math.random()
    let result 

    switch(true) {
        case random < 0.33:
            result = "RETA"
            break;
        case random < 0.66:
            result = "CURVA"
            break;
        default: 
            result = "CONFRONTO"
    }

    return result
}

async function playRaceEngine(c1, c2) {

    for(let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}`)

        let block = await getRandomBlock()

        console.log(`Bloco: ${block}`)

        let diceResult1 = await rollDice()
        let diceResult2 = await rollDice()

        let totalTestSkill1 = 0
        let totalTestSkill2 = 0

        if(block === "RETA") {
            totalTestSkill1 = diceResult1 + c1.velocidade
            totalTestSkill2 = diceResult2 + c2.velocidade

            await logRollResult(player1.nome, "velocidade", diceResult1, c1.velocidade)
            await logRollResult(player2.nome, "velocidade", diceResult2, c2.velocidade)
        }

        if(block === "CURVA") {
            totalTestSkill1 = diceResult1 + c1.manobrabilidade
            totalTestSkill2 = diceResult2 + c2.manobrabilidade

            await logRollResult(player1.nome, "manobrabilidade", diceResult1, c1.manobrabilidade)
            await logRollResult(player2.nome, "manobrabilidade", diceResult2, c2.manobrabilidade)
        }

        if(block === "CONFRONTO") {
            let powerResult1 = diceResult1 + c1.poder
            let powerResult2 = diceResult2 + c2.poder

            console.log(`${c1.nome} confrontou ${c2.nome}! 🥊\n`)

            await logRollResult(player1.nome, "poder", diceResult1, c1.poder)
            await logRollResult(player2.nome, "poder", diceResult2, c2.poder)

            if(powerResult2 > powerResult1) {
                console.log(`${c2.nome} venceu o confronto!\n ${c1.nome} perdeu 1 ponto 🐢\n`)
                c1.pontos -= c1.pontos > 0;
            }
            
            if(powerResult1 > powerResult2) {
                console.log(`${c1.nome} venceu o confronto!\n ${c2.nome} perdeu 1 ponto 🐢\n`)
                c2.pontos -= c2.pontos > 0
            }

            console.log(powerResult1 === powerResult2 ? "Confronto empatado! Nenhum ponto perdido" : "")

            
        }

        if(block !== "CONFRONTO") {
            if(totalTestSkill1 > totalTestSkill2) {
                console.log(`${c1.nome}  marcou um ponto!\n`)
                c1.pontos++
            } else if(totalTestSkill2 > totalTestSkill1) {
                console.log(`${c2.nome}  marcou um ponto!\n`)
                c2.pontos++
            } else {
                console.log(`${c1.nome} e ${c2.nome}  empataram!\n`)
            }    
        }

        console.log("_____________________________________\n")
    }

}

async function declareWinner(c1, c2) {
    console.log("Resultado Final:")
    console.log(`${c1.nome}: ${c1.pontos} pontos`)
    console.log(`${c2.nome}: ${c2.pontos} pontos\n`)

    if(c1.pontos > c2.pontos) {
        console.log(`\n ${c1.nome} venceu a corrida! Parabéns 🏆\n\n`)
    } else if(c2.pontos > c1.pontos) {
        console.log(`\n ${c2.nome} venceu a corrida! Parabéns 🏆\n\n`)
    } else {
        console.log(`\n A corrida terminou empatada\n\n`)
    }
}

async function main() {
    console.log(`🏁 🚨 Corrida entre ${player1.nome} e ${player2.nome} começando...\n`)

    await playRaceEngine(player1, player2)

    await declareWinner(player1, player2);
}

main()