// "importando o express"
const express = require("express")
// um objeto
const server = express()

// configurar caminhos da aplicação
// página inicial
// req: Requisição (pedido)
// res: Resposta
server.get("/", (req, res) => {
    // variável global (diretório) concatenada com o caminho da pagina desejada
    res.sendFile(__dirname + "/views/index.html")
})


// ligar o servidor
server.listen(3000)