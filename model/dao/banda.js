/**
 * 
 *  Objetivo: Model Responsável pelo CRUD de dados da banda no Banco de Dados.
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

// Função para inserir uma nova banda no Banco de Dados.
const insertBanda = async function(banda){

    //? trycatch = Forma de tratar o codigo para que a API não caia;
    try {

        let sql = `insert into tbl_banda(   nome,
                                            membros,
                                            data_criacao
                                            )
                                    values(    
                                            '${banda.nome}',
                                            '${banda.membros}',
                                            '${banda.data_criacao}'  
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

// Função para atualizar a banda existente no Banco de Dados.
const updateBanda = async function(banda){

    try {
        let sql = `update tbl_banda set nome            = '${banda.nome}',
                                        membros         = '${banda.membros}',
                                        data_criacao    = '${banda.data_criacao}'
                                    where id=${banda.id}`

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

// Função para excluir uma banda existente no Banco de Dados.
const deleteBanda = async function(id){

    try {

        // Script SQL
        let sql = 'delete from tbl_banda id where id='+id

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

// Função para retornar todas as bandas do Banco de Dados.
const selectAllBandas = async function(){

    try {

        // Script SQL
        let sql = 'select * from tbl_banda order by id desc'

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

// Função para buscar uma banda pelo ID no Banco de Dados.
const selectByIdBanda = async function(id){

    try {

        // Script SQL
        let sql = 'select * from tbl_banda where id='+id

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
    insertBanda,
    updateBanda,
    deleteBanda,
    selectAllBandas,
    selectByIdBanda
} 