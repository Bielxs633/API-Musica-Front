/**
 * 
 *  Objetivo: Model Responsável pelo CRUD de dados do plano no Banco de Dados.
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

// Função para inserir um novo plano no Banco de Dados.
const insertPlano = async function(plano){

    //? trycatch = Forma de tratar o codigo para que a API não caia;
    try {

        let sql = `insert into tbl_plano(   nome,
                                            preco,
                                            beneficios
                                            )
                                    values(    
                                            '${plano.nome}',
                                            '${plano.preco}',
                                            '${plano.beneficios}'
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

// Função para atualizar o plano existente no Banco de Dados.
const updatePlano = async function(plano){

    try {
        let sql = `update tbl_plano set    nome            = '${plano.nome}',
                                           preco           = '${plano.preco}',
                                           beneficios      = '${plano.beneficios}'
                                        where id=${plano.id}`

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

// Função para excluir um plano existente no Banco de Dados.
const deletePlano = async function(id){

    try {

        // Script SQL
        let sql = 'delete from tbl_plano id where id='+id

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

// Função para retornar todos os planos do Banco de Dados.
const selectAllPlano = async function(){

    try {

        // Script SQL
        let sql = 'select * from tbl_plano order by id desc'

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

// Função para buscar um plano pelo ID no Banco de Dados.
const selectByIdPlano = async function(id){

    try {

        // Script SQL
        let sql = 'select * from tbl_plano where id='+id

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
    insertPlano,
    updatePlano,
    deletePlano,
    selectAllPlano,
    selectByIdPlano
} 