/**
 * 
 *  Objetivo: Model Responsável pelo CRUD de dados da playlist no Banco de Dados.
 *  Data: 17/04/25
 *  Autor: Gabriel
 *  Versão: 1.0
 * 
 **/
/*

    CRUD
        C - Create
        R - Read
        U - Updade
        D-  Delete

*/

// Imposta a biblioteca do prisma/client.
const { PrismaClient } = require('@prisma/client')

// instaciando ( criando um novo objeto ) para realizar a manipulação do script SQL;
const prisma = new PrismaClient()

///---------------------------------------------------------------------------------------------------------------------

// Função para inserir uma nova playlist no Banco de Dados.
const insertPlaylist = async function(playlist){

    //? trycatch = Forma de tratar o codigo para que a API não caia;
    try {

        let sql = `insert into tbl_playlist(   nome,
                                               data_criacao,
                                               duracao,
                                               foto_capa
                                            )
                                    values(    
                                            '${playlist.nome}',
                                            '${playlist.data_criacao}',
                                            '${playlist.duracao}',
                                            '${playlist.foto_capa}'
                                            )`

            // Teste:
            // console.log(sql)

        // Executa o script SQL no BD ( -> bando de dados ) e aguarda o retorno do BD;
            //? await -> Aguarda um Retorno;
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
        
    } catch (error) {
        // console.log(error)
        return false
    }

} 

///---------------------------------------------------------------------------------------------------------------------

// Função para atualizar a playlist existente no Banco de Dados.
const updatePlaylist = async function(playlist){

    try {
        let sql = `update tbl_playlist set nome            = '${playlist.nome}',
                                           data_criacao    = '${playlist.data_criacao}',
                                           duracao         = '${playlist.duracao}',
                                           foto_capa       = '${playlist.foto_capa}'
                                        where id=${playlist.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        // console.log(error)
        return false
    }

}

///---------------------------------------------------------------------------------------------------------------------

// Função para excluir uma playlist existente no Banco de Dados.
const deletePlaylist = async function(id){

    try {

        // Script SQL
        let sql = 'delete from tbl_playlist id where id='+id

        // Executa o script SQL no BD e aguarda o retorno dos dados
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        // console.log(error)
        return false
    }

}

///---------------------------------------------------------------------------------------------------------------------

// Função para retornar todas as playlists do Banco de Dados.
const selectAllPlaylist = async function(){

    try {

        // Script SQL
        let sql = 'select * from tbl_playlist order by id desc'

        // Executa o script SQL no BD e aguarda o retorno dos dados
        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false

    } catch (error) {
        // console.log(error)
        return false
    }

}

///---------------------------------------------------------------------------------------------------------------------

// Função para buscar uma playlist pelo ID no Banco de Dados.
const selectByIdPlaylist = async function(id){

    try {

        // Script SQL
        let sql = 'select * from tbl_playlist where id='+id

        // Executa o script SQL no BD e aguarda o retorno dos dados
        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false

    } catch (error) {
        // console.log(error)
        return false
    }

}

///---------------------------------------------------------------------------------------------------------------------

module.exports = {
    insertPlaylist,
    updatePlaylist,
    deletePlaylist,
    selectAllPlaylist,
    selectByIdPlaylist
} 