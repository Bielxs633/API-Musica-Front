/**
 * 
 *  Objetivo: Controller responsável pela manupilação do CRUD de dados do usuario.
 *  Data: 17/04/25
 *  Autor: Gabriel
 *  Versão: 1.0
 * 
 **/

// Import do arquivo de configurações de menssagens de status code.
const MESSAGE = require('../../modulo/config.js')

// Import do arquivo DAO do usuario para manipular o BD.
const usuarioDAO = require('../../model/dao/usuario.js')
const { json } = require('body-parser')

///---------------------------------------------------------------------------------------------------------------------
//______________________________________________________________________________________________________________________

// Função para inserir uma usuario.
const inserirUsuario = async function(usuario, contentType){

    // try catch é uma forma de tratar o código para que a API não caia
    try {

        if(String(contentType) == 'application/json')
        {
        if( usuario.nome            == undefined || usuario.nome            == '' || usuario.nome           == null || usuario.nome.lenght > 60          ||
            usuario.user_name       == undefined || usuario.user_name       == '' || usuario.user_name      == null || usuario.user_name.lenght > 30     ||
            usuario.email           == undefined || usuario.email           == '' || usuario.email          == null || usuario.email  .lenght > 100      ||
            usuario.senha           == undefined || usuario.senha           == '' || usuario.senha          == null || usuario.senha.lenght > 8 
        ){
            return MESSAGE.ERROR_REQUIRED_FIEDLS //$ 400
        }else{
            let resultUsuario = await usuarioDAO.insertUsuario(usuario)

            //? Só precisa do uso das Chaves ( {} ) se for mais de uma saida no return;
            if(resultUsuario)
                return MESSAGE.SUCCESS_CREATE_ITEM //$ 201
            else
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //$ 500
            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE //$ 415
        }

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //$ 500
    }

}

///---------------------------------------------------------------------------------------------------------------------

// Função para atulizar uma musica.
const atualizarUsuario = async function(usuario, id, contentType){

    try {
        
        if(String(contentType) == 'application/json')
            {
            if( usuario.nome            == undefined || usuario.nome            == '' || usuario.nome           == null || usuario.nome.lenght > 60          ||
                usuario.user_name       == undefined || usuario.user_name       == '' || usuario.user_name      == null || usuario.user_name.lenght > 30     ||
                usuario.email           == undefined || usuario.email           == '' || usuario.email          == null || usuario.email  .lenght > 100      ||
                usuario.senha           == undefined || usuario.senha           == '' || usuario.senha          == null || usuario.senha.lenght > 8          ||
                id == "" || id == undefined || id == null || isNaN(id) || id <= 0
            ){
                return MESSAGE.ERROR_REQUIRED_FIEDLS //$ 400
            }else{
                // Validar se o ID existe no BD
                let resultUsuario = await buscarUsuario(id)

                if(resultUsuario.status_code == 200){
                    // Update
                    // Adiciona um atributo ID no JSON e coloca o id do usuario que chegou na controller
                    usuario.id = id

                    let result = await usuarioDAO.updateUsuario(usuario)

                    if(result){
                        return MESSAGE.SUCCESS_UPDATE_ITEM //$ 200
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //$ 500
                    }

                }else if(resultUsuario.status_code == 404){
                    return MESSAGE.ERROR_NOT_FOUND //$ 404
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //$ 500
                }
            }         
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE //$ 415
        }

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //$ 500
    }

}

///---------------------------------------------------------------------------------------------------------------------

// Função para deletar um usuario.
const excluirUsuario = async function(id){

    try {
        if(id == "" || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIEDLS //$ 400

        }else{
            // Validar se o ID existe
            let resultUsuario = await buscarUsuario(id)

            if(resultUsuario.status_code == 200){
                // Delete
                let result = await usuarioDAO.deleteUsuario(id)

                if(result){
                    return MESSAGE.SUCCESS_DELETED_ITEM //$ 200
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //$ 500
                }

            }else if(resultUsuario.status_code == 404){
                return MESSAGE.ERROR_NOT_FOUND //$ 404
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //$ 500
            }

        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //$ 500
    }

}

///---------------------------------------------------------------------------------------------------------------------

// Função para retornar todos os usuarios.
const listarUsuario = async function(){

    try {
        
        let  dadosUsuario = {}

        // Chamar a função que retorna todos os usuarios
        let resultUsuario = await usuarioDAO.selectAllUsuarios()

        if(resultUsuario != false || typeof(resultUsuario) == 'object'){

            if(resultUsuario.length > 0){   
                // Criando um objeto JSON para retornar a lista de usuarios
                dadosUsuario.status = true
                dadosUsuario.status_code = 200
                dadosUsuario.items = resultUsuario.length
                dadosUsuario.usuario = resultUsuario
    
                return dadosUsuario //$ 200

            }else{
                return MESSAGE.ERROR_NOT_FOUND //$ 404
            }
        }else{
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //$ 500
        }

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //$ 500
    }

}

///---------------------------------------------------------------------------------------------------------------------

// Função para buscar um usuario pelo ID.
const buscarUsuario = async function(id){

    try {

        if(id == '' || id == undefined || id == null || isNaN(id) || id <= 0){
            return MESSAGE.ERROR_REQUIRED_FIEDLS //$ 400

        }else{
            let dadosUsuario = {}

            let resultUsuario = await usuarioDAO.selectByIdUsuarios(id)

            if(resultUsuario != false || typeof(resultUsuario) == 'object'){
                if(resultUsuario.length > 0){
                dadosUsuario.status = true
                dadosUsuario.status_code = 200
                dadosUsuario.usuario = resultUsuario

                    return dadosUsuario //$ 200

                }else{
                    return MESSAGE.ERROR_NOT_FOUND //$ 404
                }
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //$ 500
            }
        }

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //$ 500
    }

}

//______________________________________________________________________________________________________________________
///---------------------------------------------------------------------------------------------------------------------

module.exports = {
    inserirUsuario,
    atualizarUsuario,
    excluirUsuario,
    listarUsuario,
    buscarUsuario
}