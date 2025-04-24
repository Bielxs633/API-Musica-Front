/**
 * 
 *  Objetivo: API responsável pelas requisições do projeto de controle de música.
 *  Data: 13/02/25
 *  Autor: Gabriel
 *  Versão: 1.0
 *  Observações: 
 *  - Para criar a API precisamos instalar:
 *      express;
 *      cors;
 *      body-parser
 *  - Para criar a conexão com o banco de dados MySQL precisamos instalar:
 *      prisma;
 *      prisma/client;
 *          - Após a instalação do prisma é necessário inicializar o prisma:
 *              npx prisma init;
 *          - Para sincronizar o prisma com o banco de dados podemos utilizar:
 *              npx prisma migrate dev;
 * 
 **/
/*

    Instalações:
        express         ->  npm install express --save              ->  serve para criar a API
        cors            ->  npm install cors --save                 ->  serve para configurar as permissões da API
        body-parser     ->  npm install body-parser --save          ->  serve para manipular os dados emviados para a API pelo body

        prisma          -> npm install prisma --save                ->
        prisma/client   -> npm install @prisma/client --save        ->

    Inicialização do Prisma:
                        -> npx prisma init                          ->

    Sincronização do Prisma com o DB:
                        -> npx prisma migrate dev                   ->

*/
/*

    npx prisma generate 

*/

///---------------------------------------------------------------------------------------------------------------------

// Import das bibliotecas para criar a API
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

// Import das controllers do projeto
const controllerMusica          = require('./controller/musica/controllerMusica.js')
const controllerUsuario         = require('./controller/usuario/controllerUsuario.js')
const controllerBanda           = require('./controller/banda/controllerBanda.js')
const controllerPlaylist        = require('./controller/playlist/controllerPlaylist.js')
const controllerPlano           = require('./controller/plano/controllerPlano.js')
const controllerVigencia        = require('./controller/vigencia/controllerVigencia.js')
const controllerClassificacao   = require('./controller/classificacacao/controllerClassificacao.js')
const controllerGenero          = require('./controller/genero/controllerGenero.js')

// Criando o formato de dados que será recebido no bury da requisição ( POST/PUT )
const bodyParserJSON = bodyParser.json()


// Cria o objeto app para criar a API
const app = express()

///---------------------------------------------------------------------------------------------------------------------

// Configurações do Cors
app.use((request, response, next)=>{
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())
    next()
})


///---------------------------------------------------------------------------------------------------------------------
//______________________________________________________________________________________________________________________

// Endpoint para inserir uma música
app.post('/v1/controle-musicas/musica', cors(), bodyParserJSON, async function(request, response){    

    // Recebe contet type da requisição para validar o formato de dados
    let contentType = request.headers['content-type']
    // Recebe os dados encaminhados no body da requisição
    let dadosBody = request.body

    let result = await controllerMusica.inserirMusica(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)

})

///---------------------------------------------------------------------------------------------------------------------

// Endpoint para retornar a lista de musicas
app.get('/v1/controle-musicas/musica', cors(), async function(request, response){

    // Chama a função para retornar a lista de musicas
    let result = await controllerMusica.listarMusica()

    response.status(result.status_code)
    response.json(result)

})

///---------------------------------------------------------------------------------------------------------------------

// Endpoint para retornar a música pelo ID
app.get('/v1/controle-musicas/musica/:id', cors(), async function(request, response){

    let idMusica = request.params.id

    let result = await controllerMusica.buscarMusica(idMusica)

    response.status(result.status_code)
    response.json(result)

})

///---------------------------------------------------------------------------------------------------------------------

// Endpoint para deletar uma musica
app.delete('/v1/controle-musicas/musica/:id', cors(), async function(request, response){

    let idMusica = request.params.id

    let result = await controllerMusica.excluirMusica(idMusica)

    response.status(result.status_code)
    response.json(result)

})

///---------------------------------------------------------------------------------------------------------------------

// Endpoint para atualizar uma musica
app.put('/v1/controle-musicas/musica/:id', cors(), bodyParserJSON, async function(request, response){

    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    // Recebe ID da musica
    let idMusica = request.params.id

    // Recebe os dados do body
    let dadosBody = request.body 

    let result = await controllerMusica.atualizarMusica(dadosBody, idMusica, contentType)

    response.status(result.status_code)
    response.json(result)

})

//______________________________________________________________________________________________________________________
///---------------------------------------------------------------------------------------------------------------------
//______________________________________________________________________________________________________________________

// Endpoint para inserir um usuario
app.post('/v1/controle-musicas/usuario', cors(), bodyParserJSON, async function(request, response){    

    // Recebe contet type da requisição para validar o formato de dados
    let contentType = request.headers['content-type']
    // Recebe os dados encaminhados no body da requisição
    let dadosBody = request.body

    let result = await controllerUsuario.inserirUsuario(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)

})

///---------------------------------------------------------------------------------------------------------------------

// Endpoint para retornar a lista de usuarios
app.get('/v1/controle-musicas/usuario', cors(), async function(request, response){

    // Chama a função para retornar a lista de usuarios
    let result = await controllerUsuario.listarUsuario()

    response.status(result.status_code)
    response.json(result)

})

///---------------------------------------------------------------------------------------------------------------------

// Endpoint para retornar o usuario pelo ID
app.get('/v1/controle-musicas/usuario/:id', cors(), async function(request, response){

    let id = request.params.id

    let result = await controllerUsuario.buscarUsuario(id)

    response.status(result.status_code)
    response.json(result)

})

///---------------------------------------------------------------------------------------------------------------------

// Endpoint para deletar um usuario
app.delete('/v1/controle-musicas/usuario/:id', cors(), async function(request, response){

    let id = request.params.id

    let result = await controllerUsuario.excluirUsuario(id)

    response.status(result.status_code)
    response.json(result)

})

///---------------------------------------------------------------------------------------------------------------------

// Endpoint para atualizar um usuario
app.put('/v1/controle-musicas/usuario/:id', cors(), bodyParserJSON, async function(request, response){

    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    // Recebe ID do usuario
    let id = request.params.id

    // Recebe os dados do body
    let dadosBody = request.body 

    let result = await controllerUsuario.atualizarUsuario(dadosBody, id, contentType)

    response.status(result.status_code)
    response.json(result)

})

//______________________________________________________________________________________________________________________
///---------------------------------------------------------------------------------------------------------------------
//______________________________________________________________________________________________________________________

// Endpoint para inserir uma banda
app.post('/v1/controle-musicas/banda', cors(), bodyParserJSON, async function(request, response){    

    // Recebe contet type da requisição para validar o formato de dados
    let contentType = request.headers['content-type']
    // Recebe os dados encaminhados no body da requisição
    let dadosBody = request.body

    let result = await controllerBanda.inserirBanda(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)

})

///---------------------------------------------------------------------------------------------------------------------

// Endpoint para retornar a lista de bandas
app.get('/v1/controle-musicas/banda', cors(), async function(request, response){

    // Chama a função para retornar a lista de bandas
    let result = await controllerBanda.listarBanda()

    response.status(result.status_code)
    response.json(result)

})

///---------------------------------------------------------------------------------------------------------------------

// Endpoint para retornar a banda pelo ID
app.get('/v1/controle-musicas/banda/:id', cors(), async function(request, response){

    let id = request.params.id

    let result = await controllerBanda.buscarBanda(id)

    response.status(result.status_code)
    response.json(result)

})

///---------------------------------------------------------------------------------------------------------------------

// Endpoint para deletar uma banda
app.delete('/v1/controle-musicas/banda/:id', cors(), async function(request, response){

    let id = request.params.id

    let result = await controllerBanda.excluirBanda(id)

    response.status(result.status_code)
    response.json(result)

})

///---------------------------------------------------------------------------------------------------------------------

// Endpoint para atualizar uma banda
app.put('/v1/controle-musicas/banda/:id', cors(), bodyParserJSON, async function(request, response){

    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    // Recebe ID da banda
    let id = request.params.id

    // Recebe os dados do body
    let dadosBody = request.body 

    let result = await controllerBanda.atualizarBanda(dadosBody, id, contentType)

    response.status(result.status_code)
    response.json(result)

})

//______________________________________________________________________________________________________________________
///---------------------------------------------------------------------------------------------------------------------
//______________________________________________________________________________________________________________________

// Endpoint para inserir uma playlist
app.post('/v1/controle-musicas/playlist', cors(), bodyParserJSON, async function(request, response){    

    // Recebe contet type da requisição para validar o formato de dados
    let contentType = request.headers['content-type']
    // Recebe os dados encaminhados no body da requisição
    let dadosBody = request.body

    let result = await controllerPlaylist.inserirPlaylist(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)

})

///---------------------------------------------------------------------------------------------------------------------

// Endpoint para retornar a lista de playlists
app.get('/v1/controle-musicas/playlist', cors(), async function(request, response){

    // Chama a função para retornar a lista de playlists
    let result = await controllerPlaylist.listarPlaylist()

    response.status(result.status_code)
    response.json(result)

})

///---------------------------------------------------------------------------------------------------------------------

// Endpoint para retornar a playlist pelo ID
app.get('/v1/controle-musicas/playlist/:id', cors(), async function(request, response){

    let id = request.params.id

    let result = await controllerPlaylist.buscarPlaylist(id)

    response.status(result.status_code)
    response.json(result)

})

///---------------------------------------------------------------------------------------------------------------------

// Endpoint para deletar uma playlist
app.delete('/v1/controle-musicas/playlist/:id', cors(), async function(request, response){

    let id = request.params.id

    let result = await controllerPlaylist.excluirPlaylist(id)

    response.status(result.status_code)
    response.json(result)

})

///---------------------------------------------------------------------------------------------------------------------

// Endpoint para atualizar uma playlist
app.put('/v1/controle-musicas/playlist/:id', cors(), bodyParserJSON, async function(request, response){

    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    // Recebe ID da playlist
    let id = request.params.id

    // Recebe os dados do body
    let dadosBody = request.body 

    let result = await controllerPlaylist.atualizarPlaylist(dadosBody, id, contentType)

    response.status(result.status_code)
    response.json(result)

})

//______________________________________________________________________________________________________________________
///---------------------------------------------------------------------------------------------------------------------
//______________________________________________________________________________________________________________________

// Endpoint para inserir um plano
app.post('/v1/controle-musicas/plano', cors(), bodyParserJSON, async function(request, response){    

    // Recebe contet type da requisição para validar o formato de dados
    let contentType = request.headers['content-type']
    // Recebe os dados encaminhados no body da requisição
    let dadosBody = request.body

    let result = await controllerPlano.inserirPlano(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)

})

///---------------------------------------------------------------------------------------------------------------------

// Endpoint para retornar a lista de planos
app.get('/v1/controle-musicas/plano', cors(), async function(request, response){

    // Chama a função para retornar a lista de planos
    let result = await controllerPlano.listarPlano()

    response.status(result.status_code)
    response.json(result)

})

///---------------------------------------------------------------------------------------------------------------------

// Endpoint para retornar o plano pelo ID
app.get('/v1/controle-musicas/plano/:id', cors(), async function(request, response){

    let id = request.params.id

    let result = await controllerPlano.buscarPlano(id)

    response.status(result.status_code)
    response.json(result)

})

///---------------------------------------------------------------------------------------------------------------------

// Endpoint para deletar um plano
app.delete('/v1/controle-musicas/plano/:id', cors(), async function(request, response){

    let id = request.params.id

    let result = await controllerPlano.excluirPlano(id)

    response.status(result.status_code)
    response.json(result)

})

///---------------------------------------------------------------------------------------------------------------------

// Endpoint para atualizar um plano
app.put('/v1/controle-musicas/plano/:id', cors(), bodyParserJSON, async function(request, response){

    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    // Recebe ID do plano
    let id = request.params.id

    // Recebe os dados do body
    let dadosBody = request.body 

    let result = await controllerPlano.atualizarPlano(dadosBody, id, contentType)

    response.status(result.status_code)
    response.json(result)

})

//______________________________________________________________________________________________________________________
///---------------------------------------------------------------------------------------------------------------------
//______________________________________________________________________________________________________________________

// Endpoint para inserir uma data vigencia
app.post('/v1/controle-musicas/vigencia', cors(), bodyParserJSON, async function(request, response){    

    // Recebe contet type da requisição para validar o formato de dados
    let contentType = request.headers['content-type']
    // Recebe os dados encaminhados no body da requisição
    let dadosBody = request.body

    let result = await controllerVigencia.inserirVigencia(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)

})

///---------------------------------------------------------------------------------------------------------------------

// Endpoint para retornar a lista de datas vigencia
app.get('/v1/controle-musicas/vigencia', cors(), async function(request, response){

    // Chama a função para retornar a lista de datas vigencia
    let result = await controllerVigencia.listarVigencia()

    response.status(result.status_code)
    response.json(result)

})

///---------------------------------------------------------------------------------------------------------------------

// Endpoint para retornar a vigencia pelo ID
app.get('/v1/controle-musicas/vigencia/:id', cors(), async function(request, response){

    let id = request.params.id

    let result = await controllerVigencia.buscarVigencia(id)

    response.status(result.status_code)
    response.json(result)

})

///---------------------------------------------------------------------------------------------------------------------

// Endpoint para deletar uma data vigencia
app.delete('/v1/controle-musicas/vigencia/:id', cors(), async function(request, response){

    let id = request.params.id

    let result = await controllerVigencia.excluirVigencia(id)

    response.status(result.status_code)
    response.json(result)

})

///---------------------------------------------------------------------------------------------------------------------

// Endpoint para atualizar uma vigencia
app.put('/v1/controle-musicas/vigencia/:id', cors(), bodyParserJSON, async function(request, response){

    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    // Recebe ID da data vigencia
    let id = request.params.id

    // Recebe os dados do body
    let dadosBody = request.body 

    let result = await controllerVigencia.atualizarVigencia(dadosBody, id, contentType)

    response.status(result.status_code)
    response.json(result)

})

//______________________________________________________________________________________________________________________
///---------------------------------------------------------------------------------------------------------------------
//______________________________________________________________________________________________________________________

// Endpoint para inserir uma classificacao
app.post('/v1/controle-musicas/classificacao', cors(), bodyParserJSON, async function(request, response){    

    // Recebe contet type da requisição para validar o formato de dados
    let contentType = request.headers['content-type']
    // Recebe os dados encaminhados no body da requisição
    let dadosBody = request.body

    let result = await controllerClassificacao.inserirClassificacao(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)

})

///---------------------------------------------------------------------------------------------------------------------

// Endpoint para retornar a lista de classificacao
app.get('/v1/controle-musicas/classificacao', cors(), async function(request, response){

    // Chama a função para retornar a lista de classificacoes
    let result = await controllerClassificacao.listarClassificacao()

    response.status(result.status_code)
    response.json(result)

})

///---------------------------------------------------------------------------------------------------------------------

// Endpoint para retornar a classificacao pelo ID
app.get('/v1/controle-musicas/classificacao/:id', cors(), async function(request, response){

    let id = request.params.id

    let result = await controllerClassificacao.buscarClassificacao(id)

    response.status(result.status_code)
    response.json(result)

})

///---------------------------------------------------------------------------------------------------------------------

// Endpoint para deletar uma classificacao
app.delete('/v1/controle-musicas/classificacao/:id', cors(), async function(request, response){

    let id = request.params.id

    let result = await controllerClassificacao.excluirClassificacao(id)

    response.status(result.status_code)
    response.json(result)

})

///---------------------------------------------------------------------------------------------------------------------

// Endpoint para atualizar uma classificacao
app.put('/v1/controle-musicas/classificacao/:id', cors(), bodyParserJSON, async function(request, response){

    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    // Recebe ID da classificacao
    let id = request.params.id

    // Recebe os dados do body
    let dadosBody = request.body 

    let result = await controllerClassificacao.atualizarClassificacao(dadosBody, id, contentType)

    response.status(result.status_code)
    response.json(result)

})

//______________________________________________________________________________________________________________________
///---------------------------------------------------------------------------------------------------------------------
//______________________________________________________________________________________________________________________

// Endpoint para inserir um genero
app.post('/v1/controle-musicas/genero', cors(), bodyParserJSON, async function(request, response){    

    // Recebe contet type da requisição para validar o formato de dados
    let contentType = request.headers['content-type']
    // Recebe os dados encaminhados no body da requisição
    let dadosBody = request.body

    let result = await controllerGenero.inserirGenero(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)

})

///---------------------------------------------------------------------------------------------------------------------

// Endpoint para retornar a lista de genero
app.get('/v1/controle-musicas/genero', cors(), async function(request, response){

    // Chama a função para retornar a lista de classificacoes
    let result = await controllerGenero.listarGenero()

    response.status(result.status_code)
    response.json(result)

})

///---------------------------------------------------------------------------------------------------------------------

// Endpoint para retornar o genero pelo ID
app.get('/v1/controle-musicas/genero/:id', cors(), async function(request, response){

    let id = request.params.id

    let result = await controllerGenero.buscarGenero(id)

    response.status(result.status_code)
    response.json(result)

})

///---------------------------------------------------------------------------------------------------------------------

// Endpoint para deletar um genero
app.delete('/v1/controle-musicas/genero/:id', cors(), async function(request, response){

    let id = request.params.id

    let result = await controllerGenero.excluirGenero(id)

    response.status(result.status_code)
    response.json(result)

})

///---------------------------------------------------------------------------------------------------------------------

// Endpoint para atualizar um genero
app.put('/v1/controle-musicas/genero/:id', cors(), bodyParserJSON, async function(request, response){

    // Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    // Recebe ID da classificacao
    let id = request.params.id

    // Recebe os dados do body
    let dadosBody = request.body 

    let result = await controllerGenero.atualizarGenero(dadosBody, id, contentType)

    response.status(result.status_code)
    response.json(result)

})

//______________________________________________________________________________________________________________________
///---------------------------------------------------------------------------------------------------------------------

app.listen(8080, function(){
    console.log('Servidor aguardando novas requisições...')
})
