// node.js - ambiente de execução do JS (servidor)
// nodemon - atualiza o servidor(node), sem ser manualmente
// express - framework do JS para estruturação web (ex.:Rotas)
// template engine (nunjucks) - html dinâmico



// importando o express (do node_modules)
const express = require("express")
    // um objeto
const server = express()

// configurar pasta pública
// configuração do servidor
server.use(express.static("public"))

// "pedindo" template engine (do node_modules)
const nunjucks = require("nunjucks")
    // configurando o nunjucks mostrando a pagina inicial do projeto e passando o caminho do servidor e tirando o cache
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// configurar caminhos da aplicação
// página inicial
// req: Requisição (pedido)
// res: Resposta
server.get("/", (req, res) => {
    // variável global (diretório) concatenada com o caminho da pagina desejada
    // 0.1 - res.sendFile(__dirname + "/views/index.html")
    // 0.2 - depois que já temos o nunjucks configurado ligado ao express
    res.render("index.html", { title: "Um título" })
})

server.get("/create-point", (req, res) => {
    // variável global (diretório) concatenada com o caminho da pagina desejada
    // 0.1 - res.sendFile(__dirname + "/views/create-point.html")
    res.render("create-point.html")
})

server.get("/search", (req, res) => {
    res.render("search-results.html")
})


// ligar o servidor
server.listen(3000)