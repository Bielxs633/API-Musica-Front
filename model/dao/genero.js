/**
 * 
 *  Objetivo: Model Responsável pelo CRUD de dados do genero no Banco de Dados.
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

// Função para inserir um novo genero no Banco de Dados.
const insertGenero = async function(genero){

    //? trycatch = Forma de tratar o codigo para que a API não caia;
    try {

        let sql = `insert into tbl_genero(  nome
                                            )
                                    values(    
                                            '${genero.nome}'
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

// Função para atualizar o genero existente no Banco de Dados.
const updateGenero = async function(genero){

    try {
        let sql = `update tbl_genero set    nome   = '${genero.nome}'
                                        where id=${genero.id}`

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

// Função para excluir um genero existente no Banco de Dados.
const deleteGenero = async function(id){

    try {

        // Script SQL
        let sql = 'delete from tbl_genero id where id='+id

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

// Função para retornar todos os genero do Banco de Dados.
const selectAllGenero = async function(){

    try {

        // Script SQL
        let sql = 'select * from tbl_genero order by id desc'

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

// Função para buscar um genero pelo ID no Banco de Dados.
const selectByIdGenero = async function(id){

    try {

        // Script SQL
        let sql = 'select * from tbl_genero where id='+id

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
    insertGenero,
    updateGenero,
    deleteGenero,
    selectAllGenero,
    selectByIdGenero
} 