/**
 * 
 *  Objetivo: Model Responsável pelo CRUD de dados de música no Banco de Dados.
 *  Data: 13/02/25
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

// Função para inserir uma nova musica no Banco de Dados.
const insertMusica = async function(musica){

    //? trycatch = Forma de tratar o codigo para que a API não caia;
    try {

        let sql = `insert into tbl_musica(  nome,
                                            link,
                                            duracao,
                                            data_lancamento,
                                            foto_capa,
                                            letra
                                            )
                                    values(    
                                            '${musica.nome}',
                                            '${musica.link}',
                                            '${musica.duracao}',
                                            '${musica.data_lancamento}',
                                            '${musica.foto_capa}',
                                            '${musica.letra}'        
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

// Função para atualizar uma musica existente no Banco de Dados.
const updateMusica = async function(musica){

    try {
        let sql = `update tbl_musica set nome           = '${musica.nome}',
                                        link            = '${musica.link}',
                                        duracao         = '${musica.duracao}',
                                        data_lancamento = '${musica.data_lancamento}',
                                        foto_capa       = '${musica.foto_capa}',
                                        letra           = '${musica.letra}'
                                    where id_musica=${musica.id}`

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

// Função para excluir uma musica existente no Banco de Dados.
const deleteMusica = async function(id){

    try {

        // Script SQL
        let sql = 'delete from tbl_musica id_musica where id_musica='+id

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

// Função para retornar todas as musicas do Banco de Dados.
const selectAllMusica = async function(){

    try {

        // Script SQL
        let sql = 'select * from tbl_musica order by id_musica desc'

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

// Função para buscar uma musica pelo ID no Banco de Dados.
const selectByIdMusica = async function(id){

    try {

        // Script SQL
        let sql = 'select * from tbl_musica where id_musica='+id

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
    insertMusica,
    updateMusica,
    deleteMusica,
    selectAllMusica,
    selectByIdMusica
} 