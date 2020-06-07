// node.js - ambiente de execução do JS (servidor)
// nodemon - atualiza o servidor(node), sem ser manualmente
// express - framework do JS para estruturação web (ex.:Rotas)
// template engine (nunjucks) - html dinâmico


// importando o express (do node_modules)
const express = require("express")
    // um objeto
const server = express()

// pegar o banco de dados
const db = require("./database/db.js")

// configurar pasta pública
// configuração do servidor
server.use(express.static("public"))

// habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true }))

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

    // req.query: Query Strings da URL
    // console.log(req.query)


    // variável global (diretório) concatenada com o caminho da pagina desejada
    // 0.1 - res.sendFile(__dirname + "/views/create-point.html")
    res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {

    // req.body: O corpo do nosso formulário
    // console.log(req.body)

    // inserir dados no banco de dados
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if (err) {
            return console.log(err)
        }

        console.log("Cadastrado com sucesso!")
        console.log(this)

        return res.render("create-point.html", { saved: true })
    }

    db.run(query, values, afterInsertData)

})

server.get("/search", (req, res) => {

    const search = req.query.search

    if (search == "") {
        // pesquisa vazia ( quando o total for 0 )
        return res.render("search-results.html", { total: 0 })
    }


    // pegar os dados no banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if (err) {
            console.log(err)
            return res.send("Erro no cadastro!")
        }

        const total = rows.length

        // mostrar a página HTML com os dados do banco de dados
        return res.render("search-results.html", { places: rows, total: total })
    })

})


// ligar o servidor
server.listen(3000)