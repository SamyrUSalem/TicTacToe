//Coletando todos os span(regiões)
const allRegions = document.querySelectorAll("#board span");
let boardVirtual = []
let roundPlayer = ''

function turnPlayer() {
    const player = document.getElementById(roundPlayer);
    document.getElementById("roundPlayer").innerText = player.value
}

function startRestartGame() {
    //Tabuleiroq  vai aparecer no console e vai fazer a validação caso alguem ganhe
    boardVirtual = [["", "", ""], ["", "", ""], ["", "", ""]]
    //O roundPlayer vai ser o player 1, pq ele q vai começar, ele esta recebendo essa string pq essa variavel esta na função de cima turnPlayer, com essa string q é o nome do id do input do primeiro player, ele vai conseguir coletar o valor dele e enviar para variável player
    roundPlayer = "1player"
    //Estou pegando  o h2, pq irei alterar o elemento html quando o jogador vencer
    document.querySelector("h2").innerHTML = "Jogador: <span id='roundPlayer'></span>"
    //Esse botão além de começar, também ira reiniciar o game então quando reiniciar precisa chamar a função turnPlayer(), pq ela irá trazer o primeiro jogador
    turnPlayer()
    allRegions.forEach(function (element) {
        //como ele também reinicia, irei remover a classe winner de todos os elementos
        element.classList.remove("winner");
        element.innerText = ""
        //Estou adicionando a classe cursor, para ele voltar a ser pointer, pq toda vez q uma região for clciada ele vai tirar a classe cursor,mas quando reinicar o jogo ele adicionará a classe novamente
        element.classList.add("cursor")
        //Vai fazer com que os campos das regiões sejam clicaveis, fazendo aparecer o X ou O
        element.addEventListener("click", playerGame)
    })
}

function cursor(element) {
    //Quando a região for clicada, o cursor do mouse vai ser default por conta disso estou removendo a classe cursor(q faz ele ser um pointer)
    element.classList.remove("cursor")
    element.classList.add("cursorDef")
    //Estou removendo o evento q faz com que seja possível clicar de novo, nesse span
    element.removeEventListener("click", playerGame)
}

function regionsWinners() {
    const wRegions = []
    //Estou realizando a verificação se ele ganhou ou não, a primeira coisa q faço é colocar boardVirtual[0][0], para verificar se ela possui algum valor, n é preciso colocar boardVirtual !== "", poderia mas o Js é inteligente entção só colocando dessa maneirá é suficiente, depois vejo se o boardVirtual nas posições abaixo tem os mesmos valores
    if (boardVirtual[0][0] && boardVirtual[0][0] === boardVirtual[0][1] && boardVirtual[0][0] === boardVirtual[0][2])
        //Caso tenhama os mesmos valores, as posições serão enviadas para o array wRegions
        wRegions.push("0.0", "0.1", "0.2")
    if (boardVirtual[1][0] && boardVirtual[1][0] === boardVirtual[1][1] && boardVirtual[1][0] === boardVirtual[1][2])
        wRegions.push("1.0", "1.1", "1.2")
    if (boardVirtual[2][0] && boardVirtual[2][0] === boardVirtual[2][1] && boardVirtual[2][0] === boardVirtual[2][2])
        wRegions.push("2.0", "2.1", "2.2")
    if (boardVirtual[0][0] && boardVirtual[0][0] === boardVirtual[1][0] && boardVirtual[0][0] === boardVirtual[2][0])
        wRegions.push("0.0", "1.0", "2.0")
    if (boardVirtual[0][1] && boardVirtual[0][1] === boardVirtual[1][1] && boardVirtual[0][1] === boardVirtual[2][1])
        wRegions.push("0.1", "1.1", "2.1")
    if (boardVirtual[0][2] && boardVirtual[0][2] === boardVirtual[1][2] && boardVirtual[0][2] === boardVirtual[2][2])
        wRegions.push("0.2", "1.2", "2.2")
    if (boardVirtual[0][0] && boardVirtual[0][0] === boardVirtual[1][1] && boardVirtual[0][0] === boardVirtual[2][2])
        wRegions.push("0.0", "1.1", "2.2")
    if (boardVirtual[0][2] && boardVirtual[0][2] === boardVirtual[1][1] && boardVirtual[0][2] === boardVirtual[2][0])
        wRegions.push("0.2", "1.1", "2.0")
    return wRegions;
}

function winner(regions) {
    //Eu irei acrescentar uma classe de cada um desses elementos q possui nessa variavel, pq ela esta com as posições de cada elemento
    regions.forEach(function (region) {
        //Irei pegar no documento os spans q tem o data-position com os valores respectivos, q no casso são as posições que estão dentro variável, e com isso irei adicionar a classe winner do css
        document.querySelector("[data-position = '" + region + "' ]").classList.add("winner");
    })
    //estou coletando o jogador q venceu, q  no caso é aquele q esta na vez
    const winnerPlayer = document.getElementById(roundPlayer).value
    //Estou inserindo na tela o nome do mesmo
    const textWinner = document.querySelector("h2").innerHTML = "Parabén pela vitória " + winnerPlayer;
}


function playerGame(ev) {
    const span = ev.currentTarget
    //Estou pegando o valor do data do span q foi criado
    const region = ev.currentTarget.dataset.position
    //A função split divide uma string e transforma ela em um array, por exemplo a variavel region esta recebendo o valor do data, q no caso pode ser o valor "0.0", então a gente escolhe algum caractere especifico para quebrar esse valor q no caso é o ponto, e depois será transformado em um arraay, nessa situação vai ficar assim = ["0", "0"] transformou a string em um array e depois dividiu ele, quando o sistema encontrar um ponto, será divido como os 0 acima
    const arrayColRow = region.split('.')
    const row = arrayColRow[0];
    const col = arrayColRow[1];

    //caso seja o primeiro player, vai marcar um x no span e no tabuleiro q vai esta no console.log, e vai marcar na posição q esta na variavel row e col
    if (roundPlayer === "1player") {
        span.innerText = "X"
        boardVirtual[row][col] = "X"
    } else {
        span.innerText = "O"
        boardVirtual[row][col] = "O"
    }
    //Irei limpar o console
    console.clear()
    //Irei mostrar o array bidimensional(tabuleiro no console) em formato de tabela, esse console.table() tenta mostrar os valores dentro de uma tabela e um array bidimensional é capaz de ser exibido assim
    console.table(boardVirtual)
    //Essa função vai impedir que o usuário clica mais de uma vez no mesmo espaço e vai mudar o cursor, assim q o usuário passar da condicional acima e marcar o span, n quero q ele tente marcar mais uma vez o mesmo lugar
    cursor(span)

    const winRegions = regionsWinners()
    //Como essa variavel esta recendo o valor da função, estou vendo se ela possui algum valor dentro dela, pq caso possua quer dizer q algum player venceu
    if (winRegions.length > 0) {
        winner(winRegions)
        //Dessa maneira, eu estarei bloqueando o usuário continuar jogando com o mesmo tabuleiro q ja acabou
        allRegions.forEach(function (r) {
            r.removeEventListener("click", playerGame)
            r.classList.remove("cursor")
            r.classList.add("cursorDef")
        })


        //A função flat, vai transformar o array bidimensional q esta no boardVirtual em apenas um array normal(vai juntar tudo), e o include esta verificando se esse array possui algum espaço vazio, caso tenha p jogo vai continuar e irá alternar o jogador, então quando o jogador jogar, ele vai fazer a verificação se tem espaço vazio ou não, caso tenha ele vai trocar o jogador, e toda vez q alguem jogar esse processo vai se repetir, até empatar ou ganhar
    } else if (boardVirtual.flat().includes("")) {
        //Caso seja o primeiro ele vira o segundo, caso seja o segundo ele vira o primeiro
        roundPlayer = roundPlayer === "1player" ? "2player" : "1player"
        turnPlayer()
        //Caso ninguem tenha vencido ou n tenha espaço vazio, quer dizer q empatou
    } else {
        document.querySelector("h2").innerHTML = "<b>EMPATOU!</b>"
    }
}

document.getElementById("startButton").addEventListener("click", startRestartGame)