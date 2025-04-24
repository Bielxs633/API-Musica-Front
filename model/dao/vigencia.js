/**
 * 
 *  Objetivo: Model Responsável pelo CRUD de dados da data de vigencia no Banco de Dados.
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

// Função para inserir uma nova data de vigencia no Banco de Dados.
const insertVigencia = async function(vigencia){

    //? trycatch = Forma de tratar o codigo para que a API não caia;
    try {

        let sql = `insert into tbl_data_vigencia(   data_inicio,
                                                    data_termino
                                                )
                                    values(    
                                            '${vigencia.data_inicio}',
                                            '${vigencia.data_termino}'
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

// Função para atualizar a data de vigencia existente no Banco de Dados.
const updateVigencia = async function(vigencia){

    try {
        let sql = `update tbl_data_vigencia set    data_inicio            = '${vigencia.data_inicio}',
                                                   data_termino           = '${vigencia.data_termino}'
                                                where id=${vigencia.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        console.log(error)
        return false
    }

}

///---------------------------------------------------------------------------------------------------------------------

// Função para excluir um plano existente no Banco de Dados.
const deleteVigencia = async function(id){

    try {

        // Script SQL
        let sql = 'delete from tbl_data_vigencia id where id='+id

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
const selectAllVigencia = async function(){

    try {

        // Script SQL
        let sql = 'select * from tbl_data_vigencia order by id desc'

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
const selectByIdVigencia = async function(id){

    try {

        // Script SQL
        let sql = 'select * from tbl_data_vigencia where id='+id

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
    insertVigencia,
    updateVigencia,
    deleteVigencia,
    selectAllVigencia,
    selectByIdVigencia
} 