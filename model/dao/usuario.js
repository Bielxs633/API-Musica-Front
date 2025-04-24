/**
 * 
 *  Objetivo: Model Responsável pelo CRUD de dados do usuario no Banco de Dados.
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

// Função para inserir um novo usuario no Banco de Dados.
const insertUsuario = async function(usuario){

    //? trycatch = Forma de tratar o codigo para que a API não caia;
    try {

        let sql = `insert into tbl_usuario( nome,
                                            user_name,
                                            email,
                                            senha
                                            )
                                    values(    
                                            '${usuario.nome}',
                                            '${usuario.user_name}',
                                            '${usuario.email}',
                                            '${usuario.senha}'   
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

// Função para atualizar o usuario existente no Banco de Dados.
const updateUsuario = async function(usuario){

    try {
        let sql = `update tbl_usuario set nome        = '${usuario.nome}',
                                        user_name     = '${usuario.user_name}',
                                        email         = '${usuario.email}',
                                        senha         = '${usuario.senha}'
                                    where id=${usuario.id}`

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

// Função para excluir um perfil existente no Banco de Dados.
const deleteUsuario = async function(id){

    try {

        // Script SQL
        let sql = 'delete from tbl_usuario id where id='+id

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

// Função para retornar todos os usuarios do Banco de Dados.
const selectAllUsuarios = async function(){

    try {

        // Script SQL
        let sql = 'select * from tbl_usuario order by id desc'

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
const selectByIdUsuarios = async function(id){

    try {

        // Script SQL
        let sql = 'select * from tbl_usuario where id='+id

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
    insertUsuario,
    updateUsuario,
    deleteUsuario,
    selectAllUsuarios,
    selectByIdUsuarios
} 